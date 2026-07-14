import { expect } from "@playwright/test";
export class UnitRegPage {
    constructor(page) {
        this.page = page;
        this.administration = page.locator('nav.shell-sidebar-menu-list').getByRole('button', { name: 'Administration' });
        this.unitLink = page.locator('a[href*="/registration/administration/unit"]');
        this.unitRegNew = page.getByRole('button', { name: 'New' });
        this.unitNameInEN = page.locator('.ant-form-item', { hasText: 'Name' })
            .locator('.ant-form-item-control-input', { hasText: 'EN' })
            .locator('input').first();
        this.unitNameInአማ = page
            .locator('.ant-form-item', { hasText: 'Name' })
            .locator('.ant-form-item-control-input', { hasText: 'አማ' })
            .locator('input').first();
        this.unitDescriptionInEN = page
            .locator('.ant-form-item')
            .filter({ hasText: 'Description' })
            .locator('.ant-input-group')
            .filter({ has: page.locator('.ant-input-group-addon', { hasText: 'EN' }) })
            .locator('input, textarea');
        this.unitDescriptionInአማ = page
            .locator('.ant-form-item')
            .filter({ hasText: 'Description' })
            .locator('.ant-input-group')
            .filter({ has: page.locator('.ant-input-group-addon', { hasText: 'አማ' }) })
            .locator('input, textarea');
        this.UnitTypeSelecter = page.locator('div.ant-select-selector')
            .getByRole('button', { name: 'Select' })
        this.ParentUnitSelecter = page.locator('div.ant-form-item-control-input-content')
            .getByRole('button', { name: 'Select' })

        this.UnitSelectionModal = page.locator('ant-modal-content').filter({ hasText: 'Unit Selection' });
        this.clickParentUnit = (parentUnit) => this.UnitSelectionModal.locator('ant-modal-body').filter({ hasText: parentUnit }).locator('span[role="checkbox"]');
        this.ParentUnitDoneBTN = this.UnitSelectionModal.getByRole('button', { name: 'Done' });
        this.untSaveBtn = page.getByRole('button', { name: 'Save' });
    }

    async navigatToUnitPage() {
        await this.administration.click();
        await this.unitLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    async addNewUnit() {
        await this.unitRegNew.click();
    }
    async addUnitNameFiled(inAmharic, inEnglish) {
        await this.page.pause();
        
        //await this.unitNameInEN.waitFor({ state: 'visible' });
        await this.unitNameInEN.fill(inAmharic);
        // await this.unitNameInአማ.waitFor({ state: 'visible' });
        await this.unitNameInአማ.fill(inEnglish);
    }

    async addDescriptionFiled(DeinAmharic, DeinEnglish) {
        // await this.unitDescriptionInEN.waitFor({ state: 'visible' });
        await this.unitDescriptionInEN.fill(DeinEnglish);
        // await this.unitDescriptionInአማ.waitFor({ state: 'visible' });
        await this.unitDescriptionInአማ.fill(DeinAmharic);
    }
    async seveUnit() {
        await this.untSaveBtn.scrollIntoViewIfNeeded();
        await this.untSaveBtn.click();
    }



}