const { test, expect, request } = require('@playwright/test');
const { APIUtil } = require('./utils/APIUtil');


test('Security test request', async ({ page }) => {

    const productName = "ZARA COAT 3"


    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title())
    const userName = page.locator("#userEmail")
    const products = page.locator(".card-body")
    const email = "marwa.elrayes@gmail.com"
    await userName.fill(email)
    await page.locator("#userPassword").fill("RY525279me!")
    await page.locator("#login").click()
    await page.waitForLoadState("networkidle")
  await page.locator(".card-body b").first().waitFor()
  await page.locator("button[routerlink*='myorders']").click()

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator('p').last()).toHaveText('You are  not authorize to view this order')



})