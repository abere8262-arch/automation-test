import { test } from '@playwright/test';
import { LoginPage } from '../Packages/LoginPage';
import { PersonnelPage } from "../Packages/registrationPage";
import { unitRegPage } from '../Packages/unitRegistrationPage';

test.describe('EGP Portal - Administration Tests', () => {

    // Runs once before each individual test block
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('https://training-bo.egp.gov.et/registration/login');
        await loginPage.login('esku123@gmail.com', 'Pass@123');
        await loginPage.getLoginResult();
        await loginPage.selectOrganizationUnit();
        return loginPage;
    });

    test('select personal', async ({ page }) => {
        test.slow();

        const personalPage = new PersonnelPage(page);
        await personalPage.navigateToPersonnelList();

        await personalPage.getDraftPersonal('abebemulu@gmail.com');


        await personalPage.fillFirstNameFiled('aster', 'aster');
        await personalPage.fillLastNameFiled('aweke', 'aweke'); // Fixed whitespace syntax error here
        await personalPage.UpdatePersonalList();

        await personalPage.expandRoleAssignment();
        const appsToSelect = [
            { appName: 'Tendering', rolesName: ['Senior Procurement Officer', 'eGP Administrator', 'Head of Procuring Entity'] },
            { appName: 'Planning', rolesName: ['Property Unit Head', 'Senior Procurement Officer'] }
        ];
        await personalPage.selectModulesAndRoles(appsToSelect);
        await personalPage.seveAppAndRole();

        await personalPage.expandUnitAssignment();
        await personalPage.selectOrganizationUnits(['Procurement department', 'ICT department', 'Perago Information Systems Test']);
        await page.waitForTimeout(2000);
        await personalPage.seveAsigndUnit();
        await personalPage.expandExtendedProfile();
    });

    test('register new personal', async ({ page }) => {
        const personalPage = new PersonnelPage(page);
        await personalPage.navigateToPersonnelList();
        await personalPage.clickNew();
        await personalPage.fillFirstNameFiled('abebe', 'abebe');
        await personalPage.fillLastNameFiled('muluken', 'muluken');
        await personalPage.fillEmailFiled('abebemulu@gmail.com');
        await personalPage.clickSaveBTN();

        await personalPage.expandRoleAssignment();
        const appsToSelect = [
            { appName: 'Tendering', rolesName: ['Senior Procurement Officer', 'eGP Administrator', 'Head of Procuring Entity'] },
            { appName: 'Planning', rolesName: ['Property Unit Head', 'Senior Procurement Officer'] }
        ];
        await personalPage.selectModulesAndRoles(appsToSelect);

        await personalPage.expandUnitAssignment();
        await personalPage.selectOrganizationUnits(['Procurement department', 'ICT department', 'Perago Information Systems Test']);
        await personalPage.expandExtendedProfile();
        await personalPage.InviteDraftPersonnel();
    });

    test('add new unit', async ({ page }) => {
        const newUnit = new unitRegPage(page);
        await newUnit.navigatToUnitPage();
        await newUnit.addNewUnit();
        await newUnit.addUnitNameFiled('procurment35', 'procurment35');
        await newUnit.addDescriptionFiled('xyzy', 'xyzy');
        await newUnit.selectDropdownOption('G/directorate');
        await newUnit.selectOrganizationUnits('Golden Authority', 'test');
        await newUnit.seveParentUnit();
        await newUnit.clickSaveBTN();
        await newUnit.PersonnelAssignmentToUnit(['esku', 'kasa', 'Robi']);
        await newUnit.removePersonnelByName(['Robi']);
        await newUnit.selectSupervisorByName(['Robi', 'check1', 'Solomon']);
        await newUnit.clickDeleteBTN('ok');
    });

    test('search unit list', async ({ page }) => {

        test.slow();
        const newUnit = new unitRegPage(page);
        await newUnit.navigatToUnitPage();
        await newUnit.searchForUnit('cqeq2');
        await newUnit.getUnitRow('cqeq2');
        await newUnit.PersonnelAssignmentToUnit(['esku', 'kasa', 'Robi']);
        await newUnit.removePersonnelByName('Robi');
        await newUnit.selectSupervisorByName(['Robi', 'check1', 'Solomon']);
        await newUnit.clickDeleteBTN();
    });

});;
