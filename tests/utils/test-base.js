const { test } = require('@playwright/test');

exports.customTest = test.extend({
  testDataForOrder: async ({}, use) => {
    await use({
      username: "marwa.elrayes@gmail.com",
      password: "RY525279me!",
      productName: "ZARA COAT 3",
    });
  },
});