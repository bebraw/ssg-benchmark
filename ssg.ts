import fs from "fs/promises";
import path from "path";
import { performance } from "perf_hooks";
import rmfr from "rmfr";
import mkdirp from "mkdirp";
import { postIndexTemplate, postTemplate } from "./templates";
import { getPosts } from "./content";

async function generate() {
  const outputPath = path.join(process.cwd(), "dist");
  await rmfr(outputPath);
  await mkdirp(outputPath);

  const postsPath = path.join(outputPath, "ssg", "posts");
  await mkdirp(postsPath);

  const t0 = performance.now();

  const base = "/ssg/posts/";
  const posts = getPosts();
  await fs.writeFile(
    path.join(postsPath, "index.html"),
    postIndexTemplate({ base, title: "Posts", posts })
  );

  // TODO: This could be parallelized/workerized (good variants)
  for (const post of posts) {
    const postPath = path.join(postsPath, post.id.toString());

    await mkdirp(postPath);
    await fs.writeFile(
      path.join(postPath, "index.html"),
      postTemplate({ ...post, base })
    );
  }

  const t1 = performance.now();

  console.log(`Breezewind built in ${(t1 - t0).toFixed(2)} milliseconds.`);
}

generate();
