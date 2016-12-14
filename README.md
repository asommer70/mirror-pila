# Mirror Pila!

Web app for displaying information in the mirror.  The smart mirror, with you know a Rapsberry Pi and Arduino.

# Smart Mirror

Inspired by [this video](https://youtu.be/fkVBAcvbrjU), I built my own version of the smart mirror using reflective plexi glass a Raspberry Pi Zero and an Arduino.

The Arduino is attached to a USB hub along with a wifi dongle.  Also, wired to the Arduino is a temperature sensor and a motion sensor.  The temp sensor came in a kit and is super simple to get working with Arduino.  This will be used to gather information about the internal temp of the room.

The motion sensor is used to turn the monitor on after it goes to sleep.  The motion sensor is also easy to setup.

Both sensors communicate with the Pi via the serial console over USB.
