# Interfacing with a Marcduino

There are two options for interfacing with a Marcduino. 

### 1. Astropixels Plus firmware

With this option, you can connect the r2touch app to the hotspot created by the Astropixels. Any command received from the app will then also be forwarded to the marcduino boards via the Serial2 connection. This is with a thirdparty firmware that I haven't tested or know much about.

For more information check [here](advanced/app.md)

### 2. Standard with Marcduino support

This will act more like a drop in replacement for existing teecees lights. Jawalite serial commands can be sent from a marcduino via serial2 and processed on the Astropixels. To get this working, install the standard-md firmware from the web installer:

[Web Installer](https://dpoulson.github.io/Astropixels/)

Then connect from the slave port on the Marcduino to the Serial2 port on the Astropixels. You just need to connect - to G, and S to R. No need for the +ve/power. 

You may need to edit the commands sent out to add % to the beginning of them. This sends the command out of the slave port on the marcduino (dropping the %) and into the Astropixels

Thanks to Mowee for the help on this.
