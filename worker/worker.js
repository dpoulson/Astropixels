import { DOCS_CONTEXT } from "./docs_context.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// In-memory simple IP rate limiter (resets when worker restarts)
const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + RATE_LIMIT_WINDOW_MS;
  } else {
    entry.count++;
  }

  ipRequestCounts.set(ip, entry);
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

const SYSTEM_INSTRUCTION = `
You are the AstroPixels Technical Support Droid, an expert assistant for builders installing and customising AstroPixels dome lighting kits for 1:1 scale Astromech droids (such as R2-D2).

Your job is to assist builders with wiring, power requirements, troubleshooting, Marcduino/serial/I2C interfacing, and writing custom ReelTwo Arduino/PlatformIO code.

### Guidelines & Rules:
1. Always be concise, helpful, and technically accurate.
2. When answering troubleshooting queries, always consider the most common builder pitfalls:
   - Aluminium short circuits: If no lights turn on (not even the red ESP32 LED) and voltage collapses, warn them that solder joints may be touching the bare aluminium dome/bezel. Recommend nylon standoffs and Kapton/insulation tape.
   - Partial lighting / First few LEDs lit (Dead pixel): WS2812B LEDs are wired in series like a bucket brigade. If a board only lights up the first few pixels (e.g., 5 LEDs lit and everything after is dark), pixel #6 is damaged and cannot relay data to the rest of the board. This cannot be fixed via code/firmware. It requires a replacement PCB; advise the builder to take a clear photo and contact Darren at We Make Things for a warranty replacement board.
   - Daisy-chaining Front Logics (FLD): The two FLD boards must be chained (Motherboard -> Top FLD IN, Top FLD OUT -> Bottom FLD IN).
   - Terminology: FLD is the 2 small front boards; RLD is the 1 large rear board.
   - Grounding: A common ground wire is mandatory between AstroPixels and any external controller (Marcduino, sound board, etc.).
   - Power: Recommend regulated 5.0V with at least 2A capacity (e.g. Pololu buck converter inside the dome). Warn against relying on the fragile USB-C connector in the finished droid.
   - Home Depot R2-D2: Emphasize that the kit does NOT fit the undersized Home Depot model without severe destructive hacking, and cannot be returned if purchased for it.
3. When providing code, use accurate ReelTwo dome functions and constants (e.g., AstroPixelRLD, AstroPixelFLD, AstroPixelFrontPSI, HoloLights, LogicEngineDefaults::NORMAL, LogicEngineDefaults::ALARM, etc.).
4. Format code snippets cleanly in C++ markdown blocks.

### Complete AstroPixels Documentation & Knowledge Base:
${DOCS_CONTEXT}
`;

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Rate limiting
    const clientIP = request.headers.get("CF-Connecting-IP") || "anonymous";
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please wait a moment before asking another question." }),
        { status: 429, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server configuration error: GEMINI_API_KEY is not set." }),
        { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    try {
      const { messages } = await request.json();
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: "Invalid request: 'messages' array is required." }), {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }

      // Format messages for Gemini API
      // Only keep the last 8 messages to stay fast and responsive
      const history = messages.slice(-8).map((m) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.content || "" }],
      }));

      const model = env.GEMINI_MODEL || "gemini-3.6-flash";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const payload = {
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: history,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        },
      };

      const geminiRes = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!geminiRes.ok) {
        const errorText = await geminiRes.text();
        console.error("Gemini API Error:", errorText);
        let errorMsg = `Upstream AI error (${geminiRes.status})`;
        try {
          const parsed = JSON.parse(errorText);
          if (parsed.error && parsed.error.message) {
            errorMsg += `: ${parsed.error.message}`;
          }
        } catch (_) {}
        return new Response(
          JSON.stringify({ error: errorMsg }),
          { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      }

      const data = await geminiRes.json();
      const candidate = data.candidates?.[0];
      const reply = candidate?.content?.parts?.map((p) => p.text || "").join("").trim() || "I'm sorry, I couldn't generate a response.";

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Worker error:", err);
      return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }
  },
};
