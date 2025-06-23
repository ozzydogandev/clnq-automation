import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { signInPage } from "../../globalPagesSetup.js";

When("the user enters invalid email as the email", async function () {
  await signInPage.signInEmailInput.fill("invalid@test.com");
});

Then("an error message should appear", async function () {
    await expect(signInPage.signInErrorMessages).toBeVisible();
  }
);