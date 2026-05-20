import { test } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { loadExcelScenarios } from './utils/excelRunner';
import { executeApiStep } from './utils/apiKeywordMapper';
import { injectVariables } from './utils/variableInjector';

/**
 * SA API Keyword-Driven Engine
 *
 * ทำงานเหมือน sa_excel_driven.spec.js แต่:
 * - ไม่เปิด browser — ทำงานได้เร็วกว่ามาก
 * - ใช้ Playwright APIRequestContext สำหรับยิง HTTP request
 * - อ่าน Excel จาก TEST_API_DATA_DIR (default: data/api)
 *
 * วิธีรัน:
 *   npx playwright test test/sa_api_driven.spec.js
 *   TEST_API_DATA_DIR=data/api npx playwright test test/sa_api_driven.spec.js
 *
 * Keywords ที่ใช้ได้ใน Excel:
 *   SET_BASE_URL | https://api.example.com |
 *   SET_HEADER   | Authorization           | Bearer {{TOKEN}}
 *   SET_HEADER   | Content-Type            | application/json
 *   API_GET      | /api/users              |
 *   API_POST     | /api/login              | {"email":"user@test.com","password":"1234"}
 *   API_PUT      | /api/users/1            | {"name":"New Name"}
 *   API_PATCH    | /api/users/1            | {"active":true}
 *   API_DELETE   | /api/users/1            |
 *   CHECK_STATUS | 200                     | pass
 *   CHECK_BODY   | "success":true          | pass
 *   CHECK_JSON   | data.name|John          | pass
 *   STORE_JSON   | data.token              | AUTH_TOKEN
 *   LOG_RESPONSE |                         |
 *   SET_VAR      | MY_VAR                  | my_value
 *   CLEAR_HEADERS|                         |
 */

const testDataDir = process.env.TEST_API_DATA_DIR || path.join(process.cwd(), 'data/api');

if (!fs.existsSync(testDataDir)) {
  console.warn(`⚠️  API test data directory [${testDataDir}] not found. Skipping API-driven tests.`);
  console.warn(`   → Create folder and put Excel files in: ${testDataDir}`);
} else {
  const excelFiles = fs.readdirSync(testDataDir)
    .filter(file => file.endsWith('.xlsx') && !file.startsWith('~'));

  if (excelFiles.length === 0) {
    console.warn(`⚠️  Do not find .xlsx file in [${testDataDir}]`);
  }

  test.describe('SA API Keyword-Driven Engine', () => {

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
              ? `API Scenario: ${sheetName} (Data Row ${idx + 1})`
              : `API Scenario: ${sheetName}`;

            // ใช้ { request } เท่านั้น — ไม่มี page ดังนั้น browser ไม่ถูกเปิด
            test(testTitle, async ({ request }) => {
              test.setTimeout(120000);
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
                    await executeApiStep(request, processedRow);
                    passedSteps++;
                    console.log(`  ✅ PASS | ${stepLabel}`);
                  });
                }

                console.log(`\n🟢 RESULT: PASSED | ${testTitle}`);
                console.log(`   Steps executed: ${passedSteps}`);
                console.log(`==========================================\n`);

              } catch (error) {
                failedStep = error.message || String(error);
                console.error(`\n🔴 RESULT: FAILED | ${testTitle}`);
                console.error(`   Steps passed before failure: ${passedSteps}`);
                console.error(`   Error: ${failedStep}`);
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
