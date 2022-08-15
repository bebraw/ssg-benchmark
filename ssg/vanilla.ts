import fs from "fs/promises";
import path from "path";
import mkdirp from "mkdirp";
import { postIndexTemplate, postTemplate } from "../templates/vanilla";
import { getPosts } from "../content";
import { createDirectory, measure } from "./utils";

async function generate() {
  const generatorName = "vanilla";
  const outputPath = path.join(process.cwd(), "dist", generatorName);
  const postsPath = path.join(outputPath, "ssg", "posts");

  await createDirectory(outputPath);
  await createDirectory(postsPath);

  const elapsedTime = await measure(async () => {
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
  });

  console.log(
    `${generatorName} built in ${elapsedTime.toFixed(2)} milliseconds.`
  );
}

generate();
