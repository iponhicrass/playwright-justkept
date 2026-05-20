import { apiKeywords } from './apiKeywords';

/**
 * Executes a single keyword-driven step สำหรับ API Testing
 * ไม่ใช้ browser/page — ใช้เฉพาะ Playwright APIRequestContext
 *
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {Object} row  — { Action, Target, Data, Step }
 */
export async function executeApiStep(request, row) {
  const action = String(row['Action'] || '').trim().toUpperCase();
  const target = String(row['Target'] || '').trim();
  const data   = row['Data'];

  if (!action) return;

  console.log(`› Executing: [${action}] on [${target || 'N/A'}] with data [${data || 'N/A'}]`);

  const keywordFunc = apiKeywords[action];

  if (keywordFunc) {
    await keywordFunc(request, target, data);
  } else {
    throw new Error(
      `❌ API Keyword [${action}] is not mapped. Please add it to apiKeywords.js.\n` +
      `   Available: ${Object.keys(apiKeywords).join(', ')}`
    );
  }
}
