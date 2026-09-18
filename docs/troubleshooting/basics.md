# Diagnostic & Troubleshooting Guide

If your AstroPixels kit is not behaving as expected, follow this systematic diagnostic guide. In 95% of cases, issues stem from cable polarity, power supply sag, or missing ground wires.

> [!TIP]
> **Need interactive help?** Ask our [Interactive AI Support Assistant](https://dpoulson.github.io/Astropixels/assistant/) for step-by-step troubleshooting recommendations based on your symptoms.

---

## Diagnostic Matrix

| Symptom | Most Likely Cause | Solution |
| :--- | :--- | :--- |
| **Completely Dead: No LEDs, No ESP32 Light, Voltage Collapses & High Current** | Direct short against aluminium dome skin, metal surround, or mounting screw | Inspect PCB solder joints touching metal; insulate with Kapton tape; use nylon standoffs. |
| **Completely Dark: No LEDs, No ESP32 Light (Normal Voltage)** | Power supply turned off, disconnected, or reversed polarity at screw terminals | Check supply with multimeter; verify +5V and GND orientation. |
| **ESP32 Red LED is ON, but No Displays Light** | Brownout reset, corrupt firmware flash, or faulty ESP32 | Power via 5V 2A supply; re-flash `standard` firmware via Web Installer; replace ESP32. |
| **Scrambled Animations, Inverted Patterns, or Wrong Colors** | Confusing FLD and RLD, or swapping cables between headers | FLD = 2 small front boards; RLD = 1 large rear board. Match cables to Motherboard Map. |
| **A Single Board Fails to Light Up** | Reversed 3-pin cable or loose pin connection | Verify `S-V-G` matches markings on both ends. Test board on RLD header. |
| **Only the First Few LEDs on a Board Light Up** | Damaged WS2812B pixel interrupting data chain | Inspect first unlit LED for physical damage or contact Darren for replacement. |
| **Lower Front Logic (FLD 2) is Completely Dark** | Daisy-chain jumper missing or connected backwards | Verify 10cm jumper runs from Top FLD **OUT** to Bottom FLD **IN**. |
| **System Glitches or Reboots during Loud Alarms** | Power supply voltage sag (brownout) | Power supply cannot supply 1.5A peak; upgrade to a high-capacity 5V buck converter. |
| **Marcduino Commands are Ignored** | Baud rate mismatch, missing ground, or wrong firmware | Install `standard-md` firmware; connect `GND` + `TX` to `RX`; set 9600 baud. |

---

## Detailed Diagnostic Steps

### 1. The System is Completely Dead (Checking for Aluminium Shorts)
If you apply power and **absolutely nothing turns on&mdash;not even the small red LED on the ESP32**:
1. **Check for an Aluminium Short Circuit:**
   * If your droid has an aluminium dome, aluminium inner frame, or metal logic bezels, through-hole solder pins or header legs may be shorting directly against bare metal.
   * **Hallmarks of a short:** The 5V rail voltage collapses to under 1V, current draw shoots up, wiring or the buck converter gets warm, or your power supply's short-circuit protection trips.
   * **Fix:** Unscrew the boards from the dome and test them on a non-conductive wooden or plastic bench. If they power up normally on the bench, insulate the inner dome surface or back of the metal bezels with **Kapton tape** or electrical tape, and always mount boards using **nylon M3 standoffs and nylon screws**.
2. **Check Polarity:** Confirm that `+5V` is connected to `+5V` and `GND` to `GND` on the motherboard screw terminals.

---

### 2. Confusing FLD and RLD (Terminology Mix-Up)
A very common issue is mixing up the front and rear logic displays:
* **FLD (Front Logic Display):** These are **two identical smaller rectangular boards** (9 columns &times; 5 rows each). They are mounted together in the **front** of the dome and must be daisy-chained (`Motherboard` &rarr; `Top FLD IN` &rarr; `Top FLD OUT` &rarr; `Bottom FLD IN`).
* **RLD (Rear Logic Display):** This is **one single, wide rectangular board** (27 columns &times; 4 rows). It mounts alone in the **rear** of the dome.
* **If you plug an FLD into the RLD header (or vice versa):** The microcontroller sends 108 pixels of rear logic data into a 45-pixel front logic board, or 90 pixels of front data into a 108-pixel board. The animations will appear scrambled, colors will be wrong, and parts of the display will remain unlit.

---

### 3. Partial Board Lighting (WS2812B Data Chain Failure)
WS2812B "NeoPixels" operate like a digital bucket brigade: each pixel receives the data stream on its `DIN` pin, consumes its own 24-bit color data, and relays the remainder out through its `DOUT` pin to the next pixel in series.

* **What it means:** If pixel #5 is damaged (due to static discharge, physical shock, or over-voltage), pixel #1–4 will light up normally, but pixel #5 and all subsequent pixels (#6–108) will remain completely dead.
* **How to isolate:** Inspect the very first unlit LED on the board under a magnifying glass. If a pixel has failed, contact Darren through the store with a photo, and a replacement board will be dispatched under warranty.

---

### 4. Suspecting a Faulty ESP32 Module
While ESP32 boards are generally very robust, they can occasionally fail due to electrostatic discharge (ESD), accidental contact with a 12V slip-ring lead, or flash memory corruption:
* If the red power LED on the ESP32 lights up, but the board will not accept a firmware flash from the [Web Installer](../advanced/precompiled.md) or fails to boot even when tested alone on USB with all display cables disconnected, the ESP32 module itself may be faulty.
* Because AstroPixels uses a socketed, off-the-shelf **30-pin ESP32 NodeMCU dev module**, you can easily pull the microcontroller out of the socket and pop in an inexpensive replacement without replacing the entire motherboard.

---

### 5. Daisy-Chaining Front Logics (FLD)
A very common builder oversight is connecting both FLD boards directly to the motherboard:
* The motherboard only has **one FLD header**.
* The signal must travel from the **Motherboard &rarr; Upper FLD (`IN`)**, and then via a 10cm jumper from **Upper FLD (`OUT`) &rarr; Lower FLD (`IN`)**.
* If the lower FLD is connected to the upper board's `IN` port, or if `IN` and `OUT` are reversed, the lower half will remain completely unlit.

---

### 6. Random Glitches, Freezes, or Resets (Power Brownout)
If the lights run fine for a few minutes but freeze, flicker wildly, or reboot when an alarm or white flash triggers:
* **Diagnosis: Power Supply Brownout.** An alarm or full white animation illuminates all three sub-pixels (Red, Green, and Blue) simultaneously, temporarily spiking current demand up to 1.5A.
* If your power source or wiring has high resistance (thin wires, weak battery, or inadequate step-down converter), the voltage will dip below the ESP32's 4.6V brownout detection limit, forcing a hardware reboot.
* **Fix:** Use thicker power wiring (at least 20 AWG), keep power leads short, and ensure your 5V regulator is rated for at least 2A–3A continuous output.

---

### 7. Marcduino Communication Issues
If sending Marcduino panel commands (e.g. `@0T1`, `*ON01`) produces no response on AstroPixels:
1. **Verify Firmware Flavor:** The base `standard` firmware listens for ReelTwo `LE` commands. You **must** flash the **`standard-md`** firmware to enable the Marcduino command parser!
2. **Verify Common Ground:** A single signal wire (`TX` &rarr; `RX`) is insufficient. You **must** run a Ground (`GND`) wire between the Marcduino and AstroPixels motherboard.
3. **Verify Pin Orientation:** Connect the Marcduino's serial transmit (`S` or `TX`) to the AstroPixels `R` (Receive / `GPIO 16`) pin on the `Serial2` header. Do **not** connect to `T` (Transmit).
4. **Baud Rate:** Ensure the sending port is configured for **9600 Baud (8N1)**.