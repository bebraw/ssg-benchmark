import b from "benny";
import runBreezewind from "../ssg/breezewind";
import run11ty from "../ssg/11ty";
import runVanilla from "../ssg/vanilla";

const SUITE_NAME = "ssg";
const BENCHMARK_OUTPUT = "benchmark-output";
const OPTIONS = [1000];

function runOnce() {
  return b.suite(
    SUITE_NAME,
    ...OPTIONS.map((o) =>
      b.add(`breezewind (${o})`, async () => await runBreezewind(o))
    ),
    ...OPTIONS.map((o) => b.add(`11ty (${o})`, async () => await run11ty(o))),
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