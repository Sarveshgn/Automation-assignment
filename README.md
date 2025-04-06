# Automation Assignment with Playwright

This repository contains automated tests using Playwright for both **UI and API**.

## How to Run the Project
1 Install dependencies : npm install
2 Run all tests : npx playwright test
3 View the test report : npx playwright show-report

## Known Issues / Observation
1 Issue in API
-GET /api/users/{id} fails with 404 Not Found after user creation.
-Reason: reqres.in is a mock API and does not persist data.
-Handled: Used soft assertions to prevent test interruption, but the report still shows failure.

2 Bookstore button not interactable in automation
-The #gotoStore button is visible manually but not reliably clickable in automation.
-Workaround: Step is commented out, and test proceeds with direct book search.

