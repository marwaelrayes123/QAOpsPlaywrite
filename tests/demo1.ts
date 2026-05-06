import { Locator, Page } from '@playwright/test';

let message1 : string = "Hello";
message1 = 'bye2';
console.log(message1)
let age1:number =20;
console.log(age1)
let isActive :boolean = false;
let numbers1: number[] = [1,2,3]

let data :  any = "jsahdkjahd"
data = 42

function add1(a:number,b:number):number {
    return a+b
}
add1(3,4)

let user1: {name:string,age:number,location:string}={name:"bob",age:34,location:"Denmark"}

user1.location ='India'

class CartPage
{

    page:Page
    cartProducts:Locator
    productsText:Locator
    cart:Locator
    orders:Locator
    checkout:Locator



constructor(page:Page)
{
    this.page = page;
    this.cartProducts = page.locator("div li");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName:string)
{
   // await this.page.waitForLoadState("networkidle")
    await this.cartProducts.first().waitFor();
   // const bool =await this.getProductLocator(productName).isVisible();
    //return bool 

     const product = this.cartProducts.filter({ hasText: productName });
    return await product.count() > 0;
    //expect(bool).toBeTruthy();

}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName:string)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}
export { CartPage };


