# Developing with PlatformIO

[PlatformIO](https://platformio.org/) (running inside [VS Code](https://code.visualstudio.com/) or VSCodium) is the official development environment used to build and maintain the AstroPixels codebase. It eliminates manual library downloads, automates dependency resolution, and provides a multi-target build system.

---

## 1. Getting Started

1. Download and install [Visual Studio Code](https://code.visualstudio.com/) (or VSCodium).
2. Open the **Extensions** view (`Ctrl+Shift+X` or `Cmd+Shift+X`) and install the **PlatformIO IDE** extension.
3. Clone the official AstroPixels repository:
   ```bash
   git clone https://github.com/dpoulson/Astropixels.git
   ```
4. In VS Code, choose **File &rarr; Open Workspace from File...** and select `astropixels.code-workspace`.
5. PlatformIO will automatically initialize the project and download all required toolchains, board definitions, and library dependencies.

---

## 2. Multi-Environment Build System

The project is structured with multiple build environments in `platformio.ini`, allowing you to compile different droid flavors from a single codebase:

| Environment | Source Folder | Purpose |
| :--- | :--- | :--- |
| **`env:standard`** | `src/standard/` | Standard R2-D2 dome lighting with LE serial and I2C command processing. *(Default)* |
| **`env:standard-md`** | `src/standard-md/` | Standard R2-D2 lighting with native Marcduino/JawaLite serial command parser. |
| **`env:imperial`** | `src/imperial/` | Crimson red Sith/Imperial droid profile. |
| **`env:r2kt`** | `src/r2kt/` | Pastel pink R2-KT charity droid profile. |
| **`env:special`** | `src/special/` | Variant for slanted front logic bezels (`AstroPixelFLDSlant`). |
| **`env:dev`** | `src/dev/` | Development environment linking to a local ReelTwo source checkout. |

---

## 3. Building & Flashing

### Using the VS Code GUI:
1. Click the **PlatformIO Alien Icon** on the left activity bar.
2. Expand your target environment (e.g. `env:standard` or `env:standard-md`).
3. Click **Build** to verify compilation.
4. Connect your ESP32 via USB and click **Upload**.
5. Click **Monitor** to open the 115200 baud serial monitor and inspect live boot logs and command debug messages.

### Using the Command Line (PlatformIO Core):
You can also compile and upload directly from the integrated terminal:

```bash
# Build standard firmware
pio run -e standard

# Upload standard-md firmware to connected ESP32
pio run -e standard-md -t upload

# Launch serial debug monitor
pio device monitor -b 115200
```


