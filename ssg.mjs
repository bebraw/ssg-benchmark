import fs from "fs/promises";
import path from "path";
import rmfr from "rmfr";
import mkdirp from "mkdirp";
import { postIndexTemplate, postTemplate } from "./templates.mjs";
import { getPosts } from "./content.mjs";

async function generate() {
  const outputPath = path.join(process.cwd(), "dist");
  await rmfr(outputPath);
  await mkdirp(outputPath);

  const postsPath = path.join(outputPath, "posts");
  await mkdirp(postsPath);

  const posts = getPosts();
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
