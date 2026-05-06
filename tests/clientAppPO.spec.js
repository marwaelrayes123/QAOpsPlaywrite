const {test, expect} = require('@playwright/test');
const {customTest} = require('./utils/test-base')
const console = require('node:console');
const {POManager} = require('../pageobjects/POManager')

const dataSet = JSON.parse(JSON.stringify(require("./utils/placeorderTestData.json")))

for(let data of dataSet) {



test(`Browser playwright Practice "${data.productName}"`, async ({page })=> 
{
  
 


  


  const poManager = new POManager(page)
  const loginPage = poManager.getLoginPage()
  await loginPage.goTo()
  console.log(data.username)
  console.log(data.password)
  console.log(data.productName)
  await loginPage.validLogin(data.username,data.password)


  const dashboardPage = poManager.getDashboardPage()
  
  
await dashboardPage.searchProductAddCart(data.productName)
await dashboardPage.navigateToCart()

      const cartPage = poManager.getCartPage();
    let bool = await cartPage.VerifyProductIsDisplayed(data.productName);
    expect(bool).toBeTruthy();
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await expect(ordersReviewPage.getSuccessMessage()).toHaveText(" Thankyou for the order. ");
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  

})}

customTest("@web custom Test", async ({page,testDataForOrder })=> {
  
  const poManager = new POManager(page)
  const loginPage = await poManager.getLoginPage()
  await loginPage.goTo()
  console.log(testDataForOrder.username)
  console.log(testDataForOrder.password)
  console.log(testDataForOrder.productName)
  await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password)


  const dashboardPage =  poManager.getDashboardPage()
  
  
await dashboardPage.searchProductAddCart(testDataForOrder.productName)
await dashboardPage.navigateToCart()

      const cartPage =  poManager.getCartPage();
    let bool = await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    expect(bool).toBeTruthy();
    await cartPage.Checkout();

    const ordersReviewPage =  poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await expect(ordersReviewPage.getSuccessMessage()).toHaveText(" Thankyou for the order. ");

   await page.locator("button[routerlink='/dashboard/myorders']").waitFor();
await page.locator("button[routerlink='/dashboard/myorders']").click();
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage =  poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  

})