import { test } from '@playwright/test';
import { LoginPage } from '../Packages/LoginPage';
import { PersonnelPage } from "../Packages/registrationPage";
import { unitRegPage } from '../Packages/unitRegistrationPage';

test.describe('EGP Portal - Administration Tests', () => {

    // Runs once before each individual test block
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('https://training-bo.egp.gov.et/registration/login');
        await loginPage.login('yohannes2015@yahoo.com', 'P@ssw00rd');
        await loginPage.getLoginResult();
        await loginPage.selectOrganizationUnit();
        return loginPage;
    });

    test('select personal', async ({ page }) => {
        test.slow();
    
        const personalPage = new PersonnelPage(page);
        await personalPage.navigateToPersonnelList();
        await personalPage.getDraftPersonal('aberemulu@gmail.com');
        
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
        await personalPage.seveAsigndUnit();
        await personalPage.expandExtendedProfile();
    });

    test('register new personal', async ({ page }) => {
        const personalPage = new PersonnelPage(page);
        await personalPage.navigateToPersonnelList();
        await personalPage.clickNew();
        await personalPage.fillFirstNameFiled('kasegn', 'kasegn');
        await personalPage.fillLastNameFiled('muluken', 'muluken');
        await personalPage.fillEmailFiled('kasegnmulu@gmail.com');
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
        await newUnit.addUnitNameFiled('it', 'it');
        await newUnit.addDescriptionFiled('xyz', 'xyz');
        await newUnit.selectDropdownOption('General Directorate');
        await newUnit.selectOrganizationUnits('ecta purchasing');
        await newUnit.seveParentUnit();
        await newUnit.clickSaveBTN();
        await newUnit.PersonnelAssignmentToUnit();
    });

    test.slow('search personal list', async ({ page }) => {
        const newUnit = new unitRegPage(page);
        await newUnit.navigatToUnitPage();
        await newUnit.searchForUnit('cqeq2');
        await newUnit.getUnitRow('cqeq2');
        await newUnit.PersonnelAssignmentToUnit(['belay', 'ase', 'Habtamu']);
        await newUnit.removePersonnelByName('cde user');
        await newUnit.selectSupervisorByName(['belay', 'ase', 'Habtamu']);
        await newUnit.clickDeleteBTN();
    });
});;
