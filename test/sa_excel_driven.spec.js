import { test } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { loadExcelScenarios } from './utils/excelRunner';
import { executeStep } from './utils/keywordMapper';
import { injectVariables } from './utils/variableInjector';

// Use environment variable for test data directory, with a default fallback
const testDataDir = process.env.TEST_DATA_DIR || path.join(process.cwd(), 'data/JustKept');
const outputDir = 'test-results/screenshots';

// Ensure the directory exists before readdir
if (!fs.existsSync(testDataDir)) {
  console.warn(`⚠️ Warning: Test data directory [${testDataDir}] not found. Skipping Excel-driven tests.`);
} else {
  const excelFiles = fs.readdirSync(testDataDir).filter(file => file.endsWith('.xlsx') && !file.startsWith('~'));

  test.describe('SA Excel Keyword-Driven Engine', () => {

    for (const file of excelFiles) {
      const excelPath = path.join(testDataDir, file);
      const scenariosMap = loadExcelScenarios(excelPath);

      test.describe(`File: ${file}`, () => {

        for (const [sheetName, scenario] of Object.entries(scenariosMap)) {

          const datasets = scenario.datasets && scenario.datasets.length > 0
            ? scenario.datasets
            : [null];

          for (let idx = 0; idx < datasets.length; idx++) {
            const dataset = datasets[idx];
            const testTitle = dataset
              ? `Sheet Scenario: ${sheetName} (Data Row ${idx + 1})`
              : `Sheet Scenario: ${sheetName}`;

            test(testTitle, async ({ page }, testInfo) => {
              test.setTimeout(300000);
              console.log(`\n========== ${testTitle} ==========`);
              if (dataset) console.log('Data Injected:', JSON.stringify(dataset));

              let passedSteps = 0;
              let failedStep = null;

              try {
                for (const row of scenario.steps) {
                  if (!row['Action']) continue;

                  const processedRow = injectVariables(row, dataset);
                  const stepLabel = `Step ${processedRow.Step || '-'}: ${processedRow.Action} -> [${processedRow.Target || '-'}]`;

                  await test.step(stepLabel, async () => {
                    await executeStep(page, processedRow);
                    passedSteps++;
                    console.log(`  ✅ PASS | ${stepLabel}`);
                  });
                }

                console.log(`\n🟢 RESULT: PASSED | ${testTitle}`);
                console.log(`   Steps executed: ${passedSteps}`);
                console.log(`==========================================\n`);

              } catch (error) {
                failedStep = error.message || String(error);
                const screenshotName = `failure-${testInfo.title.replace(/\s+/g, '_')}.png`;
                const screenshotPath = path.join(outputDir, screenshotName);
                await page.screenshot({ path: screenshotPath, fullPage: true });

                console.error(`\n🔴 RESULT: FAILED | ${testTitle}`);
                console.error(`   Steps passed before failure: ${passedSteps}`);
                console.error(`   Error: ${failedStep}`);
                console.error(`   Screenshot: ${screenshotPath}`);
                console.error(`==========================================\n`);
                throw error;
              }
            });
          }
        }

      });
    }

  });
}
