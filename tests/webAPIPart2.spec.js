const {test, expect} = require('@playwright/test');
const console = require('node:console');
let webContext

test.beforeAll(async({browser})=> {

  let context = await browser.newContext();
  let page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title())
  const userName = page.locator("#userEmail")
  const products = page.locator(".card-body")
  const email = "marwa.elrayes@gmail.com"
  await userName.fill(email)
  await page.locator("#userPassword").fill("RY525279me!")
  await page.locator("[value='Login']").click()
  await page.waitForLoadState('networkidle')


await context.storageState({ 
  path: 'state.json'
}
);
webContext = await browser.newContext({storageState:'state.json'})

}
)

test('Browser playwright Practice', async ({})=> 
{
  const page = await webContext.newPage()
  await page.locator(".card-body b").first().waitFor()
     //const allTitles = await page.locator(".card-body b").allTextContents()
     //console.log(allTitles)
     
       const products = page.locator(".card-body")
     console.log(await products.count())
     let count =await products.count()
     for(let i =0;i<count;i++) 
      {
        if(await products.nth(i).locator("b").textContent() == productName)
           {
              await products.nth(i).locator("text= Add To Cart").click()
              break;
           }
  
    }
    await page.locator("[routerlink*='cart']").click()
    await page.locator('div li').first().waitFor()
    const bool =await page.locator(`h3:has-text("${productName}")`).isVisible()
    expect(bool).toBeTruthy()
  
    await page.locator("text=Checkout").click()
    await page.locator("[placeholder*='Country']").pressSequentially("ind")
    const options = page.locator(".ta-results");
    await options.first().waitFor()
    let optionsCount = await options.locator("button").count()
    for(let i=0;i<optionsCount;i++)
   {
              let text = await options.locator("button").nth(i).textContent()
              if(text.trim() === "India")
                {
                  await options.locator("button").nth(i).click()
                  break
  
                  }   
  
   }
  
  
  expect( page.locator(".user__name [type*='text']").first()).toHaveText(email)
  
  
   await page.locator(".action__submit").click()
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
   const orderID = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).trim();
  console.log("ORDER ID:", orderID);
  
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
  
  
  });