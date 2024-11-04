# ReportingAPISLO

Simple POC project to check if the Reporting API is up to date.

## How does it work?

We use playwright to login to a process manager tenant and we update the title of a process.
Another test check is the title of the process in the reporting API is less than 14 hours old.
We run this playwright test every hour, it should thus never fail because the API should never be older than 12 hours.


## TODO
This is very much a POC, and very hacky. There's thus a lot todo:
- We have username/password hardcoded in the playwright test, we should move at least the password to a GH secret or so.
- The API key for the reporting API should be in a GH secret.
- The login and update of the process manager process is currently one test. It would be better to create a test to login and use `storageState` as described here: https://playwright.dev/docs/auth
- We only check the process title, but we should also be looking at the activity titles and other areas.