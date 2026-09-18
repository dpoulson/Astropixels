# HoloProjectors (HP)

The three HoloProjector light discs (Front, Rear, Top) run ReelTwo's `HoloLights` engine. Each disc features 7 WS2812B RGB pixels (a circular ring of 6 pixels surrounding 1 center projection pixel).

By default, the HPs periodically wake up, play a randomized or designated lighting sequence (such as the classic blue Leia flicker), and then turn off. You can customize the timing intervals, colors, sequences, and twitch behavior.

---

## 1. Controlling Twitch Frequency & Duration

HoloProjectors operate in an automatic "twitch" mode. You can independently tune how often they turn on and how long they stay active:

```cpp
void setup()
{
    REELTWO_READY();
    SetupEvent::ready();

    // Set how often the HP turns on (minimum seconds, maximum seconds)
    frontHolo.setLEDTwitchInterval(30, 90);

    // Set how long the HP stays lit (minimum seconds, maximum seconds)
    frontHolo.setLEDTwitchRunInterval(5, 15);
}
```

* **`setLEDTwitchInterval(min, max)`**: HoloProjector will remain dark for a random time between `min` and `max` seconds before firing.
* **`setLEDTwitchRunInterval(min, max)`**: When triggered, the light effect will run for a random time between `min` and `max` seconds before shutting off.

---

## 2. Setting Default Sequence, Color & Speed

You can specify which animation sequence and color each HoloProjector uses during its automatic twitch:

```cpp
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
```

Alternatively, you can set all three parameters in a single function call:
```cpp
topHolo.setDefaultLEDTwitchCommand(3, 5, 150); // Sequence 3 (Pulse), Color 5 (Blue), Speed 150
```

---

## 3. Sequence & Color Reference

### Animation Sequences

| Sequence ID | Name | Description |
| :---: | :--- | :--- |
| **`1`** | **Leia Sequence (Blue)** | Random flickering shades of blue mimicking the original hologram projection. Center LED is kept off. |
| **`2`** | **Color Projector** | Similar to the Leia flicker, but rendered using the custom color specified. |
| **`3`** | **Dim Pulse** | Smoothly pulses the brightness up and down. |
| **`4`** | **Cycle** | Chases around the 6 outer LEDs in a rotating circle. |
| **`5`** | **Solid Color** | Illuminates all 7 LEDs steady on at full intensity. |
| **`6`** | **Rainbow** | Cycles continuously through the entire RGB color spectrum. |
| **`7`** | **Short Circuit** | Rapid chaotic flashing with an interval that gradually slows down. |

### Color Codes & C++ Constants

| Color ID | Color Name | ReelTwo C++ Hex Constant (`HoloLights::...`) |
| :---: | :--- | :--- |
| **`1`** | Red | `kRed` (`0xFF0000`) |
| **`2`** | Yellow | `kYellow` (`0xFFFF00`) |
| **`3`** | Green | `kGreen` (`0x00FF00`) |
| **`4`** | Cyan (Aqua) | `kCyan` (`0x00FFFF`) |
| **`5`** | Blue | `kBlue` (`0x0000FF`) |
| **`6`** | Magenta | `kMagenta` (`0xFF00FF`) |
| **`7`** | Orange | `kOrange` (`0xFF8000`) |
| **`8`** | Purple | `kPurple` (`0x800080`) |
| **`9`** | White | `kWhite` (`0xFFFFFF`) |
| **`0`** | Random | Randomized per twitch |
| &mdash; | Off | `kOff` (`0x000000`) |

---

## 4. Programmatic Direct Control in C++

Beyond automated twitching, you can directly set colors or control HoloProjector LEDs in sketch logic:

```cpp
// 1. Force a solid color immediately
frontHolo.setColor(HoloLights::kBlue);

// 2. Shut off HoloProjector LEDs
frontHolo.off();

// 3. Address individual pixels directly (0-5: outer ring, 6: center LED)
frontHolo.setPixelColor(6, HoloLights::kWhite); // Center projection spotlight
frontHolo.show();
```

---

## 5. Disabling Auto-Twitch (Manual / Show Control)

If you prefer your HoloProjectors to remain completely off until explicitly triggered by a Marcduino command, sound cue, or remote control switch:

```cpp
void setup()
{
    REELTWO_READY();
    SetupEvent::ready();

    // Disable auto-twitch by sending HP clear command (Sequence 96)
    CommandEvent::process("HPA096"); // Disables twitch on All (A) HPs
}
```

To re-enable automatic twitch at runtime, send `HPA0971` (default sequence) or `HPA0972` (random sequences). See [Interfacing Guide](interfacing.md) for full syntax.


