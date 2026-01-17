import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 2,
  reporter: 'html',
  use: { baseURL: 'https://www.saucedemo.com' },
  projects: [ { name: 'chromium', use: { ...devices['Desktop Chrome'] } } ]
});