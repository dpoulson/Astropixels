# Power Requirements & Architecture

Clean, stable power is critical for reliable operation of the AstroPixels system. While simple to power, understanding the electrical requirements will prevent random resets, flickering LEDs, or brownout loops inside your droid.

---

## 1. Electrical Specifications & Power Budget

The entire AstroPixels system contains **269 WS2812B RGB LEDs** plus the ESP32 microcontroller:

* **Nominal Operating Voltage:** `5.0V DC` (Safe operating range: `4.8V – 5.25V`).
* **Typical Current Draw:** `500mA – 700mA` during standard rolling logic animations and intermittent HoloProjector twitches (thanks to ReelTwo's optimized default brightness levels: 160 Front / 140 Rear).
* **Peak Current Draw:** Up to `1.2A – 1.5A` during full-brightness alarm sequences, solid white flashes, or fire animations.
* **Recommended Power Supply Capacity:** Minimum `5V @ 2.0A` continuous (3.0A recommended if powering additional dome accessories).

{% hint style="danger" %}
**Never Exceed 5.5V:** WS2812B LEDs and the ESP32 5V rail will be permanently damaged by voltages exceeding 5.5V. Never connect raw 7.4V, 11.1V, 12V, or 24V battery power directly to the board!
{% endhint %}

---

## 2. Powering Strategies for Droid Builders

### Option A: Buck Converter in the Dome (Recommended Best Practice)

If your droid uses a slip ring to pass power from the body to the dome, the industry-standard approach is to send your droid's main battery voltage (**12V or 24V**) up through the slip ring, and place a step-down **Buck Converter** inside the dome to produce clean 5V right next to the AstroPixels motherboard.

```text
[Main Battery: 12V/24V] ───► [Slip Ring] ───► [5V Step-Down Buck] ───► [AstroPixels 5V Terminals]
```

**Why this is the best approach:**
1. **Minimizes Voltage Drop:** Transmitting high voltage (12V/24V) through slip ring brushes experiences far less voltage sag than trying to transmit 5V over the same resistance ($P = I^2 R$).
2. **Eliminates Brownouts:** Prevents dome servo surges from dipping the logic display voltage below the ESP32 brownout threshold (approx. 4.6V).
3. **Recommended Regulators:**
   * [Pololu 5V, 3A Step-Down Voltage Regulator D30V30F5](https://www.pololu.com/product/4892)
   * [Pololu 5V, 5A Step-Down Voltage Regulator D24V50F5](https://www.pololu.com/product/2851)
   * High-quality marine-grade or RC 5V/6V UBEC (set strictly to 5.0V output).

---

### Option B: Dedicated Dome Power Bank or LiPo

If your dome is self-contained or does not use a powered slip ring:
* A standard **USB Power Bank (5V / 2.4A output, 10,000mAh)** will comfortably run the AstroPixels system for **10 to 14 hours** of continuous trooping.
* You can sacrifice a standard USB cable: cut off the small end, strip back the outer jacket, and connect the **Red (+5V)** and **Black (GND)** wires directly into the motherboard screw terminals.

---

### Option C: Bench Testing via USB

You can plug a USB-C cable directly into the onboard ESP32 dev module from a computer or USB wall charger.

{% hint style="warning" %}
**Mechanical Fragility:** USB-C ports on dev boards are surface-mounted and can be stressed or sheared if a cable is snagged while moving inside the dome. Reserve the USB port strictly for programming and desktop bench testing.
{% endhint %}

---

## 3. Grounding & Common Ground Rules

If you interface AstroPixels with external systems (such as a Marcduino, MP3 sound trigger, or body RC receiver):

1. **Common Ground is Mandatory:** You **MUST** connect a Ground (`GND`) wire between the AstroPixels motherboard and the external controller. Without a shared ground reference, serial signals and I2C lines will encounter packet framing errors or erratic behavior.
2. **Do Not Share Servo Power with Logics:** If your dome has high-torque panel servos or HP movement servos, do not power the servos from the same 5V regulator powering the AstroPixels unless the regulator has ample current overhead (5A+) and adequate reservoir capacitors. Heavy servo movement can cause electrical noise and momentary dips that reset the ESP32.