import b from "benny";
import runBreezewind from "../ssg/breezewind";
import run11ty from "../ssg/11ty";
import runVanilla from "../ssg/vanilla";
import { range } from "../utils";

const SUITE_NAME = "ssg";
const BENCHMARK_OUTPUT = "benchmark-output";

// TODO: Figure out how to run tests sequentially in different amounts
// to avoid breaking posts.json since it's generated during tests.
// Maybe there's a better way to handle data fetching for 11ty.
const options = [1000]; // range(3, (i) => Math.pow(10, i));

b.suite(
  SUITE_NAME,
  ...options.map((o) =>
    b.add(`breezewind (${o})`, async () => await runBreezewind(o))
  ),
  ...options.map((o) => b.add(`11ty (${o})`, async () => await run11ty(o))),
  ...options.map((o) =>
    b.add(`vanilla (${o})`, async () => await runVanilla(o))
  ),
  b.cycle(),
  b.complete(),
  b.save({ file: SUITE_NAME, folder: BENCHMARK_OUTPUT, version: "1.0.0" }),
  b.save({ file: SUITE_NAME, folder: BENCHMARK_OUTPUT, format: "chart.html" })
);
