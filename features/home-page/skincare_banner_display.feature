@homepage @marketing_banner
Feature: AC - Skincare Marketing Banner Display

    As a shopper,
    I want to see a prominent banner for featured skincare products on the homepage,
    So that I can learn more about them and navigate to their product pages easily.

    Background:
        Given the user is on the homepage

    Scenario: Skincare banner is visible with expected headline
        Then the marketing banner should be visible
        And it should contain the headline "Dermatologist developed for resilient skin."

    Scenario: Skincare banner includes product descriptions
        Then the banner should include the text "Dramatically Different Moisturizing Lotion+™ SPF 35"
        And the banner should include the text "Starting at $26.50"
        And the banner should include the text "Dramatically Different Moisturizing Lotion+™"
        And the banner should include the text "Starting at $7"

    Scenario: Skincare banner includes functional CTA buttons
        Then there should be a CTA button labeled "Shop New SPF"
        And there should be a CTA button labeled "Shop Original"

    Scenario: Skincare CTA buttons lead to correct URLs
        Then the "Shop New SPF" button should link to "/product/1687/138066/skincare/dramatically-different-moisturizing-lotiontm-broad-spectrum-spf-35"
        And the "Shop Original" button should link to "/product/1687/26651/skincare/moisturizers/dramatically-different-moisturizing-lotiontm"
