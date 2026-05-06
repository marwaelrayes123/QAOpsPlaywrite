
class APIUtil
 {

    

    constructor(apiContext,loginPayload) 
    {

        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }
   async getToken() {

    const loginResponse =await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
       {data: this.loginPayload})
   // expect(loginResponse.ok()).toBeTruthy()
    const loginResJson = await loginResponse.json()
    this.token = loginResJson.token 
    console.log(this.token)
    return this.token
    }

    async createOrder(orderPayload){

 const orderResp =await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {data: orderPayload,
        headers: { 
            'Authorization': this.token, 'Content-Type': 'application/json'
        },

    })

    
   // expect(orderResp.ok).toBeTruthy
    const orderRespJsn = await orderResp.json()
    console.log(orderRespJsn)
    let orderID = await orderRespJsn.orders[0]

    return orderID

 }
 }
 module.exports = {APIUtil}
