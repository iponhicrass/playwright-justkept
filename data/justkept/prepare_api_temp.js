const fs = require('fs');
const path = require('path');

const tempDir = path.join(__dirname, 'api_temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

fs.copyFileSync(
  path.join(__dirname, 'api', 'justkept_api_phase2_test_cases.xlsx'),
  path.join(tempDir, 'justkept_api_phase2_test_cases.xlsx')
);

console.log('✅ Prepared isolated folder: data/JustKept/api_temp');
