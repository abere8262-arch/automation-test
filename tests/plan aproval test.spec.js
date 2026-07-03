import { test, expect } from '@playwright/test';

test('test111', async ({ page }) => {
  await page.goto('https://training-bo.egp.gov.et/purchase-requisition/login', { waitUntil: 'networkidle', timeout: 60000 });
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('esku123@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('P');
  await page.getByRole('textbox', { name: 'Enter your password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Pass@123');
  await page.locator('svg').click();
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Golden Authority 2').click();

const purchaseMenu = page.locator('div.name', {
  hasText: 'Purchase-requisition'
});

await expect(purchaseMenu).toBeVisible({ timeout: 60000 });
await purchaseMenu.hover();

  await page.getByRole('link', { name: 'Planning' }).click();

  const y= page.getByText('GNA \\ Procurement Unit Head');
  await expect(y).toBeVisible({state:'visible',timeout:60000});
  await y.hover({force: true});
  await page.getByText('Procurement Endorsing Committee Chairperson').click();
  
  await page.getByRole('link', { name: 'Operating Unit' }).click();


});