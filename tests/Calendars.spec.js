const {test, expect} = require('@playwright/test');
const console = require('node:console');
test('calendar', async ({page})=> 
{
    const monthy="6"
    const datey="15"
    const yeary="2027"
    const expectedList = [monthy,datey,yeary]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
     await page.locator(".react-calendar__navigation__label").click()
    await page.getByText(yeary).click()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthy)-1).click()
    await page.locator("//abbr[text()='"+datey+"']").click()
// calendar check changes 
     const inputs = page.locator('.react-date-picker__inputGroup__input')

     for(let i =0;i<expectedList.length;i++)
{
    let xx = await inputs.nth(i).inputValue()
     expect(xx).toEqual(expectedList[i])


 }
    } );