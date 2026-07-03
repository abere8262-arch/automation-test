

import { expect } from "@playwright/test";

export class TenderingPage {

  constructor(page) {

    this.page = page;

    this.rol1 = page.getByText('Yohannes Yohannes');
    this.rol2 = page.getByText('Technical Experts');

    this.initiationBtn =
      page.getByRole('link', { name: 'Initiation' });

    this.solicitationBtn =
      page.getByRole('link', { name: 'Solicitation' });

    this.searchBtn =
      page.getByPlaceholder('Search here');
  }

  async openRoles() {

    await this.rol1.hover();
    await this.rol2.click();

  }

  async goToInitiation() {

    await this.initiationBtn.first().click();

  }

  async findAndClickRowByText(text) {
    await this.searchBtn.fill(text);
    await this.searchBtn.click();

    const row =
      this.page.locator('tr', { hasText: text });

    await row.hover();

    await row
      .locator('a[href*="/tendering/preparation/detail/"]')
      .click();
      await this.page.waitForTimeout(3000);
 
    }
 
}