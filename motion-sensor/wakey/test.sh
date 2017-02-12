#!/bin/bash
#

/usr/local/bin/gpio mode 4 in

while true
do

  if [ `gpio read 4` -eq 1 ];
  then

    echo 'Motion Detected: '`date +"%Y-%m-%d_%H-%M-%S"` >> /var/log/webcam/motion.log
    echo 'Motion Detected'

  else

    echo 'No Motion'

  fi
  sleep 1

done
