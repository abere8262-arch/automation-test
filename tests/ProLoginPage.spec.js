import { test } from '@playwright/test';
import { ProLoginPage } from '../Packages/ProLoginPage';

test('log in test', async ({ page }) => {
    const proLoginPage = new ProLoginPage(page);
    await proLoginPage.goto('https://procurenet-bo.dev.peragosystems.com/purchasing/login');
    await proLoginPage.login('abenezer2015@yahoo.com', 'P@ssw00rd');
    
    const result = await proLoginPage.getLoginResult();

    if (result === 'SUCCESS') {
        console.log('Login Successful');
        await proLoginPage.verifyLoginSuccessful();
        await proLoginPage.selectOrganizationUnit();
    } else {
        console.log('Login Failed: either your username or password is not correct');
        await proLoginPage.verifyLoginFailed();
    }
});