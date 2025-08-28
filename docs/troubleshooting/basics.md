# Basic Troubleshooting

This page will walk you through some basic troubleshooting steps. If you are having issues then these are the steps I will ask you to follow so we can figure out what is wrong.

### Wrong colours
If you are seeing the wrong colours and/or not all lights lighting up, there is a chance you have the wrong board connected to the wrong header. Double check the lights boards correspond to the labels on the motherboard.

### Not lighting up

If its just a single board not lighting up, make sure the cable is the correct way round. Signal (row labelled with 'S') should go to signal (or data) on the light board. It is also worth trying the board on another header (such as the RLD) to see if it lights up. If it does, that proves the light board is ok and it may be a dead pin on the ESP32. 

If nothing is lighting, double check all wiring and that power is good. There should at least be a red light on the ESP32. 

### Only lighting up a few LEDs.

If you've definitely got it connected to the correct header but nothing after a certain LED is lighting, then you may have a faulty light board. If a single pixel goes, then 99% of the time nothing after it will work either. Get in touch and I'll get a replacement sorted.