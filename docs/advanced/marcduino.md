# Marcduino Integration

AstroPixels integrates natively with standard Marcduino dome controllers (v1, v1.5, and v2/v3 Compact). By installing the **`standard-md`** firmware, AstroPixels acts as a drop-in replacement for legacy Teeces / JawaLite dome displays, responding directly to standard Marcduino panel commands, sequence macros, and HoloProjector triggers.

---

## 1. Wiring Marcduino to AstroPixels

The Marcduino communicates with AstroPixels via a one-way (simplex) serial connection at **9600 Baud (8N1)**:

```text
Marcduino Output (Slave / Aux Port)               AstroPixels Motherboard (Serial2)
┌─────────────────────────────────┐               ┌─────────────────────────────────┐
│  [ - ] Ground (GND)             ├───────────────┤  [ G ] Ground                   │
│  [ + ] 5V Power                 │  (NO CONNECT) │  [ V ] (Leave Unconnected)      │
│  [ S ] Signal / Serial TX       ├───────────────┤  [ R ] Serial2 RX (GPIO 16)     │
└─────────────────────────────────┘               └─────────────────────────────────┘
```

### Critical Wiring Rules:
1. **Connect Ground (`-` to `G`):** Both boards must share a common ground.
2. **Connect Signal to RX (`S` to `R`):** Connect the Marcduino's serial output (`S` pin) to the AstroPixels `R` (Receive / `GPIO 16`) pin.
3. **DO NOT Connect Power (`+`):** Never link the `+5V` pin between the Marcduino and AstroPixels. Both systems should be powered independently from their own regulated power supplies to prevent ground loops and voltage backfeeding.

---

## 2. Firmware Requirement

To enable the Marcduino command parser, install the **`standard-md`** firmware flavor using our [Web Installer](https://dpoulson.github.io/Astropixels/firmware/).

---

## 3. Supported Marcduino Command Dictionary

The `standard-md` firmware parses native Marcduino command prefixes:

### Logic Display Sequences (`@...`)

| Marcduino Command | Target Display | Sequence Triggered |
| :--- | :--- | :--- |
| **`@0T1`** | All Logics (FLD & RLD) | Normal rolling logics |
| **`@0T2`** | All Logics (FLD & RLD) | Flash color sequence |
| **`@1T1`** | Front Logics (FLD) | Normal rolling logics |
| **`@1T2`** | Front Logics (FLD) | Flash color sequence |
| **`@1T3`** | Front Logics (FLD) | Alarm sequence |
| **`@1T4`** | Front Logics (FLD) | System failure sequence |
| **`@1T5`** | Front Logics (FLD) | Scream / Red alert sequence |
| **`@1T6`** | Front Logics (FLD) | Leia sequence |
| **`@1T11`** | Front Logics (FLD) | Imperial March sequence |
| **`@2T1`** | Rear Logics (RLD) | Normal rolling logics |
| **`@2T2`** | Rear Logics (RLD) | Flash color sequence |
| **`@2T3`** | Rear Logics (RLD) | Alarm sequence |
| **`@2T4`** | Rear Logics (RLD) | System failure sequence |
| **`@2T5`** | Rear Logics (RLD) | Scream / Red alert sequence |
| **`@2T6`** | Rear Logics (RLD) | Leia sequence |
| **`@2T11`** | Rear Logics (RLD) | Imperial March sequence |

### PSI Sequences (`@...`)

| Marcduino Command | Target Display | Sequence Triggered |
| :--- | :--- | :--- |
| **`@0P1`** | Both PSIs | Normal color wipe |
| **`@1P1`** | Front PSI | Normal color wipe |
| **`@1P2`** | Front PSI | Flash sequence |
| **`@1P3`** | Front PSI | Alarm sequence |
| **`@1P4`** | Front PSI | Failure sequence |
| **`@1P5`** | Front PSI | Scream / Red alert |
| **`@1P6`** | Front PSI | Leia subdued flicker |
| **`@1P11`**| Front PSI | Imperial March pulse |
| **`@2P1`** | Rear PSI | Normal color wipe |
| **`@2P2`** | Rear PSI | Flash sequence |
| **`@2P3`** | Rear PSI | Alarm sequence |
| **`@2P4`** | Rear PSI | Failure sequence |
| **`@2P5`** | Rear PSI | Scream / Red alert |
| **`@2P6`** | Rear PSI | Leia subdued flicker |
| **`@2P11`**| Rear PSI | Imperial March pulse |

### HoloProjector Controls (`*...`)

| Marcduino Command | Target | Action |
| :--- | :--- | :--- |
| **`*ON01`** | Front HP | Turn ON (Dim cycle random color) |
| **`*OF01`** | Front HP | Turn OFF |
| **`*ON02`** | Rear HP | Turn ON (Dim cycle random color) |
| **`*OF02`** | Rear HP | Turn OFF |
| **`*ON03`** | Top HP | Turn ON (Dim cycle random color) |
| **`*OF03`** | Top HP | Turn OFF |
| **`*ST00`** | All HPs | Reset / turn off all HoloProjectors |

### Global Show Animations (`:...`)

| Sequence Command | Animation Name | Description |
| :--- | :--- | :--- |
| **`:SE00`** | **Stop / Reset** | Resets all logics, PSIs, and HPs to normal background operation. |
| **`:SE01`** | **Scream** | Front and rear logics enter red scream alert for 3 seconds. |
| **`:SE05`** | **Cantina / Disco** | Triggers fire effect on logics and short circuit on all HPs for 15 seconds. |

---

## 4. Direct Command Passthrough

Need to trigger a custom AstroPixels effect that isn't mapped to a standard Marcduino command? You can tunnel native ReelTwo commands directly through the Marcduino using the `*RT` or `@AP` prefixes:

* **Format:** Send `*RT` or `@AP` followed immediately by any native AstroPixels command.
* **Example:** Sending `*RTLE0100015` will instruct the AstroPixels to run the Rainbow sequence on all logics for 15 seconds.
* **Example:** Sending `@APHPA0071|10` will fire a red short-circuit flash across all HoloProjectors for 10 seconds.

