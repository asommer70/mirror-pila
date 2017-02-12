#!/bin/bash
#
# Copy wakey.py, turnon.sh, and check_monitor.sh to /usr/local/bin.
# Copy wakey.servie to /etc/systemd/system and enable the service.
#

cp check_monitor.sh turnon.sh /usr/local/bin
cd wakey
make
cp dist/wakey /usr/local/bin
cd ..
cp wakey.service /etc/systemd/system/
systemctl enable wakey.service
systemctl start wakey.service
