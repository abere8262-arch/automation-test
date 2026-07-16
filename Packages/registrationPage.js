import { expect } from "@playwright/test";
import { trace } from "node:console";

export class PersonnelPage {
    constructor(page) {
        this.page = page;

        // Navigation links and main form controls
        this.administrationLink = page.getByRole('link', { name: 'Administration', exact: true });
        this.personalMenuLink = page.locator('ul.ant-menu, div').locator('span, div').getByText(/^Personnel$/);
        this.newButton = page.locator('a[href*="/personnel/new"]').or(page.getByRole('button', { name: '＋ New' }));
        this.seveBTN = page.getByRole('button', { name: /Save/i }).first();
        this.UpdateBTN = page.getByRole('button', { name: /Update/i });
        this.InvitePersonnelBTN = page.locator('div.ant-card-body').getByRole('button', { name: "Invite Personnel" });

        // First Name Input Row
        this.firstNameAmharicInput = page.locator('nz-input-group').filter({ hasText: 'አማ' }).locator('input').first();
        this.firstNameEnglishInput = page.locator('nz-input-group').filter({ hasText: 'En' }).locator('input').first();

        // Last Name Input Row
        this.lastNameAmharicInput = page.locator('nz-input-group').filter({ hasText: 'አማ' }).locator('input').last();
        this.lastNameEnglishInput = page.locator('nz-input-group').filter({ hasText: 'En' }).locator('input').last();

        // Email Input Row
        this.emailInput = page.locator('input[formcontrolname="email"]');

        // Accordion Group Headers
        this.roleSection = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Personnel Role Assignment', exact: true });
        this.unitSection = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Organizational Unit Assignment', exact: true });
        this.profileSection = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Extended Profile' });

        // Save actions for specific sections
        this.appMenuSaveBTN = page.locator('div.ant-card-body').locator('button:has(i[nztype="plus-circle"])');
        this.unitSaveBTN = page.locator('div.ant-card-body').locator('button:has(i[nztype="save"])').first();

        // Dynamic Modal Factory Expressions
        this.getModalApplicationItem = (appsName) => this.page.locator('div.ant-modal-body')
            .locator('tr')
            .filter({ hasText: new RegExp(`^\\s*${appsName}\\s*$`, 'i') })
            .first();

        this.getRoleCheckbox = (roleName) => this.page.locator('div.ant-modal-body').locator('tr')
            .filter({ hasText: new RegExp(`^\\s*${roleName}\\s*$`, 'i') })
            .locator('input[type="checkbox"], .ant-checkbox-input')
            .first();

        this.getUnitCheckbox = (unitName) => this.page.locator('.ant-modal-body tbody tr')
            .filter({ hasText: new RegExp(`^\\s*${unitName}\\s*$`, 'i') })
            .locator('input[type="checkbox"], .ant-checkbox-input').first();
            this.UnitAssignmentSearchBTN=page.locator('div.ant-modal-body').locator('input[placeholder="Search here"]');
           

        // Modal Action Confirmation Buttons
        this.modalAssignBTN = page.locator('.ant-modal, div').getByRole('button', { name: 'Assign' }).first();
        this.modalDoneBTN = this.page.locator('.ant-modal-footer').getByRole('button', { name: 'Done' }).first();
    }

    // Core Form Actions
    async navigateToPersonnelList() {
        await this.administrationLink.click();
        await this.personalMenuLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickNew() {
        await this.newButton.click();
    }

    async fillFirstNameFiled(amharicName, englishName) {
        await this.firstNameAmharicInput.waitFor({ state: 'visible' });
        await this.firstNameAmharicInput.fill(amharicName);
        await this.firstNameEnglishInput.waitFor({ state: 'visible' });
        await this.firstNameEnglishInput.fill(englishName);
    }

    async fillLastNameFiled(amharicLastName, englishLastName) {
        await this.lastNameAmharicInput.waitFor({ state: 'visible' });
        await this.lastNameAmharicInput.fill(amharicLastName);
        await this.lastNameEnglishInput.waitFor({ state: 'visible' });
        await this.lastNameEnglishInput.fill(englishLastName);
    }

    async fillEmailFiled(hasEmail) {
        await this.emailInput.waitFor({ state: 'visible' });
        await this.emailInput.fill(hasEmail);
    }

    async clickSaveBTN() {
        await this.seveBTN.click();
    }

    async getDraftPersonal(hasEmail) {
        const row = this.page.locator('tr', { hasText: hasEmail });
        await expect(row).toBeVisible();
        await row.hover();
        const personaldetal = row.locator('a[href*="/registration/administration/personnel/detail/"]');
        await personaldetal.click();
    }
    async UpdatePersonalList()
    {
        await this.UpdateBTN.scrollIntoViewIfNeeded();
        await this.UpdateBTN.click();
    }

    // Role Assignment Flow
    async expandRoleAssignment() {
        await this.roleSection.getByRole('button', { name: 'Expand' }).click();
        await this.roleSection.getByRole('button', { name: 'Assign' }).first().click();
        await this.page.waitForTimeout(1000);
    }

    
    async selectModulesAndRoles(applicationsConfigArray) {
        for (const appConfig of applicationsConfigArray) {
            const { appName, rolesName } = appConfig;

            const appMenu = this.getModalApplicationItem(appName);
            await expect(appMenu).toBeVisible();
            await appMenu.click();

            await this.page.waitForLoadState('networkidle').catch(() => { });

            for (const role of rolesName) {
                const targetCheckbox = this.getRoleCheckbox(role);
                await targetCheckbox.scrollIntoViewIfNeeded();
                await expect(targetCheckbox).toBeVisible();
                await targetCheckbox.click();

                /*if (!(await targetCheckbox.isChecked())) {
                    await targetCheckbox.check();
                    console.log(`The "${role}" role for "${appName}" is Successfully checked.`);
                }*/
            }
        }

        await this.modalDoneBTN.scrollIntoViewIfNeeded();
        await this.modalDoneBTN.click();
    }

    async seveAppAndRole() {
        await this.appMenuSaveBTN.scrollIntoViewIfNeeded();
        await this.appMenuSaveBTN.click();
        await this.page.waitForTimeout(2000)

    }

    // Organizational Units Flow
    async expandUnitAssignment() {
        await this.unitSection.getByRole('button', { name: 'Expand' }).click();
        await this.unitSection.getByRole('button', { name: 'Assign ' }).click();
    }

    async selectOrganizationUnits(unitsArray) {
        for (const unit of unitsArray) {
            await this.UnitAssignmentSearchBTN.fill(unit);
            await this.UnitAssignmentSearchBTN.click();
            const targetCheckbox = this.getUnitCheckbox(unit);
            await targetCheckbox.scrollIntoViewIfNeeded();
            await targetCheckbox.click();
            await this.UnitAssignmentSearchBTN.clear();

            /*if (!(await targetCheckbox.isChecked())) {
                await targetCheckbox.check();
                console.log(`The '${unit}' Unit is Checked.`);
            } else {
                console.log(`The "${unit}" Unit is already selected. Skipping.`);
            }*/
        }
        await this.modalDoneBTN.scrollIntoViewIfNeeded();
        await this.modalDoneBTN.click();
    }

    async seveAsigndUnit() {
        await this.unitSaveBTN.scrollIntoViewIfNeeded();
        await this.unitSaveBTN.click();
        await this.page.waitForTimeout(2000)
    }

    // Extended Profile Actions
    async expandExtendedProfile() {
        await this.profileSection.getByRole('button', { name: 'Expand' }).first().click();
    }

    async InviteDraftPersonnel() {
        await this.InvitePersonnelBTN.click();
    }
}