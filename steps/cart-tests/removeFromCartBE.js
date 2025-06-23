import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

When("the user removes the product from the my bag component", async function () {
  const removeBtn = this.page.locator(
    'a.js-product-row-info-remove[aria-label="Remove Item"]'
  );

  await expect(removeBtn).toBeVisible();

  const skuBaseId = await removeBtn.getAttribute("data-sku-base-id");
  const cartId = await removeBtn.getAttribute("data-cart-id");

  this.responsePromise = this.page.waitForResponse(async (res) => {
    const isCorrectURL = res.url().includes("/rpc/jsonrpc.tmpl");
    const isPost = res.request().method() === "POST";

    if (!isCorrectURL || !isPost) return false;

    const rawBody = res.request().postData() || "";
    const decodedBody = decodeURIComponent(rawBody);

    //console.log("📦 Decoded Request Body:", decodedBody);

    return (
      decodedBody.includes('"method":"rpc.form"') &&
      decodedBody.includes(`"SKU_BASE_ID":${skuBaseId}`) &&
      decodedBody.includes(`"CART_ID":${cartId}`) &&
      decodedBody.includes('"QTY":0')
    );
  });

  await removeBtn.click();
});

Then(
  "a network request for removing the product should be successful",
  async function () {
    const response = await this.responsePromise;
    expect(response.status()).toBe(200);

    const json = await response.json();
    //console.log("🗑️ Remove Response JSON:", JSON.stringify(json, null, 2));

    const cartEvent = json?.[0]?.result?.data?.ac_results?.find(
      (res) => res.method === "deleteSku" && res.action === "delete"
    );

    // ✅ Validate removal action
    expect(cartEvent?.result?.SUCCESS).toBe(1);
    expect(cartEvent?.result?.METHOD).toBe("deleteSku");

    // ✅ Ensure this specific item's quantity is now 0
    expect(cartEvent?.result?.ITEM_QUANTITY).toBe(0);

    // ✅ Optional: assert that the removed item's SKU and CART_ID match what we clicked
    const removedSKU = cartEvent?.result?.SKU_BASE_ID?.toString();
    const removedCartId = cartEvent?.result?.CART_ID?.toString();

    const expectedSKU = await this.page
      .locator('a.js-product-row-info-remove[aria-label="Remove Item"]')
      .getAttribute("data-sku-base-id");
    const expectedCartId = await this.page
      .locator('a.js-product-row-info-remove[aria-label="Remove Item"]')
      .getAttribute("data-cart-id");

    expect(removedSKU).toBe(expectedSKU);
    expect(removedCartId).toBe(expectedCartId);

    console.log(`Verified removal:
      • SKU_BASE_ID: ${removedSKU}
      • CART_ID: ${removedCartId}
      • METHOD: ${cartEvent?.result?.METHOD}
      • ITEM_QUANTITY: ${cartEvent?.result?.ITEM_QUANTITY}
      • SUCCESS: ${cartEvent?.result?.SUCCESS}
    `);
    // ✅ Do NOT check that subtotal or items_count is zero, unless you're testing cart-clear
  }
);
  