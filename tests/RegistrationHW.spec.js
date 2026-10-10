const {test, expect} = require('@playwright/test');
const testdata = JSON.parse(JSON.stringify(require('../testData/testdata.json')));

test('Registration Test', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.locator(".banner .btn1").click();
    await page.locator("input#firstName").fill(testdata.first_name);
    await page.locator("input#lastName").fill(testdata.last_name);
    await page.locator("input#userEmail").fill(testdata.username);
    await page.locator("input#userMobile").fill(testdata.phone);

    await page.locator("select").selectOption("Student");
    await page.locator("[value*='Male']").click();
    await page.locator("input#userPassword").fill(testdata.password);
    await page.locator("input#confirmPassword").fill(testdata.password);

    await page.locator("input[type='checkbox']").check();

    await page.locator('#login').click();

    await expect(page.locator(".headcolor")).toContainText("Account Created Successfully");
});

test.only("login Test",async({page})=>{

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.locator("input#userEmail").fill(testdata.username);
    await page.locator("input#userPassword").fill(testdata.password);
    await page.locator('#login').click();

    await page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept(); // Click OK
    });

    // await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();


})