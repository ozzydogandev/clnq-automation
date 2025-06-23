import { BasePage } from "./BasePage.js"

export class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.lastAddedProduct = page.locator(
      ".cart-confirm-wrapper__content--products .last-item-added"
    );

    this.lastAddedProductTitle = page.locator(
      ".cart-confirm-wrapper__content--products .last-item-added .cart-product-name"
    );

    this.cartItemBlock = page.locator(".cart-items .cart-item");

    this.emptyCartMessage = page.locator("div.empty-cart-message h2", {
      hasText: "Your Bag is currently empty.",
    });    

    this.productRemoveButton = page.locator(
      'a[data-test-id="cart_product_remove"]'
    );

  }
}
