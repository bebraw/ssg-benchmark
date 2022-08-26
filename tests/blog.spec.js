// @ts-check
const { test, expect } = require("@playwright/test");

test("blog index as a first link", async ({ page }) => {
  // TODO: Get url from env?
  const url = "http://0.0.0.0:8788/breezewind-on-edge/posts";

  await page.goto(url);

  const firstLink = page.locator("ul li:first a");

  console.log(firstLink);

  await expect(firstLink).toBeVisible();

  // TODO: Go to the first post on the list
  // TODO: Add a comment and verify it was added
  // TODO: Lighthouse
});
