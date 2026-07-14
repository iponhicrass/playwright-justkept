import { expect } from '@playwright/test';

/**
 * Core Playwright keywords that are generally applicable across projects.
 */
export const coreKeywords = {
  GOTO: async (page, target) => {
    await page.goto(target);
  },

  WAIT_SELECTOR: async (page, target) => {
    await page.waitForSelector(target);
  },

  WAIT_TIME: async (page, target) => {
    await page.waitForTimeout(parseInt(target, 10));
  },

  FILL_ROLE: async (page, target, data) => {
    let fillLoc;
    if (target.includes('|')) {
      const [role, name] = target.split('|');
      fillLoc = page.locator(`[id*="${name}"]`)
        .or(page.locator(`[aria-label*="${name}"]`))
        .or(page.locator(`[flt-semantics-identifier*="${name}"]`))
        .or(page.getByText(name))
        .or(page.getByRole(role, { name: new RegExp(name) }))
        .or(page.getByLabel(new RegExp(name)))
        .first();
    } else {
      fillLoc = page.locator(`[id*="${target}"]`)
        .or(page.locator(`[aria-label*="${target}"]`))
        .or(page.locator(`[flt-semantics-identifier*="${target}"]`))
        .or(page.getByText(target))
        .or(page.getByRole('textbox', { name: new RegExp(target) }))
        .or(page.getByLabel(new RegExp(target)))
        .first();
    }
    await fillLoc.scrollIntoViewIfNeeded();
    await fillLoc.click({ force: true });
    await page.waitForTimeout(800);
    try {
      await fillLoc.fill(data, { timeout: 2000 });
    } catch (e) {
      // Fallback for Flutter flt-semantics elements
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Meta+A');
      await page.keyboard.press('Backspace');
      await page.keyboard.type(data);
    }
    await page.keyboard.press('Tab');
  },

  CLICK_ROLE: async (page, target) => {
    let clickLoc;
    if (target.includes('|')) {
      const [role, name] = target.split('|');
      clickLoc = page.locator(`[id*="${name}"]`)
        .or(page.locator(`[aria-label*="${name}"]`))
        .or(page.locator(`[flt-semantics-identifier*="${name}"]`))
        .or(page.getByText(name))
        .or(page.getByRole(role, { name: new RegExp(name) }))
        .or(page.getByLabel(new RegExp(name)))
        .first();
    } else {
      clickLoc = page.locator(`[id*="${target}"]`)
        .or(page.locator(`[aria-label*="${target}"]`))
        .or(page.locator(`[flt-semantics-identifier*="${target}"]`))
        .or(page.getByText(target))
        .or(page.getByRole('button', { name: new RegExp(target) }))
        .or(page.getByLabel(new RegExp(target)))
        .first();
    }
    await clickLoc.scrollIntoViewIfNeeded();
    await clickLoc.click({ force: true });
  },

  CLICK_TEXT: async (page, target, data) => {
    await page.getByText(target).click({ force: data === 'force' });
  },

  VERIFY_TEXT: async (page, target, data) => {
    await expect(page.locator(target)).toHaveText(data);
  },

  SCREENSHOT: async (page, target, data) => {
    await page.screenshot({ path: target, fullPage: data === 'full' });
  },

  DOWNLOAD_ROLE: async (page, target) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: new RegExp(`\\b${target}\\b`) }).click();
    await downloadPromise;
  },

  UPLOAD_FILE: async (page, target, data) => {
    const fileChooserPromise = page.waitForEvent('filechooser');
    if (target.includes('|')) {
      const [role, name] = target.split('|');
      await page.getByRole(role, { name: new RegExp(name) }).click({ force: true });
    } else {
      await page.getByRole('group', { name: new RegExp(target) }).click({ force: true });
    }
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(data);
    await page.waitForTimeout(1000);
  },

  // Keyword ใหม่สำหรับ Upload File โดยชี้ Locator ตรงๆ
  UPLOAD_LOCATOR: async (page, target, data) => {
    // ใช้ setInputFiles ยัดไฟล์ลงไปใน <input type="file"> เลย
    // (Playwright จัดการ input ที่ซ่อนอยู่ได้สบายมากด้วยวิธีนี้)
    await page.locator(target).setInputFiles(data);
    await page.waitForTimeout(1000); // รอให้ UI แสดงผลชื่อไฟล์สักนิด
  },

  SELECT_OPTION: async (page, target, data) => {
    const selectLoc = page.locator(target).first();
    await selectLoc.scrollIntoViewIfNeeded();
    await selectLoc.selectOption(data);
    await page.waitForTimeout(500);
  },



  LOG: async (page, target, data) => {
    console.log(data);
  },

  SCROLL: async (page, target, data) => {
    await page.mouse.move(500, 500);
    await page.mouse.wheel(0, parseInt(data, 10) || 500);
  },

  PRESS_ROLE: async (page, target, data) => {
    if (target.includes('|')) {
      const [role, name] = target.split('|');
      await page.getByRole(role, { name: new RegExp(name) }).press(data);
    }
  },

  SCROLL_TO_ROLE: async (page, target) => {
    if (target.includes('|')) {
      const [role, name] = target.split('|');
      await page.getByRole(role, { name: new RegExp(name) }).scrollIntoViewIfNeeded();
    } else {
      await page.getByRole('textbox', { name: new RegExp(target) }).scrollIntoViewIfNeeded();
    }
  },

  CLICK_LOCATOR: async (page, target, data) => {
    await page.locator(target).click({ force: data === 'force' });
  },

  FILL_LOCATOR: async (page, target, data) => {
    const fillLoc = page.locator(target).first();
    await fillLoc.scrollIntoViewIfNeeded();
    await fillLoc.click({ force: true });
    await page.waitForTimeout(800);
    try {
      await fillLoc.fill(data, { timeout: 2000 });
    } catch (e) {
      // Fallback for Flutter flt-semantics elements
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Meta+A');
      await page.keyboard.press('Backspace');
      await page.keyboard.type(data);
    }
    await page.keyboard.press('Tab');
  },

  CLICK_TEXT_ROLE: async (page, target, data) => {
    let clickLoc;
    if (target.includes('|')) {
      const [role, name] = target.split('|');
      clickLoc = page.getByRole(role, { name: name, exact: true })
        .or(page.locator(`[id="${name}"], [flt-semantics-identifier="${name}"]`))
        .first();
    } else {
      clickLoc = page.getByRole('button', { name: target, exact: true })
        .or(page.locator(`[id="${target}"], [flt-semantics-identifier="${target}"]`))
        .first();
    }
    await clickLoc.scrollIntoViewIfNeeded();
    await clickLoc.click({ force: data === 'force' });
  },

  CLICK_ID: async (page, target, data) => {
    const loc = page.locator(`[id="${target}"], [flt-semantics-identifier="${target}"]`).first();
    await loc.scrollIntoViewIfNeeded();
    await loc.click({ force: data === 'force' });
  },

  FILL_ID: async (page, target, data) => {
    const loc = page.locator(`[id="${target}"], [flt-semantics-identifier="${target}"]`).first();
    await loc.scrollIntoViewIfNeeded();
    await loc.click({ force: true });
    await page.waitForTimeout(500);
    try {
      await loc.fill(data, { timeout: 2000 });
    } catch (e) {
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Meta+A');
      await page.keyboard.press('Backspace');
      await page.keyboard.type(data);
    }
    await page.keyboard.press('Tab');
  },

  /**
   * CHECK_RESULT: ตรวจสอบว่า element / text / value มีอยู่บนหน้าหรือไม่
   *
   * Target format: "mode|selector"
   * ┌──────────┬─────────────────────────────────────────────────────────────────┐
   * │ Mode     │ Selector / ความหมาย                                              │
   * ├──────────┼─────────────────────────────────────────────────────────────────┤
   * │ text     │ ข้อความที่ต้องการเห็นบนหน้า (partial match)                    │
   * │ id       │ flt-semantics-identifier ของ Flutter element                    │
   * │ value    │ CSS locator ของ input — เช็คว่า มีค่าอยู่ (ไม่ว่าง)           │
   * │ role     │ "role,name" เช่น "button,Submit" — เช็คว่า visible              │
   * │ locator  │ CSS / XPath selector ทั่วไป                                     │
   * │ url      │ path/URL ที่คาดว่า browser จะ redirect ไป (partial match)       │
   * └──────────┴─────────────────────────────────────────────────────────────────┘
   *
   * Data: "pass" (expect มีอยู่ / visible / match) | "fail" (expect ไม่ match)
   *
   * ตัวอย่าง:
   *   { Action: 'CHECK_RESULT', Target: 'text|สำเร็จ',              Data: 'pass' }
   *   { Action: 'CHECK_RESULT', Target: 'text|Error',               Data: 'fail' }
   *   { Action: 'CHECK_RESULT', Target: 'id|worklist_btn_create',   Data: 'pass' }
   *   { Action: 'CHECK_RESULT', Target: 'role|button,Submit',       Data: 'pass' }
   *   { Action: 'CHECK_RESULT', Target: 'locator|.success-message', Data: 'pass' }
   *   { Action: 'CHECK_RESULT', Target: 'value|input[name="email"]',Data: 'pass' }
   *   { Action: 'CHECK_RESULT', Target: 'url|/dashboard',           Data: 'pass' }
   *   { Action: 'CHECK_RESULT', Target: 'url|/login',               Data: 'fail' }
   */
  CHECK_RESULT: async (page, target, data) => {
    const pipeIdx = target.indexOf('|');
    const mode = target.substring(0, pipeIdx).trim().toLowerCase();
    const selector = target.substring(pipeIdx + 1).trim();
    const expectPass = (data?.toString().toLowerCase() ?? 'pass') !== 'fail';
    const TIMEOUT = 5000;

    let isFound = false;
    let actualValue = null;

    try {
      if (mode === 'text') {
        // รองรับ partial match บน visible text ทั่วหน้า
        isFound = await page.getByText(selector, { exact: false })
          .first()
          .isVisible({ timeout: TIMEOUT })
          .catch(() => false);

      } else if (mode === 'id') {
        // รองรับทั้ง Flutter flt-semantics-identifier และ standard HTML id
        isFound = await page
          .locator(`[flt-semantics-identifier="${selector}"], [id="${selector}"]`)
          .first()
          .isVisible({ timeout: TIMEOUT })
          .catch(() => false);

      } else if (mode === 'value') {
        // เช็คว่า input/textarea มี value อยู่ (ไม่ว่าง)
        actualValue = await page.locator(selector).first().inputValue().catch(() => '');
        isFound = actualValue.trim() !== '';

      } else if (mode === 'role') {
        // format: "role|roleName,labelName"  e.g. "role|button,Submit"
        const [roleName, labelName] = selector.split(',').map(s => s.trim());
        const locatorArgs = labelName
          ? page.getByRole(roleName, { name: new RegExp(labelName) })
          : page.getByRole(roleName);
        isFound = await locatorArgs.first().isVisible({ timeout: TIMEOUT }).catch(() => false);

      } else if (mode === 'checked') {
        // เช็คสถานะ isChecked ของ checkbox หรือ radio
        isFound = await page.locator(selector).first().isChecked({ timeout: TIMEOUT }).catch(() => false);

      } else if (mode === 'radio_value') {
        // เช็คว่า radio group (ระบุด้วย name) มีตัวเลือกไหนถูกเลือกอยู่
        // format: "radio_value|name=expectedValue"
        const [radioName, expectedVal] = selector.split('=');
        actualValue = await page.locator(`input[type="radio"][name="${radioName}"]:checked`).inputValue().catch(() => 'none');
        isFound = actualValue === expectedVal;

      } else if (mode === 'locator') {
        // CSS / XPath selector ทั่วไป
        isFound = await page.locator(selector).first().isVisible({ timeout: TIMEOUT }).catch(() => false);

      } else if (mode === 'url') {
        // เช็ค URL path หลัง redirect (partial match)
        // รอให้ navigation เสร็จก่อนด้วย waitForURL
        await page.waitForURL(`**${selector}**`, { timeout: TIMEOUT }).catch(() => { });
        const currentURL = page.url();
        actualValue = currentURL;
        isFound = currentURL.includes(selector);

      } else {
        console.warn(`⚠️ CHECK_RESULT: unknown mode "${mode}". Supported: text | id | value | role | locator | url`);
        return;
      }
    } catch (e) {
      isFound = false;
    }

    // ─── Evaluate pass/fail ───────────────────────────────────────────────
    const valueInfo = actualValue !== null ? ` (actual="${actualValue}")` : '';
    const status = (expectPass && isFound) || (!expectPass && !isFound) ? '✅ PASS' : '❌ FAIL';
    let foundMsg;
    if (mode === 'radio_value') {
      foundMsg = actualValue;
    } else if (mode === 'url') {
      foundMsg = isFound ? 'url matched' : 'url not matched';
    } else {
      foundMsg = isFound ? 'found/visible' : 'not found/hidden';
    }
    const expectMsg = expectPass ? 'expected: match/exist' : 'expected: not match/exist';
    const msg = `CHECK_RESULT [${mode}] "${selector}"${valueInfo} → ${status} | ${expectMsg}, actual: ${foundMsg}`;

    if ((expectPass && isFound) || (!expectPass && !isFound)) {
      console.log(`  ${msg}`);
    } else {
      throw new Error(msg);
    }
  }
};
