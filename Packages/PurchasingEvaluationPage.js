import { expect } from '@playwright/test'
import { asyncWrapProviders } from 'node:async_hooks';

export class EvaluationPage {
    constructor(page) {
        this.page = page;
        this.surchBTN = page.getByPlaceholder("Search here");


    }
    async findAndClickrowHasText(text) {
        await this.surchBTN.filter(text);
        await this.surchBTN.click();
        const row = this.page.locator('tr', { hasText: text });
        await expect(row).toBeVisible();
        await row.hover();
        await row.locator('a[href*="/purchasing/evaluation/quotation/"]').click();
    }
    async selectSupplier(text) {
        const row = this.page.locator('tr', { hasText: text ,exact:true});
        await expect(row).toBeVisible()
        await row.hover();
        await this.page.locator('#cmpName').getByRole('link').filter({ hasText: /^$/ }).click()

    }
    async clickQualificationCriteria(qualificationcriteria) {
        await this.page.locator('tr',{hasText:qualificationcriteria}).click();
        await this.page.locator('.ant-select-selector').click();

        await this.page.locator('#cdk-overlay-0').getByText('Comply', { exact: true }).click();
        //await this.page.locator('#cdk-overlay-0').getByText('Comply', { exact: true }).click();
        await this.page.getByRole('button', { name: 'Update ' }).click();
        await this.page.getByRole('button', { name: 'Compile' }).click();
        await this.page.locator('svg[data-icon="left"]').click();
    }
    async completeEvaluation() {
        const completBTN=await this.page.getByRole('button', { name: ' Complete ' });
        await expect(completBTN).toBeVisible();
        await completBTN.click();
    }
}