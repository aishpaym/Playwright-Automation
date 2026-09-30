import{test,expect,request} from '@playwright/test';

const{APIUtils}=require('./Utils/APIUtils');

const loginPayload={
    userEmail:"aishwaryasasankan@gmail.com",
    userPassword:"S3F5pMaK62!.jWr"
};
let token:string;
let orderID: string;

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
    await page.locator("[routerlink*='myorders']").first().click();

    //Find the row containing the order created in beforeAll
    const orderRow=page.locator('tbody tr').filter({
        has:page.locator('th',{hasText:response.orderID}),
    });

    await expect(orderRow).toHaveCount(1);
    await orderRow.locator('button').first().click();

    //Check order details Screen
    await expect(page.locator('div.col-text')).toContainText(response.orderID);

});
 