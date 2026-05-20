// playwright.config.ts
import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    use: {
        baseURL: process.env.BASE_URL || 'https://mspservice-uat.freewillgroup.com',
        headless: true
    },
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['junit', { outputFile: 'test-results/results.xml' }]
    ],
});