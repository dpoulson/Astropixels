# Coding Environment

## IDE

Download and set up the [Arduino IDE](https://www.arduino.cc/en/software/)

Once this is done you will need to install some libraries. 

* Adafruit_NeoPixel
* ReelTwo

The neopixel library can be installed as per a standard module in the IDE. The ReelTwo library will need to be installed manually. 

## Installing ReelTwo

Go to [ReelTwo repository](https://github.com/reeltwo/Reeltwo), and click the big green 'Code' button. There should be an option to download a zip file.

With that downloaded you need to find your Arduino libraries directory. This is different on various version and operating systems. If you go to File->Preferences then you should see Sketchbook Location. The libraries directory is under that folder. 

Unzip the ReelTwo file you downloaded into the libraries file and restart the Arduino IDE. 

## Checking ReelTwo installation

When you restart the IDE you should be able to go to file->examples and find ReelTwo in the list.

## Installing the ESP32 board library.

As the Astropixels run on an ESP32 and that board is not in the default installation, you need to add a board library. 

Go to File->Preferences and add this to the box labelled 'Additional Boards Manager URL'

```https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json```

Then you can go to Tools->Board->Board Manager 

This will open up a window from which you can install the ESP32 library. Enter ESP32 in the search bar and you should see an entry by Espressif Systems available. 

Select the latest 2.0.* version and click install.

{% hint style="warning" %}
There is currently a bug in the ReelTwo library which makes it incompatible with the latest v3 ESP32 board libraries.
{% endhint %}

## Testing

You should now be able to go to File->Examples->ReelTwo->astropixels to open the basic sketch

Hit compile at the top of the IDE and it should all compile cleanly. 
