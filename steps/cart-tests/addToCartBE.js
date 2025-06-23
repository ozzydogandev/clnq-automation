import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { homePage } from "../../globalPagesSetup.js";

When(
  "user scrolls to the product and clicks the {string} button",
  async function (buttonLabel) {
    const productCard = this.page
      .locator('[data-test-id="product_brief"]')
      .filter({
        has: this.page.locator("h2", {
          hasText: "Moisture Surge™ 100H Auto-Replenishing Hydrator",
        }),
      });

    await expect(productCard).toHaveCount(1);

    const addToBagButton = productCard.locator(
      `button[aria-label="${buttonLabel}"]`
    );
    await addToBagButton.scrollIntoViewIfNeeded();

    this.responsePromise = this.page.waitForResponse(async (res) => {
      const isCorrectURL = res.url().includes("/rpc/jsonrpc.tmpl");
      const isPost = res.request().method() === "POST";
      const body = res.request().postData() || "";

      return (
        isCorrectURL &&
        isPost &&
        decodeURIComponent(body).includes('"method":"rpc.form"')
      );
    });
    await addToBagButton.click();
  }
);

Then(
  "a network request for adding the product should be successful",
  async function () {
    const response = await this.responsePromise;
    expect(response.status()).toBe(200);

    const json = await response.json();

    const cartItem = json?.[0]?.result?.data?.ac_results?.[0]?.result?.CARTITEM;

    expect(cartItem?.["prod.PROD_RGN_NAME"]).toBe(
      "Moisture Surge™ 100H Auto-Replenishing Hydrator"
    );
    expect(cartItem?.["ITEM_QUANTITY"]).toBe(1);
    expect(cartItem?.["sku.SKU_ID"]).toBe("SKU126683");

    console.log(`Verified add-to-cart:
      • PRODUCT_NAME: ${cartItem?.["prod.PROD_RGN_NAME"]}
      • SKU_ID: ${cartItem?.["sku.SKU_ID"]}
      • ITEM_QUANTITY: ${cartItem?.["ITEM_QUANTITY"]}
    `);
  }
);
