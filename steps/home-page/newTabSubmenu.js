import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { homePage } from "../../globalPagesSetup.js";

Given("the user is on the homepage", async function () {
  await homePage.start();
});

When("the user hovers over the New navigation tab", async function () {
  await homePage.newTab.click( {force: true});
});

Then("the submenu should be visible", async function() {
    await expect(homePage.newSubmenu).toBeVisible();
});

Then(
  "the submenu should contain multiple product blocks with CTA buttons",
  async function () {
    await homePage.ctaButtons.first().waitFor({ timeout: 5000 });
    const count = await homePage.ctaButtons.count();
    expect(count).toBeGreaterThan(1);
  }
);

Then(
  "each product block should contain an image, title, and CTA button",
  async function () {
    const blockCount = await homePage.productBlocks.count();
    console.log(`Found ${blockCount} product blocks`);

    for (let i = 0; i < blockCount; i++) {
      const block = homePage.productBlocks.nth(i);
      const isVisible = await block.isVisible();
      if (!isVisible) continue; // skip invisible blocks

      await block.scrollIntoViewIfNeeded();

      const img = block.locator("img");
      await expect(img, `Image not visible in block ${i}`).toBeVisible({
        timeout: 5000,
      });

      const title = block.locator(".mantle-custom-text");
      await expect(title, `Missing title in block ${i}`).toHaveCount(1);

      const cta = block.locator("a");
      await expect(cta, `Missing CTA in block ${i}`).toHaveAttribute(
        "href",
        /.+/
      );
    }
  }
);




Then(
  "each CTA button in the submenu should have a valid href",
  async function () {
    const count = await homePage.ctaButtons.count();
    for (let i = 0; i < count; i++) {
      const href = await homePage.ctaButtons.nth(i).getAttribute("href");
      expect(href).toMatch(/^https?:\/\/|^\//); // Or check for relative links: /^\/[a-z]/i
    }
  }
);

Then("the button text should not be empty", async function () {
  const count = await homePage.ctaButtons.count();
  for (let i = 0; i < count; i++) {
    const text = await homePage.ctaButtons.nth(i).textContent();
    expect(text.trim().length).toBeGreaterThan(0);
  }
});

When("the user clicks the first CTA button", async function () {
  this.linkHref = await homePage.ctaButtons.first().getAttribute("href");
  await homePage.ctaButtons.first().click();
});

Then(
  "the user should be navigated to the correct product detail page",
  async function () {
    // Use 'load' for broader compatibility
    await this.page.waitForLoadState("load");

    const currentPath = new URL(this.page.url()).pathname;
    const expectedPath = new URL(this.linkHref, this.page.url()).pathname;

    expect(currentPath).toBe(expectedPath);
  }
);