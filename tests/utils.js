const fs = require("fs");
const glob = require("glob");
const { range } = require("../utils");

function getReportsConfiguration(prefix) {
  return {
    formats: { json: true, html: true, csv: true },
    name: prefix + "-audit",
    directory: "benchmark-output",
    // Test against mobile to throttle connection
    formFactor: "mobile",
  };
}

function printCSV() {
  // TODO: Make this more dynamic and configurable
  const edgeIndexFCPs = readAudits("cf-edge-index-");
  const edgePageFCPs = readAudits("cf-edge-page-");
  const edgeWithIsrIndexFCPs = readAudits("cf-edge-with-isr-index-");
  const edgeWithIsrPageFCPs = readAudits("cf-edge-with-isr-page-");
  const vanillaIndexFCPs = readAudits("cf-vanilla-index-");
  const vanillaPageFCPs = readAudits("cf-vanilla-page-");
  const netlifyIndexFCPs = readAudits("netlify-vanilla-index-");
  const netlifyPageFCPs = readAudits("netlify-vanilla-page-");

  function pickRow(i) {
    return `${i + 1},${edgeIndexFCPs[i]},${edgePageFCPs[i]},${
      edgeWithIsrIndexFCPs[i]
    },${edgeWithIsrPageFCPs[i]},${vanillaIndexFCPs[i]},${vanillaPageFCPs[i]},${
      netlifyIndexFCPs[i]
    },${netlifyPageFCPs[i]}`;
  }

  // This output should go to main.tex
  console.log(`a,b,c,d,e,f,g,h,i
${range(5)
  .map((i) => pickRow(i))
  .join("\n")}`);
}

function readAudits(pageType, auditType = "first-contentful-paint") {
  const files = glob.sync("benchmark-output/" + pageType + "*-audit.json");

  const audits = files.map((f) => fs.readFileSync(f)).map((d) => JSON.parse(d));

  return audits.map((a) => a["audits"][auditType]["numericValue"]);
}

module.exports = { getReportsConfiguration, printCSV, readAudits };
