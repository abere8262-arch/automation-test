import { expect } from "@playwright/test";

export class PurchasingPage {
    constructor(page) {
        this.page = page;
    
        // Using .first() in constructor if navigation items are duplicated (e.g., mobile menu vs desktop sidebar)
        this.initiationBtn = page.getByRole('link', { name: 'Initiation', exact: true });
        
        this.amendmentBtn = page.getByRole('link', { name: 'Amendment', exact: true });
        this.solicitationBtn = page.getByRole('link', { name: 'Solicitation' , exact: true});
        this.evaluationBtn = page.getByRole('link', { name: 'Evaluation',exact: true });
        this.reportBtn = page.getByRole('link', { name: 'Report', exact: true })
        this.settingBtn = page.getByRole('link', { name: 'Setting', exact: true });
        this.serchBTN=page.getByPlaceholder('Search here');
    }

    async clickInitiation() {
        await this.initiationBtn.click();
    }

    async clickAmendment() {
        await this.amendmentBtn.click();
    }

    async clickSolicitation() {
        await this.solicitationBtn.click();
    }

    async clickEvaluation() {
        await this.evaluationBtn.click();
    }

    async clickReport() {
        await this.reportBtn.click();
    }

    async clickSettingBtn() {
        await this.settingBtn.click();
    }

    /**
     * Safely locates a specific row by its unique ID/text and clicks its detail link
     * @param {string} uniqueText - A unique identifier like a Procurement Reference Number
     */
    async findAndClickRowByText(uniqueText) {
        await this.serchBTN.fill(uniqueText);
        await this.serchBTN.click();

        // Enforce picking the first match if multiple rows accidentally contain the text
        const targetRow = this.page.locator('tr').filter({ hasText: uniqueText }).first();

        // Ensure the row is actually loaded and visible before interacting
        await expect(targetRow).toBeVisible();

        // Optional: Hover if your web app requires a hover state to reveal action buttons
        await targetRow.hover();

        // Use a generic locator strategy for the link inside that row so it works across different modules
        const detailLink = targetRow.locator('a[href*="/detail/"]');
        await detailLink.click();
    }
}