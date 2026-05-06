const {test, expect} = require('@playwright/test');
const console = require('node:console');

test('Browser playwright Practice with angular', async ({browser})=> 
{
  const productName = "ZARA COAT 3"
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");
  console.log(await page.title())
  const userName = page.getByPlaceholder("email@example.com")
  const products = page.locator(".card-body")
  const email = "marwa.elrayes@gmail.com"
  await userName.fill(email)
  await page.getByPlaceholder("enter your passsword").fill("RY525279me!")
  await page.getByRole("button",{name:'Login'}).click()
 // await page.waitForLoadState("networkidle")
  //console.log(await page.locator(".card-body b").nth(0).textContent())
  //console.log(await page.locator(".card-body b").first().textContent())
  await page.locator(".card-body b").first().waitFor()
   //const allTitles = await page.locator(".card-body b").allTextContents()
   //console.log(allTitles)
   console.log(await products.count())
   await products.filter({hasText:productName}).getByRole("button",{name:'Add to Cart'}).click()

  await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click()

  await page.locator('div li').first().waitFor()
  //const bool =await page.locator(`h3:has-text("${productName}")`).isVisible()
  expect(page.getByText(productName)).toBeVisible()

  await page.getByRole("button",{name:'Checkout'}).click()
  await page.getByPlaceholder("Select Country").pressSequentially("ind")
  

  await page.getByRole("button",{name:'India'}).nth(1).click()

  


expect( page.locator(".user__name [type*='text']").first()).toHaveText(email)


 await page.getByText("PLACE ORDER").click()
 await expect(page.getByText("Thankyou for the order.")).toBeVisible()

 const orderID = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).trim();
console.log("ORDER ID:", orderID);
/*
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
   expect(orderID.includes(orderIDDetails)).toBeTruthy();
*/

} );