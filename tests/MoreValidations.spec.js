const {test, expect} = require('@playwright/test');
const console = require('node:console');
test.describe.configure({mode:'serial'})
test('popup validations', async ({page})=> 
{
      await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
      await expect(page.locator("#displayed-text")).toBeVisible()
      await page.locator("#hide-textbox").click()
      await expect(page.locator("#displayed-text")).toBeHidden()
       page.pause()
      page.on('dialog', dialog => dialog.accept())
      await page.locator("#confirmbtn").click()

      await page.locator("#mousehover").hover()
     const framesPage = page.frameLocator("#courses-iframe")
     await framesPage.locator("li a[href*='lifetime-access']:visible").click()
     const text = await framesPage.locator(".text h2").textContent()
     console.log(text.split(" ")[1])






}  )

test('Screenshot  & visual comparison', async ({page})=> 
{
      await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
      await expect(page.locator("#displayed-text")).toBeVisible()

      await page.locator("#displayed-text").screenshot({path:'partialscreen.png'})
      
      await page.locator("#hide-textbox").click()
      await page.screenshot({path:'screenshot.png'})

      await expect(page.locator("#displayed-text")).toBeHidden()



})

test('visual', async ({page})=> 
{
      await page.goto("https://google.com/")
      expect(await page.screenshot()).toMatchSnapshot('google.png')


})