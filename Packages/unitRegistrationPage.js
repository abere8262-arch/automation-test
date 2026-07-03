import { expect } from "@playwright/test";
import { asyncWrapProviders } from "node:async_hooks";

export class unitRegPage {
    constructor(page) {
        this.page = page;

        // Core Layout Selectors
        this.administrationLink = page.getByRole('link', { name: 'Administration', exact: true });
        this.personalMenuLink = page.locator('div.ant-card-body').locator('ul.ant-menu').locator('span, div').getByText(/^Unit$/).first();
        this.addNewUnitBTN = page.locator('div.ant-card-head-wrapper').getByRole('link', { name: ' New ' }).or(page.locator('a:has-text("New")'));

        // Input Fields
        this.addUnitInAmharic = page.locator('nz-form-item').filter({ hasText: 'አማ' }).locator('input').first();
        this.addUnitInEnglish = page.locator('nz-form-item').filter({ hasText: 'En' }).locator('input').first();
        this.addDescriptionInAmharic = page.locator('nz-form-item').filter({ hasText: 'አማ' }).locator('textarea').first();
        this.addDescriptionInEnglish = page.locator('nz-form-item').filter({ hasText: 'En' }).locator('textarea').first();
        this.uppdateBTN = page.getByRole('button', { name: 'Update' }).first();
        this.DeleteBTN = page.getByRole('button', { name: 'Delete' }).first();
        this.DeleteConformetionModal = page.locator('div.ant-modal-body').filter({ hasText: 'Are you sure you want to delete this Unit?' });

        // Cards / Sections
        this.PersonnelAssignment = page.locator('nz-card').filter({ hasText: 'Personnel Assignment' });
        this.SupervisorAssignment = page.locator('nz-card').filter({ hasText: 'Supervisor Assignment' });
        this.ExtendedProfile = page.locator('nz-card').filter({ hasText: 'Extended Profile' });
        this.searchUnit = page.getByPlaceholder('Search here');

        // Modals
        this.modalPersonal = page.locator('.ant-modal-content').filter({ hasText: 'Personnel' });
        this.modalPersonalSerch = this.modalPersonal.getByPlaceholder('Search here');
        this.confirmPopover = page.locator('.ant-popover-content').filter({ hasText: 'Are you sure to remove this row?' });
        this.confirmDeleteYesBTN = this.confirmPopover.getByRole('button', { name: 'Yes' });// FIXED: Completed selector assignment
        this.modal = page.locator('.ant-modal-content').filter({ hasText: 'Supervisor Selector' });
        this.modalSupervisorSearchInput = this.modal.getByPlaceholder('Search here');
        this.supervisordoneBTN = this.modal.getByRole('button', { name: 'Done' });

        // Dropdowns & Structural Containers
        this.UnitTypeDropdownContainer = page.locator('nz-form-item').filter({ hasText: 'Unit Type' }).locator('nz-select[nzplaceholder="Select users"]');
        this.unitSaveBTN = page.locator('div.ant-card-body').locator('button:has(i[nztype="save"])').first();
        this.selectParentUnitBTN = page.locator('nz-form-item').filter({ hasText: 'Parent Unit' }).locator('nz-form-control').getByRole('button', { name: 'Select', exact: true });

        this.clickParentUnit = (parentUnit) => this.page.locator('div.ant-modal-content').filter({ hasText: 'Unit Selection' }).locator('.ant-modal-body').filter({ hasText: parentUnit }).locator('input[type="radio"]');
        this.personalSerchBTN = this.page.locator('.ant-modal-body').locator('input[placeholder="Search here"]');

        // Tree Component Dynamic Selectors
        this.getUnitTreeTextLabel = (unitName) => this.page.locator('.ant-modal-body .ant-tree-node-content-wrapper').filter({ hasText: unitName }).first();
        this.getUnitTreeRowNode = (unitName) => this.page.locator('.ant-modal-body .ant-tree-treenode').filter({ hasText: unitName }).first();
        this.modalDoneBTN = page.locator('div.ant-modal-footer').getByRole('button', { name: 'Done' }).first();

        this.getUnitCheckbox = (unitName) => this.page.locator('.ant-modal-body .ant-tree-treenode')
            .filter({ hasText: new RegExp(`^\\s*${unitName}\\s*$`, 'i') })
            .locator('.ant-tree-checkbox, input[type="checkbox"], .ant-radio-input, .ant-checkbox-input')
            .first();

        this.getUnitTreeExpandIcon = (unitName) => this.page.locator('.ant-modal-body .ant-tree-treenode')
            .filter({ hasText: new RegExp(`^\\s*${unitName}\\s*$`, 'i') })
            .locator('.ant-tree-switcher')
            .first();
    }

