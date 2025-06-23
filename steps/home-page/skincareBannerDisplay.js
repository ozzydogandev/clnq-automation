import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { homePage } from "../../globalPagesSetup.js";

Then("the marketing banner should be visible", async function () {
  await expect(homePage.skincareBanner).toBeVisible();
});

Then("it should contain the headline {string}", async function (text) {
  await expect(homePage.skincareHeadline).toContainText(text);
});

Then(
  "the banner should include the text {string}",
  async function (expectedText) {
    const bannerElement = homePage.getSkincareText(expectedText);
    await expect(bannerElement).toBeVisible({ timeout: 5000 });
  }
);

Then("there should be a CTA button labeled {string}", async function (label) {
  await expect(homePage.getSkincareCTAButtonByLabel(label)).toBeVisible();
});

Then(
  "the {string} button should link to {string}",
  async function (label, expectedHref) {
    const button = homePage.getSkincareCTAButtonByLabel(label);
    await expect(button).toHaveAttribute("href", expectedHref);
  }
);
