import { test as setup } from '@playwright/test';
import { AdminLoginPage } from '../pages/AdminLogin';
import { admin } from '../data/credentials';

const authFile = '.auth/admin.json';

setup('log in as admin', async ({ page }) => {
  const adminLogin = new AdminLoginPage(page);
  await adminLogin.goto();
  await adminLogin.login(admin.username, admin.password);
  await adminLogin.expectLoggedIn();

  await page.context().storageState({ path: authFile });
});