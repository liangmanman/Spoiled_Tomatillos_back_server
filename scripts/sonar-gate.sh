#!/bin/bash
set -ev
echo ${sonar.qualitygate}
if [ "${sonar}.${qualitygate}" = "Passed" ]; then
  exit 0
else
  echo ERROR: SonarCloud
  exit 1 # terminate and indicate error
fi