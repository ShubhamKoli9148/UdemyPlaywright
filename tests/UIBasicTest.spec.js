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

test('Login - Negative Testcase ', async ({page}) => {

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

test ("UI Controls - Dropdown",async ({page}) => {

   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   await page.locator("input#username").fill('rahulshettyacademy');
   await page.locator("input#password").fill('Learning@830$3mK2');
   await page.locator(".radiotextsty").last().click();
   await page.locator("button#okayBtn").click();
await expect(page.locator(".radiotextsty").last().isChecked());
   const dropdown = await page.locator("select.form-control");
   await dropdown.selectOption("consult");

   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();

   
});

test.only ("Control of child window ",async ({browser}) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   const username = await page.locator("input#username");

   const childpage = await page.locator("a[href*='documents-request']");

   const [newpage] = await Promise.all([
      context.waitForEvent('page'),
       childpage.click(),
   ]);
   let newtext =await newpage.locator('.red').textContent();
   const arraytext= newtext.split('@')[1];
   const domain = arraytext.split(' ')[0];
   console.log(domain);
   await page.locator("input#username").fill(domain);
   const usernameText = await page.locator("input#username").textContent();
   page.pause();
   console.log(usernameText);


   




   
});