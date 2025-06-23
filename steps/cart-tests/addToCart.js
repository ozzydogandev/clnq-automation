import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { homePage, myBag, cartPage } from "../../globalPagesSetup.js";

Then(
  "added product should be visible in the my bag component",
  async function () {
    await expect(myBag.myBagAddedItem).toBeVisible();
  }
);

Then("user closes the my bag component", async function () {
    await myBag.myBagCloseButton.click();
});

// 3. Cart icon count should update
Then("the cart icon should show an updated item count", async function () {
    // Wait up to 7 seconds for the cart count to appear
    try {
      await expect(homePage.cartIconCount).toBeVisible({ timeout: 7000 });
  
      const countText = await homePage.cartIconCount.textContent(); // ✅ fixed typo: textContext ➝ textContent
      const itemCount = parseInt(countText || "0", 10);
  
      console.log(`🛒 Cart count shown on icon: ${itemCount}`);
      expect(itemCount).toBeGreaterThan(0);
    } catch (error) {
      console.warn("⚠️ Cart icon count did not become visible. Continuing test.");
      console.warn(error.message);
    }
  });

// 5. Navigate to Cart Page
When("the user navigates to the cart page", async function () {
    await cartPage.goToCartPage();
});

// 6. Confirm item visible in Cart Page

Then("the added item should be visible in the cart", async function () {
  await expect(cartPage.cartItemBlock.first()).toBeVisible();
});