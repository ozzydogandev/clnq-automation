@homepage @new_tab
Feature: AC - New Tab Submenu Functionality

    As a shopper,
    I want to explore the "New" tab on the homepage,
    So that I can discover the latest featured products and navigate to their pages easily.

    Background:
        Given the user is on the homepage

    Scenario: Hovering over "New" tab displays submenu
        When the user hovers over the New navigation tab
        Then the submenu should be visible
        And the submenu should contain multiple product blocks with CTA buttons

    Scenario: Submenu contains working links for featured items
        When the user hovers over the New navigation tab
        Then each CTA button in the submenu should have a valid href
        And the button text should not be empty

    Scenario: Submenu product blocks display correct structure
        When the user hovers over the New navigation tab
        Then each product block should contain an image, title, and CTA button

    Scenario: User can click on the first CTA button to navigate
        When the user hovers over the New navigation tab
        And the user clicks the first CTA button
        Then the user should be navigated to the correct product detail page
