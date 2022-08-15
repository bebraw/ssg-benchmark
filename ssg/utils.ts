import rmfr from "rmfr";
import mkdirp from "mkdirp";
import { performance } from "perf_hooks";

async function createDirectory(p: string) {
  await rmfr(p);
  await mkdirp(p);
}

async function measure(fn: () => Promise<void>): Promise<number> {
  const t0 = performance.now();

  await fn();

  const t1 = performance.now();

  return t1 - t0;
}

export { createDirectory, measure };
