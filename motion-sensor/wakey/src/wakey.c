#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <wiringPi.h>

#define MOTION_PIN 7

int getMonitorStatus() {
  FILE *fp;
  char status[5];
  char falsey[6] = "False";

  /* Open the command for reading. */
  fp = popen("/usr/local/bin/check_monitor.sh", "r");

  /* Read the output and close the fp. */
  fscanf(fp, "%s", status);
  pclose(fp);

  // Compare the output with falsey.
  if (strcmp(status, falsey) == 0) {
    //printf("Monitor not on...\n");
    return 0;
  } else {
    //printf("Monitor is on...\n");
    return 1;
  }
}

int main (void) {
  wiringPiSetup();
  pinMode(MOTION_PIN, INPUT);

  for (;;) {
    // Motion detected...
    //printf("digitalRead(MOSTION_PIN): %d \n", digitalRead(MOTION_PIN));

    if (digitalRead(MOTION_PIN) == HIGH) {
      //printf("Motion detected!\n");

      // Get monitor status.
      int status = getMonitorStatus();

      
      // If monitor status is False execute the turnon.sh script.
      if (status == 0) {
        FILE *fp = popen("/usr/local/bin/turnon.sh", "r");
        pclose(fp);
      }
    }
  }

  return(0);
}

