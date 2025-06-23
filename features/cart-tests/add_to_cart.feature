@cart @fe @addtocart
Feature: Add to Cart - Frontend Validation

    As a user,
    I want to see visual confirmation after adding a product to my cart
    So that I know it has been added successfully.

    Background:
        Given the user is on the homepage

    Scenario: Successfully adding a product shows confirmation in the UI
        When user scrolls to the product and clicks the "Add To Bag" button
        Then added product should be visible in the my bag component
        And user closes the my bag component
        Then the cart icon should show an updated item count
        When the user navigates to the cart page
        Then the added item should be visible in the cart
