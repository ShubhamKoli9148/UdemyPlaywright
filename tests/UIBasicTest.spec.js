const { test , expect } = require('@playwright/test');

test ('Borwser Context  UI test', async ({browser}) => {

    const context = await browser.newContext();
   const page = await context.newPage();

   await page.goto('https://rahulshettyacademy.com');

    console.log(await page.title());
   await expect(page).toHaveTitle(/Rahul Shetty Academy/);

   // expect(await page.title()).toBe('Rahul Shetty Academy');
}); 

test('Login - positive Testcase ', async ({page}) => {

   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

   await page.locator("input#username").fill('rahulshettyacademy');
   await page.locator("input#password").fill('Learning@830$3mK2');

   await page.locator("input[value$='user']").click();

   await page.locator("input#terms").click();
   await page.locator('input#signInBtn').click();


   console.log(await page.title());

   await expect(page).toHaveTitle(/ProtoCommerce/);

});

test.only('Login - Negative Testcase ', async ({page}) => {

   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

   await page.locator("input#username").fill('rahulshettyacademy');
   await page.locator("input#password").fill('Sjhua@830$3mK2');

   await page.locator("input[value$='user']").click();

   await page.locator("button#okayBtn").click();

   await page.locator("input#terms").click();
   await page.locator('input#signInBtn').click();

   const errorMessage = await page.locator('[style*=block]').textContent();
   console.log(errorMessage);
   await expect(errorMessage).toContain('Incorrect');


});