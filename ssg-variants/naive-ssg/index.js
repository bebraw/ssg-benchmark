const fs = require("fs").promises;
const path = require("path");
const rmfr = require("rmfr");
const mkdirp = require("mkdirp");
const { postIndexTemplate, postTemplate } = require("../templates");

// TODO: Implement a Deno version as well?
async function generate() {
  const outputPath = path.join(__dirname, "output");

  await rmfr(outputPath);
  await mkdirp(outputPath);

  // Better use node-fetch instead?
  const res = await fetch("http://localhost:3000/posts");
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
