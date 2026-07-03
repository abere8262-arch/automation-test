import { test } from "@playwright/test";
import { LoginPage } from "../Packages/LoginPage";
import { TenderingPage } from "../Packages/TenderingPage"; 
test("check log in", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('https://training-bo.egp.gov.et/tendering/login');
  await loginPage.login('yohannes2015@yahoo.com', 'P@ssw00rd');
  await loginPage.getLoginResult()
  await loginPage.selectOrganization();

  //await tenderInitiotionPage.ope
});