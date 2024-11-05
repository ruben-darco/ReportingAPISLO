# ReportingAPISLO

Simple playwright test project to verify if the Reporting API is up-to-date.

## How does it work?
We run a playwright test to update a process and publish it.
We run another playwright test to verify if the reporting API's process is not older than 13 hours.
We schedule the tests to run every hour. If the test fails then our reporting API might not be updating correctly.

## TODO
This is very much a POC, and very hacky. There's thus a lot todo:
- The login and update of the process manager process is currently one test. It would be better to create a test to login and use `storageState` as described here: https://playwright.dev/docs/auth
- We don't check any activity titles
- There's likely loads of bugs :)