# AstroPixelsPlus (WiFi & Mobile App Firmware)

For builders seeking direct wireless smartphone control or integrated servo panel management without a separate Marcduino, community member **Mimir** (creator of the core ReelTwo robotics library) has created a specialized firmware fork called **AstroPixelsPlus**.

---

## 1. What is AstroPixelsPlus?

[AstroPixelsPlus](https://github.com/reeltwo/AstroPixelsPlus) turns the onboard ESP32 into a standalone dome controller that combines lighting, servo management, and wireless control:

* **Integrated WiFi SoftAP & Web Interface:** The ESP32 hosts its own localized WiFi Access Point. You can connect directly to it using a smartphone, tablet, or laptop to trigger lighting sequences and monitor dome telemetry.
* **R2-Touch App Integration:** Emulates standard Marcduino WiFi bridges, allowing direct control from the popular iOS/Android *R2-Touch* control app.
* **Servo Dispatch for Panels & HPs:** Takes advantage of the spare AUX pins on the AstroPixels motherboard to drive dome pie panel servos and 2-axis HoloProjector movement servos directly from the ESP32.
* **Serial Bridging:** Forwards incoming commands received over WiFi out through the `Serial2` port down to body controllers, Marcduino slaves, or sound players.

---

## 2. Choosing Between Standard Firmware & AstroPixelsPlus

| Feature | Standard AstroPixels (`standard` / `standard-md`) | AstroPixelsPlus |
| :--- | :--- | :--- |
| **Primary Focus** | Pure, ultra-reliable dome lighting | All-in-one WiFi dome controller + lights + servos |
| **Control Interface** | Physical Serial2 (Marcduino/RC) and I2C | WiFi hotspot, Web GUI, R2-Touch, plus Serial |
| **Complexity** | Plug-and-play, zero network setup | Requires network configuration and servo calibration |
| **Author / Support** | Developed and supported by Darren Poulson | Third-party project developed by Mimir |

---

## 3. Getting Started with AstroPixelsPlus

To explore or install AstroPixelsPlus on your AstroPixels hardware:

* **GitHub Repository & Source Code:** [https://github.com/reeltwo/AstroPixelsPlus](https://github.com/reeltwo/AstroPixelsPlus)
* **Configuration:** Refer to the AstroPixelsPlus README for setting up WiFi credentials, servo travel limits, and pin assignments.

