const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const screens = [
    { name: 'Collector_address_relocation_form', file: 'Collector_address_relocation_form.html' },
    { name: 'Collector_daily_task_queue', file: 'Collector_daily_task_queue.html' },
    { name: 'Collector_end_of_day_summary', file: 'Collector_end_of_day_summary.html' },
    { name: 'Collector_task_detail_navigation', file: 'Collector_task_detail_navigation.html' },
    { name: 'Leader_district_dashboard', file: 'Leader_district_dashboard.html' },
    { name: 'Leader_dynamic_zoning_override', file: 'Leader_dynamic_zoning_override.html' },
    { name: 'Leader_live_operations_map', file: 'Leader_live_operations_map.html' }
];

const basePath = 'c:/my_vault/10_Projects/04-FieldCollectionPlanning/docs/screens/06072026';
const outPath = 'c:/Users/usEr/.gemini/antigravity/brain/2271cd1a-ccf7-47cb-b336-80bb3950d599/scratch/screenshots';

if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath, { recursive: true });
}

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    for (const screen of screens) {
        const fileUrl = 'file:///' + path.join(basePath, screen.file).replace(/\\/g, '/');
        console.log('Navigating to', fileUrl);
        await page.goto(fileUrl, { waitUntil: 'networkidle' });
        // wait an extra bit for map background
        await page.waitForTimeout(1000);
        const imgPath = path.join(outPath, screen.name + '.png');
        await page.screenshot({ path: imgPath, fullPage: true });
        console.log('Saved', imgPath);
    }

    await browser.close();
})();
