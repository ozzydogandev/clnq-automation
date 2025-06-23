@signin @api
Feature: Sign In API Response Validation

    As a returning customer,
    I want to verify that the sign-in backend responds correctly
    So that I can ensure successful authentication is working as expected.

    Scenario: Backend responds successfully to valid sign-in
        Given the user is on the Sign In page
        When the user enters a valid email
        And the user enters a valid password
        And the user clicks the Sign In button
        Then the sign in request should return a successful response
