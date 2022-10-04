const { test } = require("@playwright/test");
const { playAudit } = require("playwright-lighthouse");
const playwright = require("playwright");
const { getReportsConfiguration } = require("./utils");

// Example HOST: http://127.0.0.1:8788/breezewind-on-edge
const EDGE_URL = process.env.HOST + "/posts/";

const thresholds = {
  performance: 50,
  accessibility: 50,
  "best-practices": 50,
  seo: 50,
  pwa: 10,
};

// Run the audit five times to capture differences
test("audit blog page #1", () => auditBlogPage(1));
test("audit blog page #2", () => auditBlogPage(2));
test("audit blog page #3", () => auditBlogPage(3));
test("audit blog page #4", () => auditBlogPage(4));
test("audit blog page €5", () => auditBlogPage(5));

test.afterAll(() => {
  // 1. glob json files from output
  // 2. read each json
  // 3. read specific field
  // 4. emit a string

  console.log(
    "TODO - capture all audits.first-contentful-paint from json files for blog page"
  );
});

async function auditBlogPage(n) {
  const port = 9223;
  const browser = await playwright["chromium"].launch({
    args: [`--remote-debugging-port=${port}`],
  });
  const page = await browser.newPage();
  await page.goto(EDGE_URL);

  const links = page.locator("a");
  await links.first().click();

  await playAudit({
    page,
    thresholds,
    reports: getReportsConfiguration(process.env.NAME + "-page-" + n),
    port,
  });

  await browser.close();
}
