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
| **Control Interfaces** | I2C (Address `0x0A`), Hardware Serial2 (9600 baud Marcduino / JawaLite / LE) |
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
