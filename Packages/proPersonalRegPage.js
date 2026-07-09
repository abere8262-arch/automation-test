import { expect } from "@playwright/test";
import { ProLoginPage } from "./ProLoginPage";
export class ProPersonalRegPage {
    constructor(page) {
        this.page = page;
        this.administration = page.locator('div.shell-menu-item').filter({ hasText: 'Administration' });
        this.PersonnelLink = page.getByRole('link', { name: 'Personnel', exact: true });
        this.newBTN = page.getByRole('button', { name: 'New', exact: true });
        this.PersonnelSerch = page.locator('input[placeholder="Search here"]');
        this.PersonnelDetailCollapseBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Personnel Detail' }).getByRole('buton', { name: 'Collapse' });
        this.PersonnelDetailExpandBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Personnel Detail' }).getByRole('buton', { name: 'Expand' });
        this.PersonnelDetail=page.locator('div.ant-card-body').filter({hasText:'Personnel detail'});
        this.FirstNameInEN=page.locator('ant-form-item').filter({hasText:'First Name'}).locator('div.ant-form-item-control-input-content').filter({hasText:'EN'}).locator('input');

        this.PersonnelRoleAssignmentExpandBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Personnel Role Assignment' }).getByRole('buton', { name: 'Expand' });
         this.PersonnelRoleAssignmentBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Personnel Role Assignment' }).getByRole('buton', { name: 'Assign',exact:true });
        this.PersonnelRoleAssignmentCollapseBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Personnel Role Assignment' }).getByRole('buton', { name: 'Expand' });
        this.OrganizationalUnitAssignmentCollapseBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Organizational Unit Assignment' }).getByRole('buton', { name: 'Collapse' });
        this.OrganizationalUnitAssignmentBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Organizational Unit Assignment' }).getByRole('buton', { name: 'Assign' });
        this.OrganizationalUnitAssignmentExpandBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Organizational Unit Assignment' }).getByRole('buton', { name: 'Expand' });
        this.PersonnelInvitationExpandBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Personnel Invitation' }).getByRole('buton', { name: 'Expand' });
        this.PersonnelInvitationCollapseBTN = page.locator('div.ant-card-head-wrapper').filter({ hasText: 'Personnel Invitation' }).getByRole('buton', { name:'Collapse'});
        this.SendInvitationBTN=page.locator('div.ant-card-body').getByRole('button',{name:'Send Invitation'});






    }

}