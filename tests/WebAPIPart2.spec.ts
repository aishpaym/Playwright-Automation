//storage in website Application details through inspect tab will store all the details such as cookies,session,local task,tokens everything
// We can store and place it in a file called Json

//Sometimes Login is really complicated in certain bank account it is very complicated at that time this comes in feature
//In that case we have to login through UI once then we will take that json and inject all that in the 5-10 testcases in the browser where again login is required

//This is workaround and cane be done through API



import { test, expect, BrowserContext } from '@playwright/test';
import path from 'node:path';

//Creating a global level variable as webcontext --> this will be used when a new browser is opened
let webContext:BrowserContext;

test.beforeAll(async({browser})=>{
    //All the Login Code to be mentioned here
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userEmail=page.locator("#userEmail");
    const email="aishwaryasasankan@gmail.com";

    const password=page.locator("#userPassword");
    const signin =page.locator("#login");
    await userEmail.fill(email);
    await password.fill("S3F5pMaK62!.jWr");
    
    await signin.click();
    await page.waitForLoadState('networkidle');
    //As we need the storage at page level we have defined the context since the setting will be based on browser context level and not at page level
    await context.storageState({path:'Loginstate.json'});
    //Once you run this you will be able to see a Loginstate.json has been created

    await browser.newContext({storageState:'Loginstate.json'});
    webContext=await browser.newContext({storageState:'Loginstate.json'});





});

test('Page Playwright test', async({})=>{
    const email="aishwaryasasankan@gmail.com";
    const page= await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    console.log(await page.title());
    const cardTitle=page.locator(".card-body b");
    const products=page.locator(".card-body");
    const productName='iphone 13 pro';
    await cardTitle.last().waitFor();
    const allTitles=await cardTitle.allTextContents();
    console.log(allTitles);
    const count= await products.count();
    for(let i=0;i<count;++i){
        
        if (await products.nth(i).locator("b").textContent()===productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;

        }
    }

const cartbutton=page.locator("[routerlink*='cart']");
await cartbutton.waitFor();
await cartbutton.click();


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
