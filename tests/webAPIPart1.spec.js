const {test, expect,request} = require('@playwright/test');
const { APIUtil } = require('./utils/APIUtil');

const console = require('node:console');
const loginPayload={userEmail: "marwa.elrayes@gmail.com", userPassword: "RY525279me!"}
const orderPayload={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let orderID

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
  await page.locator("button[routerlink*='myorders']").click()

  await page.locator("tbody").waitFor()
 const rows =  page.locator("tbody tr")

 
for (let i = 0; i < await rows.count(); ++i) {
  const rowOrderId = (await rows.nth(i).locator("th").textContent()).trim();
  console.log("Row ID:", rowOrderId);

  if (orderID.includes(rowOrderId)) {
    console.log("FOUND MATCH ✅");
    await rows.nth(i).locator("button").first().click();
    break;
  }
}
const orderIdLocator = page.locator("//small[text()='Order Id']/following-sibling::div");
await expect(orderIdLocator).toBeVisible();
const orderIDDetails = (await orderIdLocator.textContent()).trim();
console.log(orderIDDetails);
await page.pause()
   expect(orderID.includes(orderIDDetails)).toBeTruthy();


} );