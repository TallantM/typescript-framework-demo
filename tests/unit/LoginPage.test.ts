import { expect, vi, test } from 'vitest';
import { LoginPage } from '../../utilities/pageObjects/LoginPage';

test('login method calls correct page methods', async () => {
  const mockPage = {
    fill: vi.fn(),
    click: vi.fn(),
  };

  const loginPage = new LoginPage(mockPage as any);
  await loginPage.login('user', 'pass');

  expect(mockPage.fill).toHaveBeenCalledWith('[data-test="username"]', 'user');
  expect(mockPage.fill).toHaveBeenCalledWith('[data-test="password"]', 'pass');
  expect(mockPage.click).toHaveBeenCalledWith('[data-test="login-button"]');
});