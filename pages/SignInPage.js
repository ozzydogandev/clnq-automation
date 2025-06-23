import { BasePage } from "./BasePage.js"

export class SignInPage extends BasePage {
  constructor(page) {
    super(page);

    this.signInTab = page.locator("//a[@id='return-user-link']");
    this.createAccountTab = page.locator("//a[@id='new-account-link']");
    this.signInEmailInput = page.locator("//input[@data-test-id='form_signin_email']");
    this.signInPasswordInput = page.locator("//input[@data-test-id='form_signin_password']");
    this.signInButton = page.locator("//input[@data-test-id='form_signin_continue']");

    this.forgotPasswordLink = page.locator("//a[@id='forgot-password']");

    this.createEmailInput = page.locator("//input[@data-test-id='form_email']");
    this.createPasswordInput = page.locator("//input[@data-test-id='form_password']");
    this.createAccountButton = page.locator("//input[@data-test-id='form_registration_continue']");

    this.loyaltyCheckbox = page.locator("//input[@data-test-id='loyalty_join_select']");
    this.emailPromoCheckbox = page.locator("//input[@data-test-id='form_emailpromo']");

    this.signInErrorMessages = page.locator("//ul[@id='form--errors--signin']//li[not(@style='display:none')]");
    this.createAccountErrorMessages = page.locator("//ul[@id='form--errors--registration_short']//li[not(@style='display:none')]");

    this.welcomeMessage = page.locator('a[href="https://www.clinique.com/account/index.tmpl"]');
  }
}
