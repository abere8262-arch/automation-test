import { test } from '@playwright/test';
import { LoginPage } from '../Packages/LoginPage';
import { PurchasingPage } from '../Packages/PurchasingInitiationPage';

test('purch initiation', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto(
    'https://training-bo.egp.gov.et/purchasing/login'
  );

  await loginPage.login(
    'yohannes2015@yahoo.com',
    'P@ssw00rd'
  );

   await loginPage.getLoginResult();
   await loginPage.selectOrganizationUnit();

  const purchasingPage = new PurchasingPage(page);
  await purchasingPage.clickInitiation();

  await purchasingPage.findAndClickRowByText(
    'PIST11-NCB-G-0062-2016-PUR'
  );

  await purchasingPage.clickSettingBtn();

});