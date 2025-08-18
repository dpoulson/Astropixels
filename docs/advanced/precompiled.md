# ESP32 Web Firmware Installer

This page allows you to flash the latest firmware directly to your ESP32 device using a Chrome-based browser.

***

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
<script>
    const connectButton = document.getElementById('connect-button');
    const installButton = document.getElementById('install-button');
    const logOutput = document.getElementById('log-output');

    let port;
    let esploader;

    const owner = 'dpoulson';
    const repo = 'Astropixels';
    const firmwareFileName = 'standard.bin';

    function updateLog(message) {
        logOutput.textContent += `\n> ${message}`;
        logOutput.scrollTop = logOutput.scrollHeight;
    }

    // Helper function to connect to the ESP32
    async function connectToDevice() {
        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 115200 });
            updateLog('Connected to ESP32.');
            installButton.disabled = false;
            installButton.style.backgroundColor = '#28a745';
            installButton.style.cursor = 'pointer';
        } catch (error) {
            updateLog(`Error: ${error.message}`);
        }
    }

    // Helper function to fetch and flash the latest firmware
    async function flashLatestFirmware() {
        if (!port) {
            updateLog('Please connect to the ESP32 first.');
            return;
        }

        try {
            updateLog('Fetching latest release information...');
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
            if (!response.ok) {
                throw new Error(`GitHub API request failed: ${response.statusText}`);
            }
            const releaseData = await response.json();

            const firmwareAsset = releaseData.assets.find(asset => asset.name === firmwareFileName);
            if (!firmwareAsset) {
                throw new Error(`Firmware file "${firmwareFileName}" not found in the latest release.`);
            }

            const firmwareURL = firmwareAsset.browser_download_url;
            updateLog(`Found firmware version: ${releaseData.tag_name}`);
            updateLog('Downloading firmware file...');
            
            const firmwareResponse = await fetch(firmwareURL);
            const firmwareBuffer = await firmwareResponse.arrayBuffer();

            updateLog('Firmware downloaded. Flashing...');

            // Flashing logic using esptool.js
            esploader = new ESPLoader(port, 115200, logOutput);
            await esploader.flash_binary(firmwareBuffer, 0x1000); // Adjust address if needed

            updateLog('Firmware installation complete! 🎉');

        } catch (error) {
            updateLog(`\nError during installation: ${error.message}`);
        }
    }

    connectButton.addEventListener('click', connectToDevice);
    installButton.addEventListener('click', flashLatestFirmware);

    // Initial check for Web Serial API support
    if ('serial' in navigator) {
        updateLog('Web Serial API supported. Ready to connect.');
    } else {
        updateLog('Web Serial API is not supported in this browser. Please use Chrome, Edge, or Brave.');
        connectButton.disabled = true;
        installButton.disabled = true;
    }

</script>