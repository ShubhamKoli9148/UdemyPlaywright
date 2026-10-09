const { test , expect } = require('@playwright/test');

test.only ('Borwser Context  UI test', async ({browser}) => {

    const context = await browser.newContext();
   const page = await context.newPage();

   await page.goto('https://rahulshettyacademy.com');

    console.log(await page.title());
   await expect(page).toHaveTitle(/Rahul Shetty Academy/);
   await expect(page).t
   // expect(await page.title()).toBe('Rahul Shetty Academy');
}); 

test('Page Context UI test', async ({page}) => {

    

   await page.goto('https://rahulshettyacademy.com/practice');
   console.log(await page.title());

});