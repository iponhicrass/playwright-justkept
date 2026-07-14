
/**
 * Project-specific keywords for prprocess (mostly Flutter-related).
 */
export const projectKeywords = {
  LOGIN_BROKER: async (page) => {
    await page.goto('https://justkept-dev.freewillsolutions.com/user-login');
    const emailLoc = page.getByPlaceholder('Enter your email').or(page.locator('input').first());
    await emailLoc.waitFor({ state: 'visible', timeout: 10000 });
    await emailLoc.fill('user1@mail.com');
    
    const passLoc = page.locator('input[type="password"]').first();
    await passLoc.fill('1');
    
    const btnLoc = page.getByRole('button', { name: /Sign In/i }).first();
    await btnLoc.click();
    
    await page.waitForTimeout(3000); // wait for redirect
  },

  LOGIN_CUSTOMER: async (page) => {
    await page.goto('https://justkept-dev.freewillsolutions.com/user-login');
    const emailLoc = page.getByPlaceholder('Enter your email').or(page.locator('input').first());
    await emailLoc.waitFor({ state: 'visible', timeout: 10000 });
    await emailLoc.fill('user2@mail.com');
    
    const passLoc = page.locator('input[type="password"]').first();
    await passLoc.fill('1');
    
    const btnLoc = page.getByRole('button', { name: /Sign In/i }).first();
    await btnLoc.click();
    
    await page.waitForTimeout(3000); // wait for redirect
  },

  ROUTE_MOCK: async (page, target, data) => {
    // Target is the URL pattern to intercept, Data is the JSON string to return
    await page.route(target, async route => {
      let bodyData = {};
      try {
        bodyData = JSON.parse(data);
      } catch (e) {
        bodyData = data;
      }
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      };

      if (route.request().method() === 'OPTIONS') {
        await route.fulfill({ status: 204, headers });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers,
        body: typeof bodyData === 'string' ? bodyData : JSON.stringify(bodyData)
      });
    });
  },

  CLICK_FLT: async (page, target, data) => {
    await page.locator(`flt-semantics[flt-semantics-identifier="${target}"]`).click({ force: data === 'force' });
  },

  SELECT_FLT: async (page, target, data) => {
    const ddLocator = page.locator(`flt-semantics[flt-semantics-identifier="${target}"]`);
    await ddLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await ddLocator.click({ force: true });
    await page.waitForTimeout(1000);
    await page.getByLabel(data, { exact: false }).click({ force: true });
  },

  SELECT_ROBOT: async (page, target, data) => {
    const targetLocator = page.getByRole('group', { name: new RegExp(target) });
    await targetLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await targetLocator.click({ force: true });
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: new RegExp(data) }).click({ force: true });
  },

  PICK_DATETIME_RANGE: async (page, target, data) => {
    const parts = data.split(',');
    let startData = data;
    let endData = undefined;

    if (parts.length >= 4) {
      startData = `${parts[0].trim()}, ${parts[1].trim()}`;
      endData = `${parts[2].trim()}, ${parts[3].trim()}`;
    } else if (parts.length === 2) {
      startData = `${parts[0].trim()}, ${parts[1].trim()}`;
    }

    const parseDT = (dt) => {
      if (!dt) return { dateStr: undefined, timeStr: undefined };
      if (dt.includes('|')) {
        const [d, t] = dt.split('|');
        return { dateStr: d.trim(), timeStr: t.trim() };
      }
      if (dt.includes(':')) {
        return { timeStr: dt.trim() };
      }
      return { dateStr: dt.trim() };
    };

    const start = parseDT(startData);
    const end = parseDT(endData);

    await page.getByRole('button', { name: new RegExp(target) }).click({ force: true });
    await page.waitForTimeout(1000);

    if (start.dateStr) {
      await page.getByText(start.dateStr).first().click({ force: true });
      await page.waitForTimeout(800);
    }

    if (end.dateStr) {
      await page.getByText(end.dateStr).first().click({ force: true });
      await page.waitForTimeout(800);
    }

    const okBtn = page.getByText('OK');
    if (await okBtn.isVisible().catch(() => false)) {
      await okBtn.first().click({ force: true });
    }
    await page.waitForTimeout(500);
  },

  PICK_TIME: async (page, target, data) => {
    await projectKeywords.PICK_DATETIME(page, target, data);
  },

  PICK_DATETIME: async (page, target, data) => {
    let dateStr, timeStr;
    if (data.includes('|')) {
      [dateStr, timeStr] = data.split('|');
    } else {
      timeStr = data;
    }
    const [hh, mm] = timeStr.split(':');
    await page.getByRole('button', { name: new RegExp(target) }).click({ force: true });
    await page.waitForTimeout(1000);

    if (dateStr) {
      await page.getByText(dateStr).first().click({ force: true });
      await page.waitForTimeout(800);
    }

    const switchBtn = page.getByRole('button', { name: 'Switch to text input mode' });
    if (await switchBtn.isVisible().catch(() => false)) {
      await switchBtn.click({ force: true });
      await page.waitForTimeout(500);
    }

    const hourBox = page.getByRole('textbox', { name: 'Hour' });
    await hourBox.click({ force: true });
    await hourBox.press('ArrowRight');
    await hourBox.fill(hh);

    const minBox = page.getByRole('textbox', { name: 'Minute' });
    await minBox.click({ force: true });
    await minBox.press('ArrowRight');
    await minBox.fill(mm);

    await page.getByRole('button', { name: 'OK' }).first().click({ force: true });
    await page.waitForTimeout(500);
  },

  DOUBLE_CLICK: async (page, target, data) => {
    const loc = page.locator(target).first();
    await loc.dblclick({ force: true, delay: 50 });
    console.log(`✅ Double-clicked on ${target}`);
  },

  BYPASS_TURNSTILE: async (page, target, data) => {
    await page.waitForTimeout(2000);
    try {
      const outerFrame = page.frameLocator('iframe[name^="name__iframe_"]');
      const innerFrame = outerFrame.frameLocator('iframe[src*="challenges.cloudflare.com"]');
      const checkbox = innerFrame.locator('input[type="checkbox"]')
        .or(innerFrame.locator('#challenge-stage'))
        .or(innerFrame.locator('.cb-lb'))
        .or(innerFrame.locator('body'));
      await checkbox.first().click({ force: true, timeout: 10000 });
      console.log('✅ Turnstile clicked via nested iframe strategy');
    } catch (e1) {
      console.log('⚠️ Nested iframe strategy failed, trying direct frameLocator...');
      try {
        const cfFrame = page.frameLocator('iframe[src*="challenges.cloudflare.com"]').first();
        await cfFrame.locator('input[type="checkbox"]').or(cfFrame.locator('body')).first().click({ force: true, timeout: 10000 });
        console.log('✅ Turnstile clicked via direct iframe strategy');
      } catch (e2) {
        console.log('⚠️ Direct iframe strategy failed, trying page.frames()...');
        const allFrames = page.frames();
        let clicked = false;
        for (const frame of allFrames) {
          if (frame.url().includes('challenges.cloudflare.com')) {
            await frame.locator('input[type="checkbox"]').or(frame.locator('body')).first().click({ force: true });
            console.log('✅ Turnstile clicked via page.frames() strategy');
            clicked = true;
            break;
          }
        }
        if (!clicked) console.warn('❌ Could not find Turnstile iframe in any strategy');
      }
    }
    await page.waitForTimeout(3000);
  },

  SCROLL_TO_FLT: async (page, target) => {
    await page.locator(`flt-semantics[flt-semantics-identifier="${target}"]`).scrollIntoViewIfNeeded();
  },

  WAIT_RACE_SUCCESS: async (page) => {
    await Promise.race([
      page.getByText('Success').waitFor({ state: 'visible', timeout: 30000 }),
      page.getByText('สำเร็จ').waitFor({ state: 'visible', timeout: 30000 }),
      page.locator('flt-semantics[aria-label*="Success"]').waitFor({ state: 'visible', timeout: 30000 })
    ]).catch(e => console.log('Wait for success dialog timed out or interrupted.'));
  },

  CLICK_OK_IF_VISIBLE: async (page) => {
    const okBtn = page.getByRole('button', { name: 'OK' });
    if (await okBtn.isVisible()) {
      await okBtn.click({ force: true });
    }
  },

};
