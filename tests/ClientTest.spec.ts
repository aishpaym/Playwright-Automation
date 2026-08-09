//import { expect } from "@playwright/test";
//import { test, expect } from '@playwright/test';
//const {test} = require('@playwright/test');
import { test, expect } from '@playwright/test';
//This is the structure of testcase
/*test('Client Playwright test', async ({browser})=>{
    //chrome - plugins/cookies
    const contxt = await browser.newContext(); //on this only browser instance is open so to create a page into it we need the next line
    const page = await contxt.newPage(); //This creates actual page to automate
    await page.goto("https://www.google.com/");//The page that we want to go to
 
});*/

//When we need to run only one testcase out of all of the testcase

test('Page Playwright test', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //get - title --> Assertion
    console.log(await page.title());
    //Ensures the page has the given title.
    //await expect(page).toHaveTitle("Google");
    //CSS and Xpath selector we can use to identify the fields
    //playwrightfirst locate with the statement before . and after . if we want to enter anything in the editbox we can use type() or fill() but from latest version of playwright they have deprecated type method
    //With ID locator 
    //await page.locator('#username').fill('rahulshettyacademy');
    //WIth any attribute Locator
    //await page.locator('[type="password"]').fill('learning');
    //await page.locator('[name="signin"]').click();
    //if we want to extract text from any element we have method called textContent() to extract if any error message is showing
    // As the alert message is dynamic when the message is shown it shows the attribute style=block and when no message is shown it gives th attribute as style=none
    //console.log(await page.locator("[style*='block']").textContent());
    //when we need to check that the error message is displayed correct or not we cna use the below functtionality
    //await expect(await page.locator("[style*='block']")).toContainText('Learning');
    //----storing it in variable-----//
    //store the locator into one variable
    const email="aishwaryasasankan@gmail.com";
    const userEmail=page.locator("#userEmail");
    const password=page.locator("#userPassword");
    const cardTitle=page.locator(".card-body b");
    const signin =page.locator("#login");
    const products=page.locator(".card-body");
    const productName='iphone 13 pro';

    await userEmail.fill(email);
    await password.fill("S3F5pMaK62!.jWr");
    
    await signin.click();
    //Here the locator has multiple elements so to do out of 4 element we will take it in array and give it which index we need that is nth[0] or we can use first() or last()
    //console.log(await page.locator(".card-body a").first().textContent());
    //console.log(await cardTitle.nth(1).textContent());
    //To grab all the titles
    //if we comment out that nth line and then try to execute there would be error with the allTextContents method as there is no action defined for it
    //To wait until all the API cals are made.
    //await page.waitForLoadState("networkidle");
    //sometimes the above step seems to be flaky so there is an alternative solution for this and we can use a different method
    //Alternative soluntion is waitfor() the locator to load --> But this command does not understand till when it has to wait so we uses first.waitfor() or last.wairfor()
    await cardTitle.last().waitFor();//Need to wait for cards to load
    const allTitles=await cardTitle.allTextContents();
    console.log(allTitles);
    const count= await products.count();
    for(let i=0;i<count;++i){
        //To seach for a particular element from the loop the below lines will search
        //This will be restricted scope of search
        if (await products.nth(i).locator("b").textContent()===productName){
            //add to cart 
            await products.nth(i).locator("text= Add To Cart").click();
            break;

        }
    }

//Now we need to click on the cart and verify we can use attribute = value
const cartbutton=page.locator("[routerlink*='cart']");
await cartbutton.waitFor();
await cartbutton.click();

//await page.pause();
//before checking the text in card need to wait for page
await page.locator(".cart li").waitFor();
// has text will give boolen values
const bool= await page.locator("h3:has-text('iphone 13 pro')").isVisible();
expect(bool).toBeTruthy();
const checkout=await page.locator("text= Checkout").click();
//await page.pause();

//Fill Card Details
const cardnumber= await page.locator("input.input.txt.text-validated").first();
const expirydate= await page.locator("select.input.ddl").first();
const expiryyear= await page.locator("select.input.ddl").last();
const cvvInput = page.locator('div.field.small').filter({ hasText: 'CVV Code' }).locator('input[type="text"]');
const nameoncard= await page.locator("div.field").filter({ hasText: 'Name on Card '}).locator('input[type="text"]');
const applycoupan= await page.locator("div.field.small").filter({ hasText : 'Apply Coupon '}).locator('input[name="coupon"]');
//const clickapply= await page.locator("button[type='submit']");
//The given below is a suggestive dropdown and we will check how to handle it for that we have this locator called pressSequentially
const country= await page.locator("[placeholder*='Country']");

//for selecting from the suggestive dropdown 
const dropdown= await page.locator(".ta-results");
const proceedbtn = await page.locator(".action__submit");

await cardnumber.fill("8754 1236 9785 5485");
await expirydate.selectOption({label : "03"});
await expiryyear.selectOption({label : "28"});
await cvvInput.fill("123");
await nameoncard.fill("Aishwarya Karan");
await applycoupan.fill("Apply");
await country.pressSequentially("ind",{ delay: 150 });
await dropdown.waitFor();
 const dropdowncount= await dropdown.locator("button").count();
 for(let i=0;i<dropdowncount;++i){
    const text = await dropdown.locator("button").nth(i).textContent();

    //we can use text.trim() in case we dont need the spaces In TypeScript, you trim a string by calling the built-in string.trim() method, which removes all leading and trailing whitespace (including spaces, tabs, and newlines) and returns a new string without altering the original one.
    if(text === " India"){
        //need to click operation on that option
        await dropdown.locator("button").nth(i).click();
        break;
    }
 }
await expect(page.locator("div.user__name input[type='text']").first()).toHaveValue(email);
await proceedbtn.click();
//Move to Next Page
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderID= await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); 
console.log(orderID);
//await page.pause();
//Now moving to the orderID page

const orders=await page.locator("[routerlink *='myorders']").first();
await orders.click();
//await page.pause();

//need to check in order details screen
//TypeScript understands that orderID is definitely a string, so this works:
//most important topic
if (!orderID) {
  throw new Error('Order ID was not found');
}
await page.locator("tbody").waitFor();

const orderrow = await page.locator("tbody tr");
 console.log(await orderrow.count());

for(let i =0;i< await orderrow.count(); i++){
    const ordervalue= (await orderrow.nth(i).locator("th").textContent())?.trim() ?? "";
    if(orderID.trim().includes(ordervalue)){
        await orderrow.nth(i).locator("button").first().click();
        break;

    }
}
//----------------Verify details in Order Summary Screen-----------------------

//get the order ID from order Summary Screen
const ordersummvalue=await page.locator("div.col-text").textContent();
if (!ordersummvalue) {
  throw new Error('Order ID was not found');
}
if (ordersummvalue.includes(orderID)){
    console.log("It is the correct order ID");
}


await page.pause();

});
