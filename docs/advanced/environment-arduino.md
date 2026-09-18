# Compiling with Arduino IDE

For builders who want to write custom animation routines, modify pinouts, or create bespoke logic behaviors, you can compile and upload your code using the standard [Arduino IDE](https://www.arduino.cc/en/software/).

---

## 1. Install Required Libraries

Open Arduino IDE and navigate to **Tools &rarr; Manage Libraries...**:

1. Search for **`Adafruit NeoPixel`** (by Adafruit) &rarr; Click **Install**.
2. **ReelTwo Library:** Download and install the official ReelTwo repository:
   * Visit the official [ReelTwo Repository](https://github.com/reeltwo/Reeltwo).
   * Click the green **Code** button and select **Download ZIP**.
   * In Arduino IDE, go to **Sketch &rarr; Include Library &rarr; Add .ZIP Library...** and select the downloaded file.
   * Alternatively, unzip the archive into your sketchbook's `libraries/` directory and restart the IDE.

---

## 2. Install the ESP32 Board Package

1. In Arduino IDE, open **File &rarr; Preferences** (or **Arduino IDE &rarr; Settings** on macOS).
2. Locate the field **Additional Boards Manager URLs** and add the official Espressif package URL:
   ```text
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. Click **OK**.
4. Open **Tools &rarr; Board &rarr; Boards Manager...**.
5. Search for **`esp32`** (published by *Espressif Systems*).
6. **Important:** Select version **`2.0.17`** (the latest `2.0.x` release) from the dropdown and click **Install**.

{% hint style="warning" %}
**ESP32 Core Compatibility:** Do NOT install ESP32 Board Package version `3.x`! The v3.x Espressif core deprecates several low-level timer and peripheral functions used by ReelTwo. Stick with `2.0.14` through `2.0.17` for 100% stable builds.
{% endhint %}

---

## 3. Board Selection & Build Settings

Under the **Tools** menu, set the following board parameters:

* **Board:** `ESP32 Dev Module`
* **Upload Speed:** `115200` (or `921600` for faster uploads)
* **Flash Frequency:** `80MHz`
* **Partition Scheme:** `Default 4MB with spiffs (1.2MB APP / 1.5MB SPIFFS)`
* **Port:** Select the COM port corresponding to your plugged-in ESP32.

---

## 4. Compiling & Uploading

1. Open **File &rarr; Examples &rarr; ReelTwo &rarr; astropixels** (or open `src/standard/main.cpp` from the AstroPixels repository).
2. Click **Verify (Checkmark)** in the top toolbar. The sketch should compile with zero errors.
3. Click **Upload (Arrow)** to flash your AstroPixels controller!
 
