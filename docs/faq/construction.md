# Hardware & Design FAQ

### Why JLCPCB?
Quite simply, they offer excellent manufacturing quality and cost efficiency. Paired with EasyEDA and LCSC component sourcing, JLCPCB enables small-batch SMT assembly that keeps the final kit price as low as possible for club members.

### Why did you select the specific cable harness lengths?
The harness lengths are engineered around a standard 1:1 scale dome with the motherboard mounted directly to the rear of the RLD. The 10cm, 20cm, and 30cm servo cables (along with 30cm extensions) represent standard, mass-produced RC cable lengths. Using standard bulk lengths avoids the substantial added expense of bespoke crimped harnesses while providing enough slack to reach any 1:1 dome configuration.

### Are the PCB Gerbers and hardware files open-source?
Currently, no. The value in AstroPixels is in the bulk manufacturing runs. If an individual builder were to order a single one-off set of all 7 PCBs with surface-mount assembly from a fabrication house, setup fees and minimum order charges would easily exceed £200.

### Why use the ESP32 microcontroller?
The ESP32 offers substantial processing power, dual-core architecture, FreeRTOS multi-threading, and hardware UARTs. This ensures smooth 60fps NeoPixel animations across 269 pixels without timing jitter or blocking serial/I2C communication. Furthermore, the 30-pin NodeMCU module is an ubiquitous, inexpensive standard, making replacements easily available worldwide.