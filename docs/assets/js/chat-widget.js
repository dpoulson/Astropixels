(function () {
  const DEFAULT_ENDPOINT = "https://astropixels-ai-assistant.wemakethings.workers.dev"; // Set your Cloudflare Worker URL here
  const endpoint = window.ASTROPIXELS_AI_ENDPOINT || DEFAULT_ENDPOINT;

  // Insert CSS
  if (!document.getElementById("ap-chat-css")) {
    const link = document.createElement("link");
    link.id = "ap-chat-css";
    link.rel = "stylesheet";
    // Check if script was loaded from a specific domain or fallback to relative/cdn
    const currentScript = document.currentScript;
    if (currentScript && currentScript.src) {
      link.href = currentScript.src.replace("/js/chat-widget.js", "/css/chat-widget.css");
    } else {
      link.href = "https://dpoulson.github.io/Astropixels/assets/css/chat-widget.css";
    }
    document.head.appendChild(link);
  }

  // Build Widget DOM
  const container = document.createElement("div");
  container.id = "ap-chat-root";
  container.innerHTML = `
    <button id="ap-chat-toggle" title="AstroPixels Support Droid" aria-label="Open AstroPixels Support Chat">
      <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.22-1.31C8.61 21.49 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
      </svg>
    </button>

    <div id="ap-chat-window">
      <div class="ap-header">
        <div class="ap-header-title">
          <span class="ap-header-status"></span>
          <span>AstroPixels Support Droid</span>
        </div>
        <button class="ap-close-btn" id="ap-close-btn" title="Close">&times;</button>
      </div>
      <div class="ap-messages" id="ap-messages">
        <div class="ap-msg ap-msg-assistant">
          Beep-boop! 👋 I am the AstroPixels Technical Support Droid. Ask me anything about wiring, power, Marcduino commands, or custom lighting code!
          <div class="ap-starters">
            <button class="ap-starter-btn" data-query="Why is my bottom FLD board not lighting up?">Bottom FLD not lighting up</button>
            <button class="ap-starter-btn" data-query="How do I wire my AstroPixels to a Marcduino?">Marcduino wiring & commands</button>
            <button class="ap-starter-btn" data-query="Nothing turns on and the buck converter is hot on an aluminium dome.">Short on aluminium dome</button>
            <button class="ap-starter-btn" data-query="Will this fit in the Home Depot R2-D2?">Home Depot R2-D2 fit</button>
          </div>
        </div>
      </div>
      <div class="ap-input-area">
        <input type="text" id="ap-input" placeholder="Ask a question..." autocomplete="off" />
        <button class="ap-send-btn" id="ap-send-btn">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const toggleBtn = document.getElementById("ap-chat-toggle");
  const chatWindow = document.getElementById("ap-chat-window");
  const closeBtn = document.getElementById("ap-close-btn");
  const sendBtn = document.getElementById("ap-send-btn");
  const inputEl = document.getElementById("ap-input");
  const messagesEl = document.getElementById("ap-messages");

  const conversationHistory = [];

  function toggleChat() {
    chatWindow.classList.toggle("ap-open");
    if (chatWindow.classList.contains("ap-open")) {
      inputEl.focus();
    }
  }

  toggleBtn.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  // Starter buttons
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("ap-starter-btn")) {
      const query = e.target.getAttribute("data-query");
      if (query) {
        inputEl.value = query;
        handleSend();
      }
    }
  });

  // Render markdown helper
  function formatMarkdown(text) {
    if (!text) return "";
    // Code blocks
    let html = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<pre><code>${escaped.trim()}</code></pre>`;
    });
    // Inline code
    html = html.replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`);
    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    // Line breaks
    html = html.replace(/\n/g, "<br/>");
    return html;
  }

  function appendMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = `ap-msg ap-msg-${role}`;
    msg.innerHTML = formatMarkdown(text);
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  async function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;

    appendMessage("user", text);
    conversationHistory.push({ role: "user", content: text });
    inputEl.value = "";
    sendBtn.disabled = true;

    // Typing indicator
    const typing = document.createElement("div");
    typing.className = "ap-msg ap-msg-assistant ap-typing";
    typing.textContent = "Beep-boop... calculating...";
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
        conversationHistory.push({ role: "assistant", content: data.reply });
      } else if (data.error) {
        appendMessage("assistant", `⚠️ ${data.error}`);
      }
    } catch (err) {
      typing.remove();
      appendMessage("assistant", "⚠️ Connection error: Could not reach the AstroPixels AI worker.");
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
