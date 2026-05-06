class DashboardPage{

    constructor(page) {

          this.products = page.locator(".card-body")
          this.productsText = page.locator(".card-body b")
          this.cart = page.locator("[routerlink*='cart']")
          this.page = page
            this.orders = page.locator("button[routerlink*='myorders']");

    }

    async searchProductAddCart(productName) {

        // await this.page.waitForLoadState("networkidle")
  //console.log(await page.locator(".card-body b").nth(0).textContent())
      //console.log(await page.locator(".card-body b").first().textContent())
    //  await page.locator(".card-body b").first().waitFor()
      
       const allTitles = await this.productsText.allTextContents()
       console.log(allTitles)

       console.log(await this.products.count())
       let count =await this.products.count()
       for(let i =0;i<count;i++) 
        {
          if(await this.products.nth(i).locator("b").textContent() == productName)
             {
                await this.products.nth(i).locator("text= Add To Cart").click()
                break;
             }
    
      }

    }

    async navigateToCart() {
        await this.cart.click()
    }
    
    async navigateToOrders()
{
    await this.orders.click();
}
}
module.exports = {DashboardPage}