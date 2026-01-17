import { test, expect } from '@playwright/test';
import { LoginPage } from '../utilities/pageObjects/LoginPage';

test('successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('failed login - invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
  await loginPage.login('invalid_user', 'wrong_password');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('failed login - locked user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('navigate to inventory after successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('/inventory.html');
  await expect(page.locator('.inventory_container')).toBeVisible();
});

test('logout after successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
  await loginPage.login('standard_user', 'secret_sauce');
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('/');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test('failed login - empty credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo('/');
  await page.click('[data-test="login-button"]');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});