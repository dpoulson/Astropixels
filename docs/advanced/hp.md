# Customising the HPs

## Changing the frequency/duration.

There are two functions for this: 

* setLEDTwitchInterval(min, max)
* setLEDTwitchRunInterval(min, max)

With these you can set the interval they'll come on between two numbers (in seconds), and how long they'll run for (in seconds)

So for example, you can add this to setup()

```
frontHolo.setLEDTwitchInterval(5,10);
frontHolo.setLEDTwitchRunInterval(5,10);
```

That will set the front holo to come on between every 5 and 10 seconds, for a run time of between 5 and 10 seconds.

Each holo can be different.

### Changing the default sequence and colour

As well as controlling the frequency and duration, you can also control which sequence is used when the HPs come on, and what colour they're set to. 

#### Colours: 

* 1 = Red
* 2 = Yellow
* 3 = Green
* 4 = Cyan (Aqua)
* 5 = Blue
* 6 = Magenta
* 7 = Orange
* 8 = Purple
* 9 = White
* 0 = Random    

#### Sequences

* 1 = Leia, blue to mimic the hologram
* 2 = Similar to the Leia, but can specify a colour
* 3 = Pulse
* 4 = Cycle
* 5 = Solid colour
* 6 = Rainbow
* 7 = Short Circuit

These can be set in the setup() function, similar to the twitch values. 

```
frontHolo.setLEDTwitchColor(1);
frontHolo.setLEDTwitchSequence(5);
```

{% hint style="info" %}
Note: By default, the sequence is 1 and always blue. So if you want a different colour you need to set both the twitch colour, and the sequence. 
{% endhint %}