    async navigatToUnitPage() {
        await this.administrationLink.click();
        await this.personalMenuLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async addNewUnit() {
        await this.addNewUnitBTN.click();
    }

    async addUnitNameFiled(inAmharic, inEnglish) {
        await this.addUnitInAmharic.waitFor({ state: 'visible' });
        await this.addUnitInAmharic.fill(inAmharic);
        await this.addUnitInEnglish.waitFor({ state: 'visible' });
        await this.addUnitInEnglish.fill(inEnglish);
    }

    async addDescriptionFiled(DeinAmharic, DeinEnglish) {
        await this.addDescriptionInAmharic.waitFor({ state: 'visible' });
        await this.addDescriptionInAmharic.fill(DeinAmharic);
        await this.addDescriptionInEnglish.waitFor({ state: 'visible' });
        await this.addDescriptionInEnglish.fill(DeinEnglish);
    }

    async searchForUnit(unitCode) {
        await this.searchUnit.fill(unitCode);
        await this.page.keyboard.press('Enter');
    }

    async getUnitRow(unitCode) {
        const row = this.page.getByRole('row').filter({ hasText: unitCode });
        await row.hover();
        await row.locator('a:has(i[nztype="right"])').click();
    }

    async clickSelectParentUnit() {
        await this.selectParentUnitBTN.click();
    }

    async selectDropdownOption(optionText) {

    

        await this.UnitTypeDropdownContainer.waitFor({ state: 'visible' });
        await this.UnitTypeDropdownContainer.click();

        const targetOption = this.page.locator('.ant-select-dropdown-placement-bottomLeft ').locator('nz-option-item')
            .filter({ hasText: new RegExp(`^\\s*${optionText}\\s*$`, 'i') })
            .first();

        await targetOption.waitFor({ state: 'visible' });
        await targetOption.click();
    }

    async selectOrganizationUnits(unit) {
         const plusSwitcher = this.page.locator('nz-tree-node-switcher').filter({has:this.page.locator('svg[data-icon="plus-square"]')});
        await plusSwitcher.click();
        await this.selectParentUnitBTN.waitFor({ state: 'visible' });
        await this.selectParentUnitBTN.click();
        await this.clickParentUnit(unit).waitFor({ state: 'visible' });
        await this.clickParentUnit(unit).click();
          const plusSwitcherBTN = this.page.locator('nz-tree-node-switcher').filter({has:this.page.locator('svg[data-icon="plus-square"]')});
        await plusSwitcherBTN.click();
    }

    async seveParentUnit() {
        await this.modalDoneBTN.scrollIntoViewIfNeeded();
        await this.modalDoneBTN.click();
    }

    async expandUnitTreeFolder(unitName) {
        const expander = this.getUnitTreeExpandIcon(unitName);
        await expander.waitFor({ state: 'visible' });
        await expander.click();
    }

    async clickSaveBTN() {
        await this.unit.scrollIntoViewIfNeeded();
        await this.unitSaveBTN.click();
    }

    async clickUpdateBTN() {
        await this.uppdateBTN.scrollIntoViewIfNeeded();
        await this.uppdateBTN.click();

    }

    async clickDeleteBTN() {
        await this.DeleteBTN.scrollIntoViewIfNeeded();
        await this.DeleteBTN.click();
        const Contextarea = this.DeleteConformetionModal.locator('textarea[formcontrolname="remark"]')

        const deleteconBTN = this.DeleteConformetionModal.getByText('button', { name: 'Yes' });
        await Contextarea.fill('Unit no longer required');
        await Contextarea.blur();
        await deleteconBTN.waitFor({ state: 'visible' })
        await deleteconBTN.click({ force: true });
        await this.DeleteConformetionModal.waitFor({ state: 'hidden', timeout: 5000 });
    }

    async PersonnelAssignmentToUnit(personalName) {
        await this.PersonnelAssignment.locator('button', { name: 'Expand' }).first().click(); // FIXED: Target semantic 'Expand' text label
        await this.PersonnelAssignment.getByRole('button', { name: 'Assign' }).first().click();

        for (const name of personalName) {
            await this.personalSerchBTN.click();
            await this.personalSerchBTN.fill(name);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(300); // UI stabilization buffer

            const personalRow = this.modalPersonal.getByRole('row').filter({ hasText: name }); // FIXED: evaluation variable text string context rule
            const personalcheckbox = personalRow.getByRole('checkbox').first();

            if (!(await personalcheckbox.isChecked())) { // FIXED: Pascal case method validation capitalization
                await personalcheckbox.click();
            }
        }
        const addpersonaleBTN = this.modalPersonal.getByRole('button', { name: 'Done' });
        await addpersonaleBTN.scrollIntoViewIfNeeded();
        await addpersonaleBTN.click();
    }
    async removePersonnelByName(firstName) {

        const section = this.page.locator('nz-card').filter({ hasText: 'Personnel Assignment' });

        const personnelSearchInput = section.getByPlaceholder('Search here');
        await personnelSearchInput.fill(firstName)
        const targetRow = section.getByRole('row').filter({ hasText: `${firstName}` });


        await targetRow.locator('button:has(i[nztype="close"])').first().click();
        await this.confirmDeleteYesBTN.waitFor({ state: 'visible' });
        await this.confirmDeleteYesBTN.click();
    }
    async selectSupervisorByName(supervisorName) {
        await this.SupervisorAssignment.locator('button', { name: 'Expand' }).first().click(); // FIXED: Target semantic 'Expand' text label
        await this.SupervisorAssignment.getByRole('button', { name: 'Assign' }).first().click();
        for (const name of supervisorName) {
            await this.modalSupervisorSearchInput.fill(name);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(300); // UI stabilization buffer

            const targetRow = this.modal.getByRole('row').filter({ hasText: name });
            const targetCheckbox = targetRow.getByRole('checkbox').first();

            if (!(await targetCheckbox.isChecked())) { // FIXED: Capitalization case rule tracking match
                await targetCheckbox.click();
            }
        }
        await this.supervisordoneBTN.scrollIntoViewIfNeeded()
        await this.supervisordoneBTN.click(); // FIXED: Variable mapped context matching initialization rule assignment
    }
}