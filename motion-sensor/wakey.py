#!/usr/bin/python
#
# Monitor GPIO pin 4 for signal from PIR motion sensor.
#

import serial
import json
import subprocess
import os
from gpiozero import MotionSensor
os.environ['DISPLAY'] = ":0"

pir = MotionSensor(4)
env = os.environ.copy()

check = "/usr/local/bin/check_monitor.sh"
turnon = ["/usr/local/bin/turnon.sh"]

ser = serial.Serial('/dev/ttyACM0', 9600)

while True:
    if pir.motion_detected:
        try:
            monitor_status = subprocess.check_output(check, shell=True)
            #print monitor_status
        except:
            pass

        if monitor_status == "False\n":
            subprocess.Popen(turnon, env=env)

