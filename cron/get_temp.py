#!/usr/bin/python
#
# Read serial communications from /dev/ttyACM0 and save temp to output.
#

import serial
import json
import subprocess
from sys import argv

filename = argv[1]
#print filename

def write_temp():
  file = open(filename, 'w')
  ser = serial.Serial('/dev/ttyACM0', 9600)
  input = ser.readline()

  try:
      data = json.loads(input)
      #print data
      file.write(input)
      file.close()
      exit(0)
  except ValueError, e:
      #print e
      write_temp()


write_temp()
