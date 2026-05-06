const {test, expect,request} = require('@playwright/test');
const { APIUtil } = require('./utils/APIUtil');

const console = require('node:console');
const loginPayload={userEmail: "marwa.elrayes@gmail.com", userPassword: "RY525279me!"}
const orderPayload={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let orderID
const fakeResponse={data:[],message:"No Orders"}
let token

test.beforeAll( async ()=>
{
    const apiContext = await request.newContext();

    const Utils = new APIUtil(apiContext,loginPayload);

    token = await Utils.getToken();

 console.log(token)

    orderID = await Utils.createOrder(orderPayload)

} );

test.beforeEach( ()=>
{


} );
test('Browser playwright Practice', async ({page})=> 
{
 
    await page.addInitScript(value=>{
         window.localStorage.setItem('token',value)
    },token)
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

    async route=>{
      const resp = await page.request.fetch(route.request())
      let body = JSON.stringify(fakeResponse)
      route.fulfill(
        {
          resp, body 
        }
      )
    }
  )


  await page.locator("button[routerlink*='myorders']").click()
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  console.log(await page.locator(".mt-4").textContent())

} );