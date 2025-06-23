@signin @negative
Feature: Sign In Page

    As a shopper, I should see an error when I enter an invalid email or invalid password.

    Scenario: User enters an invalid email format
        Given the user is on the Sign In page
        When the user enters invalid email as the email
        And the user enters a valid password
        And the user clicks the Sign In button
        Then an error message should appear

    Scenario: User enters incorrect password
        Given the user is on the Sign In page
        When the user enters a valid email
        And the user enters an incorrect password
        And the user clicks the Sign In button
        Then an error message should appear

    Scenario: User submits empty email and password
        Given the user is on the Sign In page
        And the user clicks the Sign In button
        Then an error message should appear



