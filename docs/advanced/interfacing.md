# Serial & I2C Command Reference

AstroPixels is built to react dynamically to your droid's actions. Through either **Hardware Serial (Serial2)** or the **I2C Bus**, an external controller (such as a Marcduino, Arduino master, Raspberry Pi, or wireless receiver) can trigger built-in animations, text crawls, and HoloProjector sequences on the fly.

---

## 1. Physical Interfaces & Protocols

### Hardware Serial2 (Recommended)
* **Pins:** Motherboard `Serial2` header (`RX` &rarr; `GPIO 16`, `TX` &rarr; `GPIO 17`, `GND`).
* **Baud Rate:** `9600 Baud`, `8` Data bits, `No` Parity, `1` Stop bit (`9600 8N1`).
* **Format:** Plain ASCII string terminated with a newline (`\n`) or carriage return (`\r`).
* **Grounding:** Must share a common ground with the transmitting controller.

### I2C Bus
* **Pins:** Motherboard `I2C` header (`SDA` &rarr; `GPIO 21`, `SCL` &rarr; `GPIO 22`, `GND`).
* **I2C Slave Address:** `0x0A` (7-bit hexadecimal).
* **Format:** Raw ASCII character byte stream sent across the I2C bus.

---

## 2. Logic Engine Commands (`LE...`)

Commands targeting the Front Logics (FLD), Rear Logics (RLD), or PSIs begin with `LE` followed by 6 parameters:

```text
LE <Target> <Effect> <Colour> <Speed> <Duration>
```

### Parameter Breakdown

| Field | Length | Description / Accepted Values |
| :--- | :---: | :--- |
| **`LE`** | 2 chars | Prefix indicating Logic Engine command. |
| **`<Target>`** | 1 digit | Target display:<br>&bull; `0` = All displays (FLD, RLD, and PSIs)<br>&bull; `1` = Front Logic Displays (FLD)<br>&bull; `3` = Rear Logic Display (RLD)<br>&bull; `4` = Front PSI (FPSI)<br>&bull; `5` = Rear PSI (RPSI) |
| **`<Effect>`** | 2 digits | Animation pattern (`00` to `24`, or `99`). See table below. |
| **`<Colour>`** | 1 digit | Color override:<br>`0`=Default, `1`=Red, `2`=Orange, `3`=Yellow, `4`=Green, `5`=Cyan, `6`=Blue, `7`=Purple, `8`=Magenta, `9`=Pink |
| **`<Speed>`** | 1 digit | Animation speed scaling (`0` to `9`, where `0` is fastest). |
| **`<Duration>`**| 2 digits | Duration in seconds (`00` = run continuously until next command; `01`–`99` = timeout back to normal). |

### Complete Effect Codes & C++ Constants Table

Every serial/I2C effect code has a corresponding C++ constant in `LogicEngineDefaults` that can be used directly in sketch code (via `selectSequence()`):

| Code | ReelTwo C++ Constant (`LogicEngineDefaults::...`) | Effect Name | Description |
| :---: | :--- | :--- | :--- |
| **`00`** | `NORMAL` | **Normal** | Returns display to normal rolling astromech logic patterns. |
| **`01`** | `ALARM` | **Alarm** | Flashes alternating rows between the primary color and bright red. |
| **`02`** | `FAILURE` | **Failure** | Rapid color and brightness fading timed to R2 scream audio tracks. |
| **`03`** | `LEIA` | **Leia** | Pale green/blue subdued flicker matching hologram playback. |
| **`04`** | `MARCH` | **March** | Pulsing rhythmic logic sequence synchronized with the Imperial March. |
| **`05`** | `SOLIDCOLOR` | **Solid Color** | Forces all LEDs in the display to a single static color. |
| **`06`** | `FLASHCOLOR` | **Flashing Color** | Blinks the entire display on and off in the specified color. |
| **`07`** | `FLIPFLOPCOLOR` | **Flip Flop** | Alternates top and bottom halves back and forth. |
| **`08`** | `FLIPFLOPALTCOLOR` | **Flip Flop Alt** | Inverted alternating direction flip-flop. |
| **`09`** | `COLORSWAP` | **Color Swap** | Switches continuously between specified color and its complementary opposite. |
| **`10`** | `RAINBOW` | **Rainbow** | Smoothly cascades a full RGB rainbow spectrum across the matrix. |
| **`11`** | `REDALERT` | **Red Alert** | Fast aggressive red strobing. |
| **`14`** | `LIGHTSOUT` | **Lights Out** | Shuts off all LEDs in the display (stealth / power-down mode). |
| **`15`** | `TEXT` | **Static Text** | Displays static text message. |
| **`16`** | `TEXTSCROLLLEFT` | **Scroll Text Left** | Scrolls buffered text horizontally to the left. |
| **`17`** | `TEXTSCROLLRIGHT`| **Scroll Text Right**| Scrolls buffered text horizontally to the right. |
| **`18`** | `TEXTSCROLLUP` | **Scroll Text Up** | Scrolls buffered text vertically upward. |
| **`19`** | `ROAMINGPIXEL` | **Roaming Pixel** | Single pixel scans matrix row by row (hardware diagnostic). |
| **`20`** | `HORIZONTALSCANLINE` | **Horizontal Scanline** | Cylon / KITT horizontal scanning bar. |
| **`21`** | `VERTICALSCANLINE` | **Vertical Scanline** | Vertical scanning bar. |
| **`22`** | `FIRE` | **Fire** | Emulates organic burning embers and flames. |
| **`23`** | `PSICOLORWIPE` | **PSI Color Wipe** | Standard PSI circular wiping animation. |
| **`24`** | `PULSE` | **Pulse** | Smooth breathing brightness pulse. |
| **`99`** | `RANDOM` | **Random Effect** | Randomly picks an effect from the library. |

