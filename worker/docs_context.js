export const DOCS_CONTEXT = `=== FILE: README.md ===
---
cover: >-
  https://we-make-things.co.uk/wp-content/uploads/2024/04/316720132_844028233301927_5090764454239980872_n.jpg
coverY: 0
layout:
  cover:
    visible: true
    size: hero
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Welcome to AstroPixels

Welcome to the official documentation and user manual for the **AstroPixels** dome lighting system.

AstroPixels is a modern, all-in-one LED dome lighting kit engineered specifically for 1:1 scale Astromech droids (such as R2-D2). Powered by an onboard ESP32 microcontroller running the [ReelTwo](https://github.com/reeltwo/Reeltwo) dome library, AstroPixels replaces outdated single-color dome light sets with 269 individually addressable full-color WS2812B RGB LEDs.

Whether you are looking for a simple plug-and-play installation or seeking deep integration with control systems like Marcduino, I2C, or custom serial animations, this manual covers everything you need.

---

### Key Specifications

| Specification | Value |
| :--- | :--- |
| **Microcontroller** | ESP32 Dev Board (30-pin NodeMCU footprint) |
| **Total LED Count** | 269 Individually Addressable WS2812B RGB LEDs |
| **Operating Voltage** | 5.0V DC Regulated |
| **Current Consumption**| ~500–700mA typical, up to 1.5A peak during full-white/alarm effects |
| **Supported Displays** | 1x Rear Logic (RLD), 2x Front Logics (FLD), 2x PSIs, 3x HoloProjectors (HP) |
| **Mechanical Fit** | Direct fit for standard 1:1 scale R2-D2 bezels and frames (Teeces-compatible) |
| **Control Interfaces** | I2C (Address \`0x0A\`), Hardware Serial2 (9600 baud Marcduino / JawaLite / LE) |
| **Firmware Platform** | Arduino / PlatformIO with ReelTwo dome engine |

---

### Quick Navigation

* [Quickstart Guide](getting-started/quickstart.md) &mdash; Unbox, wire, and power up your kit in minutes.
* [Kit Contents](getting-started/kit_contents.md) &mdash; Detailed breakdown of included PCBs and wiring harnesses.
* [Power Requirements](getting-started/power.md) &mdash; Power supply recommendations, current budgets, and wiring options.
* [Installation & Mounting](getting-started/installation.md) &mdash; Physical mounting, 3D printed bezels, diffusers, and spacers.
* [Hardware & Pinout Overview](advanced/overview.md) &mdash; Motherboard architecture, GPIO assignments, and expansion headers.
* [Changing Colours](advanced/colours.md) &mdash; Customize palettes, hues, and animations for R2-D2, R2-KT, Imperial, and custom droids.
* [HoloProjectors](advanced/hp.md) &mdash; Configure HP twitch timings, colors, and sequences.
* [Serial & I2C Interfacing](advanced/interfacing.md) &mdash; Command reference for triggering effects on the fly.
* [Marcduino Integration](advanced/marcduino.md) &mdash; Connect and trigger dome lights directly from Marcduino controllers.
* [Troubleshooting](troubleshooting/basics.md) &mdash; Step-by-step diagnostic guide for common issues.
* [FAQ](faq/general.md) &mdash; Frequently asked questions regarding sizing, shipping, and design.

=== FILE: SUMMARY.md ===
# Table of contents

* [Welcome](README.md)

## Getting Started

* [Quickstart Guide](getting-started/quickstart.md)
* [Kit Contents & Specifications](getting-started/kit_contents.md)
* [Power Requirements & Architecture](getting-started/power.md)
* [Physical Installation & Mounting](getting-started/installation.md)

## Advanced & Customisation

* [Hardware & Architecture Overview](advanced/overview.md)
* [Customising Colours & Animations](advanced/colours.md)
* [HoloProjectors (HP)](advanced/hp.md)
* [Serial & I2C Command Reference](advanced/interfacing.md)
* [Marcduino Integration](advanced/marcduino.md)
* [Precompiled Firmware & Web Flasher](advanced/precompiled.md)
* [Developing with PlatformIO](advanced/environment-platformio.md)
* [Compiling with Arduino IDE](advanced/environment-arduino.md)
* [AstroPixelsPlus (WiFi & App)](advanced/app.md)

## Diagnostics & Recovery

* [Diagnostic & Troubleshooting Guide](troubleshooting/basics.md)
* [Interactive AI Technical Assistant](https://dpoulson.github.io/Astropixels/assistant/)
* [Factory Reset & Recovery](troubleshooting/original_firmware.md)

## Frequently Asked Questions

* [General FAQ](faq/general.md)
* [Hardware & Design FAQ](faq/construction.md)
* [Purchasing & Shipping FAQ](faq/purchasing.md)
* [Support FAQ](faq/support.md)

=== FILE: advanced/app.md ===
# AstroPixelsPlus (WiFi & Mobile App Firmware)

For builders seeking direct wireless smartphone control or integrated servo panel management without a separate Marcduino, community member **Mimir** (creator of the core ReelTwo robotics library) has created a specialized firmware fork called **AstroPixelsPlus**.

---

## 1. What is AstroPixelsPlus?

[AstroPixelsPlus](https://github.com/reeltwo/AstroPixelsPlus) turns the onboard ESP32 into a standalone dome controller that combines lighting, servo management, and wireless control:

* **Integrated WiFi SoftAP & Web Interface:** The ESP32 hosts its own localized WiFi Access Point. You can connect directly to it using a smartphone, tablet, or laptop to trigger lighting sequences and monitor dome telemetry.
* **R2-Touch App Integration:** Emulates standard Marcduino WiFi bridges, allowing direct control from the popular iOS/Android *R2-Touch* control app.
* **Servo Dispatch for Panels & HPs:** Takes advantage of the spare AUX pins on the AstroPixels motherboard to drive dome pie panel servos and 2-axis HoloProjector movement servos directly from the ESP32.
* **Serial Bridging:** Forwards incoming commands received over WiFi out through the \`Serial2\` port down to body controllers, Marcduino slaves, or sound players.

---

## 2. Choosing Between Standard Firmware & AstroPixelsPlus

| Feature | Standard AstroPixels (\`standard\` / \`standard-md\`) | AstroPixelsPlus |
| :--- | :--- | :--- |
| **Primary Focus** | Pure, ultra-reliable dome lighting | All-in-one WiFi dome controller + lights + servos |
| **Control Interface** | Physical Serial2 (Marcduino/RC) and I2C | WiFi hotspot, Web GUI, R2-Touch, plus Serial |
| **Complexity** | Plug-and-play, zero network setup | Requires network configuration and servo calibration |
| **Author / Support** | Developed and supported by Darren Poulson | Third-party project developed by Mimir |

---

## 3. Getting Started with AstroPixelsPlus

To explore or install AstroPixelsPlus on your AstroPixels hardware:

* **GitHub Repository & Source Code:** [https://github.com/reeltwo/AstroPixelsPlus](https://github.com/reeltwo/AstroPixelsPlus)
* **Configuration:** Refer to the AstroPixelsPlus README for setting up WiFi credentials, servo travel limits, and pin assignments.

=== FILE: advanced/colours.md ===
# Customising Colours & Animations

Because all 269 LEDs in the AstroPixels system are individually addressable WS2812B RGB pixels, you can customize any display to any color scheme, palette, speed, or startup message you desire.

---

## 1. How the Logic Engine Configures Displays

The displays (both Front/Rear Logics and Front/Rear PSIs) are configured using a \`LogicEngineSettings\` object passed during initialization:

\`\`\`cpp
static LogicEngineSettings LogicEngineCustom(
    fade,          // Transition fade speed (1-255)
    hue,           // Color wheel rotation (0-255)
    delay,         // Refresh interval delay in ms (controls animation speed)
    palNum,        // Color palette selection (0-5)
    bri,           // Global brightness level (0-255)
    defaultEffect  // Default running sequence (e.g. NORMAL or PSICOLORWIPE)
);
\`\`\`

### Parameter Breakdown

| Parameter | Type | Default Front | Default Rear | Description |
| :--- | :---: | :---: | :---: | :--- |
| **\`fade\`** | \`byte\` | \`1\` | \`3\` | Determines how smoothly pixels fade between color transitions. |
| **\`hue\`** | \`byte\` | \`0\` | \`0\` | Rotates the entire palette around the 360&deg; color wheel (\`0\` to \`255\`). |
| **\`delay\`** | \`byte\` | \`10\` | \`40\` | Milliseconds between frame updates. Smaller values run faster; larger values run slower. |
| **\`palNum\`** | \`byte\` | \`0\` | \`1\` | Selects which pre-defined color palette is used (see below). |
| **\`bri\`** | \`byte\` | \`160\` | \`140\` | Master brightness (\`0\`–\`255\`). Defaults are tuned for optimal visibility while keeping total current draw under 700mA. |
| **\`defaultEffect\`** | \`long\` | \`NORMAL\` | \`NORMAL\` | The animation pattern to run continuously. |

---

## 2. Built-in Palettes (\`palNum\`)

The ReelTwo Logic Engine includes six built-in color palettes:

* **\`0\` &mdash; Default Front:** Classic film-accurate R2-D2 front logics (white, light blue, cyan, accent red).
* **\`1\` &mdash; Default Rear:** Classic film-accurate R2-D2 rear logics (white, yellow, green, accent red/blue).
* **\`2\` &mdash; Monotone Red:** Ideal base for Imperial/Sith droids, or rotated via \`hue\` for monotone droids (e.g. pink R2-KT).
* **\`3\` &mdash; Dual Color Red & Yellow:** Classic warning/industrial colors (great for Chopper / C1 droids).
* **\`4\` &mdash; Dual Color Blue & Red:** Dynamic dual-tone palette.
* **\`5\` &mdash; Dual Color Yellow & Green:** Auxiliary astromech colorway.

---

## 3. The HUE Color Wheel (\`0\`–\`255\`)

The \`hue\` parameter shifts the entire selected palette across the 360&deg; color spectrum:

$$\\text{Red } (0) \\longrightarrow \\text{Yellow } (42) \\longrightarrow \\text{Green } (85) \\longrightarrow \\text{Cyan } (128) \\longrightarrow \\text{Blue } (170) \\longrightarrow \\text{Magenta } (213) \\longrightarrow \\text{Red } (255)$$

For example, selecting **Palette 2 (Monotone Red)** and applying a hue rotation:
* **\`hue = 0\`** &rarr; Deep Imperial Sith Red
* **\`hue = 220\`** &rarr; Pastel Pink (R2-KT)
* **\`hue = 85\`** &rarr; Emerald Green (Boba Fett / Astromech medic)
* **\`hue = 170\`** &rarr; Deep Cobalt Blue

---

## 4. Customising the PSIs (Process State Indicators)

By default, the Front PSI wipes Red and Blue, while the Rear PSI wipes Green and Yellow. You can customize the wipe colors by passing a different secondary color into \`LogicEngineDefaults::sequence()\`:

\`\`\`cpp
static LogicEngineSettings LogicEngineFrontPSICustom(
    LogicEngineDefaults::FRONT_FADE,
    LogicEngineDefaults::FRONT_HUE,
    LogicEngineDefaults::FRONT_DELAY,
    LogicEngineDefaults::FRONT_PSI_PAL,
    LogicEngineDefaults::FRONT_BRI,
    LogicEngineDefaults::sequence(
        LogicEngineDefaults::PSICOLORWIPE, 
        LogicEngineDefaults::kRed // Primary color
    )
);

AstroPixelFrontPSI<> frontPSI(LogicEngineFrontPSICustom, 4);
\`\`\`

### PSI Color Options Table

| Color Constant | Primary Color | Inverted Secondary Color |
| :--- | :--- | :--- |
| \`LogicEngineDefaults::kRed\` | Red | Blue |
| \`LogicEngineDefaults::kBlue\` | Blue | Red |
| \`LogicEngineDefaults::kYellow\` | Yellow | Green |
| \`LogicEngineDefaults::kGreen\` | Green | Yellow |
| \`LogicEngineDefaults::kCyan\` | Cyan | Orange |
| \`LogicEngineDefaults::kOrange\` | Orange | Cyan |
| \`LogicEngineDefaults::kPurple\` | Purple | Magenta |
| \`LogicEngineDefaults::kPink\` | Pink | Light Blue |

---

## 5. Ready-to-Use Droid Recipes

### Imperial / Shadow Droid (Full Crimson Red)
\`\`\`cpp
// Set palette 2 (monotone red) with hue 255
static LogicEngineSettings LogicEngineImperial(
    LogicEngineDefaults::FRONT_FADE,
    255,                                // Hue
    LogicEngineDefaults::FRONT_DELAY,
    2,                                  // Monotone Red Palette
    LogicEngineDefaults::FRONT_BRI,
    LogicEngineDefaults::sequence(LogicEngineDefaults::NORMAL)
);

AstroPixelRLD<> RLD(LogicEngineImperial, 3);
AstroPixelFLD<> FLD(LogicEngineImperial, 1);
\`\`\`

### R2-KT (Charity Droid - Pink Theme)
\`\`\`cpp
// Set palette 2 (monotone red) with hue 220 to shift red into pink
static LogicEngineSettings LogicEngineR2KT(
    LogicEngineDefaults::FRONT_FADE,
    220,                                // Pink Hue shift
    LogicEngineDefaults::FRONT_DELAY,
    2,                                  // Monotone base palette
    LogicEngineDefaults::FRONT_BRI,
    LogicEngineDefaults::sequence(LogicEngineDefaults::NORMAL)
);

AstroPixelRLD<> RLD(LogicEngineR2KT, 3);
AstroPixelFLD<> FLD(LogicEngineR2KT, 1);
\`\`\`

---

## 6. Custom Startup Text & Greetings

In \`setup()\`, you can customize the message, color, and scroll speed shown on the front and rear logics when your droid boots up:

\`\`\`cpp
void setup()
{
    REELTWO_READY();
    SetupEvent::ready();

    // RLD: Scroll droid callsign in Blue
    RLD.selectScrollTextLeft("... R2-D2 DROIDBUILDERS UK ...", LogicEngineRenderer::kBlue, 0, 20);

    // FLD: Scroll custom greeting in Red
    FLD.selectScrollTextLeft("... ONLINE ...", LogicEngineRenderer::kRed, 0, 15);
}
\`\`\`

* **Color Options:** \`kRed\`, \`kOrange\`, \`kYellow\`, \`kGreen\`, \`kCyan\`, \`kBlue\`, \`kPurple\`, \`kMagenta\`, \`kPink\`, \`kDefault\`.
* **Direction Options:** \`selectScrollTextLeft()\`, \`selectScrollTextRight()\`, \`selectScrollTextUp()\`, or \`selectTextCenter()\`.

=== FILE: advanced/environment-arduino.md ===
# Compiling with Arduino IDE

For builders who want to write custom animation routines, modify pinouts, or create bespoke logic behaviors, you can compile and upload your code using the standard [Arduino IDE](https://www.arduino.cc/en/software/).

---

## 1. Install Required Libraries

Open Arduino IDE and navigate to **Tools &rarr; Manage Libraries...**:

1. Search for **\`Adafruit NeoPixel\`** (by Adafruit) &rarr; Click **Install**.
2. **ReelTwo Library:** Download and install the official ReelTwo repository:
   * Visit the official [ReelTwo Repository](https://github.com/reeltwo/Reeltwo).
   * Click the green **Code** button and select **Download ZIP**.
   * In Arduino IDE, go to **Sketch &rarr; Include Library &rarr; Add .ZIP Library...** and select the downloaded file.
   * Alternatively, unzip the archive into your sketchbook's \`libraries/\` directory and restart the IDE.

---

## 2. Install the ESP32 Board Package

1. In Arduino IDE, open **File &rarr; Preferences** (or **Arduino IDE &rarr; Settings** on macOS).
2. Locate the field **Additional Boards Manager URLs** and add the official Espressif package URL:
   \`\`\`text
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   \`\`\`
3. Click **OK**.
4. Open **Tools &rarr; Board &rarr; Boards Manager...**.
5. Search for **\`esp32\`** (published by *Espressif Systems*).
6. **Important:** Select version **\`2.0.17\`** (the latest \`2.0.x\` release) from the dropdown and click **Install**.

{% hint style="warning" %}
**ESP32 Core Compatibility:** Do NOT install ESP32 Board Package version \`3.x\`! The v3.x Espressif core deprecates several low-level timer and peripheral functions used by ReelTwo. Stick with \`2.0.14\` through \`2.0.17\` for 100% stable builds.
{% endhint %}

---

## 3. Board Selection & Build Settings

Under the **Tools** menu, set the following board parameters:

* **Board:** \`ESP32 Dev Module\`
* **Upload Speed:** \`115200\` (or \`921600\` for faster uploads)
* **Flash Frequency:** \`80MHz\`
* **Partition Scheme:** \`Default 4MB with spiffs (1.2MB APP / 1.5MB SPIFFS)\`
* **Port:** Select the COM port corresponding to your plugged-in ESP32.

---

## 4. Compiling & Uploading

1. Open **File &rarr; Examples &rarr; ReelTwo &rarr; astropixels** (or open \`src/standard/main.cpp\` from the AstroPixels repository).
2. Click **Verify (Checkmark)** in the top toolbar. The sketch should compile with zero errors.
3. Click **Upload (Arrow)** to flash your AstroPixels controller!

=== FILE: advanced/environment-platformio.md ===
# Developing with PlatformIO

[PlatformIO](https://platformio.org/) (running inside [VS Code](https://code.visualstudio.com/) or VSCodium) is the official development environment used to build and maintain the AstroPixels codebase. It eliminates manual library downloads, automates dependency resolution, and provides a multi-target build system.

---

## 1. Getting Started

1. Download and install [Visual Studio Code](https://code.visualstudio.com/) (or VSCodium).
2. Open the **Extensions** view (\`Ctrl+Shift+X\` or \`Cmd+Shift+X\`) and install the **PlatformIO IDE** extension.
3. Clone the official AstroPixels repository:
   \`\`\`bash
   git clone https://github.com/dpoulson/Astropixels.git
   \`\`\`
4. In VS Code, choose **File &rarr; Open Workspace from File...** and select \`astropixels.code-workspace\`.
5. PlatformIO will automatically initialize the project and download all required toolchains, board definitions, and library dependencies.

---

## 2. Multi-Environment Build System

The project is structured with multiple build environments in \`platformio.ini\`, allowing you to compile different droid flavors from a single codebase:

| Environment | Source Folder | Purpose |
| :--- | :--- | :--- |
| **\`env:standard\`** | \`src/standard/\` | Standard R2-D2 dome lighting with LE serial and I2C command processing. *(Default)* |
| **\`env:standard-md\`** | \`src/standard-md/\` | Standard R2-D2 lighting with native Marcduino/JawaLite serial command parser. |
| **\`env:imperial\`** | \`src/imperial/\` | Crimson red Sith/Imperial droid profile. |
| **\`env:r2kt\`** | \`src/r2kt/\` | Pastel pink R2-KT charity droid profile. |
| **\`env:special\`** | \`src/special/\` | Variant for slanted front logic bezels (\`AstroPixelFLDSlant\`). |
| **\`env:dev\`** | \`src/dev/\` | Development environment linking to a local ReelTwo source checkout. |

---

## 3. Building & Flashing

### Using the VS Code GUI:
1. Click the **PlatformIO Alien Icon** on the left activity bar.
2. Expand your target environment (e.g. \`env:standard\` or \`env:standard-md\`).
3. Click **Build** to verify compilation.
4. Connect your ESP32 via USB and click **Upload**.
5. Click **Monitor** to open the 115200 baud serial monitor and inspect live boot logs and command debug messages.

### Using the Command Line (PlatformIO Core):
You can also compile and upload directly from the integrated terminal:

\`\`\`bash
# Build standard firmware
pio run -e standard

# Upload standard-md firmware to connected ESP32
pio run -e standard-md -t upload

# Launch serial debug monitor
pio device monitor -b 115200
\`\`\`

=== FILE: advanced/hp.md ===
# HoloProjectors (HP)

The three HoloProjector light discs (Front, Rear, Top) run ReelTwo's \`HoloLights\` engine. Each disc features 7 WS2812B RGB pixels (a circular ring of 6 pixels surrounding 1 center projection pixel).

By default, the HPs periodically wake up, play a randomized or designated lighting sequence (such as the classic blue Leia flicker), and then turn off. You can customize the timing intervals, colors, sequences, and twitch behavior.

---

## 1. Controlling Twitch Frequency & Duration

HoloProjectors operate in an automatic "twitch" mode. You can independently tune how often they turn on and how long they stay active:

\`\`\`cpp
void setup()
{
    REELTWO_READY();
    SetupEvent::ready();

    // Set how often the HP turns on (minimum seconds, maximum seconds)
    frontHolo.setLEDTwitchInterval(30, 90);

    // Set how long the HP stays lit (minimum seconds, maximum seconds)
    frontHolo.setLEDTwitchRunInterval(5, 15);
}
\`\`\`

* **\`setLEDTwitchInterval(min, max)\`**: HoloProjector will remain dark for a random time between \`min\` and \`max\` seconds before firing.
* **\`setLEDTwitchRunInterval(min, max)\`**: When triggered, the light effect will run for a random time between \`min\` and \`max\` seconds before shutting off.

---

## 2. Setting Default Sequence, Color & Speed

You can specify which animation sequence and color each HoloProjector uses during its automatic twitch:

\`\`\`cpp
void setup()
{
    REELTWO_READY();
    SetupEvent::ready();

    // Configure Front Holo: Cycle sequence, Cyan color, speed 200
    frontHolo.setHPLEDTwitchSequence(4);   // 4 = Cycle
    frontHolo.setHPLEDTwitchColor(4);      // 4 = Cyan
    frontHolo.setHPLEDTwitchSpeed(200);

    // Configure Rear Holo: Short circuit, Red color
    rearHolo.setHPLEDTwitchSequence(7);    // 7 = Short circuit
    rearHolo.setHPLEDTwitchColor(1);       // 1 = Red
}
\`\`\`

Alternatively, you can set all three parameters in a single function call:
\`\`\`cpp
topHolo.setDefaultLEDTwitchCommand(3, 5, 150); // Sequence 3 (Pulse), Color 5 (Blue), Speed 150
\`\`\`

---

## 3. Sequence & Color Reference

### Animation Sequences

| Sequence ID | Name | Description |
| :---: | :--- | :--- |
| **\`1\`** | **Leia Sequence (Blue)** | Random flickering shades of blue mimicking the original hologram projection. Center LED is kept off. |
| **\`2\`** | **Color Projector** | Similar to the Leia flicker, but rendered using the custom color specified. |
| **\`3\`** | **Dim Pulse** | Smoothly pulses the brightness up and down. |
| **\`4\`** | **Cycle** | Chases around the 6 outer LEDs in a rotating circle. |
| **\`5\`** | **Solid Color** | Illuminates all 7 LEDs steady on at full intensity. |
| **\`6\`** | **Rainbow** | Cycles continuously through the entire RGB color spectrum. |
| **\`7\`** | **Short Circuit** | Rapid chaotic flashing with an interval that gradually slows down. |

### Color Codes & C++ Constants

| Color ID | Color Name | ReelTwo C++ Hex Constant (\`HoloLights::...\`) |
| :---: | :--- | :--- |
| **\`1\`** | Red | \`kRed\` (\`0xFF0000\`) |
| **\`2\`** | Yellow | \`kYellow\` (\`0xFFFF00\`) |
| **\`3\`** | Green | \`kGreen\` (\`0x00FF00\`) |
| **\`4\`** | Cyan (Aqua) | \`kCyan\` (\`0x00FFFF\`) |
| **\`5\`** | Blue | \`kBlue\` (\`0x0000FF\`) |
| **\`6\`** | Magenta | \`kMagenta\` (\`0xFF00FF\`) |
| **\`7\`** | Orange | \`kOrange\` (\`0xFF8000\`) |
| **\`8\`** | Purple | \`kPurple\` (\`0x800080\`) |
| **\`9\`** | White | \`kWhite\` (\`0xFFFFFF\`) |
| **\`0\`** | Random | Randomized per twitch |
| &mdash; | Off | \`kOff\` (\`0x000000\`) |

---

## 4. Programmatic Direct Control in C++

Beyond automated twitching, you can directly set colors or control HoloProjector LEDs in sketch logic:

\`\`\`cpp
// 1. Force a solid color immediately
frontHolo.setColor(HoloLights::kBlue);

// 2. Shut off HoloProjector LEDs
frontHolo.off();

// 3. Address individual pixels directly (0-5: outer ring, 6: center LED)
frontHolo.setPixelColor(6, HoloLights::kWhite); // Center projection spotlight
frontHolo.show();
\`\`\`

---

## 5. Disabling Auto-Twitch (Manual / Show Control)

If you prefer your HoloProjectors to remain completely off until explicitly triggered by a Marcduino command, sound cue, or remote control switch:

\`\`\`cpp
void setup()
{
    REELTWO_READY();
    SetupEvent::ready();

    // Disable auto-twitch by sending HP clear command (Sequence 96)
    CommandEvent::process("HPA096"); // Disables twitch on All (A) HPs
}
\`\`\`

To re-enable automatic twitch at runtime, send \`HPA0971\` (default sequence) or \`HPA0972\` (random sequences). See [Interfacing Guide](interfacing.md) for full syntax.

=== FILE: advanced/interfacing.md ===
# Serial & I2C Command Reference

AstroPixels is built to react dynamically to your droid's actions. Through either **Hardware Serial (Serial2)** or the **I2C Bus**, an external controller (such as a Marcduino, Arduino master, Raspberry Pi, or wireless receiver) can trigger built-in animations, text crawls, and HoloProjector sequences on the fly.

---

## 1. Physical Interfaces & Protocols

### Hardware Serial2 (Recommended)
* **Pins:** Motherboard \`Serial2\` header (\`RX\` &rarr; \`GPIO 16\`, \`TX\` &rarr; \`GPIO 17\`, \`GND\`).
* **Baud Rate:** \`9600 Baud\`, \`8\` Data bits, \`No\` Parity, \`1\` Stop bit (\`9600 8N1\`).
* **Format:** Plain ASCII string terminated with a newline (\`\\n\`) or carriage return (\`\\r\`).
* **Grounding:** Must share a common ground with the transmitting controller.

### I2C Bus
* **Pins:** Motherboard \`I2C\` header (\`SDA\` &rarr; \`GPIO 21\`, \`SCL\` &rarr; \`GPIO 22\`, \`GND\`).
* **I2C Slave Address:** \`0x0A\` (7-bit hexadecimal).
* **Format:** Raw ASCII character byte stream sent across the I2C bus.

---

## 2. Logic Engine Commands (\`LE...\`)

Commands targeting the Front Logics (FLD), Rear Logics (RLD), or PSIs begin with \`LE\` followed by 6 parameters:

\`\`\`text
LE <Target> <Effect> <Colour> <Speed> <Duration>
\`\`\`

### Parameter Breakdown

| Field | Length | Description / Accepted Values |
| :--- | :---: | :--- |
| **\`LE\`** | 2 chars | Prefix indicating Logic Engine command. |
| **\`<Target>\`** | 1 digit | Target display:<br>&bull; \`0\` = All displays (FLD, RLD, and PSIs)<br>&bull; \`1\` = Front Logic Displays (FLD)<br>&bull; \`3\` = Rear Logic Display (RLD)<br>&bull; \`4\` = Front PSI (FPSI)<br>&bull; \`5\` = Rear PSI (RPSI) |
| **\`<Effect>\`** | 2 digits | Animation pattern (\`00\` to \`24\`, or \`99\`). See table below. |
| **\`<Colour>\`** | 1 digit | Color override:<br>\`0\`=Default, \`1\`=Red, \`2\`=Orange, \`3\`=Yellow, \`4\`=Green, \`5\`=Cyan, \`6\`=Blue, \`7\`=Purple, \`8\`=Magenta, \`9\`=Pink |
| **\`<Speed>\`** | 1 digit | Animation speed scaling (\`0\` to \`9\`, where \`0\` is fastest). |
| **\`<Duration>\`**| 2 digits | Duration in seconds (\`00\` = run continuously until next command; \`01\`–\`99\` = timeout back to normal). |

### Complete Effect Codes & C++ Constants Table

Every serial/I2C effect code has a corresponding C++ constant in \`LogicEngineDefaults\` that can be used directly in sketch code (via \`selectSequence()\`):

| Code | ReelTwo C++ Constant (\`LogicEngineDefaults::...\`) | Effect Name | Description |
| :---: | :--- | :--- | :--- |
| **\`00\`** | \`NORMAL\` | **Normal** | Returns display to normal rolling astromech logic patterns. |
| **\`01\`** | \`ALARM\` | **Alarm** | Flashes alternating rows between the primary color and bright red. |
| **\`02\`** | \`FAILURE\` | **Failure** | Rapid color and brightness fading timed to R2 scream audio tracks. |
| **\`03\`** | \`LEIA\` | **Leia** | Pale green/blue subdued flicker matching hologram playback. |
| **\`04\`** | \`MARCH\` | **March** | Pulsing rhythmic logic sequence synchronized with the Imperial March. |
| **\`05\`** | \`SOLIDCOLOR\` | **Solid Color** | Forces all LEDs in the display to a single static color. |
| **\`06\`** | \`FLASHCOLOR\` | **Flashing Color** | Blinks the entire display on and off in the specified color. |
| **\`07\`** | \`FLIPFLOPCOLOR\` | **Flip Flop** | Alternates top and bottom halves back and forth. |
| **\`08\`** | \`FLIPFLOPALTCOLOR\` | **Flip Flop Alt** | Inverted alternating direction flip-flop. |
| **\`09\`** | \`COLORSWAP\` | **Color Swap** | Switches continuously between specified color and its complementary opposite. |
| **\`10\`** | \`RAINBOW\` | **Rainbow** | Smoothly cascades a full RGB rainbow spectrum across the matrix. |
| **\`11\`** | \`REDALERT\` | **Red Alert** | Fast aggressive red strobing. |
| **\`14\`** | \`LIGHTSOUT\` | **Lights Out** | Shuts off all LEDs in the display (stealth / power-down mode). |
| **\`15\`** | \`TEXT\` | **Static Text** | Displays static text message. |
| **\`16\`** | \`TEXTSCROLLLEFT\` | **Scroll Text Left** | Scrolls buffered text horizontally to the left. |
| **\`17\`** | \`TEXTSCROLLRIGHT\`| **Scroll Text Right**| Scrolls buffered text horizontally to the right. |
| **\`18\`** | \`TEXTSCROLLUP\` | **Scroll Text Up** | Scrolls buffered text vertically upward. |
| **\`19\`** | \`ROAMINGPIXEL\` | **Roaming Pixel** | Single pixel scans matrix row by row (hardware diagnostic). |
| **\`20\`** | \`HORIZONTALSCANLINE\` | **Horizontal Scanline** | Cylon / KITT horizontal scanning bar. |
| **\`21\`** | \`VERTICALSCANLINE\` | **Vertical Scanline** | Vertical scanning bar. |
| **\`22\`** | \`FIRE\` | **Fire** | Emulates organic burning embers and flames. |
| **\`23\`** | \`PSICOLORWIPE\` | **PSI Color Wipe** | Standard PSI circular wiping animation. |
| **\`24\`** | \`PULSE\` | **Pulse** | Smooth breathing brightness pulse. |
| **\`99\`** | \`RANDOM\` | **Random Effect** | Randomly picks an effect from the library. |

---

### Programmatic C++ API vs Commands

If writing custom code or callbacks, you can trigger these effects programmatically without formatting text strings:

\`\`\`cpp
// 1. Direct object method (Target, Sequence, Color, Speed, Duration)
RLD.selectSequence(LogicEngineDefaults::ALARM);
FLD.selectSequence(LogicEngineDefaults::FIRE, LogicEngineDefaults::kRed, 2, 10);
frontPSI.selectSequence(LogicEngineDefaults::PSICOLORWIPE, LogicEngineDefaults::kBlue);

// 2. Scrolling text programmatically
RLD.selectScrollTextLeft("... ASTROPIXELS ...", LogicEngineRenderer::kBlue, 0, 15);

// 3. Process formatted command strings inside your sketch
CommandEvent::process("LE1010003"); // Front logics alarm for 3 seconds
\`\`\`

### C++ Color Enumeration (\`LogicEngineDefaults::ColorVal\`)

When calling \`selectSequence()\` or initializing \`LogicEngineSettings\`:

\`\`\`cpp
enum ColorVal {
    kDefault = 0,
    kRed     = 1,
    kOrange  = 2,
    kYellow  = 3,
    kGreen   = 4,
    kCyan    = 5,
    kBlue    = 6,
    kPurple  = 7,
    kMagenta = 8,
    kPink    = 9
};
\`\`\`

---

## 3. HoloProjector Commands (\`HP...\`)

HoloProjector commands control projector sequences, colors, and auto-twitch settings:

\`\`\`text
HP <Target> <Type> <Function> [Colour] [Speed] [|Duration]
\`\`\`

### Parameter Breakdown

* **\`<Target>\`**: Which HoloProjector to address:
  * \`F\` = Front HP | \`R\` = Rear HP | \`T\` = Top HP
  * \`A\` = All 3 HPs
  * \`X\` = Front & Rear | \`Y\` = Front & Top | \`Z\` = Rear & Top
* **\`<Type>\`**: \`0\` for LED lighting function (\`1\` reserved for servo motion).
* **\`<Function>\`**: 2-digit sequence code:
  * \`01\` = Leia sequence (Blue flicker)
  * \`02\` = Color Projector flicker (using specified color)
  * \`03\` = Dim Pulse (smooth breathing glow)
  * \`04\` = Cycle (rotating outer ring)
  * \`05\` = Solid on
  * \`06\` = Rainbow
  * \`07\` = Short Circuit (rapid decelerating strobe)
  * \`96\` = Clear HP, disable auto-twitch
  * \`97\` = Clear HP, enable auto-twitch (default sequence)
  * \`98\` = Clear HP, disable auto-twitch, enable off-color
  * \`99\` = Clear HP, enable auto-twitch (random sequences)
* **\`[Colour]\`** *(Optional)*: \`1\`=Red, \`2\`=Yellow, \`3\`=Green, \`4\`=Cyan, \`5\`=Blue, \`6\`=Magenta, \`7\`=Orange, \`8\`=Purple, \`9\`=White, \`0\`=Random.
* **\`[Speed]\`** *(Optional)*: Speed scale (\`0\`–\`9\`).
* **\`[|Duration]\`** *(Optional)*: Pipe character followed by duration in seconds (e.g. \`|20\` for 20 seconds). After the duration, the HP shuts off and returns to its background state.

---

## 4. Example Show Commands & Macros

Copy and send these ready-to-use strings over Serial2 or I2C:

| Desired Action | Command String | Explanation |
| :--- | :--- | :--- |
| **Reset All to Normal** | \`LE0000000\` | Resets all logics and PSIs back to normal rolling mode. |
| **Scream / Red Alert (5 sec)** | \`LE0011005\` | Triggers Red Alert on all logics for 5 seconds. |
| **Imperial March Mode** | \`LE0041000\` | Puts all logics into Imperial March pulsing in Red continuously. |
| **Leia Message Playback** | \`LE0030030\\nHPA001|30\` | Sets logics to subdued pale green and triggers HP blue hologram flicker for 30s. |
| **Disco / Cantina Mode** | \`LE0100015\\nHPA006|15\` | Displays rainbow logics and rainbow spinning HPs for 15 seconds. |
| **Cylon Front Logics** | \`LE1201010\` | Runs red horizontal scanline on Front Logics for 10 seconds. |
| **All Holos Short Circuit** | \`HPA0071|10\` | Fires red short-circuit flicker on all HPs for 10 seconds. |
| **Mute / Stealth Mode** | \`LE0140000\\nHPA096\` | Completely turns off all displays and disables HP twitch. |

=== FILE: advanced/marcduino.md ===
# Marcduino Integration

AstroPixels integrates natively with standard Marcduino dome controllers (v1, v1.5, and v2/v3 Compact). By installing the **\`standard-md\`** firmware, AstroPixels acts as a drop-in replacement for legacy Teeces / JawaLite dome displays, responding directly to standard Marcduino panel commands, sequence macros, and HoloProjector triggers.

---

## 1. Wiring Marcduino to AstroPixels

The Marcduino communicates with AstroPixels via a one-way (simplex) serial connection at **9600 Baud (8N1)**:

\`\`\`text
Marcduino Output (Slave / Aux Port)               AstroPixels Motherboard (Serial2)
┌─────────────────────────────────┐               ┌─────────────────────────────────┐
│  [ - ] Ground (GND)             ├───────────────┤  [ G ] Ground                   │
│  [ + ] 5V Power                 │  (NO CONNECT) │  [ V ] (Leave Unconnected)      │
│  [ S ] Signal / Serial TX       ├───────────────┤  [ R ] Serial2 RX (GPIO 16)     │
└─────────────────────────────────┘               └─────────────────────────────────┘
\`\`\`

### Critical Wiring Rules:
1. **Connect Ground (\`-\` to \`G\`):** Both boards must share a common ground.
2. **Connect Signal to RX (\`S\` to \`R\`):** Connect the Marcduino's serial output (\`S\` pin) to the AstroPixels \`R\` (Receive / \`GPIO 16\`) pin.
3. **DO NOT Connect Power (\`+\`):** Never link the \`+5V\` pin between the Marcduino and AstroPixels. Both systems should be powered independently from their own regulated power supplies to prevent ground loops and voltage backfeeding.

---

## 2. Firmware Requirement

To enable the Marcduino command parser, install the **\`standard-md\`** firmware flavor using our [Web Installer](https://dpoulson.github.io/Astropixels/firmware/).

---

## 3. Supported Marcduino Command Dictionary

The \`standard-md\` firmware parses native Marcduino command prefixes:

### Logic Display Sequences (\`@...\`)

| Marcduino Command | Target Display | Sequence Triggered |
| :--- | :--- | :--- |
| **\`@0T1\`** | All Logics (FLD & RLD) | Normal rolling logics |
| **\`@0T2\`** | All Logics (FLD & RLD) | Flash color sequence |
| **\`@1T1\`** | Front Logics (FLD) | Normal rolling logics |
| **\`@1T2\`** | Front Logics (FLD) | Flash color sequence |
| **\`@1T3\`** | Front Logics (FLD) | Alarm sequence |
| **\`@1T4\`** | Front Logics (FLD) | System failure sequence |
| **\`@1T5\`** | Front Logics (FLD) | Scream / Red alert sequence |
| **\`@1T6\`** | Front Logics (FLD) | Leia sequence |
| **\`@1T11\`** | Front Logics (FLD) | Imperial March sequence |
| **\`@2T1\`** | Rear Logics (RLD) | Normal rolling logics |
| **\`@2T2\`** | Rear Logics (RLD) | Flash color sequence |
| **\`@2T3\`** | Rear Logics (RLD) | Alarm sequence |
| **\`@2T4\`** | Rear Logics (RLD) | System failure sequence |
| **\`@2T5\`** | Rear Logics (RLD) | Scream / Red alert sequence |
| **\`@2T6\`** | Rear Logics (RLD) | Leia sequence |
| **\`@2T11\`** | Rear Logics (RLD) | Imperial March sequence |

### PSI Sequences (\`@...\`)

| Marcduino Command | Target Display | Sequence Triggered |
| :--- | :--- | :--- |
| **\`@0P1\`** | Both PSIs | Normal color wipe |
| **\`@1P1\`** | Front PSI | Normal color wipe |
| **\`@1P2\`** | Front PSI | Flash sequence |
| **\`@1P3\`** | Front PSI | Alarm sequence |
| **\`@1P4\`** | Front PSI | Failure sequence |
| **\`@1P5\`** | Front PSI | Scream / Red alert |
| **\`@1P6\`** | Front PSI | Leia subdued flicker |
| **\`@1P11\`**| Front PSI | Imperial March pulse |
| **\`@2P1\`** | Rear PSI | Normal color wipe |
| **\`@2P2\`** | Rear PSI | Flash sequence |
| **\`@2P3\`** | Rear PSI | Alarm sequence |
| **\`@2P4\`** | Rear PSI | Failure sequence |
| **\`@2P5\`** | Rear PSI | Scream / Red alert |
| **\`@2P6\`** | Rear PSI | Leia subdued flicker |
| **\`@2P11\`**| Rear PSI | Imperial March pulse |

### HoloProjector Controls (\`*...\`)

| Marcduino Command | Target | Action |
| :--- | :--- | :--- |
| **\`*ON01\`** | Front HP | Turn ON (Dim cycle random color) |
| **\`*OF01\`** | Front HP | Turn OFF |
| **\`*ON02\`** | Rear HP | Turn ON (Dim cycle random color) |
| **\`*OF02\`** | Rear HP | Turn OFF |
| **\`*ON03\`** | Top HP | Turn ON (Dim cycle random color) |
| **\`*OF03\`** | Top HP | Turn OFF |
| **\`*ST00\`** | All HPs | Reset / turn off all HoloProjectors |

### Global Show Animations (\`:...\`)

| Sequence Command | Animation Name | Description |
| :--- | :--- | :--- |
| **\`:SE00\`** | **Stop / Reset** | Resets all logics, PSIs, and HPs to normal background operation. |
| **\`:SE01\`** | **Scream** | Front and rear logics enter red scream alert for 3 seconds. |
| **\`:SE05\`** | **Cantina / Disco** | Triggers fire effect on logics and short circuit on all HPs for 15 seconds. |

---

## 4. Direct Command Passthrough

Need to trigger a custom AstroPixels effect that isn't mapped to a standard Marcduino command? You can tunnel native ReelTwo commands directly through the Marcduino using the \`*RT\` or \`@AP\` prefixes:

* **Format:** Send \`*RT\` or \`@AP\` followed immediately by any native AstroPixels command.
* **Example:** Sending \`*RTLE0100015\` will instruct the AstroPixels to run the Rainbow sequence on all logics for 15 seconds.
* **Example:** Sending \`@APHPA0071|10\` will fire a red short-circuit flash across all HoloProjectors for 10 seconds.

=== FILE: advanced/overview.md ===
# Hardware & Architecture Overview

The AstroPixels system is powered by an onboard **ESP32 NodeMCU Development Module** (30-pin footprint) driving strings of WS2812B individually addressable RGB LEDs. The firmware runs on top of the open-source [ReelTwo](https://github.com/reeltwo/Reeltwo) robotics framework, taking advantage of FreeRTOS non-blocking event loops, precise timing, and pre-built astromech lighting routines.

---

## 1. System Pinout & Device Mapping

The table below details the hardware GPIO connections, the internal ReelTwo device identifiers, and their default function in the standard firmware:

| Motherboard Silk | GPIO Pin | Device Type | ReelTwo Device ID / Target | Default Configuration / Pixel Count |
| :--- | :---: | :--- | :---: | :--- |
| **RLD** | \`GPIO 33\` | Rear Logic Display | Logic ID \`3\` | 108 pixels (27 columns &times; 4 rows), Palette 1 (Rear Default), 140 Brightness |
| **FLD** | \`GPIO 15\` | Front Logic Display | Logic ID \`1\` | 90 pixels (2 &times; 45 chained, 9 &times; 10 matrix), Palette 0 (Front Default), 160 Brightness |
| **FPSI** | \`GPIO 32\` | Front PSI | Logic ID \`4\` | 25 pixels (5 &times; 5 circular mask), Color Wipe sequence (Red/Blue) |
| **RPSI** | \`GPIO 23\` | Rear PSI | Logic ID \`5\` | 25 pixels (5 &times; 5 circular mask), Color Wipe sequence (Green/Yellow) |
| **FHP** | \`GPIO 25\` | Front HoloProjector | Holo ID \`1\` (\`kFrontHolo\` / \`F\`) | 7 pixels (ring of 6 + 1 center), Leia Blue sequence, automatic twitch enabled |
| **RHP** | \`GPIO 26\` | Rear HoloProjector | Holo ID \`2\` (\`kRearHolo\` / \`R\`) | 7 pixels (ring of 6 + 1 center), Leia Blue sequence, automatic twitch enabled |
| **THP** | \`GPIO 27\` | Top HoloProjector | Holo ID \`3\` (\`kTopHolo\` / \`T\`) | 7 pixels (ring of 6 + 1 center), Leia Blue sequence, automatic twitch enabled |
| **AUX1** | \`GPIO 2\` | General Purpose I/O | Customizable | Usable for FireStrip, Bad Motivator smoke trigger, or extra LEDs |
| **AUX2** | \`GPIO 4\` | General Purpose I/O | Customizable | Usable for custom servo dispatch or additional lighting |
| **AUX3** | \`GPIO 5\` | General Purpose I/O | Customizable | Usable for dome panel sensors or status triggers |
| **AUX4** | \`GPIO 18\` | General Purpose I/O | Customizable | Usable for SPI / general digital I/O |
| **AUX5** | \`GPIO 19\` | General Purpose I/O | Customizable | Usable for SPI / general digital I/O |
| **I2C Header** | \`GPIO 21\` (SDA)<br>\`GPIO 22\` (SCL) | I2C Bus | Slave Address \`0x0A\` | Listens for ReelTwo logic commands and HP commands |
| **Serial2** | \`GPIO 16\` (RX)<br>\`GPIO 17\` (TX) | Hardware Serial UART | 9600 Baud (8N1) | Listens for Marcduino / JawaLite commands or direct ReelTwo commands |

{% hint style="info" %}
**Understanding Pins vs IDs:**
* **Hardware GPIO:** The physical pin on the ESP32 that outputs the NeoPixel data stream (e.g., \`GPIO 33\` for RLD).
* **Device ID:** The software identifier used in commands (e.g., in \`LE3010003\`, the \`3\` targets the RLD, while \`1\` targets the FLD).
{% endhint %}

---

## 2. Microcontroller Module (ESP32)

AstroPixels utilizes a standard, off-the-shelf **ESP32 NodeMCU-32S Development Board** (30-pin version, 25.4mm / 1.0 inch pin row spacing).

### Buying a Replacement / Spare
If your USB port is accidentally damaged or the board fails, you do **not** need proprietary hardware. Any standard 30-pin ESP32 dev module (commonly sold on Amazon, eBay, or AliExpress as "ESP32 DevKit V1 30-pin") will drop right into the motherboard socket.

{% hint style="danger" %}
**Do Not Use 38-pin ESP32 Modules:** Ensure any replacement board is the **30-pin** layout. The larger 38-pin variants will not fit the motherboard header socket!
{% endhint %}

Once socketed, simply plug the board into your computer and use our [Web Installer](https://dpoulson.github.io/Astropixels/firmware/) to flash the latest firmware in 30 seconds.

---

## 3. Expanding with AUX Headers (FireStrip & Bad Motivator)

The AstroPixels motherboard breaks out 5 auxiliary GPIOs (\`AUX1\`–\`AUX5\`) directly from the ESP32. Advanced builders can attach extra accessories using standard ReelTwo modules:

### Adding a Dome Fire Effect (\`FireStrip\`)
Connect an 8-LED NeoPixel stick to **AUX1** (\`GPIO 2\`, +5V, GND):
\`\`\`cpp
#include "dome/FireStrip.h"

// Define an 8-LED FireStrip on AUX1 (GPIO 2)
FireStrip<2> fireStrip;

// Inside setup() or command handler:
fireStrip.spark(500); // Trigger electric sparks
fireStrip.burn(500);  // Trigger burning fire animation
\`\`\`
Commands like \`FSON\` and \`FSOFF\` will now control the fire strip.

### Adding a Smoke Generator Relay (\`BadMotivator\`)
Connect a 5V relay module or MOSFET gate to **AUX2** (\`GPIO 4\`, +5V, GND) to drive an electronic vape smoke unit or CO2 solenoid:
\`\`\`cpp
#include "dome/BadMotivator.h"

// Define smoke trigger on AUX2 (GPIO 4)
BadMotivator<4> badMotivator;

// Trigger smoke output:
badMotivator.trigger(); // Fires smoke relay
\`\`\`
Commands like \`BMON\` and \`BMOFF\` will now control the smoke output.

=== FILE: advanced/precompiled.md ===
# Precompiled Firmware & Web Flasher

You do not need to install any IDE, compilers, or coding tools to customize or reflash your AstroPixels kit. We maintain ready-to-flash precompiled binaries that can be programmed directly from your web browser in seconds.

---

## 1. Available Firmware Profiles

| Firmware Flavor | Target Character / Style | Features & Behavior |
| :--- | :--- | :--- |
| **\`standard\`** | Classic R2-D2 | Classic film-accurate blue/white front logics, multi-color rear logics, red/blue front PSI, green/yellow rear PSI, and blue HoloProjectors. Listens on **Serial2 (9600 baud)** and **I2C (0x0A)** for native \`LE\` / \`HP\` commands. Shipped on all new kits by default. |
| **\`standard-md\`** | R2-D2 with Marcduino | Same classic color scheme as \`standard\`, but adds native Marcduino command parsing on Serial2 (\`@0T1\`, \`*ON01\`, \`:SE01\`, etc.) plus direct passthrough (\`*RT\`, \`@AP\`). |
| **\`imperial\`** | Imperial / Shadow Droid | Menacing crimson red logic displays (\`palNum = 2\`, \`hue = 255\`) with red HoloProjectors. Perfect for 501st Legion Imperial astromechs. |
| **\`r2kt\`** | R2-KT (Charity Droid) | Custom pastel pink logic display theme (\`palNum = 2\`, \`hue = 220\`) supporting the iconic R2-KT tribute droid. |
| **\`special\`** | Slanted Logics | Variant configured specifically for builder domes equipped with slanted front logic bezels (\`AstroPixelFLDSlant\`). |

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

=== FILE: faq/construction.md ===
# Hardware & Design FAQ

### Why JLCPCB?
Quite simply, they offer excellent manufacturing quality and cost efficiency. Paired with EasyEDA and LCSC component sourcing, JLCPCB enables small-batch SMT assembly that keeps the final kit price as low as possible for club members.

### Why did you select the specific cable harness lengths?
The harness lengths are engineered around a standard 1:1 scale dome with the motherboard mounted directly to the rear of the RLD. The 10cm, 20cm, and 30cm servo cables (along with 30cm extensions) represent standard, mass-produced RC cable lengths. Using standard bulk lengths avoids the substantial added expense of bespoke crimped harnesses while providing enough slack to reach any 1:1 dome configuration.

### Are the PCB Gerbers and hardware files open-source?
Currently, no. The value in AstroPixels is in the bulk manufacturing runs. If an individual builder were to order a single one-off set of all 7 PCBs with surface-mount assembly from a fabrication house, setup fees and minimum order charges would easily exceed £200.

### Why use the ESP32 microcontroller?
The ESP32 offers substantial processing power, dual-core architecture, FreeRTOS multi-threading, and hardware UARTs. This ensures smooth 60fps NeoPixel animations across 269 pixels without timing jitter or blocking serial/I2C communication. Furthermore, the 30-pin NodeMCU module is an ubiquitous, inexpensive standard, making replacements easily available worldwide.

=== FILE: faq/general.md ===
# General FAQ

### Why did you create AstroPixels?
Initially to explore PCB design. I designed the first prototype PSIs and had them manufactured by JLCPCB, quickly realizing how accessible it was and how cost-effective they could be when ordered in bulk. From there, I developed the full suite of dome light boards (RLD, FLD, HPs) around the ReelTwo library. The goal was to provide the community with an all-in-one upgrade that is both significantly more capable and far less expensive than legacy Teeces systems running on decade-old technology.

### How long did development take?
It took several months and multiple prototyping iterations to produce the first small production batch for beta testers in the UK Droidbuilders club. Based on feedback, I refined the traces, connectors, and mounting layouts until arriving at the rock-solid hardware revision shipping today.

### Why is the kit so affordable?
AstroPixels is a community-first passion project. Over the years, I've benefited immensely from the knowledge, 3D models, and open-source designs freely shared by other Astromech builders. AstroPixels is my way of giving back to new and veteran builders alike. I do not run this as a high-margin commercial enterprise; pricing covers bulk manufacturing costs, replacement spares, and a £10 charity contribution from every set.

### Will AstroPixels fit into the animatronic Home Depot R2-D2?
**Yes and No.** The Home Depot yard animatronic R2-D2 is not a 1:1 full-scale replica; its dome openings and bezels are substantially smaller than screen-accurate club dimensions. While a few builders have shoehorned parts of the kit in using aggressive Dremel surgery, AstroPixels is neither designed nor intended for that model.

### Will you produce a miniature version for the Home Depot R2-D2?
Almost certainly no. Keeping up with worldwide demand from full-scale 1:1 builders takes all available workshop capacity, and the Home Depot prop is not commercially distributed in the UK.

### If I buy a set hoping to fit them into a Home Depot R2-D2 and fail, can I return them?
No. All specifications, dimensions, and warnings are clearly documented up front.

=== FILE: faq/purchasing.md ===
# Purchasing & Shipping FAQ

### Can I just send money directly rather than using the web store?
No. All orders must go through the official store. Using the store system automatically tracks inventory, generates shipping manifests, prevents missed orders, and logs charity contributions accurately.

### Are sets in stock and ready to ship?
If the store indicates stock is available, sets are built, tested, and ready to ship. In accordance with R2-D2 Builders Club rules, I never accept pre-orders or pre-payments for unbuilt hardware. I only accept payment when physical inventory is tested and ready to package.

### Why is there a purchase limit of one set per customer?
AstroPixels is created to support individual hobbyists building droids for personal use and charity appearances. To discourage commercial flippers from purchasing stock to resell completed droids for commercial profit (which violates Lucasfilm fan club guidelines), orders are limited. If you are building multiple droids for charity or family, reach out to me directly prior to ordering.

### Do you ship internationally?
Yes. Packages are shipped worldwide via [Royal Mail](https://www.royalmail.com/) to any destination they service. If your country is not listed at checkout, drop me a message and I will enable it on the store shipping table.

### Can I buy individual replacement boards without buying a whole kit?
Kits are manufactured and packaged in complete matched sets of 7 PCBs, so I do not sell standalone boards for new builds. However, if an existing customer damages a board during assembly or trooping, I keep dedicated warranty and replacement stock on hand&mdash;contact me directly and we will get you sorted.

### Will I receive a package tracking number?
Yes, as long as you select the **Tracked & Signed** shipping option at checkout. Standard untracked international airmail is also offered for builders seeking the lowest shipping rate, but tracked service is strongly recommended.

### Customs charges & import duties
Orders ship from the United Kingdom. Shipments outside the UK require an official CN22/CN23 customs declaration declaring the true sale value. Depending on your country's customs regulations, your postal authority may charge local VAT or import duties upon arrival.

### Can you declare a lower value on the customs form?
No. Under-declaring customs value on export declarations is illegal.

### Which charity does AstroPixels support?
Charity trooping is the heart of the droid-building community. **£10 from every single AstroPixels kit sold** is donated directly to the [Droidbuilders UK Charity Fund](https://droidbuilders.uk/charity). Over the years, the club has raised hundreds of thousands of pounds for worthy causes including [Alzheimer's Society](https://www.alzheimers.org.uk), [Make-A-Wish UK](https://www.make-a-wish.org.uk/), [MNDA](https://www.mndassociation.org/), [CALM](https://www.thecalmzone.net/), and [Meningitis Now](https://www.meningitisnow.org/).

=== FILE: faq/support.md ===
# Support FAQ

### What should I do if I suspect a faulty board?
Drop me a line through the store or on the club forums with a photo or brief description of what is happening. We will run through a quick diagnostic check (see [Diagnostic & Troubleshooting Guide](../troubleshooting/basics.md)). If any PCB or component arrived damaged or failed during normal operation, I will get a replacement board shipped out to you right away.

### Can I integrate AstroPixels with my control system (Marcduino, Padawan, RC, Raspberry Pi)?
Yes! AstroPixels is designed around open standards. It features both a **9600 baud serial port (Serial2)** and an **I2C bus (Address \`0x0A\`)**. If you run Marcduino, simply install the \`standard-md\` firmware and refer to our [Marcduino Integration Guide](../advanced/marcduino.md). For custom microcontrollers or microcomputers, see the [Serial & I2C Command Reference](../advanced/interfacing.md).

### Do you make lights for custom-scaled droids (e.g. 50%, 75%, or larger scale)?
Currently, no. Tooling, PCB layout, and manufacturing runs are engineered specifically around standard 1:1 scale R2-D2 Builders Club dome geometry and bezels.

### Can you sell me a pre-programmed set with custom colors or my name in the boot scroll?
Kits are pre-assembled, tested, boxed, and sealed in advance so they can ship immediately when an order is placed. While I cannot offer one-off custom factory programming, customizing your lights is simple! You can flash ready-made profiles (like Imperial Red or R2-KT Pink) via our [Web Installer](../advanced/precompiled.md), or customize the text and colors directly using our [Customising Colours Guide](../advanced/colours.md).

### Are there wiring diagrams and assembly guides?
Yes! Refer to the [Quickstart Guide](../getting-started/quickstart.md) for complete pinout and daisy-chaining schematics, the [Installation Guide](../getting-started/installation.md) for 3D printed bezels and brackets, and the [Hardware Overview](../advanced/overview.md) for technical pin mappings.

=== FILE: firmware/README.md ===
Pre compiled firmware for Astropixels

=== FILE: getting-started/installation.md ===
# Physical Installation & Mounting

The AstroPixels kit is designed as a direct drop-in replacement for legacy club dome lighting systems (such as Teeces, v2/v3 logic engines, and DIY perfboard displays). All PCB dimensions, hole spacings, and component heights adhere to standard R2-D2 Builders Club 1:1 scale specifications.

---

## Critical Installation Warnings

{% hint style="danger" %}
### 1. Aluminium Domes & Surrounds: Prevent Direct Shorts!
If your droid has an **aluminium dome** or uses **metal/aluminium bezels and surrounds**, you **must ensure no solder pins, component legs, or connector headers touch the raw metal**.
* **Symptoms of a short to metal:** The system appears completely dead&mdash;**no LEDs light up and even the red power LED on the ESP32 stays off**. Your power supply will show a **significant voltage drop (rail collapses towards 0V)** accompanied by **high current draw / warm wires**, or your regulator's short-circuit protection will immediately trip.
* **Prevention:** Always use non-conductive **nylon M3 standoffs and nylon screws** when mounting against metal. Apply a strip of **Kapton tape or electrical insulation tape** across the back of metal bezels or inner dome skins to ensure through-hole solder joints cannot bridge against the conductive aluminium.
{% endhint %}

{% hint style="warning" %}
### 2. Don't Mix Up FLD and RLD!
A frequent mistake for first-time builders is confusing the front and rear displays:
* **FLD = Front Logic Display:** These are **TWO identical smaller boards** (9 columns &times; 5 rows each). They mount in the **FRONT** of the dome, stacked one above the other in the upper and lower bezels, and daisy-chain together.
* **RLD = Rear Logic Display:** This is **ONE large, wide board** (27 columns &times; 4 rows). It mounts alone in the large opening at the **REAR** of the dome. The main motherboard is designed to mount onto the back of this board.
* *Connecting an FLD to an RLD header (or vice versa) results in scrambled patterns, wrong colors, or partially lit displays.*
{% endhint %}

---

## 1. Mounting the Main Breakout Motherboard

The most compact, clean, and vibration-resistant dome layout mounts the main motherboard directly behind the **Rear Logic Display (RLD)**:

* The motherboard includes pre-drilled M3 mounting holes that align directly with the rear of the RLD PCB.
* Use **M3 standoffs (10mm – 15mm length)** with nylon or stainless steel M3 screws.
* This central location places the motherboard within easy reach of every dome opening, minimizing wire clutter and cable weight.

---

## 2. Installing the Logic Displays (RLD & FLD)

### Front Logic Displays (FLD &mdash; Front of Dome)
* The two FLD boards mount one above the other in the front logic surround.
* Ensure both boards are oriented right-side up (silk-screen text legible).
* Connect the incoming servo cable from the motherboard to the **IN** header on the top board.
* Connect a short 10cm jumper from the **OUT** header of the top board down to the **IN** header of the bottom board.

### Rear Logic Display (RLD &mdash; Rear of Dome)
* Mounts into the large rear horizontal surround.
* Connect directly to the motherboard **RLD** header using a single short 10cm servo cable.


### Diffusers & Front Covers
WS2812B LEDs are intensely bright point-light sources. To achieve that authentic, smooth movie look without harsh individual LED hotspots, a diffuser is essential:
* **Diffuser Sheet:** White translucent acrylic (1.5mm–3mm, approx. 30–40% light transmission) or drafting film placed directly behind the aluminum bezel.
* **3D Printed PETG Diffusers:** Printing a single layer of natural transparent PETG (0.2mm layer height) creates a beautiful molded diffuser.

---

## 3. Printable Bezels, Diffusers & Standoffs

The Astromech community has created fantastic open-source mounts, bezels, and diffusers tailored specifically for AstroPixels:

### Printable Integrated Bezels & Diffusers (by Joel Joannisse)
Designed for the popular 3D-printed MK4 dome:
* [Download Bambu Studio & STL Files (ZIP)](../assets/Astropixels_logic_display_bezel_with_diffuser.zip)
* **Printing Tip:** Uses a multi-material / filament swap technique: Layer 1 is transparent PETG (acting as the built-in diffuser), followed by dark blue, black, or metallic filament for the structural bezel.
* **Important:** Screw the board to the locking bar using M3 &times; 6mm screws. Tighten just until snug so the bezel gently contacts the LEDs without crushing the solder joints.

### Laser-Cut Acrylic Bezels & Covers
* [Download Logic Bezels CNC/Laser PDF](https://r2djp.co.uk/wp-content/uploads/2022/06/Logic-bezels-2022-astropixels.pdf)
* Suitable for CNC routing or laser cutting 2mm/3mm acrylic.

### 3D Printable Spacers
* [Download Standoff & Spacer STLs (ZIP)](https://r2djp.co.uk/wp-content/uploads/2022/06/Logic.zip)
* Includes printable spacers to adjust board depth perfectly against curved inner dome skins.

---

## 4. HoloProjector (HP) Installation

The 7-pixel round HoloProjector boards fit inside all standard 1:1 scale HoloProjector housings (both static and 2-axis servo-driven mechanisms).

* **MK4 Dome HP Mounts (by Dana Jan):** Dedicated HP light board and servo brackets for printed droids can be downloaded on Printables: [Printables Model 869432](https://www.printables.com/model/869432-holoprojector-servo-and-astropixels-mount-mk4-dome).
* **Alignment:** Center the middle projection LED directly behind the HP lens for maximum light output downrange.

=== FILE: getting-started/kit_contents.md ===
# Kit Contents

Every AstroPixels kit is shipped fully assembled and pre-tested with the standard R2-D2 firmware installed. Before beginning assembly, verify that your kit contains all the components listed below.

---

### Printed Circuit Boards (PCBs)

| Board | Quantity | LED Count | Dimensions / Form Factor | Function |
| :--- | :---: | :---: | :--- | :--- |
| **Main Motherboard** | 1 | 0 | 30-pin socketed breakout | Central controller carrier with labeled headers, screw terminals, I2C, Serial2, and 5x AUX GPIO ports. Includes 30-pin ESP32 NodeMCU board. |
| **Rear Logic Display (RLD)** | 1 | 108 | 27 columns x 4 rows | Large rear logic panel displaying classic rolling blue/red/white binary patterns. Features mounting holes sized to mount the main motherboard directly behind it. |
| **Front Logic Display (FLD)** | 2 | 45 each (90 total) | 9 columns x 5 rows each | Top and bottom front logic displays. Daisy-chained vertically to form a combined 9x10 display matrix. |
| **Process State Indicator (PSI)** | 2 | 25 each (50 total) | 5x5 circular mask | Front and rear round status indicators running color-wipe animations (Front: Red/Blue; Rear: Green/Yellow). |
| **HoloProjector Lights (HP)** | 3 | 7 each (21 total) | 7-pixel round discs | Front, Rear, and Top HoloProjector light boards (ring of 6 outer pixels + 1 central projection pixel). |

**Total LEDs in System:** 269 individually addressable WS2812B RGB pixels.

---

### Wiring Harness (Pre-crimped 3-Pin Servo Cables)

The kit includes a dedicated 12-cable servo-style wiring harness (Signal, Voltage, Ground) sized specifically for standard 1:1 scale dome routing when the motherboard is mounted on the back of the RLD:

* **4 &times; 30cm Female-to-Male Servo Extensions** &mdash; Used to bridge longer distances from the rear logic to the front dome panels.
* **2 &times; 30cm Female-to-Female Servo Cables** &mdash; Used for the Rear PSI (RPSI) and Front HoloProjector (FHP) routing.
* **2 &times; 20cm Female-to-Female Servo Cables** &mdash; Used for the Rear HoloProjector (RHP) and Front PSI (FPSI) link.
* **4 &times; 10cm Female-to-Female Servo Cables** &mdash; Used for short local runs: Motherboard to RLD, FLD daisy-chain bridge, and short extension links.

---

<figure><img src="https://we-make-things.co.uk/wp-content/uploads/2024/04/PXL_20240409_233712368-scaled.jpg" alt="AstroPixels Complete Kit Contents"><figcaption>Complete AstroPixels Kit: Motherboard, RLD, dual FLDs, dual PSIs, three HPs, and full wiring harness.</figcaption></figure>

{% hint style="info" %}
**Spare Parts & Replacements:** The ESP32 is a standard 30-pin dev module (NodeMCU-32S layout with USB-C). If you ever damage the USB-C connector or board during physical installation, replacement 30-pin ESP32 boards can be purchased anywhere and flashed via our [Web Installer](https://dpoulson.github.io/Astropixels/firmware/).
{% endhint %}

=== FILE: getting-started/power.md ===
# Power Requirements & Architecture

Clean, stable power is critical for reliable operation of the AstroPixels system. While simple to power, understanding the electrical requirements will prevent random resets, flickering LEDs, or brownout loops inside your droid.

---

## 1. Electrical Specifications & Power Budget

The entire AstroPixels system contains **269 WS2812B RGB LEDs** plus the ESP32 microcontroller:

* **Nominal Operating Voltage:** \`5.0V DC\` (Safe operating range: \`4.8V – 5.25V\`).
* **Typical Current Draw:** \`500mA – 700mA\` during standard rolling logic animations and intermittent HoloProjector twitches (thanks to ReelTwo's optimized default brightness levels: 160 Front / 140 Rear).
* **Peak Current Draw:** Up to \`1.2A – 1.5A\` during full-brightness alarm sequences, solid white flashes, or fire animations.
* **Recommended Power Supply Capacity:** Minimum \`5V @ 2.0A\` continuous (3.0A recommended if powering additional dome accessories).

{% hint style="danger" %}
**Never Exceed 5.5V:** WS2812B LEDs and the ESP32 5V rail will be permanently damaged by voltages exceeding 5.5V. Never connect raw 7.4V, 11.1V, 12V, or 24V battery power directly to the board!
{% endhint %}

---

## 2. Powering Strategies for Droid Builders

### Option A: Buck Converter in the Dome (Recommended Best Practice)

If your droid uses a slip ring to pass power from the body to the dome, the industry-standard approach is to send your droid's main battery voltage (**12V or 24V**) up through the slip ring, and place a step-down **Buck Converter** inside the dome to produce clean 5V right next to the AstroPixels motherboard.

\`\`\`text
[Main Battery: 12V/24V] ───► [Slip Ring] ───► [5V Step-Down Buck] ───► [AstroPixels 5V Terminals]
\`\`\`

**Why this is the best approach:**
1. **Minimizes Voltage Drop:** Transmitting high voltage (12V/24V) through slip ring brushes experiences far less voltage sag than trying to transmit 5V over the same resistance ($P = I^2 R$).
2. **Eliminates Brownouts:** Prevents dome servo surges from dipping the logic display voltage below the ESP32 brownout threshold (approx. 4.6V).
3. **Recommended Regulators:**
   * [Pololu 5V, 3A Step-Down Voltage Regulator D30V30F5](https://www.pololu.com/product/4892)
   * [Pololu 5V, 5A Step-Down Voltage Regulator D24V50F5](https://www.pololu.com/product/2851)
   * High-quality marine-grade or RC 5V/6V UBEC (set strictly to 5.0V output).

---

### Option B: Dedicated Dome Power Bank or LiPo

If your dome is self-contained or does not use a powered slip ring:
* A standard **USB Power Bank (5V / 2.4A output, 10,000mAh)** will comfortably run the AstroPixels system for **10 to 14 hours** of continuous trooping.
* You can sacrifice a standard USB cable: cut off the small end, strip back the outer jacket, and connect the **Red (+5V)** and **Black (GND)** wires directly into the motherboard screw terminals.

---

### Option C: Bench Testing via USB

You can plug a USB-C cable directly into the onboard ESP32 dev module from a computer or USB wall charger.

{% hint style="warning" %}
**Mechanical Fragility:** USB-C ports on dev boards are surface-mounted and can be stressed or sheared if a cable is snagged while moving inside the dome. Reserve the USB port strictly for programming and desktop bench testing.
{% endhint %}

---

## 3. Grounding & Common Ground Rules

If you interface AstroPixels with external systems (such as a Marcduino, MP3 sound trigger, or body RC receiver):

1. **Common Ground is Mandatory:** You **MUST** connect a Ground (\`GND\`) wire between the AstroPixels motherboard and the external controller. Without a shared ground reference, serial signals and I2C lines will encounter packet framing errors or erratic behavior.
2. **Do Not Share Servo Power with Logics:** If your dome has high-torque panel servos or HP movement servos, do not power the servos from the same 5V regulator powering the AstroPixels unless the regulator has ample current overhead (5A+) and adequate reservoir capacitors. Heavy servo movement can cause electrical noise and momentary dips that reset the ESP32.

=== FILE: getting-started/quickstart.md ===
# Quickstart Guide

This guide walks you through connecting your light boards, understanding the pinouts, and performing your first power-on test.

---

## 1. Understanding Header Pinouts

The main breakout motherboard features clearly silk-screened 3-pin headers for every dome display. The pinout on all headers is consistent:

\`\`\`text
+-------------------+
|  [S]  Signal / Data
|  [V]  +5V Power
|  [G]  Ground (0V)
+-------------------+
\`\`\`

{% hint style="danger" %}
**Check Polarity Before Powering:** Always verify that the cable orientation matches the silk-screen markings on both the motherboard and each light board. Reversing \`+5V\` and \`Ground\` can permanently damage the WS2812B LEDs!
{% endhint %}

---

## 2. Motherboard Connection Map

Connect each light board to its corresponding header on the main motherboard:

| Motherboard Header | Target Display | Details |
| :--- | :--- | :--- |
| **RLD** | **Rear** Logic Display | Connects to the **single large, wide board** (27&times;4 / 108 LEDs) mounted in the rear of the dome. |
| **FLD** | **Front** Logic Display | Connects to **Board 1 (Top FLD) \`IN\`** of the **two smaller boards** (9&times;5 / 45 LEDs each) mounted in the front. See daisy-chain guide below. |
| **FPSI** | Front PSI | Connects to the Front Process State Indicator (Red/Blue default). |
| **RPSI** | Rear PSI | Connects to the Rear Process State Indicator (Green/Yellow default). |
| **THP** | Top HoloProjector | Connects to the Top HoloProjector disc. |
| **RHP** | Rear HoloProjector | Connects to the Rear HoloProjector disc. |
| **FHP** | Front HoloProjector | Connects to the Front HoloProjector disc. |
| **I2C** | External Controller | 4-pin header: \`+5V\`, \`GND\`, \`SDA\` (GPIO 21), \`SCL\` (GPIO 22). Default address: \`0x0A\`. |
| **Serial2** | Marcduino / Comm | 3-pin header: \`GND\`, \`RX\` (GPIO 16), \`TX\` (GPIO 17). Baud: 9600. |

{% hint style="info" %}
**Terminology Tip:** Don't mix up **FLD** (Front) and **RLD** (Rear)! The **RLD** is a single wide board at the back of R2's head; the **FLD** is a pair of smaller stacked boards on R2's face.
{% endhint %}

---

## 3. Daisy-Chaining the Front Logics (FLD)

The Front Logic Display consists of **two identical 45-LED boards** mounted vertically to fill the upper and lower front logic surrounds:

\`\`\`text
[Motherboard: FLD Header]
          │ (30cm extension + 10cm cable)
          ▼
   ┌─────────────┐
   │ Top FLD     │
   │ Header: IN  │
   │             │
   │ Header: OUT │
   └──────┬──────┘
          │ (10cm cable)
          ▼
   ┌─────────────┐
   │ Bottom FLD  │
   │ Header: IN  │
   └─────────────┘
\`\`\`

1. Connect the motherboard's **FLD** header to the **IN** header on the first (upper) FLD board.
2. Connect a short 10cm cable from the **OUT** header of the upper FLD board to the **IN** header of the second (lower) FLD board.
3. The firmware automatically maps the two chained 45-LED boards as a single continuous 90-LED (9x10) logic matrix!

---

## 4. Recommended Cable Harness Routing

If you mount the main motherboard directly to the back of the RLD (using the integrated M3 mounting holes and standoffs), use this recommended cable allocation:

| Run | Cable Combination | Total Length |
| :--- | :--- | :--- |
| **Motherboard &rarr; RLD** | 1 &times; 10cm cable | 10cm |
| **Motherboard &rarr; Top FLD (IN)** | 1 &times; 30cm extension + 1 &times; 10cm cable | 40cm |
| **Top FLD (OUT) &rarr; Bottom FLD (IN)** | 1 &times; 10cm cable | 10cm |
| **Motherboard &rarr; FPSI** | 1 &times; 30cm extension + 1 &times; 20cm cable | 50cm |
| **Motherboard &rarr; RPSI** | 1 &times; 30cm cable | 30cm |
| **Motherboard &rarr; THP (Top Holo)** | 1 &times; 30cm extension + 1 &times; 10cm cable | 40cm |
| **Motherboard &rarr; RHP (Rear Holo)**| 1 &times; 20cm cable | 20cm |
| **Motherboard &rarr; FHP (Front Holo)**| 1 &times; 30cm extension + 1 &times; 30cm cable | 60cm |

---

## 5. First Power-On & Boot Behavior

For initial bench testing, you can power the board using a USB-C cable plugged into a computer or standard USB wall charger.

{% hint style="warning" %}
**Bench Testing Only:** The USB-C socket on ESP32 development boards is surface-mounted and can be stressed or damaged if cables are tugged while moving in the dome. For permanent installation inside your droid, always power the system via the dedicated **5V Screw Terminals** on the motherboard.
{% endhint %}

### Expected Startup Sequence:
When power is applied to standard firmware, the following sequence occurs automatically:

1. **Rear Logic (RLD):** Displays a blue scrolling text animation: \`... AstroPixels ....\`
2. **Front Logic (FLD):** Displays a red scrolling text animation: \`... R2D2 ...\`
3. **HoloProjectors (HPs):** Trigger an initial 20-second blue twinkle sequence (\`HPA0026|20\`), then transition to automatic random twitch.
4. **PSIs (Front & Rear):** Begin their continuous color wipe cycles (Front: Red/Blue; Rear: Green/Yellow).
5. **Continuous Operation:** After the startup text rolls through, all logics transition into their classic random rolling astromech binary patterns.

For power supply options and permanent wiring, see [Power Requirements](power.md).

=== FILE: troubleshooting/basics.md ===
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
| **ESP32 Red LED is ON, but No Displays Light** | Brownout reset, corrupt firmware flash, or faulty ESP32 | Power via 5V 2A supply; re-flash \`standard\` firmware via Web Installer; replace ESP32. |
| **Scrambled Animations, Inverted Patterns, or Wrong Colors** | Confusing FLD and RLD, or swapping cables between headers | FLD = 2 small front boards; RLD = 1 large rear board. Match cables to Motherboard Map. |
| **A Single Board Fails to Light Up** | Reversed 3-pin cable or loose pin connection | Verify \`S-V-G\` matches markings on both ends. Test board on RLD header. |
| **Only the First Few LEDs on a Board Light Up** | Damaged WS2812B pixel interrupting data chain | Inspect first unlit LED for physical damage or contact Darren for replacement. |
| **Lower Front Logic (FLD 2) is Completely Dark** | Daisy-chain jumper missing or connected backwards | Verify 10cm jumper runs from Top FLD **OUT** to Bottom FLD **IN**. |
| **System Glitches or Reboots during Loud Alarms** | Power supply voltage sag (brownout) | Power supply cannot supply 1.5A peak; upgrade to a high-capacity 5V buck converter. |
| **Marcduino Commands are Ignored** | Baud rate mismatch, missing ground, or wrong firmware | Install \`standard-md\` firmware; connect \`GND\` + \`TX\` to \`RX\`; set 9600 baud. |

---

## Detailed Diagnostic Steps

### 1. The System is Completely Dead (Checking for Aluminium Shorts)
If you apply power and **absolutely nothing turns on&mdash;not even the small red LED on the ESP32**:
1. **Check for an Aluminium Short Circuit:**
   * If your droid has an aluminium dome, aluminium inner frame, or metal logic bezels, through-hole solder pins or header legs may be shorting directly against bare metal.
   * **Hallmarks of a short:** The 5V rail voltage collapses to under 1V, current draw shoots up, wiring or the buck converter gets warm, or your power supply's short-circuit protection trips.
   * **Fix:** Unscrew the boards from the dome and test them on a non-conductive wooden or plastic bench. If they power up normally on the bench, insulate the inner dome surface or back of the metal bezels with **Kapton tape** or electrical tape, and always mount boards using **nylon M3 standoffs and nylon screws**.
2. **Check Polarity:** Confirm that \`+5V\` is connected to \`+5V\` and \`GND\` to \`GND\` on the motherboard screw terminals.

---

### 2. Confusing FLD and RLD (Terminology Mix-Up)
A very common issue is mixing up the front and rear logic displays:
* **FLD (Front Logic Display):** These are **two identical smaller rectangular boards** (9 columns &times; 5 rows each). They are mounted together in the **front** of the dome and must be daisy-chained (\`Motherboard\` &rarr; \`Top FLD IN\` &rarr; \`Top FLD OUT\` &rarr; \`Bottom FLD IN\`).
* **RLD (Rear Logic Display):** This is **one single, wide rectangular board** (27 columns &times; 4 rows). It mounts alone in the **rear** of the dome.
* **If you plug an FLD into the RLD header (or vice versa):** The microcontroller sends 108 pixels of rear logic data into a 45-pixel front logic board, or 90 pixels of front data into a 108-pixel board. The animations will appear scrambled, colors will be wrong, and parts of the display will remain unlit.

---

### 3. Partial Board Lighting (WS2812B Data Chain Failure)
WS2812B "NeoPixels" operate like a digital bucket brigade: each pixel receives the data stream on its \`DIN\` pin, consumes its own 24-bit color data, and relays the remainder out through its \`DOUT\` pin to the next pixel in series.

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
* The signal must travel from the **Motherboard &rarr; Upper FLD (\`IN\`)**, and then via a 10cm jumper from **Upper FLD (\`OUT\`) &rarr; Lower FLD (\`IN\`)**.
* If the lower FLD is connected to the upper board's \`IN\` port, or if \`IN\` and \`OUT\` are reversed, the lower half will remain completely unlit.

---

### 6. Random Glitches, Freezes, or Resets (Power Brownout)
If the lights run fine for a few minutes but freeze, flicker wildly, or reboot when an alarm or white flash triggers:
* **Diagnosis: Power Supply Brownout.** An alarm or full white animation illuminates all three sub-pixels (Red, Green, and Blue) simultaneously, temporarily spiking current demand up to 1.5A.
* If your power source or wiring has high resistance (thin wires, weak battery, or inadequate step-down converter), the voltage will dip below the ESP32's 4.6V brownout detection limit, forcing a hardware reboot.
* **Fix:** Use thicker power wiring (at least 20 AWG), keep power leads short, and ensure your 5V regulator is rated for at least 2A–3A continuous output.

---

### 7. Marcduino Communication Issues
If sending Marcduino panel commands (e.g. \`@0T1\`, \`*ON01\`) produces no response on AstroPixels:
1. **Verify Firmware Flavor:** The base \`standard\` firmware listens for ReelTwo \`LE\` commands. You **must** flash the **\`standard-md\`** firmware to enable the Marcduino command parser!
2. **Verify Common Ground:** A single signal wire (\`TX\` &rarr; \`RX\`) is insufficient. You **must** run a Ground (\`GND\`) wire between the Marcduino and AstroPixels motherboard.
3. **Verify Pin Orientation:** Connect the Marcduino's serial transmit (\`S\` or \`TX\`) to the AstroPixels \`R\` (Receive / \`GPIO 16\`) pin on the \`Serial2\` header. Do **not** connect to \`T\` (Transmit).
4. **Baud Rate:** Ensure the sending port is configured for **9600 Baud (8N1)**.

=== FILE: troubleshooting/original_firmware.md ===
# Factory Reset & Firmware Recovery

If you have been experimenting with custom code, modified settings, or third-party firmwares and wish to return your AstroPixels kit to its exact factory-shipped state, follow the recovery procedures below.

---

## 1. What is the Factory Default State?

All AstroPixels kits ship from the workshop programmed with the **\`standard\`** firmware profile:

* **Rear Logic Display (RLD):** Classic binary astromech pattern in blue, red, and white. Boot text: \`... AstroPixels ....\`
* **Front Logic Display (FLD):** Classic front logic pattern. Boot text: \`... R2D2 ...\`
* **Process State Indicators (PSIs):** Front wipes Red/Blue; Rear wipes Green/Yellow.
* **HoloProjectors (HPs):** Initial 20-second blue projection twinkle on boot, followed by randomized periodic twitches.
* **Communications:** Listening for ReelTwo logic commands on **Serial2** (9600 baud) and **I2C** (address \`0x0A\`).

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

1. Locate the two small buttons on the ESP32 development module: **\`BOOT\`** (or \`IO0\`) and **\`EN\`** (or \`RST\`).
2. Plug the USB cable into your computer.
3. **Press and hold the \`BOOT\` button**, press the **\`EN\` button once**, and then **release the \`BOOT\` button**.
4. The ESP32 is now in hardware bootloader ROM mode and will accept a clean firmware upload from either the Web Installer or PlatformIO.
`;
