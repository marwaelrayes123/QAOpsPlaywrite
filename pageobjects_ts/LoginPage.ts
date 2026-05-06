import {test, expect,Page, Locator} from '@playwright/test';

export class LoginPage {
  page:Page
  signInButton:Locator
  userName:Locator
  password:Locator


constructor(page:Page) {
    this.page = page
    this.signInButton = page.locator("#login")
    this.userName = page.locator("#userEmail")
    this.password = page.locator("#userPassword")
}

async validLogin(name:string,password:string) {
  
  await this.userName.fill(name)
  await this.password.fill(password)
 // await this.signInButton.click()
   await Promise.all([
    this.page.waitForURL(/.*dashboard|.*client.*/),
    this.signInButton.click(),
    this.page.locator('.card-body').first().waitFor()
  ]);


}
async goTo(){

      await this.page.goto("https://rahulshettyacademy.com/client/");
    
}

}
