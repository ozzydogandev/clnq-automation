import { BasePage } from "./BasePage.js"

export class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.newTab = page.locator('label[for="gnav-link-New"][aria-label="New"] >> span:text("New")').first();
    this.newSubmenu = page.locator("#gnav-subnav-New");
    this.newSubmenuBackButton = page.locator(".gnav-block__main-navigation-link-back");
    this.newSubmenuCloseButton = page.locator(".gnav-block__main-navigation-layout-content-close-label");
    this.linkAllNewProducts = page.locator('a[aria-label="All New Products"]');
    this.linkGiftSets = page.locator('a[aria-label="Gift Sets"]');
    this.linkMoistureSurge = page.locator('a[aria-label="Moisture Surge Active Glow Serum"]');
    this.linkCliniqueGlow = page.locator('a[aria-label="That Clinique Glow"]');
    this.linkNightSkincare = page.locator('a[aria-label="Night Skincare"]');
    this.linkRedCarpet = page.locator('a[aria-label="Red Carpet Look"]');
    this.linkBeautyTrends = page.locator('a[aria-label="Beauty Trends"]');
    this.linkBundles = page.locator('a[aria-label="Better Together Bundles"]');
    this.ctaButtons = page.locator("#gnav-subnav-New .content-block__links a");
    this.promoImages = page.locator(".content-block__image img");
    this.productBlocks = page.locator(".gnav_submenu_layout__column .basic-tout__inner");
    this.skincareBanner = page
      .locator(".hero-full-width__content-text")
      .first();
    this.skincareHeadline = page
      .locator(".content-block__line--headline")
      .first();
    this.skincareDescription = page
      .locator(".content-block__line--content")
      .first();
    this.getSkincareText = (text) =>
      page.locator(`.hero-full-width__content-text >> text=${text}`).first();
    this.getSkincareCTAButtonByLabel = (label) =>
      page.locator(`.hero-full-width__links >> role=link[name="${label}"]`);
    this.cartIconCount = page.locator(
      'em.header-gnav-cart__count[data-pg-object="cart"][data-pg-prop="items_count"]'
    );
  }
}
