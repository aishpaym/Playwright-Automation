import { expect } from "@playwright/test";
class APIUtils{
    //create a constructor to call apicontext
    constructor(apiContext,loginPayload){
        //this refers to current class hence when we provide the apiContext from our project will apply for whole class when we store it in the local class object apiContext in the constructor
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }
    async getToken(){
          const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.loginPayload
            });
            //Now to check if the Response form API is success or fail
            console.log("Status:", loginResponse.status());
        
            await expect (loginResponse.ok()).toBeTruthy();
        
            //Now after the call is made we need to get the response body such as we need to get the Token
            const loginResponseJson= await  loginResponse.json();
        
        
            //Once we get the response we need to parse the Token out of it
            const token = await loginResponseJson.token;
            
            await console.log(token);
            return token;
        
          
    }
    async createOrder(OrderPayload){
        let response={};
        response.token=await this.getToken();
         //Create Order ID --> need to create new API call for order creation
           const OrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
                data : OrderPayload,
                headers:{
                    'Authorization': response.token,
                    'Content-type' : 'application/json'
        
                },
            })
        
            const OrderResponseJson=await OrderResponse.json();
            await console.log(OrderResponseJson);
            const orderID= OrderResponseJson.orders[0];
            response.orderID=orderID;
            return response;
        
        
        
    }

}
module.exports={APIUtils};