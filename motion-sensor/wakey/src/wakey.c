#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
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

void checkStatus() {
  // Get monitor status.
  int status = getMonitorStatus();

  // If monitor status is False execute the turnon.sh script.
  if (status == 0) {
    system("/usr/local/bin/turnon.sh");
  }
}

int main (void) {
  // Setup MOTION_PIN for falling-edge interrupt.
  system("gpio edge 7 falling");
  wiringPiSetup();
  pinMode(MOTION_PIN, INPUT);

  for (;;) {
    // Use the interrupt to free up the CPU.
    wiringPiISR(MOTION_PIN, INT_EDGE_FALLING, checkStatus);

    // Non-interrupt method that takes up 80-90% of the CPU.
    //if (digitalRead(MOTION_PIN) == HIGH) {
      //printf("Motion detected!\n");
    //}
  }

  return(0);
}

