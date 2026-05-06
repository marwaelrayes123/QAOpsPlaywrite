class LoginPage {

constructor(page) {
    this.page = page
    this.signInButton = page.locator("#login")
    this.userName = page.locator("#userEmail")
    this.password = page.locator("#userPassword")
}

async validLogin(name,password) {
  
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
module.exports ={LoginPage}