import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { signInPage } from "../../globalPagesSetup.js";

When("the user enters an incorrect password", async function () {
  await signInPage.signInPasswordInput.fill("invalidpass")
});
