# ESP32 Web Firmware Installer

This page allows you to flash the latest firmware directly to your ESP32 device using a Chrome-based browser.

---

<div>
    <link rel="stylesheet" href="./assets/css/installer.css">
    <script src="https://unpkg.com/esptool-js"></script>
    <script src="./assets/js/installer.js"></script>

    <div id="installer-container">
        <h2 style="text-align: center;">Latest Firmware Installer</h2>
        <p style="text-align: center; color: #555;">
            Make sure your ESP32 is connected via USB. This tool only works on Chromium-based browsers (Chrome, Edge, Brave).
        </p>
        <div style="text-align: center; margin-top: 20px;">
            <button id="connect-button">Connect ESP32</button>
            <button id="install-button" disabled>Install Latest Firmware</button>
        </div>
        <div style="margin-top: 20px;">
            <h3>Status Log</h3>
            <pre id="log-output"></pre>
        </div>
    </div>
</div>