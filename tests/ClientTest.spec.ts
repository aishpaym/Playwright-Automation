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

test.only('Page Playwright test', async({page})=>{
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
    const userEmail=page.locator("#userEmail");
    const password=page.locator("#userPassword");
    const cardTitle=page.locator(".card-body b");
    const signin =page.locator("#login");

    await userEmail.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    
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
    await cardTitle.last().waitFor();
    const allTitles=await cardTitle.allTextContents();
    console.log(allTitles);




});
