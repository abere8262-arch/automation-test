import { test } from '@playwright/test';

import { LoginPage } from '../Packages/LoginPage';

import { PurchasingPage } from '../Packages/PurchasingInitiationPage';

import { EvaluationPage} from '../Packages/PurchasingEvaluationPage';

test('evaluation example', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto('https://training-bo.egp.gov.et/purchasing/login');

    await loginPage.login(
        'yohannes2015@yahoo.com',
        'P@ssw00rd'
    );

    await loginPage.getLoginResult();
    await loginPage.selectOrganizationUnit();


    const purchasingInitiationPage =new PurchasingPage(page);

    await purchasingInitiationPage.clickEvaluation();

    const evaluationPage =
        new EvaluationPage(page);

    await evaluationPage.findAndClickrowHasText('PIST11-NCB-G-0029-2016-PUR');

    await evaluationPage.selectSupplier('None');

    await evaluationPage.clickQualificationCriteria(' Qualification Criteria ');
   

    await page.waitForLoadState('networkidle');


   // await evaluationPage.selectSupplier('zelalem');

   // await evaluationPage.clickQualificationCriteria();

    await evaluationPage.completeEvaluation();

});