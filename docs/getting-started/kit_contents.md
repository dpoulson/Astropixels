# Kit Contents

Every AstroPixels kit is shipped fully assembled and pre-tested with the standard R2-D2 firmware installed. Before beginning assembly, verify that your kit contains all the components listed below.

---

### Printed Circuit Boards (PCBs)

| Board | Quantity | LED Count | Dimensions / Form Factor | Function |
| :--- | :---: | :---: | :--- | :--- |
| **Main Motherboard** | 1 | 0 | 30-pin socketed breakout | Central controller carrier with labeled headers, screw terminals, I2C, Serial2, and 5x AUX GPIO ports. Includes 30-pin ESP32 NodeMCU board. |
| **Rear Logic Display (RLD)** | 1 | 108 | 27 columns x 4 rows | Large rear logic panel displaying classic rolling blue/red/white binary patterns. Features mounting holes sized to mount the main motherboard directly behind it. |
| **Front Logic Display (FLD)** | 2 | 45 each (90 total) | 9 columns x 5 rows each | Top and bottom front logic displays. Daisy-chained vertically to form a combined 9x10 display matrix. |
| **Process State Indicator (PSI)** | 2 | 25 each (50 total) | 5x5 circular mask | Front and rear round status indicators running color-wipe animations (Front: Red/Blue; Rear: Green/Yellow). |
| **HoloProjector Lights (HP)** | 3 | 7 each (21 total) | 7-pixel round discs | Front, Rear, and Top HoloProjector light boards (ring of 6 outer pixels + 1 central projection pixel). |

**Total LEDs in System:** 269 individually addressable WS2812B RGB pixels.

---

### Wiring Harness (Pre-crimped 3-Pin Servo Cables)

The kit includes a dedicated 12-cable servo-style wiring harness (Signal, Voltage, Ground) sized specifically for standard 1:1 scale dome routing when the motherboard is mounted on the back of the RLD:

* **4 &times; 30cm Female-to-Male Servo Extensions** &mdash; Used to bridge longer distances from the rear logic to the front dome panels.
* **2 &times; 30cm Female-to-Female Servo Cables** &mdash; Used for the Rear PSI (RPSI) and Front HoloProjector (FHP) routing.
* **2 &times; 20cm Female-to-Female Servo Cables** &mdash; Used for the Rear HoloProjector (RHP) and Front PSI (FPSI) link.
* **4 &times; 10cm Female-to-Female Servo Cables** &mdash; Used for short local runs: Motherboard to RLD, FLD daisy-chain bridge, and short extension links.

---

<figure><img src="https://we-make-things.co.uk/wp-content/uploads/2024/04/PXL_20240409_233712368-scaled.jpg" alt="AstroPixels Complete Kit Contents"><figcaption>Complete AstroPixels Kit: Motherboard, RLD, dual FLDs, dual PSIs, three HPs, and full wiring harness.</figcaption></figure>

{% hint style="info" %}
**Spare Parts & Replacements:** The ESP32 is a standard 30-pin dev module (NodeMCU-32S layout with USB-C). If you ever damage the USB-C connector or board during physical installation, replacement 30-pin ESP32 boards can be purchased anywhere and flashed via our [Web Installer](https://dpoulson.github.io/Astropixels/firmware/).
{% endhint %}


