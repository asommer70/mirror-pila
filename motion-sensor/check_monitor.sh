#!/bin/bash

export DISPLAY=:0
#xset -q | grep 'Monitor is On'
xset -q > /tmp/monitor_status.txt 

if grep -q 'Monitor is On' /tmp/monitor_status.txt; then
  echo True
else
  echo False
fi
