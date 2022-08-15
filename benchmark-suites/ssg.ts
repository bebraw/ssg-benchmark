import b from "benny";
import runBreezewind from "../ssg/breezewind";
import runVanilla from "../ssg/vanilla";
import { range } from "../utils";

const SUITE_NAME = "ssg";
const BENCHMARK_OUTPUT = "benchmark-output";

const options = range(3, (i) => Math.pow(10, i));

b.suite(
  SUITE_NAME,
  ...options.map((o) =>
    b.add(`breezewind (${o})`, async () => await runBreezewind(o))
  ),
  ...options.map((o) =>
    b.add(`vanilla (${o})`, async () => await runVanilla(o))
  ),
  b.cycle(),
  b.complete(),
  b.save({ file: SUITE_NAME, folder: BENCHMARK_OUTPUT, version: "1.0.0" }),
  b.save({ file: SUITE_NAME, folder: BENCHMARK_OUTPUT, format: "chart.html" })
);
