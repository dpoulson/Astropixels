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
        logOutput.textContent += '\n> ${message}';
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