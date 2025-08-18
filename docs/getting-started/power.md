The Astropixels require a clean 5V supply that can provide at least 1A of current. If you change the brightness or trigger certain effects then the current usage can be quite a bit higher. Most users shouldn't go over about 700mA with normal operation.

# Options

## Computer

For testing, you can simply plug them into a computer or laptop. There should be enough current from a standard usb power to run the Astropixels. 

## Power Bank

The next simplest solution is a power bank. Something like a 10000mAh one should run the Astropixels with standard code for 10 hours.

{% hint style="warning" %}
Whilst it is fine to use the USB connector for initial testing, they are fragile so shouldn't be used in a final install.
{% endhint %}

You can sacrifice a cheap USB cable and cut the end off it, strip the wires, and use the screw terminal on the breakout board to power the Astropixels. This is more robust and doesn't run the risk of pulling the fragile usb port off the ESP32. 

## Buck Convertor

The best way (IMHO) to run the Astropixels, especially if you already have a slip ring or similar to the dome in place, is to use a standard buck convertor. Pass the raw main battery voltage through the slip ring, and then drop it down to 5v once it is in the dome. Doing it this way reduces voltage losses and current through the slip ring.

You can also use a buck convertor in this way without a slip ring, if you have another power source in the dome like a lipo battery.

An example of a suitable buck convertor is this: [Pololu D30V30F5](https://www.pololu.com/product/4892)