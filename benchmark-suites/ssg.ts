import b from "benny";
import runBreezewind from "../ssg/breezewind";
import runVanilla from "../ssg/vanilla";

const SUITE_NAME = "ssg";
const BENCHMARK_OUTPUT = "benchmark-output";

b.suite(
  SUITE_NAME,
  b.add("breezewind", runBreezewind),
  b.add("vanilla", runVanilla),
  b.cycle(),
  b.complete(),
  b.save({ file: SUITE_NAME, folder: BENCHMARK_OUTPUT, version: "1.0.0" }),
  b.save({ file: SUITE_NAME, folder: BENCHMARK_OUTPUT, format: "chart.html" })
);