---

### Programmatic C++ API vs Commands

If writing custom code or callbacks, you can trigger these effects programmatically without formatting text strings:

```cpp
// 1. Direct object method (Target, Sequence, Color, Speed, Duration)
RLD.selectSequence(LogicEngineDefaults::ALARM);
FLD.selectSequence(LogicEngineDefaults::FIRE, LogicEngineDefaults::kRed, 2, 10);
frontPSI.selectSequence(LogicEngineDefaults::PSICOLORWIPE, LogicEngineDefaults::kBlue);

// 2. Scrolling text programmatically
RLD.selectScrollTextLeft("... ASTROPIXELS ...", LogicEngineRenderer::kBlue, 0, 15);

// 3. Process formatted command strings inside your sketch
CommandEvent::process("LE1010003"); // Front logics alarm for 3 seconds
```

### C++ Color Enumeration (`LogicEngineDefaults::ColorVal`)

When calling `selectSequence()` or initializing `LogicEngineSettings`:

```cpp
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
```

---

## 3. HoloProjector Commands (`HP...`)

HoloProjector commands control projector sequences, colors, and auto-twitch settings:

```text
HP <Target> <Type> <Function> [Colour] [Speed] [|Duration]
```

### Parameter Breakdown

* **`<Target>`**: Which HoloProjector to address:
  * `F` = Front HP | `R` = Rear HP | `T` = Top HP
  * `A` = All 3 HPs
  * `X` = Front & Rear | `Y` = Front & Top | `Z` = Rear & Top
* **`<Type>`**: `0` for LED lighting function (`1` reserved for servo motion).
* **`<Function>`**: 2-digit sequence code:
  * `01` = Leia sequence (Blue flicker)
  * `02` = Color Projector flicker (using specified color)
  * `03` = Dim Pulse (smooth breathing glow)
  * `04` = Cycle (rotating outer ring)
  * `05` = Solid on
  * `06` = Rainbow
  * `07` = Short Circuit (rapid decelerating strobe)
  * `96` = Clear HP, disable auto-twitch
  * `97` = Clear HP, enable auto-twitch (default sequence)
  * `98` = Clear HP, disable auto-twitch, enable off-color
  * `99` = Clear HP, enable auto-twitch (random sequences)
* **`[Colour]`** *(Optional)*: `1`=Red, `2`=Yellow, `3`=Green, `4`=Cyan, `5`=Blue, `6`=Magenta, `7`=Orange, `8`=Purple, `9`=White, `0`=Random.
* **`[Speed]`** *(Optional)*: Speed scale (`0`–`9`).
* **`[|Duration]`** *(Optional)*: Pipe character followed by duration in seconds (e.g. `|20` for 20 seconds). After the duration, the HP shuts off and returns to its background state.

---

## 4. Example Show Commands & Macros

Copy and send these ready-to-use strings over Serial2 or I2C:

| Desired Action | Command String | Explanation |
| :--- | :--- | :--- |
| **Reset All to Normal** | `LE0000000` | Resets all logics and PSIs back to normal rolling mode. |
| **Scream / Red Alert (5 sec)** | `LE0011005` | Triggers Red Alert on all logics for 5 seconds. |
| **Imperial March Mode** | `LE0041000` | Puts all logics into Imperial March pulsing in Red continuously. |
| **Leia Message Playback** | `LE0030030\nHPA001|30` | Sets logics to subdued pale green and triggers HP blue hologram flicker for 30s. |
| **Disco / Cantina Mode** | `LE0100015\nHPA006|15` | Displays rainbow logics and rainbow spinning HPs for 15 seconds. |
| **Cylon Front Logics** | `LE1201010` | Runs red horizontal scanline on Front Logics for 10 seconds. |
| **All Holos Short Circuit** | `HPA0071|10` | Fires red short-circuit flicker on all HPs for 10 seconds. |
| **Mute / Stealth Mode** | `LE0140000\nHPA096` | Completely turns off all displays and disables HP twitch. |


