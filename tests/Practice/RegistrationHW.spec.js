const {test, expect} = require('@playwright/test');

test('Registration Test', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.locator(".banner .btn1").click();
    await page.locator("input#firstName").fill(testdata.first_name);
    await page.locator("input#lastName").fill(testdata.last_name);
    await page.locator("input#userEmail").fill(testdata.username);
    await page.locator("input#userMobile").fill(testdata.phone);
    


});