
import {test as baseTest} from '@playwright/test'


interface TestDataForOrder {
username:string,
password:string,
productName:string


};
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>({
  testDataForOrder: async ({}, use) => {
    await use({
      username: "marwa.elrayes@gmail.com",
      password: "RY525279me!",
      productName: "ZARA COAT 3",
    });
  },
});