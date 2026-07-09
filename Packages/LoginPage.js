
import { expect } from '@playwright/test';

export class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('user@example.com');
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    
    // Explicitly targeting the element as a button/clickable role if possible
   this.organization = page.getByText(/^Golden Authority$/);
    this.errorMessage = page.locator('.ant-alert-description');
    this.evaluationBTN = page.getByRole('link', { name: 'Evaluation', exact: true });
  }

  async goto(url) {
    await this.page.goto(url);
    // Ensure the page is actually ready before we start typing
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginFailed() {
    // Assertions have built-in retry logic, no need to wait beforehand
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    await expect(this.errorMessage).toHaveText('Invalid username or password');
  }

  async verifyLoginSuccessful() {
    await expect(this.page).toHaveURL(/organization-selector/);
    // Ensure the organization list has actually rendered on screen
    await this.organization.waitFor({ state: 'visible' });
  }
   
  async selectOrganizationUnit() {
    await expect(this.organization).toBeVisible();
    await this.organization.click();
    
    // Wait for URL change
    await expect(this.page).toHaveURL(/home/);
    
    // CRITICAL: Wait for network to settle so subsequent pages load correctly
    await this.page.waitForLoadState('networkidle');
  }
  
  /**
   * Deterministic dynamic check using Promise.race instead of slow try/catch timeouts
   */
  async getLoginResult() {
    await Promise.race([
      this.errorMessage.waitFor({ state: 'visible', timeout: 5000 }).then(() => 'FAILED'),
      this.page.waitForURL(/organization-selector/, { timeout: 5000 }).then(() => 'SUCCESS')
    ]).catch(() => 'UNKNOWN_OR_TIMEOUT');
  }
}


