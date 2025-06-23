import dotenv from "dotenv";
import { BrowserUtility } from "../utilities/BrowserUtility.js";
dotenv.config();

export class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async start() {
    await this.page.goto(process.env.HOME_PAGE_URL, { waitUntil: "load" });

    await BrowserUtility.verify_title(
      this.page,
      "Clinique | Dermatology Skincare, Makeup, Fragrances & Gifts"
    );
  }

  async goToSignInPage() {
    await this.page.goto(process.env.SU_SI_PAGE_URL, { waitUntil: "load" });

    await BrowserUtility.verify_title(this.page, "Clinique");
  }

  async goToCartPage() {
    await this.page.goto(process.env.CART_PAGE_URL, { waitUntil: "load" });

    await BrowserUtility.verify_title(this.page, "Clinique");
  }
}
