const {test, expect} = require('@playwright/test');

const console = require('node:console');

test('Page playwright UI controls', async ({page})=> 
{

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.title()
    const userName = page.locator("#username")
  //const titles = page.locator(".card-body a")
  await userName.fill("learning")
  await page.locator("[type='password']	").fill("Learning@830$3mK2")

  await page.locator(".radiotextsty").last().click()
  await page.locator("#okayBtn").click()
  
  //await page.locator("#cancelBtn").click()
  await expect( page.locator(".radiotextsty").last()).toBeChecked()
  await page.locator("#terms").click()
  await expect( page.locator("#terms")).toBeChecked()

  const dropdown = page.locator("select.form-control")
  await dropdown.selectOption("consult")

  await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText")
  

  

 // await page.pause()
 // await page.locator("#signInBtn").click()


} );

test('Browser playwright test', async ({browser})=> 
{

  const context = await browser.newContext();
  const page = await context.newPage();
  //page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title())
  const userName = page.locator("#username")
  const titles = page.locator(".card-body a")
  page.on('request',request=>console.log(request.url()))
   page.on('response',Response=>console.log(Response.url() , Response.status()))
   await userName.fill("rahulshettyacademy")
  await page.locator("[type='password']	").fill("Learning@830$3mK2")



 
 
  await page.locator("#signInBtn").click()
  console.log(await titles.nth(0).inputValue())
  console.log(await titles.first().inputValue())
   const allTitles = await titles.allTextContents()
   console.log(allTitles)
  




} );

test('childwindows', async ({browser})=> 
{
  const context = await browser.newContext();
  const page =  await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']")
  const userName = page.locator("#username")

  const  [newPage] = await Promise.all(
  [context.waitForEvent('page'),
  documentLink.click(),
 ])
 



 let text = await newPage.locator(".red").textContent()
console.log(text)
const arrayText = text.split("@")
const email = arrayText[1].split(" ")[0]


await page.locator("#username").fill(email)
console.log(await page.locator("#username").inputValue())
//await page.pause()
 
}  )
