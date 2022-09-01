const { test } = require("@playwright/test");
const { playAudit } = require("playwright-lighthouse");
const playwright = require("playwright");

const URL = "http://127.0.0.1:8788/breezewind-on-edge/posts/";

test("audit edge blog index", async ({}) => {
  const browser = await playwright["chromium"].launch({
    args: ["--remote-debugging-port=9222"],
  });
  const page = await browser.newPage();
  await page.goto(URL);

  await playAudit({
    page: page,
    thresholds: {
      performance: 50,
      accessibility: 50,
      "best-practices": 50,
      seo: 50,
      pwa: 10,
    },
    reports: {
      formats: {
        json: true, //defaults to false
        html: true, //defaults to false
        csv: true, //defaults to false
      },
      name: `edge-blog-index-audit`,
      directory: `benchmark-output`,
    },
    port: 9222,
  });

  await browser.close();
});
