@cart @api
Feature: Remove from Cart Backend

    As a user,
    I want to remove an item from my cart,
    So that I can update my purchase before checkout.

    Background:
        Given the user is on the homepage

    Scenario: Successfully remove a product from the cart
        And user scrolls to the product and clicks the "Add To Bag" button
        When the user removes the product from the my bag component
        Then a network request for removing the product should be successful
