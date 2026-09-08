import{test, expect} from '@playwright/test';

test('MoreValidations',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.goto("https://www.google.com/");

    //if we need to go back to earlier page

    await page.goBack();

    //if we want to go foward
   // await page.goForward();

    //To check tobevisible the expect has to be inherited

    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();

    await page.locator("#hide-textbox").click();

    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

    //For handling alert in playwright we use the on method for the event to occur
    //dialog.accept() ==> is for positive scenarios or acceptance scenarios
    //dialog.dismiss() ==> is for negative scenarios or dismissal scenarios
    // we will not give await here as this basically means whenever we see a event occuring it will come on this line

    page.on('dialog', dialog => dialog.accept());

    await page.locator("#alertbtn").click();


    //To check Mouse hover

    await page.locator("#mousehover").hover();
    //Frames

    await page.pause();







}
)