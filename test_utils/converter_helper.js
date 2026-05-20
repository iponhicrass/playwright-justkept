/**
 * Helper Utility to convert Playwright recorded steps (or simple descriptions)
 * into the Action/Target/Data format for generate_excel.js.
 * 
 * Usage: Paste your Playwright code or steps here and run the script.
 */

const keywordMapping = {
  'page.goto': (url) => ({ Action: 'GOTO', Target: url, Data: '' }),
  'page.fill': (selector, value) => ({ Action: 'FILL_ROLE', Target: selector, Data: value }),
  'page.click': (selector) => ({ Action: 'CLICK_ROLE', Target: selector, Data: 'force' }),
  'page.getByRole': (role, options) => {
    const name = options?.name?.toString().replace(/\//g, '') || '';
    return { Action: 'CLICK_ROLE', Target: `${role}|${name}`, Data: 'force' };
  },
  'page.screenshot': (path) => ({ Action: 'SCREENSHOT', Target: path, Data: 'full' }),
};

function convertPlaywrightToKeywords(codeSnippet) {
  // Simple regex-based parser for demonstration
  // In a real scenario, this would be more robust.
  const steps = [];

  if (codeSnippet.includes('getByRole')) {
    // Example: await page.getByRole('button', { name: 'Search' }).click();
    const regex = /page\.getByRole\('(\w+)',\s*{ name: '(.+)' }\)\.click\(\)/g;
    let match;
    while ((match = regex.exec(codeSnippet)) !== null) {
      steps.push({ Action: 'CLICK_ROLE', Target: `${match[1]}|${match[2]}`, Data: 'force' });
    }
  }

  if (codeSnippet.includes('fill')) {
    // Example: await page.getByRole('textbox', { name: 'Lotus' }).fill('123');
    const regex = /page\.getByRole\('textbox',\s*{ name: '(.+)' }\)\.fill\('(.+)'\)/g;
    let match;
    while ((match = regex.exec(codeSnippet)) !== null) {
      steps.push({ Action: 'FILL_ROLE', Target: `textbox|${match[1]}`, Data: match[2] });
    }
  }

  return steps;
}

// EXAMPLE USAGE:
const recordedCode = `
  await page.goto('https://mspservice-uat.freewillgroup.com/dev/prprocess-service/login');
  await page.getByRole('textbox', { name: 'login_tf_username example' }).click();
  await page.getByRole('textbox', { name: 'login_tf_username example' }).fill('admin');
  await page.getByRole('textbox', { name: 'login_tf_password pass**' }).click();
  await page.getByRole('textbox', { name: 'login_tf_password pass**' }).fill('1');
  await page.getByRole('button', { name: 'login_btn_login Login' }).click();
`;

console.log('--- Converted Keywords for generate_excel.js ---');
const converted = convertPlaywrightToKeywords(recordedCode);
console.log(JSON.stringify(converted, null, 2));
console.log('\n--- End of Conversion ---');
