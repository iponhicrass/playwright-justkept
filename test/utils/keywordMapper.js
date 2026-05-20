import { coreKeywords } from './coreKeywords';
import { projectKeywords } from './projectKeywords';

const allKeywords = {
  ...coreKeywords,
  ...projectKeywords
};

/**
 * Executes a single keyword-driven step from the CSV.
 * @param {import('@playwright/test').Page} page
 * @param {Object} row
 */
export async function executeStep(page, row) {
  const action = String(row['Action'] || '').trim().toUpperCase();
  const target = String(row['Target'] || '').trim();
  const data = row['Data'];

  if (!action) return;

  console.log(`› Executing: [${action}] on [${target || 'N/A'}] with data [${data || 'N/A'}]`);

  const keywordFunc = allKeywords[action];

  if (keywordFunc) {
    await keywordFunc(page, target, data);
  } else {
    throw new Error(`❌ Keyword [${action}] is not mapped. Please add it to coreKeywords.js or projectKeywords.js.`);
  }
}
