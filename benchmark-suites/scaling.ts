import b from "benny";
import runVanilla from "../ssg/vanilla";
import { range } from "../utils";

const SUITE_NAME = "scaling";
const BENCHMARK_OUTPUT = "benchmark-output";
const OPTIONS = range(3, (i) => Math.pow(10, i));

function runOnce() {
  return b.suite(
    SUITE_NAME,
    ...OPTIONS.map((o) =>
      b.add(`vanilla (${o})`, async () => await runVanilla(o))
    ),
    b.cycle(),
    b.complete(),
    b.save({ file: SUITE_NAME, folder: BENCHMARK_OUTPUT, version: "1.0.0" }),
    b.save({ file: SUITE_NAME, folder: BENCHMARK_OUTPUT, format: "chart.html" })
  );
}

if (require.main === module) {
  runOnce();
}

export default runOnce;
