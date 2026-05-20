#!/bin/bash

# Load variables from environment or use defaults
MAIN_PRODUCT=${MAIN_PRODUCT_DASHBOARD:-"z-Test"}
SUB_PRODUCT=${SUB_PRODUCT_DASHBOARD:-"playwright-test"}

# Upload test result XML to the reporting server
curl --location 'http://10.22.26.77:3030/api/addxmldata' \
  --form 'file=@"test-results/results.xml"' \
  --form "mainproduct=Z_${MAIN_PRODUCT}" \
  --form "subproduct=${SUB_PRODUCT}"
