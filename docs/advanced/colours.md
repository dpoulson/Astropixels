# Changing Colours

The Astropixel light boards are all fully RGB and so can be customised to any colour you want.

## PSIs

For the PSIs you can create a new definition. The PSIs use the LogicEngine code, the same as the main Logics.

```
LogicEngineSettings LogicEngineFrontPSICustom(
    LogicEngineDefaults::FRONT_FADE,
    LogicEngineDefaults::FRONT_HUE,
    LogicEngineDefaults::FRONT_DELAY,
    LogicEngineDefaults::FRONT_PSI_PAL,
    LogicEngineDefaults::FRONT_BRI,    LogicEngineDefaults::sequence(LogicEngineDefaults::PSICOLORWIPE,LogicEngineDefaults::kRed));

AstroPixelFrontPSI<> frontPSI(LogicEngineFrontPSICustom, 4);
```

The simplest change you can make is to the colours used. This is set in the 

```LogicEngineDefaults::sequence(LogicEngineDefaults::PSICOLORWIPE,LogicEngineDefaults::kRed)); ```

section. Change the kRed to a different value.

<table>
<tr><th></th><th>Primary Colour</th><th>Secondary Colour</th></tr>
<tr><td>kRed</td><td>	Red</td><td>	Blue</td></tr>
<tr><td>kBlue</td><td>	Blue</td><td>Red</td></tr>
<tr><td>kYellow</td><td>	Yellow</td><td>	Green</td></tr>
<tr><td>kGreen	</td><td>Green</td><td>	Yellow</td></tr>
<tr><td>kCyan</td><td>Cyan</td><td>	Orange</td></tr>
<tr><td>kOrange</td><td>	Orange	</td><td>Cyan</td></tr>
<tr><td>kPurple</td><td>	Purple	</td><td>Magenta</td></tr>
<tr><td>kPink</td><td>Pink	</td><td>Blue</td></tr>
</table>

## Logics

Logics are configure using a set of values much like the PSIs:

```
static LogicEngineSettings LogicEngineFLDCustom(
    LogicEngineDefaults::FRONT_FADE,
    LogicEngineDefaults::FRONT_HUE,
    LogicEngineDefaults::FRONT_DELAY,
    LogicEngineDefaults::FRONT_PAL,
    LogicEngineDefaults::FRONT_BRI,
    LogicEngineDefaults::sequence(LogicEngineDefaults::NORMAL));
```

### HUE
The hue setting rotates the selected palette around a colour wheel using a value between 0 and 255. So by combining this with a palette you can make various different colours of lights. In general the order is:

red -> yellow -> green -> cyan -> blue -> violet -> pink -> red

For instance, if you set the palette to 2 (monotone red) and then set the hue to around 220, you will get a nice R2-KT colour.

### DELAY and FADE
These effect the transition of the hues.

### PAL
There are 5 palettes to currently choose from.

0 – Default front colours
1 – Default rear colours
2 – Monotone red
3 – Dual colour red and yellow
4 – blue and red
5 – yellow and green

### BRI
This is just the brightness of the display as a value between 0 and 255. The defaults are normally ok but you can tweak them. Beware of both heat and power consumption if you raise it too high.

### Defaults
<table>
<tr><th></th><th>Front</th><th>	Rear</th></tr>
<tr><td>FADE</td><td>	1</td><td>	3</td></tr>
<tr><td>HUE</td><td>	0</td><td>	0</td></tr>
<tr><td>DELAY</td><td>	10</td><td>	40</td></tr>
<tr><td>PAL</td><td>	0</td><td>	1</td></tr>
<tr><td>BRI</td><td>	160</td><td>	140</td></tr>
</table>

Also, the last option is for the default sequence that the display will run. This was needed to make the PSI default to the swipe, but could also be used to have the logics do a different effect constantly such as a line swiping left and right (cylon droid?!)