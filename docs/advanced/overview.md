# Hardware & Architecture Overview

The AstroPixels system is powered by an onboard **ESP32 NodeMCU Development Module** (30-pin footprint) driving strings of WS2812B individually addressable RGB LEDs. The firmware runs on top of the open-source [ReelTwo](https://github.com/reeltwo/Reeltwo) robotics framework, taking advantage of FreeRTOS non-blocking event loops, precise timing, and pre-built astromech lighting routines.

---

## 1. System Pinout & Device Mapping

The table below details the hardware GPIO connections, the internal ReelTwo device identifiers, and their default function in the standard firmware:

| Motherboard Silk | GPIO Pin | Device Type | ReelTwo Device ID / Target | Default Configuration / Pixel Count |
| :--- | :---: | :--- | :---: | :--- |
| **RLD** | `GPIO 33` | Rear Logic Display | Logic ID `3` | 108 pixels (27 columns &times; 4 rows), Palette 1 (Rear Default), 140 Brightness |
| **FLD** | `GPIO 15` | Front Logic Display | Logic ID `1` | 90 pixels (2 &times; 45 chained, 9 &times; 10 matrix), Palette 0 (Front Default), 160 Brightness |
| **FPSI** | `GPIO 32` | Front PSI | Logic ID `4` | 25 pixels (5 &times; 5 circular mask), Color Wipe sequence (Red/Blue) |
| **RPSI** | `GPIO 23` | Rear PSI | Logic ID `5` | 25 pixels (5 &times; 5 circular mask), Color Wipe sequence (Green/Yellow) |
| **FHP** | `GPIO 25` | Front HoloProjector | Holo ID `1` (`kFrontHolo` / `F`) | 7 pixels (ring of 6 + 1 center), Leia Blue sequence, automatic twitch enabled |
| **RHP** | `GPIO 26` | Rear HoloProjector | Holo ID `2` (`kRearHolo` / `R`) | 7 pixels (ring of 6 + 1 center), Leia Blue sequence, automatic twitch enabled |
| **THP** | `GPIO 27` | Top HoloProjector | Holo ID `3` (`kTopHolo` / `T`) | 7 pixels (ring of 6 + 1 center), Leia Blue sequence, automatic twitch enabled |
| **AUX1** | `GPIO 2` | General Purpose I/O | Customizable | Usable for FireStrip, Bad Motivator smoke trigger, or extra LEDs |
| **AUX2** | `GPIO 4` | General Purpose I/O | Customizable | Usable for custom servo dispatch or additional lighting |
| **AUX3** | `GPIO 5` | General Purpose I/O | Customizable | Usable for dome panel sensors or status triggers |
| **AUX4** | `GPIO 18` | General Purpose I/O | Customizable | Usable for SPI / general digital I/O |
| **AUX5** | `GPIO 19` | General Purpose I/O | Customizable | Usable for SPI / general digital I/O |
| **I2C Header** | `GPIO 21` (SDA)<br>`GPIO 22` (SCL) | I2C Bus | Slave Address `0x0A` | Listens for ReelTwo logic commands and HP commands |
| **Serial2** | `GPIO 16` (RX)<br>`GPIO 17` (TX) | Hardware Serial UART | 9600 Baud (8N1) | Listens for Marcduino / JawaLite commands or direct ReelTwo commands |

{% hint style="info" %}
**Understanding Pins vs IDs:**
* **Hardware GPIO:** The physical pin on the ESP32 that outputs the NeoPixel data stream (e.g., `GPIO 33` for RLD).
* **Device ID:** The software identifier used in commands (e.g., in `LE3010003`, the `3` targets the RLD, while `1` targets the FLD).
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

The AstroPixels motherboard breaks out 5 auxiliary GPIOs (`AUX1`–`AUX5`) directly from the ESP32. Advanced builders can attach extra accessories using standard ReelTwo modules:

### Adding a Dome Fire Effect (`FireStrip`)
Connect an 8-LED NeoPixel stick to **AUX1** (`GPIO 2`, +5V, GND):
```cpp
#include "dome/FireStrip.h"

// Define an 8-LED FireStrip on AUX1 (GPIO 2)
FireStrip<2> fireStrip;

// Inside setup() or command handler:
fireStrip.spark(500); // Trigger electric sparks
fireStrip.burn(500);  // Trigger burning fire animation
```
Commands like `FSON` and `FSOFF` will now control the fire strip.

### Adding a Smoke Generator Relay (`BadMotivator`)
Connect a 5V relay module or MOSFET gate to **AUX2** (`GPIO 4`, +5V, GND) to drive an electronic vape smoke unit or CO2 solenoid:
```cpp
#include "dome/BadMotivator.h"

// Define smoke trigger on AUX2 (GPIO 4)
BadMotivator<4> badMotivator;

// Trigger smoke output:
badMotivator.trigger(); // Fires smoke relay
```
Commands like `BMON` and `BMOFF` will now control the smoke output.


