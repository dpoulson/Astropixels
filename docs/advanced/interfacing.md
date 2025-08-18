# Interfacing with the Astropixels
One of the great parts about the Astropixels is that whilst at the simplest you can just plug them in for basic R2 lights, you can also trigger various built in effects and change colours on the fly. This is for the logics, PSIs, and HPs.

For instance, you could trigger the HP to coincide with the Leia message being played, or play the imperial march and turn R2 into full evil red mode.

The main documentation can be found with the ReelTwo library [here](https://reeltwo.github.io/Reeltwo/html/index.html). However, this page will break things down a little bit.

You can interface with the Astropixels using either serial or i2c. By default, only i2c on address 0x0A is enabled, but you can install the [Astropixels Plus](advanced/app.md) firmware to gain a load of other functionality, including serial and wifi (so you can use the rtouch mobile app).

## I2C

### Logics and PSI

The logics and PSI both run the same LogicEngine code and have the same effects available to them. You can even run the PSI light style on a logic!

All commands start with LE (for Logic Engine), followed by:

```<logic designation><effect><colour><speed><time>```

You must drop any leading 0’s.

#### Logic Designation:
* 0 – All Logics and PSI
* 1 – Front Logics
* 3 – Rear Logics
* 4 – Front PSI
* 5 – Rear PSI

#### Effect (Two digits):
* 00 – Normal
* 01 – Alarm – flips between color and red
* 02 – Failure – cycles colors and brightness fading – roughly timed to 128 screa-3.mp3
* 03 – Leia – pale green
* 04 – March – sequence timed to Imperial March
* 05 – Single Color – single hue shown
* 06 – Flashing Color – single hue on and off
* 07 – Flip Flop Color – boards flip back and forth – similar to march
* 08 – Flip Flop Alt – other direction of flips on back board, front is same to flip flop
* 09 – Color Swap – switches between color specified and inverse compliment color
* 10 – Rainbow – rotates through colors over time
* 14 – Lights Out – turns off displays
* 15 – Static Text
* 16 – Text Scrolling Left
* 17 – Text Scrolling Right
* 18 – Text Scrolling Up
* 19 – Roaming Pixel (pixel roams from top left to bottom right – for testing)
* 20 – Horizontal Scanline
* 21 – Vertical Scanline
* 22 – Fire
* 23 – PSI Swipe between two colours
* 24 – Pulse
* 99 – Select Random Effect

#### Colour:
* 1 – Red
* 2 – Orange
* 3 – Yellow
* 4 – Green
* 5 – Cyan
* 6 – Blue
* 7 – Purple
* 8 – Magenta
* 9 – Pink
* 0 – Default Colour

#### Speed:
This is a value between 0 and 9, with 0 being the fastest

* Flip Flop and Rainbow – 200ms x speed
* Flash – 250ms x speed
* March – 150ms x speed
* Color Swap – 350ms x speed

#### Time (Two digits):
* 00 for continuous on most effects
* 00 for default length on Leia message
* Not used for march or failure effects

#### Summary
So for instance you could send via i2c the command ‘LE30000’ to set all logics to a pale green for the duration of the Leia message, or ‘LE1201510’ to make the front logics run a cylon style effect. One thing to watch out for is power draw if you do some effects.


### HPs
The HPs use the same commands as the FlthyMcNasty HP system, as that code was incorporated into the ReelTwo library. All these commands are prefixed with the code ‘HP’, followed by:

```<HP designation><sequence type><sequence><colour><speed><random state><position>```

#### HP designation:
* F – Front HP
* R – Rear HP
* T – Top HP
* D – Radar Eye (Extra hardware needed, info to come)
* O – Other HP (Extra hardware needed, info to come)
* A – All 3 HPs
* X – Front & Rear HPs
* Y – Front & Top HPs
* Z – Rear & Top HPs
* S – Sequences (See Below)

#### Sequence Type:
This is either 0 for LED functions, or if you’ve added extra hardware to control servos you can use 1 to send signals to move the HPs

#### Sequence:
This is a two digit code

* 01 – Leia sequence (blue)
* 02 – One colour flickering
* 03 – Dim Pulse
* 04 – Cycle
* 05 – Colour
* 06 – Rainbow
* 07 – Short Circuit
* 96 – Clear Function, Disable Random LED Twitch, enable off color override, and random sequences (if enabled)
* 97 – Clear Function, Enable Random LED Twitch using random LED sequences, enable off color override.
* 98 – Clear Function, Disable Random LED Twitch, random sequences (if enabled) and disable off color override
* 99 – Clear Function, Enable Random LED Twitch, using random LED sequences, disable off color override

#### Colour (Optional):
* 1 – Red
* 2 – Yellow
* 3 – Green
* 4 – Cyan
* 5 – Blue
* 6 – Magenta
* 7 – Orange
* 8 – Purple
* 9 – White
* 0 – Random

#### Speed (Optional):
Speed setting integer for the Dim Pulse LED function below (0-9)

#### Random (Optional):
Random State Integer Values
* 1 = Use Default Sequences
* 2 = Use Random Sequences

#### Position (Optional – if you have extra hardware for the servos):
* 0 – Down
* 1 – Center
* 2 – Up
* 3 – Left
* 4 – Upper Left
* 5 – Lower Left
* 6 – Right
* 7 – Upper Right
* 8 – Lower Right



## Serial

