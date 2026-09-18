# Quickstart Guide

This guide walks you through connecting your light boards, understanding the pinouts, and performing your first power-on test.

---

## 1. Understanding Header Pinouts

The main breakout motherboard features clearly silk-screened 3-pin headers for every dome display. The pinout on all headers is consistent:

```text
+-------------------+
|  [S]  Signal / Data
|  [V]  +5V Power
|  [G]  Ground (0V)
+-------------------+
```

{% hint style="danger" %}
**Check Polarity Before Powering:** Always verify that the cable orientation matches the silk-screen markings on both the motherboard and each light board. Reversing `+5V` and `Ground` can permanently damage the WS2812B LEDs!
{% endhint %}

---

## 2. Motherboard Connection Map

Connect each light board to its corresponding header on the main motherboard:

| Motherboard Header | Target Display | Details |
| :--- | :--- | :--- |
| **RLD** | **Rear** Logic Display | Connects to the **single large, wide board** (27&times;4 / 108 LEDs) mounted in the rear of the dome. |
| **FLD** | **Front** Logic Display | Connects to **Board 1 (Top FLD) `IN`** of the **two smaller boards** (9&times;5 / 45 LEDs each) mounted in the front. See daisy-chain guide below. |
| **FPSI** | Front PSI | Connects to the Front Process State Indicator (Red/Blue default). |
| **RPSI** | Rear PSI | Connects to the Rear Process State Indicator (Green/Yellow default). |
| **THP** | Top HoloProjector | Connects to the Top HoloProjector disc. |
| **RHP** | Rear HoloProjector | Connects to the Rear HoloProjector disc. |
| **FHP** | Front HoloProjector | Connects to the Front HoloProjector disc. |
| **I2C** | External Controller | 4-pin header: `+5V`, `GND`, `SDA` (GPIO 21), `SCL` (GPIO 22). Default address: `0x0A`. |
| **Serial2** | Marcduino / Comm | 3-pin header: `GND`, `RX` (GPIO 16), `TX` (GPIO 17). Baud: 9600. |

{% hint style="info" %}
**Terminology Tip:** Don't mix up **FLD** (Front) and **RLD** (Rear)! The **RLD** is a single wide board at the back of R2's head; the **FLD** is a pair of smaller stacked boards on R2's face.
{% endhint %}

---

## 3. Daisy-Chaining the Front Logics (FLD)

The Front Logic Display consists of **two identical 45-LED boards** mounted vertically to fill the upper and lower front logic surrounds:

```text
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
```

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

1. **Rear Logic (RLD):** Displays a blue scrolling text animation: `... AstroPixels ....`
2. **Front Logic (FLD):** Displays a red scrolling text animation: `... R2D2 ...`
3. **HoloProjectors (HPs):** Trigger an initial 20-second blue twinkle sequence (`HPA0026|20`), then transition to automatic random twitch.
4. **PSIs (Front & Rear):** Begin their continuous color wipe cycles (Front: Red/Blue; Rear: Green/Yellow).
5. **Continuous Operation:** After the startup text rolls through, all logics transition into their classic random rolling astromech binary patterns.

For power supply options and permanent wiring, see [Power Requirements](power.md).

