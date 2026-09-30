import{test,expect,request} from '@playwright/test';

const{APIUtils}=require('./Utils/APIUtils');

const loginPayload={
    userEmail:"aishwaryasasankan@gmail.com",
    userPassword:"S3F5pMaK62!.jWr"
};
let token:string;
let orderID: string;
const fakePayloadOrders={"data":[],"message":"No Orders"};

//For OrderID creation
const OrderPayload={
    orders: [{
        country: "India", 
        productOrderedId: "6960eae1c941646b7a8b3ed3"
    }
]
};
//request is in the playwright library used for API Automation
//the block of code that we write in beforall will excute only once before all of the annotations
    
let response:{token:string;orderID:string};

test.beforeAll(async ()=>{
//Login --> API Call for newContext    
const apiContext=await request.newContext();

try{
    const apiutils=new APIUtils(apiContext,loginPayload);
    response =await apiutils.createOrder(OrderPayload);
}
finally{
    await apiContext.dispose();
}
});
test('Created order appears in order details',async({page})=>{
    //Set Token before the website loads
    await page.addInitScript((token)=>{
        window.localStorage.setItem('token',token);
    },response.token);
    await page.goto("https://rahulshettyacademy.com/client");

    //Once we go to Orders Page we need to check that the order is blank and the message that is expected to be displayed there we need to verify there
    //For that we will rewrite the json file such that we should get the No orders found message from the API call

    //route--> It is basically to reroute as per what we need
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            //This fetches the response
            const response = await page.request.fetch(route.request());
            let body=JSON.stringify(fakePayloadOrders);
            //fulfil method will send response to browser
            route.fulfill(
                {
                    response,body
                }
            );

            //We will be intercepting the Response here
            //For Intercepting the Response - API response ->{fakeresponse[playwright will play a role here]}-> browser -> render data on front end
        }
    );
    //We need to make the API call before sending the details by clicking on orders button
        await page.locator("[routerlink*='myorders']").first().click();
        await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
        console.log(await page.locator(".mt-4").textContent());


    
});
 