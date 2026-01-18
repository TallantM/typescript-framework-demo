import { expect, test } from 'vitest';
import { chromium } from 'playwright';

test('integration: successful login redirects to inventory', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
  await browser.close();
});