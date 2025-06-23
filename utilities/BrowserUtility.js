import { expect } from "@playwright/test";

export class BrowserUtility {
  static async check(locator) {
    await locator.check();
    await expect(locator).toBeChecked();
  }

  static async uncheck(locator) {
    await locator.uncheck();
    await expect(locator).not.toBeChecked();
  }

  static async verify_title(page, expected) {
    await expect(page).toHaveTitle(expected, { timeout: 5000 });
  }

  static async enter_input(locator, input) {
    if (await locator.isVisible()) {
      await locator.fill(input);
    } else {
      throw new Error(`Element is not visible: ${locator}`);
    }
  }
}
