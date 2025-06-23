import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { homePage, myBag, cartPage } from "../../globalPagesSetup.js";

When("the user removes the product from the cart", async function () {
    await cartPage.productRemoveButton.click();
});

Then("the item should no longer be visible in the cart", async function () {
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
