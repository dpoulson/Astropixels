# Customising Colours & Animations

Because all 269 LEDs in the AstroPixels system are individually addressable WS2812B RGB pixels, you can customize any display to any color scheme, palette, speed, or startup message you desire.

---

## 1. How the Logic Engine Configures Displays

The displays (both Front/Rear Logics and Front/Rear PSIs) are configured using a `LogicEngineSettings` object passed during initialization:

```cpp
static LogicEngineSettings LogicEngineCustom(
    fade,          // Transition fade speed (1-255)
    hue,           // Color wheel rotation (0-255)
    delay,         // Refresh interval delay in ms (controls animation speed)
    palNum,        // Color palette selection (0-5)
    bri,           // Global brightness level (0-255)
    defaultEffect  // Default running sequence (e.g. NORMAL or PSICOLORWIPE)
);
```

### Parameter Breakdown

| Parameter | Type | Default Front | Default Rear | Description |
| :--- | :---: | :---: | :---: | :--- |
| **`fade`** | `byte` | `1` | `3` | Determines how smoothly pixels fade between color transitions. |
| **`hue`** | `byte` | `0` | `0` | Rotates the entire palette around the 360&deg; color wheel (`0` to `255`). |
| **`delay`** | `byte` | `10` | `40` | Milliseconds between frame updates. Smaller values run faster; larger values run slower. |
| **`palNum`** | `byte` | `0` | `1` | Selects which pre-defined color palette is used (see below). |
| **`bri`** | `byte` | `160` | `140` | Master brightness (`0`–`255`). Defaults are tuned for optimal visibility while keeping total current draw under 700mA. |
| **`defaultEffect`** | `long` | `NORMAL` | `NORMAL` | The animation pattern to run continuously. |

---

## 2. Built-in Palettes (`palNum`)

The ReelTwo Logic Engine includes six built-in color palettes:

* **`0` &mdash; Default Front:** Classic film-accurate R2-D2 front logics (white, light blue, cyan, accent red).
* **`1` &mdash; Default Rear:** Classic film-accurate R2-D2 rear logics (white, yellow, green, accent red/blue).
* **`2` &mdash; Monotone Red:** Ideal base for Imperial/Sith droids, or rotated via `hue` for monotone droids (e.g. pink R2-KT).
* **`3` &mdash; Dual Color Red & Yellow:** Classic warning/industrial colors (great for Chopper / C1 droids).
* **`4` &mdash; Dual Color Blue & Red:** Dynamic dual-tone palette.
* **`5` &mdash; Dual Color Yellow & Green:** Auxiliary astromech colorway.

---

## 3. The HUE Color Wheel (`0`–`255`)

The `hue` parameter shifts the entire selected palette across the 360&deg; color spectrum:

$$\text{Red } (0) \longrightarrow \text{Yellow } (42) \longrightarrow \text{Green } (85) \longrightarrow \text{Cyan } (128) \longrightarrow \text{Blue } (170) \longrightarrow \text{Magenta } (213) \longrightarrow \text{Red } (255)$$

For example, selecting **Palette 2 (Monotone Red)** and applying a hue rotation:
* **`hue = 0`** &rarr; Deep Imperial Sith Red
* **`hue = 220`** &rarr; Pastel Pink (R2-KT)
* **`hue = 85`** &rarr; Emerald Green (Boba Fett / Astromech medic)
* **`hue = 170`** &rarr; Deep Cobalt Blue

---

## 4. Customising the PSIs (Process State Indicators)

By default, the Front PSI wipes Red and Blue, while the Rear PSI wipes Green and Yellow. You can customize the wipe colors by passing a different secondary color into `LogicEngineDefaults::sequence()`:

```cpp
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
```

### PSI Color Options Table

| Color Constant | Primary Color | Inverted Secondary Color |
| :--- | :--- | :--- |
| `LogicEngineDefaults::kRed` | Red | Blue |
| `LogicEngineDefaults::kBlue` | Blue | Red |
| `LogicEngineDefaults::kYellow` | Yellow | Green |
| `LogicEngineDefaults::kGreen` | Green | Yellow |
| `LogicEngineDefaults::kCyan` | Cyan | Orange |
| `LogicEngineDefaults::kOrange` | Orange | Cyan |
| `LogicEngineDefaults::kPurple` | Purple | Magenta |
| `LogicEngineDefaults::kPink` | Pink | Light Blue |

---

## 5. Ready-to-Use Droid Recipes

### Imperial / Shadow Droid (Full Crimson Red)
```cpp
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
```

### R2-KT (Charity Droid - Pink Theme)
```cpp
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
```

---

## 6. Custom Startup Text & Greetings

In `setup()`, you can customize the message, color, and scroll speed shown on the front and rear logics when your droid boots up:

```cpp
void setup()
{
    REELTWO_READY();
    SetupEvent::ready();

    // RLD: Scroll droid callsign in Blue
    RLD.selectScrollTextLeft("... R2-D2 DROIDBUILDERS UK ...", LogicEngineRenderer::kBlue, 0, 20);

    // FLD: Scroll custom greeting in Red
    FLD.selectScrollTextLeft("... ONLINE ...", LogicEngineRenderer::kRed, 0, 15);
}
```

* **Color Options:** `kRed`, `kOrange`, `kYellow`, `kGreen`, `kCyan`, `kBlue`, `kPurple`, `kMagenta`, `kPink`, `kDefault`.
* **Direction Options:** `selectScrollTextLeft()`, `selectScrollTextRight()`, `selectScrollTextUp()`, or `selectTextCenter()`.