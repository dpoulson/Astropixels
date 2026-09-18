(function () {
  const DEFAULT_ENDPOINT = "https://astropixels-ai-assistant.wemakethings.workers.dev";
  const endpoint = window.ASTROPIXELS_AI_ENDPOINT || DEFAULT_ENDPOINT;

  // Insert CSS
  if (!document.getElementById("ap-chat-css")) {
    const link = document.createElement("link");
    link.id = "ap-chat-css";
    link.rel = "stylesheet";
    const currentScript = document.currentScript;
    if (currentScript && currentScript.src) {
      link.href = currentScript.src.replace("/js/chat-widget.js", "/css/chat-widget.css");
    } else {
      link.href = "https://dpoulson.github.io/Astropixels/assets/css/chat-widget.css";
    }
    document.head.appendChild(link);
  }

  // Astromech Web Audio Synthesizer (0 external assets, 0 copyright risk)
  let soundEnabled = localStorage.getItem("ap_sound") !== "muted";
  function playAstromech(type) {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      if (type === "send") {
        // Fast 2-tone astromech inquiry chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(2200, now + 0.07);
        osc.frequency.setValueAtTime(1700, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(2600, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === "reply") {
        // Cheerful 3-tone droid whistle warble
        const tones = [
          { f1: 950, f2: 1750, t: 0, d: 0.09 },
          { f1: 1600, f2: 2400, t: 0.1, d: 0.11 },
          { f1: 2200, f2: 1300, t: 0.22, d: 0.14 }
        ];
        tones.forEach((tone) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0.05, now + tone.t);
          gain.gain.exponentialRampToValueAtTime(0.001, now + tone.t + tone.d);
          osc.frequency.setValueAtTime(tone.f1, now + tone.t);
          osc.frequency.exponentialRampToValueAtTime(tone.f2, now + tone.t + tone.d);
          osc.start(now + tone.t);
          osc.stop(now + tone.t + tone.d);
        });
      } else if (type === "click") {
        // Subtle interface blip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch (e) {
      // AudioContext unavailable or blocked by browser policy
    }
  }

  // Build Widget DOM
  const container = document.createElement("div");
  container.id = "ap-chat-root";
  container.innerHTML = `
    <button id="ap-chat-toggle" title="AstroPixels Support Droid" aria-label="Open AstroPixels Support Chat">
      <svg viewBox="0 0 32 32" fill="currentColor">
        <!-- Astromech Dome Profile & Holo Lens -->
        <path d="M16 4C9.37 4 4 9.37 4 16v3h24v-3c0-6.63-5.37-12-12-12zm-3 7a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm8 1h3v3h-3v-3zm-8 8H7v-2h6v2zm12 0h-9v-2h9v2z" />
        <circle cx="16" cy="25" r="3" />
        <path d="M11 25H6M26 25h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <div id="ap-chat-window">
      <div class="ap-header">
        <div class="ap-header-telemetry">
          <div class="ap-psi-blinker" title="Dual Droid PSI & Logic Telemetry">
            <span class="ap-psi-led psi"></span>
            <span class="ap-psi-led logic"></span>
          </div>
          <div class="ap-header-text">
            <div class="ap-header-title">AstroPixels Support Droid</div>
            <div class="ap-header-sub">SERIES R2 // COMMS ONLINE</div>
          </div>
        </div>
        <div class="ap-header-actions">
          <button class="ap-tool-btn" id="ap-audio-btn" title="Toggle Astromech Sounds">${soundEnabled ? "🔊" : "🔇"}</button>
          <button class="ap-tool-btn ap-close-btn" id="ap-close-btn" title="Close">&times;</button>
        </div>
      </div>
      <div class="ap-messages" id="ap-messages">
        <div class="ap-msg ap-msg-assistant">
          <div class="ap-msg-badge"><span class="ap-badge-dot"></span>ASTRO-UNIT // DROID TELEMETRY</div>
          Beep-boop! 👋 I am the <strong>AstroPixels Technical Support Droid</strong>. Ask me anything about dome wiring, power architecture, Marcduino serial commands, or custom ReelTwo C++ animations!
          <div class="ap-starters">
            <button class="ap-starter-btn" data-query="Why is my bottom FLD board not lighting up?">Bottom FLD not lighting up (daisy chain)</button>
            <button class="ap-starter-btn" data-query="How do I wire my AstroPixels to a Marcduino?">Marcduino serial wiring & commands</button>
            <button class="ap-starter-btn" data-query="Nothing turns on and the buck converter is hot on an aluminium dome.">Short circuit on aluminium dome</button>
            <button class="ap-starter-btn" data-query="Will this fit in the Home Depot R2-D2?">Home Depot R2-D2 fitment warning</button>
          </div>
        </div>
      </div>
      <div class="ap-input-area">
        <input type="text" id="ap-input" placeholder="Enter transmission or query..." autocomplete="off" />
        <button class="ap-send-btn" id="ap-send-btn">
          <span>SEND</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const toggleBtn = document.getElementById("ap-chat-toggle");
  const chatWindow = document.getElementById("ap-chat-window");
  const closeBtn = document.getElementById("ap-close-btn");
  const audioBtn = document.getElementById("ap-audio-btn");
  const sendBtn = document.getElementById("ap-send-btn");
  const inputEl = document.getElementById("ap-input");
  const messagesEl = document.getElementById("ap-messages");

  const conversationHistory = [];

  function toggleChat() {
    chatWindow.classList.toggle("ap-open");
    if (chatWindow.classList.contains("ap-open")) {
      playAstromech("click");
      inputEl.focus();
    }
  }

  toggleBtn.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  if (audioBtn) {
    audioBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem("ap_sound", soundEnabled ? "on" : "muted");
      audioBtn.textContent = soundEnabled ? "🔊" : "🔇";
      if (soundEnabled) playAstromech("click");
    });
  }

  // Starter buttons
  document.addEventListener("click", (e) => {
    const starter = e.target.closest(".ap-starter-btn");
    if (starter) {
      playAstromech("click");
      const query = starter.getAttribute("data-query");
      if (query) {
        inputEl.value = query;
        handleSend();
      }
    }
  });

  // Render markdown helper
  function formatMarkdown(text) {
    if (!text) return "";
    let html = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<pre><code>${escaped.trim()}</code></pre>`;
    });
    html = html.replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`);
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    html = html.replace(/\n/g, "<br/>");
    return html;
  }

  function appendMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = `ap-msg ap-msg-${role}`;
    const badgeText = role === "user" ? "OPERATOR // TRANSMISSION" : "ASTRO-UNIT // DROID TELEMETRY";
    msg.innerHTML = `
      <div class="ap-msg-badge"><span class="ap-badge-dot"></span>${badgeText}</div>
      <div class="ap-msg-content">${formatMarkdown(text)}</div>
    `;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  async function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;

    appendMessage("user", text);
    playAstromech("send");
    conversationHistory.push({ role: "user", content: text });
    inputEl.value = "";
    sendBtn.disabled = true;

    // Animated typing telemetry
    const typing = document.createElement("div");
    typing.className = "ap-msg ap-msg-assistant ap-typing";
    typing.innerHTML = `
      <div class="ap-typing-wave">
        <span></span><span></span><span></span><span></span>
      </div>
      <span>DECODING BINARY TELEMETRY...</span>
    `;
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      const data = await res.json();
      typing.remove();

      if (data.reply) {
        appendMessage("assistant", data.reply);
        playAstromech("reply");
        conversationHistory.push({ role: "assistant", content: data.reply });
      } else if (data.error) {
        appendMessage("assistant", `⚠️ ${data.error}`);
      }
    } catch (err) {
      typing.remove();
      appendMessage("assistant", "⚠️ Connection error: Could not establish comms link to AstroPixels AI worker.");
    } finally {
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });
})();
