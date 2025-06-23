@cart @api
Feature: Add to Cart - Backend Validation

    As a user,
    I want to add a product to my cart
    So that I can purchase it later during checkout.

    Background:
        Given the user is on the homepage

    Scenario: Successfully adding a product to cart triggers correct backend response
        When user scrolls to the product and clicks the "Add To Bag" button
        Then a network request for adding the product should be successful
