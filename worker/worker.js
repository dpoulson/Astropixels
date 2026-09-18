import { DOCS_CONTEXT } from "./docs_context.js";

const ALLOWED_ORIGINS = [
  "https://dpoulson.github.io",
  "https://astropixels.gitbook.io"
];

function isAllowedOrigin(origin) {
  if (!origin) return true; // Allow direct CLI/testing
  return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed)) ||
         origin.includes("localhost") ||
         origin.includes("127.0.0.1");
}

function getCorsHeaders(origin) {
  const allowOrigin = isAllowedOrigin(origin) && origin ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

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
2. STRICT SCOPE ENFORCEMENT: You ONLY answer questions directly related to AstroPixels, 1:1 Astromech droids, ReelTwo, and dome electronics. If a user asks for general programming (Python, Java, web dev), creative writing, non-droid math, or general trivia, immediately refuse:
   "Beep-boop! ⚠️ My telemetry is strictly calibrated to assist with AstroPixels dome lighting, wiring, power, and ReelTwo firmware queries."
3. When answering troubleshooting queries, always consider the most common builder pitfalls:
   - Aluminium short circuits: If no lights turn on (not even the red ESP32 LED) and voltage collapses, warn them that solder joints may be touching the bare aluminium dome/bezel. Recommend nylon standoffs and Kapton/insulation tape.
   - Partial lighting / First few LEDs lit (Dead pixel): WS2812B LEDs are wired in series like a bucket brigade. If a board only lights up the first few pixels (e.g., 5 LEDs lit and everything after is dark), pixel #6 is damaged and cannot relay data to the rest of the board. This cannot be fixed via code/firmware. It requires a replacement PCB; advise the builder to take a clear photo and contact Darren at We Make Things for a warranty replacement board.
   - Daisy-chaining Front Logics (FLD): The two FLD boards must be chained (Motherboard -> Top FLD IN, Top FLD OUT -> Bottom FLD IN).
   - Terminology: FLD is the 2 small front boards; RLD is the 1 large rear board.
   - Grounding: A common ground wire is mandatory between AstroPixels and any external controller (Marcduino, sound board, etc.).
   - Power: Recommend regulated 5.0V with at least 2A capacity (e.g. Pololu buck converter inside the dome). Warn against relying on the fragile USB-C connector in the finished droid.
   - Home Depot R2-D2: Emphasize that the kit does NOT fit the undersized Home Depot model without severe destructive hacking, and cannot be returned if purchased for it.
4. When providing code, use accurate ReelTwo dome functions and constants (e.g., AstroPixelRLD, AstroPixelFLD, AstroPixelFrontPSI, HoloLights, LogicEngineDefaults::NORMAL, LogicEngineDefaults::ALARM, etc.).
5. Format code snippets cleanly in C++ markdown blocks.

### Complete AstroPixels Documentation & Knowledge Base:
${DOCS_CONTEXT}
`;

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const corsHeaders = getCorsHeaders(origin);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Origin domain check
    if (origin && !isAllowedOrigin(origin)) {
      console.warn(JSON.stringify({ level: "WARN", event: "UNAUTHORIZED_ORIGIN", origin, clientIP }));
      return new Response(
        JSON.stringify({ error: "Unauthorized domain." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Rate limiting
    const clientIP = request.headers.get("CF-Connecting-IP") || "anonymous";
    if (isRateLimited(clientIP)) {
      console.warn(JSON.stringify({ level: "WARN", event: "RATE_LIMITED", clientIP }));
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please wait a moment before asking another question." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server configuration error: GEMINI_API_KEY is not set." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    try {
      const { messages } = await request.json();
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: "Invalid request: 'messages' array is required." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Input character length check (Pre-API guardrail to save tokens)
      const lastMessage = messages[messages.length - 1];
      const queryText = (lastMessage?.content || "").trim();
      if (!queryText) {
        return new Response(JSON.stringify({ error: "Message cannot be empty." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (queryText.length > 500) {
        console.warn(JSON.stringify({ level: "WARN", event: "INPUT_LIMIT_EXCEEDED", length: queryText.length, clientIP }));
        return new Response(
          JSON.stringify({ error: "Transmission exceeds 500 character limit. Please keep questions concise." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Format messages for Gemini API
      // Keep only the last 4 messages to save context tokens
      const history = messages.slice(-4).map((m) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: (m.content || "").slice(0, 500) }],
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
          maxOutputTokens: 800,
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
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const data = await geminiRes.json();
      const candidate = data.candidates?.[0];
      const reply = candidate?.content?.parts?.map((p) => p.text || "").join("").trim() || "I'm sorry, I couldn't generate a response.";

      // Log structured usage data for observability
      console.log(JSON.stringify({
        level: "INFO",
        timestamp: new Date().toISOString(),
        clientIP,
        origin: origin || "direct",
        query: queryText,
        tokens: {
          prompt: data.usageMetadata?.promptTokenCount || 0,
          candidates: data.usageMetadata?.candidatesTokenCount || 0,
          total: data.usageMetadata?.totalTokenCount || 0,
        },
      }));

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Worker error:", err);
      return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
