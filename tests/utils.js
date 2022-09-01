function getReportsConfiguration(prefix) {
  return {
    formats: { json: true, html: true, csv: true },
    name: prefix + "-index-audit",
    directory: "benchmark-output",
  };
}

module.exports = { getReportsConfiguration };
