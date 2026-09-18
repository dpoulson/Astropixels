# AstroPixels AI Support Droid (Cloudflare Worker + Gemini)

This directory contains the serverless backend and chat widget for the **AstroPixels Technical Support Droid**.

* **AI Model:** `gemini-3.8-flash` (or `gemini-3.5-flash-lite` for minimum latency).
* **Cost:** Free tier / pay-as-you-go. Cloudflare free tier handles 100k requests/day.
* **Knowledge Base:** Embedded documentation bundle generated directly from `docs/*.md`.

---

## 1. Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Click **Get API key** &rarr; **Create API key**.
3. (Optional) In your Google Cloud billing settings, you can set a hard budget cap (e.g. £2.00/month) if you link a payment method.

---

## 2. Deploy to Cloudflare Workers

You can deploy directly using Wrangler (Cloudflare's CLI):

```bash
# 1. Enter the worker directory
cd worker

# 2. Login to Cloudflare (free account)
npx wrangler login

# 3. Store your Gemini API key as a secure secret
npx wrangler secret put GEMINI_API_KEY
# (Paste your Gemini API key when prompted)

# 4. Deploy the worker
npx wrangler deploy
```

Wrangler will output your live URL:
`https://astropixels-ai-assistant.<your-subdomain>.workers.dev`

---

## 3. Embed the Chat Widget on your Site or GitBook

Add this `<script>` tag before `</body>` on any page or in GitBook's custom HTML/scripts:

```html
<script>
  window.ASTROPIXELS_AI_ENDPOINT = "https://astropixels-ai-assistant.<your-subdomain>.workers.dev";
</script>
<script src="https://dpoulson.github.io/Astropixels/assets/js/chat-widget.js" defer></script>
```

---

## Updating the Knowledge Base

If you edit any markdown files in `docs/`, re-run the build script and redeploy:

```bash
python3 worker/build_context.py
npx wrangler deploy
```
