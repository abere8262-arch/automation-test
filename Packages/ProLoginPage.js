import { expect } from "@playwright/test";

export class ProLoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder('Enter your username or phone');
    this.password = page.getByPlaceholder('Enter your password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.errorMessage = page.getByText('Invalid username or password');
    this.organization = page.getByRole('button', { name: 'Perago Information Systems Test' });
  }

  async goto(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginFailed() {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    await expect(this.errorMessage).toHaveText('Invalid username or password');
  }

  async verifyLoginSuccessful() {
    await expect(this.page).toHaveURL(/organization-selector/);
    await this.organization.waitFor({ state: 'visible' });
  }

  async selectOrganizationUnit() {
    await expect(this.organization).toBeVisible();
    await this.organization.click();
    await expect(this.page).toHaveURL(/home/);
    await this.page.waitForLoadState('networkidle');
  }

  async getLoginResult() {
    // Adding .catch(() => null) prevents losing promises from throwing background timeouts
    return await Promise.race([
      this.errorMessage.waitFor({ state: 'visible', timeout: 5000 }).then(() => 'FAILED').catch(() => null),
      this.page.waitForURL(/organization-selector/, { timeout: 5000 }).then(() => 'SUCCESS').catch(() => null)
    ]).then(result => result || 'UNKNOWN_OR_TIMEOUT');
  }
}