const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('🚀 Starting Playwright API Tests sequentially with 1 worker...');
  execSync('npx playwright test test/sa_api_driven.spec.js --workers=1', {
    stdio: 'inherit',
    env: {
      ...process.env,
      TEST_API_DATA_DIR: path.join(__dirname, 'api_temp')
    }
  });
  console.log('🟢 Tests completed successfully!');
} catch (error) {
  console.error('🔴 Tests failed!');
  process.exit(1);
}
