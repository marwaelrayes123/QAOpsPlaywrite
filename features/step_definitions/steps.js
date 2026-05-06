
const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager')
const { expect } = require('@playwright/test');





Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions


    //page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
    //  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");


    const loginPage = await this.poManager.getLoginPage()
    await loginPage.goTo()
    console.log(username)
    console.log(password)
    // console.log(testDataForOrder.productName)
    await loginPage.validLogin(username, password)


});

When('Add {string} to Cart', async function (product) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage()


    await this.dashboardPage.searchProductAddCart(product)
    await this.dashboardPage.navigateToCart()
});
Then('Verify {string} is displayed in the Cart', async function (product) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    let bool = await cartPage.VerifyProductIsDisplayed(product);
    expect(bool).toBeTruthy();
    await cartPage.Checkout();
});

When('Enter valid details and Place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("When enter valid")
    this.ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify odrer in present in the OrderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("then Verify")
    await expect(this.ordersReviewPage.getSuccessMessage()).toHaveText(" Thankyou for the order. ");

    // await this.page.locator("button[routerlink='/dashboard/myorders']").waitFor();
    // await this.page.locator("button[routerlink='/dashboard/myorders']").click();
    await this.dashboardPage.navigateToOrders();
    console.log("then Verify1")
    this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    console.log("then Verify2")
    await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
    console.log("then Verify3")
    expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy();
    console.log("then Verify4")
    //  await this.browser?.close();
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (user, pass) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title())

    const userName = this.page.locator("#username")
    const signIn = this.page.locator("#signInBtn")

    await userName.fill(user)
    await this.page.locator("[type='password']").fill(pass)
    await signIn.click()
});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent())
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect')
});