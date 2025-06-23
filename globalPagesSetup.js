import { HomePage } from "./pages/HomePage.js";
import { SignInPage } from "./pages/SignInPage.js";
import { MyBag } from "./pages/MyBag.js";
import { CartPage } from "./pages/CartPage.js";

/**
 * @type {import('./pages/HomePage.js').HomePage}
 */
export let homePage;
/**
 * @type {import('./pages/SignInPage.js').SignInPage}
 */
export let signInPage;
/**
 * @type {import('./pages/MyBag.js').MyBag}
 */
export let myBag;
/**
 * @type {import('./pages/CartPage.js').CartPage}
 */
export let cartPage;
/**
 * @type {import('@playwright/test').Page}
 */
export let page;



/**
 * Initializes page objects
 * @param {import('playwright').Page} argPage
 */
export const initElements = (argPage) => {
  page = argPage;
  homePage = new HomePage(page);
  signInPage = new SignInPage(page);
  myBag = new MyBag(page);
  cartPage = new CartPage(page);
};