#!/usr/bin/python
#
# Read serial communications from /dev/ttyACM0 and save temp and humidity.
#

import serial
import json
import subprocess
from sys import argv

filename = argv[1]
data = {}

def get_data():
    ser = serial.Serial('/dev/ttyACM0', 9600)
    input = ser.readline()
    data = json.loads(input)
    #print data

    return data


result = None
while result is None:
    try:
        if 'temp' not in data:
            data.update(get_data())
        elif 'humidity' not in data:
            data.update(get_data())
        else:
            result = True
    except:
        pass


output = open(filename, 'w')
output.write(json.dumps(data))
output.close()
exit(0)
