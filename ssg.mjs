import fs from "fs/promises";
import path from "path";
import rmfr from "rmfr";
import mkdirp from "mkdirp";
import fetch from "node-fetch";
import { postIndexTemplate, postTemplate } from "./templates.js";

async function generate() {
  const outputPath = path.join(process.cwd(), "dist");

  await rmfr(outputPath);
  await mkdirp(outputPath);

  const res = await fetch("http://localhost:8788/api/posts");
  const posts = await res.json();
  const postsPath = path.join(outputPath, "posts");

  await mkdirp(postsPath);
  await fs.writeFile(
    path.join(postsPath, "index.html"),
    postIndexTemplate({ title: "Posts", posts })
  );

  // TODO: This could be parallelized/workerized (good variants)
  for (const post of posts) {
    const postPath = path.join(postsPath, post.id.toString());

    await mkdirp(postPath);
    await fs.writeFile(path.join(postPath, "index.html"), postTemplate(post));
  }
}

generate();
