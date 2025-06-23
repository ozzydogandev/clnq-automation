import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { signInPage } from "../../globalPagesSetup.js";

Given("the user is on the Sign In page", async function () {
  await signInPage.goToSignInPage();
});

When("the user enters a valid email", async function () {
  await signInPage.signInEmailInput.fill(process.env.VALID_EMAIL);
});

When("the user enters a valid password", async function () {
    await signInPage.signInPasswordInput.fill(process.env.VALID_PASSWORD);
});

When("the user clicks the Sign In button", async function () {
  // Wait for the correct backend request triggered after clicking Sign In
  this.signInResponsePromise = this.page.waitForResponse(async (res) => {
    const url = res.url();
    const method = res.request().method();

    if (!url.includes("/rpc/jsonrpc.tmpl") || method !== "POST") return false;

    const bodyRaw = res.request().postData();
    const params = new URLSearchParams(bodyRaw);
    const encodedPayload = params.get("JSONRPC");

    if (!encodedPayload) return false;

    try {
      const parsed = JSON.parse(encodedPayload);

      return parsed?.[0]?.method === "user.fullData";
    } catch (err) {
      console.warn("Failed to parse JSONRPC:", err.message);
      return false;
    }
  });

  await signInPage.signInButton.click();
});

Then("the user should be redirected to the dashboard", async function () {
    await this.page.waitForTimeout(3000);
    await expect(this.page.url()).toBe(
      "https://www.clinique.com/account/profile_preferences.tmpl"
    );
});

Then("a welcome message should be visible", async function () {
    await expect(signInPage.welcomeMessage).toContainText(/Welcome\s+\w+\s*!/);
});
