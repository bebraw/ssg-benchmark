import fs from "fs/promises";
import path from "path";
import rmfr from "rmfr";
import mkdirp from "mkdirp";
import { performance } from "perf_hooks";
import { getPosts } from "../content";

async function generate(
  generatorName: string,
  postIndexTemplate: ({
    base,
    title,
    posts,
  }: {
    base: string;
    title: string;
    posts: ReturnType<typeof getPosts>;
  }) => Promise<string> | string,
  postTemplate: ({
    base,
    title,
    content,
  }: {
    base: string;
    title: string;
    content: string;
  }) => Promise<string> | string
) {
  const outputPath = path.join(process.cwd(), "dist", generatorName);
  const postsPath = path.join(outputPath, "ssg", "posts");

  await createDirectory(outputPath);
  await createDirectory(postsPath);

  const elapsedTime = await measure(async () => {
    const base = "/ssg/posts/";
    const posts = getPosts();
    await fs.writeFile(
      path.join(postsPath, "index.html"),
      await postIndexTemplate({ base, title: "Posts", posts })
    );

    // TODO: This could be parallelized/workerized (good variants)
    for (const post of posts) {
      const postPath = path.join(postsPath, post.id.toString());

      await mkdirp(postPath);
      await fs.writeFile(
        path.join(postPath, "index.html"),
        await postTemplate({ ...post, base })
      );
    }
  });

  console.log(
    `${generatorName} built in ${elapsedTime.toFixed(2)} milliseconds.`
  );
}

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

export { createDirectory, measure, generate };
