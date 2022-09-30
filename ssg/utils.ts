import fs from "fs/promises";
import path from "path";
import rmfr from "rmfr";
import mkdirp from "mkdirp";
import { performance } from "perf_hooks";
import { getPosts } from "../content";
import type { Comment, Post } from "../types";

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
    id,
    base,
    title,
    content,
    comments,
  }: {
    id: Post["id"];
    base: string;
    title: string;
    content: string;
    comments: Comment[];
  }) => Promise<string> | string,
  amountOfPosts?: number
): Promise<number> {
  const outputPath = path.join(process.cwd(), "dist", generatorName);
  const postsPath = path.join(outputPath, "posts");

  await createDirectory(outputPath);
  await createDirectory(postsPath);

  const posts = getPosts(amountOfPosts);

  return measure(async () => {
    const base = "/posts/";
    await fs.writeFile(
      path.join(postsPath, "index.html"),
      await postIndexTemplate({ base: "", title: "Posts", posts })
    );

    // TODO: This could be parallelized/workerized (good variants)
    for (const post of posts) {
      const postPath = path.join(postsPath, post.id.toString());

      await mkdirp(postPath);
      await fs.writeFile(
        path.join(postPath, "index.html"),
        await postTemplate({ ...post, base, comments: [] })
      );
    }
  });
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
