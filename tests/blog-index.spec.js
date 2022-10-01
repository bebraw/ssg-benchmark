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

test("audit edge blog index", async ({}) => {
  const port = 9222;
  const browser = await playwright["chromium"].launch({
    args: [`--remote-debugging-port=${port}`],
  });
  const page = await browser.newPage();
  await page.goto(EDGE_URL);

  await playAudit({
    page,
    thresholds,
    reports: getReportsConfiguration(process.env.NAME + "-index"),
    port,
  });

  await browser.close();
});
