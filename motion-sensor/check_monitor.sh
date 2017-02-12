#!/bin/bash

DISPLAY=:0
#xset -q | grep 'Monitor is On'
xset -q -display :0 > /tmp/monitor_status.txt 

if grep -q 'Monitor is On' /tmp/monitor_status.txt; then
  echo -n True
else
  echo -n False
fi
