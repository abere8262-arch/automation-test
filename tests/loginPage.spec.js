import { test } from '@playwright/test'
import { LoginPage } from '../Packages/LoginPage'
test('Login page 1', async ({ page }) => {
    const loginPage = new LoginPage(page);

   await loginPage.goto('https://training-bo.egp.gov.et/planning/login');
   await loginPage.login('abenezer2015@yahoo.com', 'P@ssw00rd');
  // await loginPage.selectOrganization();
     const result = await loginPage.getLoginResult();

    if (result === 'FAILED') {
        console.log('Login Failed');
        await loginPage.verifyLoginFailed();
    } else {
        console.log('Login Successful');
        await loginPage.verifyLoginSuccessful();
        await loginPage.selectOrganizationUnit();

    }
});



