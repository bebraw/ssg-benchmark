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
  // Check the output JSON files for possible audits
  const auditTypes = [
    "first-contentful-paint",
    "server-response-time",
    "interactive",
  ];

  auditTypes.forEach((auditType) => {
    const edgeIndexFCPs = readAudits("cf-edge-index-", auditType);
    const edgePageFCPs = readAudits("cf-edge-page-", auditType);
    const edgeWithIsrIndexFCPs = readAudits(
      "cf-edge-with-isr-index-",
      auditType
    );
    const edgeWithIsrPageFCPs = readAudits("cf-edge-with-isr-page-", auditType);
    const vanillaIndexFCPs = readAudits("cf-vanilla-index-", auditType);
    const vanillaPageFCPs = readAudits("cf-vanilla-page-", auditType);
    const netlifyIndexFCPs = readAudits("netlify-vanilla-index-", auditType);
    const netlifyPageFCPs = readAudits("netlify-vanilla-page-", auditType);

    function pickRow(i) {
      return `${i + 1},${edgeIndexFCPs[i]},${edgePageFCPs[i]},${
        edgeWithIsrIndexFCPs[i]
      },${edgeWithIsrPageFCPs[i]},${vanillaIndexFCPs[i]},${
        vanillaPageFCPs[i]
      },${netlifyIndexFCPs[i]},${netlifyPageFCPs[i]}`;
    }

    console.log(`\nAudit type: ${auditType}`);
    // This output should go to main.tex
    console.log(`a,b,c,d,e,f,g,h,i
${range(5)
  .map((i) => pickRow(i))
  .join("\n")}`);
  });
}

function readAudits(pageType, auditType) {
  const files = glob.sync("benchmark-output/" + pageType + "*-audit.json");

  const audits = files.map((f) => fs.readFileSync(f)).map((d) => JSON.parse(d));

  return audits.map((a) => a["audits"][auditType]["numericValue"]);
}

module.exports = { getReportsConfiguration, printCSV, readAudits };
