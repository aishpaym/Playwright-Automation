import{test,expect,request} from '@playwright/test';

const loginPayload={userEmail:"aishwaryasasankan@gmail.com",userPassword:"S3F5pMaK62!.jWr"};
let token:string;
let orderID: string;

//For OrderID creation
const OrderPayload={orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
//request is in the playwright library used for API Automation
//the block of code that we write in beforall will excute only once before all of the annotations

test.beforeAll(async ()=>{
    //Login --> API Call for newContext
    const apiContext=await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload});
    //Now to check if the Response form API is success or fail
    console.log("Status:", loginResponse.status());

    await expect (loginResponse.ok()).toBeTruthy();

    //Now after the call is made we need to get the response body such as we need to get the Token
    const loginResponseJson= await  loginResponse.json();


    //Once we get the response we need to parse the Token out of it
    token = await loginResponseJson.token;

    await console.log(token);

    //Now we need to store this in Application Local Storage
    
    //Create Order ID --> need to create new API call for order creation
   const OrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data : OrderPayload,
        headers:{
            'Authorization': token,
            'Content-type' : 'application/json'

        },
    })

    const OrderResponseJson=await OrderResponse.json();
    await console.log(OrderResponseJson);
    orderID= OrderResponseJson.orders[0];

});

//the block of code will execute before each of the test such we give test1,test2,test3 it will be executed before each testes
test.beforeEach(()=>{

});
test('Page Playwright test', async({page})=>{
   // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //get - title --> Assertion
   // console.log(await page.title());
   
    //store the locator into one variable
   /* 
    const userEmail=page.locator("#userEmail");
    const password=page.locator("#userPassword");
    
    const signin =page.locator("#login");
    
    await userEmail.fill(email);
    await password.fill("S3F5pMaK62!.jWr");
    
    await signin.click();*/
    //Now we need to send the generated token from api to this test so that the login screen is bypassed and it is directly moved to dashboard
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");
    //Now we need to check if the creation of order is done via API calling then we can also use the same for order creation
//--------------------------------
    /*
    const email="aishwaryasasankan@gmail.com";
   
    const cardTitle=page.locator(".card-body b");
    const products=page.locator(".card-body");
    const productName='iphone 13 pro';



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
console.log(orderID);*/

//--------------------------------
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
