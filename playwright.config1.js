// @ts-check
import { defineConfig, devices, firefox } from '@playwright/test';
import { worker } from 'node:cluster';
import { permission } from 'node:process';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  //retries: 1,
  //workers:4,
   timeout: 30 *1000,
   expect:  {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name:'Safari',
      use: {
        browserName : 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPad (gen 11)']

  }
    },
    {
      name:'chrome',
        use: {
     browserName : 'chromium',
     headless: false,
     screenshot: 'on',
     video:'retain-on-failure',
     trace: 'retain-on-failure',
     ignoreHttpsErrors:true,
     Permissions:['geolocation'],
     //  ...devices['']
   //  viewport:{width:720,height:720}
     

  }
    }

  ]
,


});

module.exports = config

