# AstroPixels

[![Documentation](https://img.shields.io/badge/docs-gitbook-blue.svg)](https://astropixels.gitbook.io/astropixels)
[![Web Installer](https://img.shields.io/badge/Web_Flasher-ESP32-brightgreen.svg)](https://dpoulson.github.io/Astropixels/firmware/)
[![AI Assistant](https://img.shields.io/badge/AI_Support-Droid-purple.svg)](https://dpoulson.github.io/Astropixels/assistant/)

**AstroPixels** is an all-in-one LED dome lighting and animation system engineered for 1:1 scale Astromech droids (such as R2-D2, R2-KT, and custom builders). Powered by an onboard **ESP32 NodeMCU** running the open-source [ReelTwo](https://github.com/reeltwo/Reeltwo) robotics framework, AstroPixels drives 269 individually addressable WS2812B RGB LEDs across the entire dome.

---

## Key Features

* **269 Addressable RGB LEDs:** Full-color logic displays and holoprojector discs replacing legacy single-color kits.
* **Turnkey Firmware Flavors:** Standard ReelTwo, Marcduino serial control (`standard-md`), R2-KT pink palette, Imperial/Sith red palette, and custom dev profiles.
* **Browser-Based Web Flasher:** Flash any official firmware flavor directly from Chrome or Edge via Web Serial—no toolchain installation required.
* **AI Support Assistant:** Built-in technical support droid ready to troubleshoot wiring, power budgets, Marcduino setups, and custom ReelTwo code.
* **Universal Comms:** Native support for Marcduino commands (`:SE...`, `@1T...`, `@2T...`), native ReelTwo commands (`LE...`, `HP...`), raw command tunneling (`*RT`, `@AP`), and I2C slave control (`0x0A`).
* **Direct Mechanical Fit:** Fits standard 1:1 scale aluminum or 3D-printed dome bezels (Teeces footprint compatible).

---

## Specifications

| Parameter | Specification |
| :--- | :--- |
| **Microcontroller** | ESP32 NodeMCU Development Module (30-pin footprint) |
| **Total LED Count** | 269 WS2812B individually addressable RGB LEDs |
| **Operating Voltage** | 5.0V DC Regulated (Do NOT power solely from USB in final build) |
| **Current Consumption** | 500–700mA typical, up to 1.5A peak during full-white/strobe sequences |
| **Displays Supported** | 1x Rear Logic (RLD), 2x Front Logics (FLD), 2x PSIs, 3x HoloProjectors (HP) |
| **Serial Communications** | `Serial2` on GPIO 16 (RX) / GPIO 17 (TX) at 9600 baud 8N1 |
| **I2C Bus** | GPIO 21 (SDA) / GPIO 22 (SCL) at 7-bit slave address `0x0A` |

---

## Quick Links & Tools

* **[Web Firmware Installer](https://dpoulson.github.io/Astropixels/firmware/):** Connect your ESP32 via USB and flash firmware with one click.
* **[Interactive AI Support Droid](https://dpoulson.github.io/Astropixels/assistant/):** Live interactive troubleshooting assistant for builders.
* **[Full Documentation](https://astropixels.gitbook.io/astropixels):** Complete installation, power, mounting, and customization guides.

---

## Firmware Flavors

Pre-configured environments are included in this repository:

| Flavor / Environment | Description | Source Entrypoint |
| :--- | :--- | :--- |
| `standard` | Base firmware with ReelTwo animations and I2C/Serial2 LE commands. | `src/standard/main.cpp` |
| `standard-md` | Standard firmware with Marcduino serial parser enabled. | `src/standard-md/main.cpp` |
| `r2kt` | Pink and white palette configured for R2-KT droids. | `src/r2kt/main.cpp` |
| `imperial` | Red and dark side animations for Imperial / shadow droids. | `src/imperial/main.cpp` |
| `dev` | Local development environment linked to ReelTwo sources. | `src/dev/main.cpp` |

### Building & Uploading with PlatformIO

```bash
# Build standard Marcduino-enabled firmware
pio run -e standard-md

# Upload to ESP32 connected via USB
pio run -e standard-md -t upload

# Monitor serial output
pio device monitor -b 115200
```

---

## Hardware Pinout

| Function / Header | ESP32 GPIO | Description |
| :--- | :---: | :--- |
| **FLD Data** | `GPIO 1` | Front Logic Displays (Motherboard &rarr; Top FLD &rarr; Bottom FLD) |
| **RLD Data** | `GPIO 3` | Rear Logic Display |
| **Front PSI** | `GPIO 4` | Front Processor Status Indicator (5x5 matrix) |
| **Rear PSI** | `GPIO 5` | Rear Processor Status Indicator (5x5 matrix) |
| **Front Holo** | `GPIO 25` | Front HoloProjector (7 RGB pixels) |
| **Rear Holo** | `GPIO 26` | Rear HoloProjector (7 RGB pixels) |
| **Top Holo** | `GPIO 27` | Top HoloProjector (7 RGB pixels) |
| **Serial2 RX / TX**| `GPIO 16` / `GPIO 17` | Hardware serial input from Marcduino / JawaLite |
| **I2C SDA / SCL** | `GPIO 21` / `GPIO 22` | I2C communication bus (address `0x0A`) |
| **AUX1–AUX5** | `GPIO 12, 13, 14, 32, 33` | Motherboard auxiliary expansion breakout pins |

---

## Documentation Index

The complete user manual is maintained in the [`docs/`](docs/) directory:

* **Getting Started:**
  * [Quickstart Guide](docs/getting-started/quickstart.md)
  * [Kit Contents & Specifications](docs/getting-started/kit_contents.md)
  * [Power Architecture & Current Budgets](docs/getting-started/power.md)
  * [Physical Installation & Mounting](docs/getting-started/installation.md)
* **Customization & Controls:**
  * [Hardware & Pinout Overview](docs/advanced/overview.md)
  * [Customizing Colours & Palettes](docs/advanced/colours.md)
  * [HoloProjector Sequences & Timing](docs/advanced/hp.md)
  * [Serial & I2C Command Protocol](docs/advanced/interfacing.md)
  * [Marcduino Integration Guide](docs/advanced/marcduino.md)
  * [ReelTwo C++ Dome & Comms API Reference](docs/advanced/reeltwo-api.md)
  * [Developing with PlatformIO](docs/advanced/environment-platformio.md)
  * [Compiling with Arduino IDE](docs/advanced/environment-arduino.md)
  * [AstroPixelsPlus (Standalone WiFi/App)](docs/advanced/app.md)
* **Diagnostics:**
  * [Diagnostic & Troubleshooting Guide](docs/troubleshooting/basics.md)
  * [Factory Reset & Original Firmware Restoration](docs/troubleshooting/original_firmware.md)

---

## Support & Contributing

* **Issues & Questions:** Open a ticket on GitHub or ask the [AstroPixels AI Support Droid](https://dpoulson.github.io/Astropixels/assistant/).
* **Manufactured by:** [We Make Things](https://we-make-things.co.uk/).