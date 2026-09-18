# ReelTwo C++ Dome & Comms API Reference

This document provides a concise technical reference of the [ReelTwo](https://github.com/reeltwo/Reeltwo) robotics library C++ classes, methods, and communication architectures used in AstroPixels dome firmware.

---

## 1. Dome Lighting Classes & Instantiation

AstroPixels provides native ReelTwo board drivers configured for the specific PCB pixel counts and layouts:

```cpp
#include "ReelTwo.h"
#include "dome/Logics.h"
#include "dome/LogicEngineController.h"
#include "dome/HoloLights.h"
#include "dome/NeoPSI.h"

// Logic Engine Displays (Front & Rear Logics)
// Arguments: Default settings preset, Device ID
AstroPixelRLD<> RLD(LogicEngineRLDDefault, 3);
AstroPixelFLD<> FLD(LogicEngineFLDDefault, 1);

// PSI Displays
AstroPixelFrontPSI<> frontPSI(LogicEngineFrontPSIDefault, 4);
AstroPixelRearPSI<> rearPSI(LogicEngineRearPSIDefault, 5);

// HoloProjectors (7 WS2812B pixels each)
// Arguments: GPIO Pin, LED Type (kRGB or kRGBW)
HoloLights frontHolo(25, HoloLights::kRGB);
HoloLights rearHolo(26, HoloLights::kRGB);
HoloLights topHolo(27, HoloLights::kRGB);
```

---

## 2. LogicEngine API Methods

The `AstroPixelRLD`, `AstroPixelFLD`, and PSI instances inherit from `LogicEngineRenderer` (and `LogicEngineDefaults`).

### Core Display Methods

```cpp
// Set active animation sequence
void selectSequence(byte seq, ColorVal colorVal = kDefault, uint8_t speedScale = 0, uint8_t numSeconds = 0);

// Calculate composite 8-digit numeric command
void selectEffect(long inputNum);

// Display centered static text (5-character max per FLD/RLD line)
void selectTextCenter(const char* text, ColorVal colorVal = kDefault, uint8_t speedScale = 0, uint8_t numSeconds = 0);

// Scroll text horizontally or vertically
void selectScrollTextLeft(const char* text, ColorVal colorVal = kDefault, uint8_t speedScale = 0, uint8_t numSeconds = 0);
void selectScrollTextRight(const char* text, ColorVal colorVal = kDefault, uint8_t speedScale = 0, uint8_t numSeconds = 0);
void selectScrollTextUp(const char* text, ColorVal colorVal = kDefault, uint8_t speedScale = 0, uint8_t numSeconds = 0);

// Color palette selection (0 to 5)
void calculateAllColors(byte palNum, byte brightness);
```

### Sequence Enums (`LogicEngineDefaults::...`)

| Sequence Constant | Numeric ID | Description |
|:---|:---:|:---|
| `NORMAL` | `0` | Standard random blinking astromech pattern |
| `ALARM` | `1` | Fast flashing alert sequence |
| `FAILURE` | `2` | Slow dying fading sequence |
| `LEIA` | `3` | Princess Leia hologram message effect |
| `MARCH` | `4` | Imperial March marching pattern |
| `SOLIDCOLOR` | `5` | Steady solid illumination |
| `FLASHCOLOR` | `6` | Continuous strobe/flash |
| `FLIPFLOPCOLOR` | `7` | Alternating half-board strobe |
| `FLIPFLOPALTCOLOR` | `8` | Inverted alternating strobe |
| `COLORSWAP` | `9` | Swaps primary and secondary palette colors |
| `RAINBOW` | `10` | Cycling rainbow animation |
| `REDALERT` | `11` | Rapid red alert screaming pattern |
| `MICBRIGHT` | `12` | Sound-reactive brightness (requires mic) |
| `MICRAINBOW` | `13` | Sound-reactive color cycling |
| `LIGHTSOUT` | `14` | Blackout / all LEDs off |
| `TEXT` | `15` | Static text message |
| `TEXTSCROLLLEFT` | `16` | Text scrolling left |
| `TEXTSCROLLRIGHT` | `17` | Text scrolling right |
| `TEXTSCROLLUP` | `18` | Text scrolling upwards |
| `ROAMINGPIXEL` | `19` | Single pixel wandering the matrix |
| `HORIZONTALSCANLINE`| `20` | Cylon / Larson scanner horizontal bar |
| `VERTICALSCANLINE` | `21` | Vertical scanning line |
| `FIRE` | `22` | Flickering flame simulation |
| `PSICOLORWIPE` | `23` | Default PSI color-wipe sweep |
| `PULSE` | `24` | Breathing glow pulse |
| `RANDOM` | `99` | Randomly cycles sequences |

### ColorVal Enums (`LogicEngineDefaults::ColorVal`)

* `kDefault = 0`
* `kRed = 1`
* `kOrange = 2`
* `kYellow = 3`
* `kGreen = 4`
* `kCyan = 5`
* `kBlue = 6`
* `kPurple = 7`
* `kMagenta = 8`
* `kPink = 9`

### Numeric Command Encoding

ReelTwo computes composite effect numbers via:
$$\text{Value} = (\text{seq} \times 10000) + (\text{colorVal} \times 1000) + (\text{speedScale} \times 100) + \text{numSeconds}$$

---

## 3. HoloLights API Methods & Protocol

### C++ Class Constants & Colors

```cpp
HoloLights::kOff     // 0x000000
HoloLights::kRed     // 0xFF0000
HoloLights::kOrange  // 0xFF8000
HoloLights::kYellow  // 0xFFFF00
HoloLights::kGreen   // 0x00FF00
HoloLights::kCyan    // 0x00FFFF
HoloLights::kBlue    // 0x0000FF
HoloLights::kMagenta // 0xFF00FF
HoloLights::kPurple  // 0x800080
HoloLights::kWhite   // 0xFFFFFF
```

### HoloProjector Serial/String Command Format: `HP`

Syntax: `HP<Device><Type><Seq2><Color1>[|Duration]`

* **Device:**
  * `F` = Front HP
  * `R` = Rear HP
  * `T` = Top HP
  * `A` = All 3 HPs
* **Type:** `0` = LED Function, `1` = Servo Function (if servos attached).
* **Seq (2 digits):**
  * `01` = Leia sequence (random blue flicker)
  * `02` = Color Projector (steady beam in specified color)
  * `03` = Dim Pulse (breathing pulse)
  * `04` = Cycle sequence
  * `05` = Solid color
  * `06` = Rainbow
  * `07` = Short circuit (flickers and slows down)
  * `00` = Off / reset to default
* **Color (1 digit):** `1`=Red, `2`=Yellow, `3`=Green, `4`=Cyan, `5`=Blue, `6`=Magenta, `7`=Orange, `8`=Purple, `9`=White, `0`=Random.
* **Optional Duration (`|seconds`):** Time in seconds before reverting to idle.

*Example:* `CommandEvent::process("HPA0026|20");` (All HPs project solid Magenta for 20 seconds).

---

## 4. Communications Architecture: I2C & Serial

ReelTwo uses an event-driven publish/subscribe command bus centered around `CommandEvent`.

```
                  ┌───────────────────────┐
  Serial2 (UART) ─┤  CommandEventSerial   │
 (GPIO 16/17)     └───────────┬───────────┘
                              │
                  ┌───────────▼───────────┐
  I2C Bus (0x0A) ─┤      I2CReceiver      ├──► CommandEvent::process(cmd)
 (GPIO 21/22)     └───────────┬───────────┘                │
                              │                            ▼
                  ┌───────────▼───────────┐    ┌───────────────────────┐
  Marcduino Serial┤    MarcduinoSerial    │    │ Handlers:             │
 (standard-md)    └───────────────────────┘    │  - RLD (ID 3)         │
                                               │  - FLD (ID 1)         │
                                               │  - Front PSI (ID 4)   │
                                               │  - Rear PSI (ID 5)    │
                                               │  - HoloLights (F/R/T) │
                                               └───────────────────────┘
```

### 1. `CommandEvent` Core Bus
All command-capable devices subclass `CommandEvent` and implement `virtual void handleCommand(const char* cmd)`. Calling `CommandEvent::process("LE010000")` automatically evaluates the command across all active dome devices.

### 2. I2C Bus (`I2CReceiver`)
* **Default Address:** `0x0A` (7-bit address).
* **Hardware Pins:** ESP32 `GPIO 21` (SDA) and `GPIO 22` (SCL).
* **Behavior:** Incoming byte streams are captured via `Wire.onReceive()`, null-terminated into a buffer, and forwarded directly to `CommandEvent::process()` inside `AnimatedEvent::process()` during the main loop.

### 3. Hardware UART Serial (`CommandEventSerial`)
* **Default Port:** `Serial2` (`GPIO 16` RX, `GPIO 17` TX) running at `9600` baud (8N1).
* **Termination:** Commands are delimited by newline (`\n`) or carriage return (`\r`).

### 4. Marcduino Tunneling (`standard-md`)
In the `standard-md` firmware, `MarcduinoSerial` parses standard Marcduino codes (`:SE...`, `@1T...`, etc.). Builders can bypass Marcduino presets and run native ReelTwo commands directly over the serial line using the `*RT` or `@AP` prefixes:

```cpp
MARCDUINO_ACTION(DirectCommand, *RT, ({
    CommandEvent::process(Marcduino::getCommand());
}))

MARCDUINO_ACTION(MDDirectCommand, @AP, ({
    CommandEvent::process(Marcduino::getCommand());
}))
```
*Example over Marcduino:* Sending `*RTLE010000\r` triggers Alarm mode directly on Front Logics.
