import {test} from "@playwright/test"
import { ProLoginPage } from "../Packages/ProLoginPage"
import { UnitRegPage } from "../Packages/ProUnitRegPage"
test.beforeEach(async ({ page }) => {
    const proLoginPage = new ProLoginPage(page);
    await proLoginPage.goto('https://procurenet-bo.dev.peragosystems.com/registration/login');
    await proLoginPage.login('yohannes2015@yahoo.com', 'P@ssw00rd');
    
    // Fixed: Ensure this method runs completely if it's a function
    if (typeof proLoginPage.getLoginResult === 'function') {
        await proLoginPage.getLoginResult();
    }
    
    await proLoginPage.selectOrganizationUnit();
});
test ('add new proUnit',async({page})=>{

const unitRegPage=new UnitRegPage(page);
await unitRegPage.navigatToUnitPage();
await unitRegPage.addNewUnit();
await unitRegPage.addUnitNameFiled('it','it');
await unitRegPage.addDescriptionFiled('it','it');
await unitRegPage.seveUnit();

})