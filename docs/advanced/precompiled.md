# ESP32 Web Firmware Installer

This page allows you to flash the latest firmware directly to your ESP32 device using a Chrome-based browser.

---

<div id="installer-container" style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial, sans-serif;">
    <h2 style="text-align: center;">Latest Firmware Installer</h2>
    <p style="text-align: center; color: #555;">
        Make sure your ESP32 is connected via USB. This tool only works on Chromium-based browsers (Chrome, Edge, Brave).
    </p>
    <div style="text-align: center; margin-top: 20px;">
        <button id="connect-button" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background-color: #007bff; color: white; border: none; border-radius: 5px;">
            Connect ESP32
        </button>
        <button id="install-button" style="padding: 10px 20px; font-size: 16px; cursor: not-allowed; background-color: #ccc; color: #666; border: none; border-radius: 5px; margin-left: 10px;" disabled>
            Install Latest Firmware
        </button>
    </div>
    <div style="margin-top: 20px; padding: 15px; background-color: #f4f4f4; border-radius: 5px;">
        <h3 style="margin: 0; padding-bottom: 5px; border-bottom: 1px solid #ddd;">Status Log</h3>
        <pre id="log-output" style="white-space: pre-wrap; word-wrap: break-word; font-family: 'Courier New', monospace; font-size: 14px; color: #333; margin-top: 10px;"></pre>
    </div>
</div>

<script src="https://unpkg.com/esptool-js"></script>
<script src="./assets/js/installer.js"></script>