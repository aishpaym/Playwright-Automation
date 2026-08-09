//import { expect } from "@playwright/test";

//const {test} = require('@playwright/test');
import { test, expect } from '@playwright/test';

//This is the structure of testcase
test('First Playwright test', async ({browser})=>{
    //chrome - plugins/cookies
    const contxt = await browser.newContext(); //on this only browser instance is open so to create a page into it we need the next line
    const page = await contxt.newPage(); //This creates actual page to automate
    await page.goto("https://www.google.com/");//The page that we want to go to
 
});

//When we need to run only one testcase out of all of the testcase

test('Page Playwright test', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
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
    const username=page.locator("#username");
    const password=page.locator("#password");
    const cardTitle=page.locator(".card-body a");
    const signin =page.locator("[name='signin']");
    
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    
    await signin.click();
    //Here the locator has multiple elements so to do out of 4 element we will take it in array and give it which index we need that is nth[0] or we can use first() or last()
    //console.log(await page.locator(".card-body a").first().textContent());
    //In place of textContent we can also use inputValue()
    console.log(await cardTitle.nth(1).textContent());
    //To grab all the titles
    //if we comment out that nth line and then try to execute there would be error with the allTextContents method as there is no action defined for it
    const allTitles=await cardTitle.allTextContents();
    console.log(allTitles);




});

//test for UI Controls
test('UI Controls', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //Now to practise dropdowns
    //One is static dropdown or select dropdown
    const username=page.locator("#username");
    const password=page.locator("#password");
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    //if the class name is not unique concatenate it with tagname that is select.form-control Here select is the tagname of the element and .form-control is classname
    const dropdown=page.locator("select.form-control");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click()
    await dropdown.selectOption("consult");
    //assertion
    //To check that the radiobutton is checked or not
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    //to print True/False after checking if the radio button is checked or not but it is not of much of use in real time this for the developer to use
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator("#terms").click();
    //We need to prepare this step as an assertions
    await expect(page.locator("#terms")).toBeChecked();
    //Just check if the radio button is unchecked also
    await page.locator("#terms").uncheck();
    //Then verify what is the result and here we are checking it to be False only
    expect(await page.locator("#terms").isChecked()).toBeFalsy();




    //To see the execution completely we can use the below function
    await page.pause();

});

test("Child window tab", async({browser})=>{
    //This 2 const are important to be declared here
     const contxt = await browser.newContext(); //on this only browser instance is open so to create a page into it we need the next line
     const page = await contxt.newPage(); 
     //----------------------
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink=page.locator("[href*='documents-request']");
     //To switch to new tab we need to create a new context
//waitforevent method waits for page to open in the background and if it opens it returns that to the variable 
   const [newpage]= await Promise.all(
    [contxt.waitForEvent('page'),//listen for any new page to open ->States -> pending,rejected,fullfilled
        //This method needs to be open before the click option
    documentLink.click()
]);//Promise.all() -> This takes some array of promises this is when we need to execute 2 function parallely execute  
    //This click open a separate window so we will have no direct access to it so before click we need to playwright that we need to wait for a new page to generate
    await newpage.waitForLoadState('networkidle'); 
    const text= await newpage.locator(".red").textContent();
     //Sometimes textContent() returns null.
     if(text){
     const arraytoval=await text.split("@");
     const email= await arraytoval[1].split(" ")[0];
     console.log(email);
    //if we want the value from page 2 in page 1 
     await page.locator("#username").fill(email);
     await page.pause();


    
    }
});