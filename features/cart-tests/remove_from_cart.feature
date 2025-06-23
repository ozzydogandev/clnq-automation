@cart @fe @removefromcart
Feature: Remove from Cart - Frontend Validation

    As a user,
    I want to remove a product from my cart
    So that I can adjust my purchase before checking out.

    Background:
        Given the user is on the homepage


    Scenario: Successfully removing a product updates the UI
        When user scrolls to the product and clicks the "Add To Bag" button
        Then added product should be visible in the my bag component
        And user closes the my bag component
        Then the cart icon should show an updated item count
        When the user navigates to the cart page
        And the user removes the product from the cart
        Then the item should no longer be visible in the cart
