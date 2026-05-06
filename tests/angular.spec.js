const {test, expect} = require('@playwright/test');
const console = require('node:console');

test('test angular', async ({page})=> 
{
     await page.goto("https://rahulshettyacademy.com/angularpractice/")
     await page.getByLabel("Check me out if you Love IceCreams!").click()
     await page.getByLabel("Employed").check()
     await page.getByLabel("Gender").selectOption("Female")
     await page.getByPlaceholder("Password").fill("abc123")
     await page.getByRole("button",{name:'Submit'}).click()

     expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible()
     await page.getByRole("link",{name:'Shop'}).click()
     expect(page.locator("app-card").filter({hasText:'iphone X'})).toBeVisible()
     await page.locator("app-card").filter({hasText:'iphone X'}).getByRole("button").click()

await page.pause()






});
