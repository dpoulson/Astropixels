# Factory Reset & Firmware Recovery

If you have been experimenting with custom code, modified settings, or third-party firmwares and wish to return your AstroPixels kit to its exact factory-shipped state, follow the recovery procedures below.

---

## 1. What is the Factory Default State?

All AstroPixels kits ship from the workshop programmed with the **`standard`** firmware profile:

* **Rear Logic Display (RLD):** Classic binary astromech pattern in blue, red, and white. Boot text: `... AstroPixels ....`
* **Front Logic Display (FLD):** Classic front logic pattern. Boot text: `... R2D2 ...`
* **Process State Indicators (PSIs):** Front wipes Red/Blue; Rear wipes Green/Yellow.
* **HoloProjectors (HPs):** Initial 20-second blue projection twinkle on boot, followed by randomized periodic twitches.
* **Communications:** Listening for ReelTwo logic commands on **Serial2** (9600 baud) and **I2C** (address `0x0A`).

---

## 2. One-Click Recovery via Web Installer (Recommended)

The quickest way to restore factory firmware without installing development software is through the Web Installer:

1. Unplug main 5V power from the screw terminals.
2. Connect the ESP32 to your computer using a USB-C data cable.
3. Open the [AstroPixels Web Installer](https://dpoulson.github.io/Astropixels/firmware/) in Google Chrome, Edge, or Brave.
4. Select the **Standard** radio button.
5. Click **INSTALL**, select your ESP32's COM port, and confirm the installation.
6. The installer will completely wipe the flash memory and reinstall the clean factory binary.

---

## 3. Forcing ESP32 Bootloader Mode

In rare cases where custom firmware has locked up the ESP32 or caused continuous reboot loops, the computer may fail to detect the board during flashing:

1. Locate the two small buttons on the ESP32 development module: **`BOOT`** (or `IO0`) and **`EN`** (or `RST`).
2. Plug the USB cable into your computer.
3. **Press and hold the `BOOT` button**, press the **`EN` button once**, and then **release the `BOOT` button**.
4. The ESP32 is now in hardware bootloader ROM mode and will accept a clean firmware upload from either the Web Installer or PlatformIO.