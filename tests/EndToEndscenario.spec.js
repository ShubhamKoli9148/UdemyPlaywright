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


    
    await page.locator('div li').first().waitFor();

    const cartProduct = await page.locator('h3:has-text("ZARA COAT 3")')
    
    await expect(cartProduct).toBeVisible();
    await expect(cartProduct).toHaveText(productName);
    
    await takeScreenshot(page, 'CartProduct.png');
    const productID= await page.locator('.cartSection p:has-text("#")').textContent();
    console.log("Product ID is : "+productID);
    
    await page.locator('text=Checkout').click();
    const expdate = testdata.expiryDate.split('/')[0];
    const expyear = testdata.expiryDate.split('/')[1];

    // card details-
    await page.locator('div .field').filter({hasText: 'Credit Card Number '}).locator('input').fill(testdata.cardNumber);
    
    

    const expiryField = page.locator('div.field.small').filter({ hasText: 'Expiry Date' });

    await expiryField.locator('select').nth(0).selectOption(expdate);
    await expiryField.locator('select').nth(1).selectOption(expyear);

   await page.locator('div.field.small:has-text("CVV Code") input').fill(testdata.cvv);
    
    await page.locator('div.field:has-text("Name on Card ") input').fill(testdata.first_name+ ' '+testdata.last_name);
    await page.locator('.form-group input').pressSequentially(dataCountry,{delay:100});
    const selectSection = await page.locator('.ta-results list-group ng-star-inserted');
    await selectCountry.waitFor();

    const selectCountryCount = await page.locator("button").count();
    for(let i=0; i<selectCountryCount; ++i){
        const text = await selectSection.locator('button').nth(1).textContent();
        if(text === testdata.country){
            
            await selectSection.locator('button').nth(1).click();
            break;
        }
    }
    
    await takeScreenshot(page, 'CardDetails.png');


    // Order Confirmation 

   const orderConfirmation = await page.locator('.hero-primary h3:has-text(" Thankyou for the order. ")').waitFor();
   await expect(orderConfirmation).toBeVisible();

   const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
   orderID = orderID.split('|')[1];
   orderID = orderID.split('|')[0];
   console.log(orderID);

   const ordername = await page.locator('td div .title').filter({hasText:'ZARA COAT 3'}).textContent();
   await expect(ordername).toContain(productName);







    


    





    

});