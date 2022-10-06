// Before running, remember to empty ISR cache!
const { test } = require("@playwright/test");
const { playAudit } = require("playwright-lighthouse");
const playwright = require("playwright");
const { getReportsConfiguration, printCSV } = require("./utils");
const { range } = require("../utils");

const thresholds = {
  performance: 50,
  accessibility: 50,
  "best-practices": 50,
  seo: 50,
  pwa: 10,
};

testSuites(["vanilla", "edge", "edge-with-isr"]);
test.afterAll(printCSV);

// The idea is to run similar test cases at the same time to avoid
// weirdness related to connectivity as connection speed may vary.
function testSuites(names) {
  range(5).forEach((i) =>
    names.forEach((name) =>
      test(name + " audit blog index #" + (i + 1), () =>
        auditBlogIndex(name, i + 1)
      )
    )
  );
  range(5).forEach((i) =>
    names.forEach((name) =>
      test(name + " audit blog page #" + (i + 1), () =>
        auditBlogPage(name, i + 1)
      )
    )
  );
}

async function auditBlogIndex(name, n) {
  const port = 9222;
  const browser = await playwright["chromium"].launch({
    args: [`--remote-debugging-port=${port}`],
  });
  const page = await browser.newPage();
  await page.goto(`https://ssg-benchmark.pages.dev/${name}/posts/`);

  await playAudit({
    page,
    thresholds,
    reports: getReportsConfiguration(name + "-index-" + n),
    port,
  });

  await browser.close();
}

async function auditBlogPage(name, n) {
  const port = 9223;
  const browser = await playwright["chromium"].launch({
    args: [`--remote-debugging-port=${port}`],
  });
  const page = await browser.newPage();
  await page.goto(`https://ssg-benchmark.pages.dev/${name}/posts/`);

  const links = page.locator("a");
  await links.first().click();

  await playAudit({
    page,
    thresholds,
    reports: getReportsConfiguration(name + "-page-" + n),
    port,
  });

  await browser.close();
}
