const fs = require("fs").promises;
const path = require("path");
const mkdirp = require("mkdirp");
const postTemplate = require("../post-template");

async function generate() {
  const outputPath = path.join(__dirname, "output");
  await mkdirp(outputPath);

  const res = await fetch("http://localhost:3000/posts");
  const posts = await res.json();

  for (const post of posts) {
    await fs.writeFile(
      path.join(outputPath, post.id + ".html"),
      postTemplate(post)
    );
  }

  // TODO: Generate a page per post
  // TODO: Define some kind of a html template where to inject the content
  // That's probably shared between the solutions through a shared module.
}

generate();
