import { BasePage } from "./BasePage.js"

export class MyBag extends BasePage {
  constructor(page) {
    super(page);

    this.myBagCloseButton = page.locator('svg.js-header-gnav-cart__close[aria-labelledby="gnav-cart-close"]');
    this.myBagAddedItem = page.locator('//div[contains(@class, "cart-confirm-wrapper__content--products")]//div[contains(@class, "last-item-added")]');
  }
}
