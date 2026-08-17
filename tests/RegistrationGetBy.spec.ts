import{test, expect} from '@playwright/test';

test('Playwright Special Locators and Test Level Time out', async({page})=>{
    //so if we need to give that the total time required to run is more than that of the global timeout we can provide the total timeout at test level
    test.setTimeout(60000);
    //At Step level as well as at test level we can use it in the below way
    const slowExpect = expect.configure({timeout : 9000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //getBy Locators
    //Now if we take getByLabel then playwright will go to that text and if we click it will look if there is any clickable element and then click
    //getBy Label is usually used when we click on the label -> so when we click on label the corresponding checkbox or radiobox gets selected then only we can use getByLabel

    //click on checkbox
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    //click on radiobutton
    await page.getByLabel("Employed").check();


    //When there is scope of typing getby is not of max use but for checkbox and radiobuttons it is really benificial

    //WHen we need to select from dropdown which has values within the selected tags

    await page.getByLabel("Gender").selectOption("Female");

    //getByPlaceholder ->if placeholder attribute is there we can use this

    await page.getByPlaceholder("Password").fill("abc@123");

    //getByRole->This method will come to use when there are different types of roles such as dialogbox,button,etc
    //getByRole -> 2 attributes are firstly for example bellow button is basically it will look for all buttons in the page then it will look for button having name as submit if there are multiple button in the page we have to accordingly give the unique so that playwright can identify properly
    //await page.getByLabel("name").fill("Aishwarya S");
    //await page.getByLabel("email").fill("aishwaryasasankan@gmail.com");
    await page.getByRole("button",{name: 'Submit'}).click();
    //5 seconds default timeout for expect assertions but if we need to overwride the default timeout then we need to provide the customised timout in the assertion timeout : 10_000 but this is at step level but if we need to change it at global level we need to update in the playwright config
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout : 10_000});

    await page.getByRole("link", {name: 'Shop'}).click();
    //Now in Shop Page
    //basically this reduces 3-4 lines of a code in a single line
    //Here filter({hasText})) -> This action basically Playwright takes the action as getByText inside each items
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button",{name: 'Add '}).click();

    //await page.pause();


});