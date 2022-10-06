const fs = require("fs");
const glob = require("glob");

function getReportsConfiguration(prefix) {
  return {
    formats: { json: true, html: true, csv: true },
    name: prefix + "-audit",
    directory: "benchmark-output",
  };
}

function readAudits(pageType, auditType = "first-contentful-paint") {
  const files = glob.sync("benchmark-output/" + pageType + "*-audit.json");

  const audits = files.map((f) => fs.readFileSync(f)).map((d) => JSON.parse(d));
  const fcps = audits.map((a) => a["audits"][auditType]["numericValue"]);

  return fcps.join(", ");
}

module.exports = { getReportsConfiguration, readAudits };
