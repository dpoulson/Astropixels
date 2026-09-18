# Physical Installation & Mounting

The AstroPixels kit is designed as a direct drop-in replacement for legacy club dome lighting systems (such as Teeces, v2/v3 logic engines, and DIY perfboard displays). All PCB dimensions, hole spacings, and component heights adhere to standard R2-D2 Builders Club 1:1 scale specifications.

---

## Critical Installation Warnings

{% hint style="danger" %}
### 1. Aluminium Domes & Surrounds: Prevent Direct Shorts!
If your droid has an **aluminium dome** or uses **metal/aluminium bezels and surrounds**, you **must ensure no solder pins, component legs, or connector headers touch the raw metal**.
* **Symptoms of a short to metal:** The system appears completely dead&mdash;**no LEDs light up and even the red power LED on the ESP32 stays off**. Your power supply will show a **significant voltage drop (rail collapses towards 0V)** accompanied by **high current draw / warm wires**, or your regulator's short-circuit protection will immediately trip.
* **Prevention:** Always use non-conductive **nylon M3 standoffs and nylon screws** when mounting against metal. Apply a strip of **Kapton tape or electrical insulation tape** across the back of metal bezels or inner dome skins to ensure through-hole solder joints cannot bridge against the conductive aluminium.
{% endhint %}

{% hint style="warning" %}
### 2. Don't Mix Up FLD and RLD!
A frequent mistake for first-time builders is confusing the front and rear displays:
* **FLD = Front Logic Display:** These are **TWO identical smaller boards** (9 columns &times; 5 rows each). They mount in the **FRONT** of the dome, stacked one above the other in the upper and lower bezels, and daisy-chain together.
* **RLD = Rear Logic Display:** This is **ONE large, wide board** (27 columns &times; 4 rows). It mounts alone in the large opening at the **REAR** of the dome. The main motherboard is designed to mount onto the back of this board.
* *Connecting an FLD to an RLD header (or vice versa) results in scrambled patterns, wrong colors, or partially lit displays.*
{% endhint %}

---

## 1. Mounting the Main Breakout Motherboard

The most compact, clean, and vibration-resistant dome layout mounts the main motherboard directly behind the **Rear Logic Display (RLD)**:

* The motherboard includes pre-drilled M3 mounting holes that align directly with the rear of the RLD PCB.
* Use **M3 standoffs (10mm – 15mm length)** with nylon or stainless steel M3 screws.
* This central location places the motherboard within easy reach of every dome opening, minimizing wire clutter and cable weight.

---

## 2. Installing the Logic Displays (RLD & FLD)

### Front Logic Displays (FLD &mdash; Front of Dome)
* The two FLD boards mount one above the other in the front logic surround.
* Ensure both boards are oriented right-side up (silk-screen text legible).
* Connect the incoming servo cable from the motherboard to the **IN** header on the top board.
* Connect a short 10cm jumper from the **OUT** header of the top board down to the **IN** header of the bottom board.

### Rear Logic Display (RLD &mdash; Rear of Dome)
* Mounts into the large rear horizontal surround.
* Connect directly to the motherboard **RLD** header using a single short 10cm servo cable.


### Diffusers & Front Covers
WS2812B LEDs are intensely bright point-light sources. To achieve that authentic, smooth movie look without harsh individual LED hotspots, a diffuser is essential:
* **Diffuser Sheet:** White translucent acrylic (1.5mm–3mm, approx. 30–40% light transmission) or drafting film placed directly behind the aluminum bezel.
* **3D Printed PETG Diffusers:** Printing a single layer of natural transparent PETG (0.2mm layer height) creates a beautiful molded diffuser.

---

## 3. Printable Bezels, Diffusers & Standoffs

The Astromech community has created fantastic open-source mounts, bezels, and diffusers tailored specifically for AstroPixels:

### Printable Integrated Bezels & Diffusers (by Joel Joannisse)
Designed for the popular 3D-printed MK4 dome:
* [Download Bambu Studio & STL Files (ZIP)](../assets/Astropixels_logic_display_bezel_with_diffuser.zip)
* **Printing Tip:** Uses a multi-material / filament swap technique: Layer 1 is transparent PETG (acting as the built-in diffuser), followed by dark blue, black, or metallic filament for the structural bezel.
* **Important:** Screw the board to the locking bar using M3 &times; 6mm screws. Tighten just until snug so the bezel gently contacts the LEDs without crushing the solder joints.

### Laser-Cut Acrylic Bezels & Covers
* [Download Logic Bezels CNC/Laser PDF](https://r2djp.co.uk/wp-content/uploads/2022/06/Logic-bezels-2022-astropixels.pdf)
* Suitable for CNC routing or laser cutting 2mm/3mm acrylic.

### 3D Printable Spacers
* [Download Standoff & Spacer STLs (ZIP)](https://r2djp.co.uk/wp-content/uploads/2022/06/Logic.zip)
* Includes printable spacers to adjust board depth perfectly against curved inner dome skins.

---

## 4. HoloProjector (HP) Installation

The 7-pixel round HoloProjector boards fit inside all standard 1:1 scale HoloProjector housings (both static and 2-axis servo-driven mechanisms).

* **MK4 Dome HP Mounts (by Dana Jan):** Dedicated HP light board and servo brackets for printed droids can be downloaded on Printables: [Printables Model 869432](https://www.printables.com/model/869432-holoprojector-servo-and-astropixels-mount-mk4-dome).
* **Alignment:** Center the middle projection LED directly behind the HP lens for maximum light output downrange.


