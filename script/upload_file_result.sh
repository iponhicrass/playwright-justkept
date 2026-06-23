#!/bin/bash

# Upload test result XML to the reporting server
curl --location 'http://10.22.26.77:3030/api/addxmldata' \
  --form 'file=@"test-results/results.xml"' \
  --form 'mainproduct="z-PRProcess"' \
  --form 'subproduct="playwright-prprocess-frontend"'
