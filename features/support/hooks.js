const { After, Before, BeforeStep,AfterStep, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager')
const { chromium } = require('@playwright/test');


Before( async function () {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();


    this.page = await context.newPage();
    this.poManager = new POManager(this.page)
});

BeforeStep(async function(){


})

AfterStep(async function({result}){

    if(result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot1.png'})
    }
    
})

After(function () {
    console.log("Last step to execute")
});