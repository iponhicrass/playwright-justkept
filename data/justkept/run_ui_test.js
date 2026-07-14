const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('🚀 Starting Playwright UI Tests sequentially with 1 worker...');
  execSync('npx playwright test test/sa_excel_driven.spec.js --workers=1', {
    stdio: 'inherit',
    env: {
      ...process.env,
      TEST_DATA_DIR: path.join(__dirname, 'ui')
    }
  });
  console.log('🟢 UI Tests completed successfully!');
} catch (error) {
  console.error('🔴 UI Tests failed!');
  process.exit(1);
}
