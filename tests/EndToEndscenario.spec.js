const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../helper');
import testdata from '../testData/testdata.json';

test('E2E Testcase - CLient ', async ({page}) => {

   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   const products = await page.locator('.card-body');
   const cartCollection = await page.locator('.cartSection');
   const productName = "ZARA COAT 3";

   await page.locator("input#userEmail").fill(testdata.username);
   await page.locator("input#userPassword").fill(testdata.password);

   await page.locator("#login").click();
   
   await page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept(); // Click OK
    });
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await takeScreenshot(page, 'homepage.png');


    const countOfProducts = await products.count();

    for(let i=0; i<countOfProducts; ++i){
        const productText = await products.nth(i).locator('b').textContent();
        if(productText === productName){
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    await takeScreenshot(page, 'product_added_to_cart.png');
    await page.locator("[routerlink*='/dashboard/cart']").click();


    
    await page.waitForLoadState('networkidle');
    await page.locator('.cart').first().waitFor();
    await expect(page.locator('h3:has-text("ZARA COAT 3")')).toContainText(productName);
     await takeScreenshot(page, 'CartProduct.png');

    

    

    





    

});