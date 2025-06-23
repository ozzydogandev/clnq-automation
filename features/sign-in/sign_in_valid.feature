@signin @positive
Feature: Sign In Page

    As a shopper, I would like to be able to sign in successfully.

    Scenario: User signs in successfully with valid credentials
        Given the user is on the Sign In page
        When the user enters a valid email 
        And the user enters a valid password
        And the user clicks the Sign In button
        Then the user should be redirected to the dashboard
        And a welcome message should be visible