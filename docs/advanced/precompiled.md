# Precompiled Firmware & Web Flasher

You do not need to install any IDE, compilers, or coding tools to customize or reflash your AstroPixels kit. We maintain ready-to-flash precompiled binaries that can be programmed directly from your web browser in seconds.

---

## 1. Available Firmware Profiles

| Firmware Flavor | Target Character / Style | Features & Behavior |
| :--- | :--- | :--- |
| **`standard`** | Classic R2-D2 | Classic film-accurate blue/white front logics, multi-color rear logics, red/blue front PSI, green/yellow rear PSI, and blue HoloProjectors. Listens on **Serial2 (9600 baud)** and **I2C (0x0A)** for native `LE` / `HP` commands. Shipped on all new kits by default. |
| **`standard-md`** | R2-D2 with Marcduino | Same classic color scheme as `standard`, but adds native Marcduino command parsing on Serial2 (`@0T1`, `*ON01`, `:SE01`, etc.) plus direct passthrough (`*RT`, `@AP`). |
| **`imperial`** | Imperial / Shadow Droid | Menacing crimson red logic displays (`palNum = 2`, `hue = 255`) with red HoloProjectors. Perfect for 501st Legion Imperial astromechs. |
| **`r2kt`** | R2-KT (Charity Droid) | Custom pastel pink logic display theme (`palNum = 2`, `hue = 220`) supporting the iconic R2-KT tribute droid. |
| **`special`** | Slanted Logics | Variant configured specifically for builder domes equipped with slanted front logic bezels (`AstroPixelFLDSlant`). |

---

## 2. Using the Browser Web Installer

You can flash any of the above firmware builds directly over USB using the **AstroPixels Web Installer**:

### [Launch AstroPixels Web Installer](https://dpoulson.github.io/Astropixels/firmware/)
*(Requires a Web Serial compatible browser: Google Chrome, Microsoft Edge, Brave, or Opera on desktop)*

---

## 2. Web Flashing Instructions

1. Connect your AstroPixels ESP32 module to your computer via a quality **USB-C data cable**.
2. Put the board into bootloader mode: **Hold down the BOOT button, click the EN (Reset) button once, and release BOOT**.
3. Open the [AstroPixels Web Installer](https://dpoulson.github.io/Astropixels/firmware/).
4. Select your desired firmware flavor (e.g., *Standard with MD support*).
5. Click the blue **INSTALL** button.
6. A browser popup will appear listing available USB serial ports. Select your ESP32 device (typically labeled *CP2102 USB to UART Bridge Controller* or *USB-SERIAL CH340*) and click **Connect**.
7. Confirm the installation. The web tool will erase flash, upload the bootloader, partitions, and firmware binary.
8. Once completed (approx. 30–45 seconds), disconnect the USB cable and reconnect your 5V dome power.

{% hint style="info" %}
**Driver Requirements:** Windows 10/11 and macOS automatically recognize CP2102 and CH340 USB chips. If your computer does not display a COM port when plugging in the ESP32, download the standard [Silicon Labs CP210x Driver](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) or [WCH CH340 Driver](http://www.wch-ic.com/downloads/CH341SER_EXE.html).
{% endhint %}




