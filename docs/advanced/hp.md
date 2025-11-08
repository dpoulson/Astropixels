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

