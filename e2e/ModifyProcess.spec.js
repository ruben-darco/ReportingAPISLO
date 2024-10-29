import { test, expect, request } from "@playwright/test";

/* TODO:
- Move username/password to secret storage
- Move "Login" to storageState thing
- Move activity update to one test
- Move process title update to other test
- Make parameter for process unique ID
- Move API key into secret storage 
*/

test("Update Process Title and First Activity", async ({ page }) => {
  await page.goto("https://us.promapp.com/smoketest/home/login?returnurl=%2fsmoketest%2f");
  await page.getByPlaceholder("Username").click();
  await page.getByPlaceholder("Username").fill("Ruben");
  await page.getByPlaceholder("Username").press("Tab");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("wrAyH4qMwHif7r1sSAHnwGaYKiLNYyEY0M8t02Vik0Qh0Rg6gCjm");
  await page.getByRole("button", { name: "Login", exact: true }).click();

  // check if we're logged in
  await page.getByRole("link", { name: "Admin" }).isVisible();

  const curDateTime = new Date().toUTCString();
  const teststring = `RDA_${curDateTime}`;

  await page.goto("https://us.promapp.com/smoketest/Process/03fe63d3-8ecb-4a86-909c-3cd6228f796f");
  await page.getByRole("link", { name: "Edit" }).click();

  //update the first activity
  await page.locator('[data-test="process-activity-header-default"]').click();
  await page.waitForSelector('[data-test="process-activity-header-edit"]');
  await page.locator('[data-test="process-activity-header-edit"]').click();
  await page.locator('[data-test="process-activity-header-edit"]').fill(teststring);
  await page.locator('[data-test="process-procedure-commit"]').click();
  await page.locator('[data-test="process-quick-save"]').click();

  // update the process title
  await page.locator("#pvm-app-container").getByText("Summary").click();
  await page.locator('[data-test="process-edit-summary-title"]').click();
  await page.locator('[data-test="process-edit-summary-title"]').focus();
  await page.locator('[data-test="process-edit-summary-title"]').fill(teststring);
  await page.locator('[data-test="process-owner-autocomplete-container"] div').first().click();
  await page.locator('[data-test="process-quick-save"]').click();
});

test("Check API for last item", async ({ request }) => {
  const response = await request.get(encodeURI("https://us-reporting.promapp.io/odata/processes?$filter=UniqueId eq 03fe63d3-8ecb-4a86-909c-3cd6228f796f"), {
    headers: {
      Authorization: "Bearer gxnqaVeXmyc9PgyagS02GWvVh1TUMv70mNMfkPBbMN4",
    },
  });
  console.log(response);
  console.log(response.body);
  expect(response.ok()).toBeTruthy();

  const jsonData = await response.json();
  const process = jsonData.value[0]
  console.log(process);
});
