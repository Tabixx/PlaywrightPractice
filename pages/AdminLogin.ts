import { Page, Locator, expect } from '@playwright/test';

export class AdminLoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly logout: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#doLogin');
    this.logout = page.getByText('Logout');
    this.error = page.locator('.alert-danger');
  }

  async goto() {
    await this.page.goto('/admin');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async doLogout() {
    await this.logout.click();
  }

    async expectLoggedIn() {
    await expect(this.page).toHaveURL(/\/admin\/rooms/);
    await expect(this.logout).toBeVisible();
  }

  async expectLoginForm() {
    await expect(this.loginButton).toBeVisible();
    await expect(this.page).not.toHaveURL(/\/admin\/rooms/);
  }

  async expectOnHomepage() {
    await expect(this.page).toHaveURL(/automationintesting\.online\/$/);
  }

  async expectLoginError(message: string | RegExp) {
    await expect(this.error).toContainText(message);
  }
}