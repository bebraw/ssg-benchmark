import fs from "fs/promises";
import path from "path";
// @ts-expect-error Eleventy doesn't have type declarations yet
import Eleventy from "@11ty/eleventy";
import { measure } from "./utils";
import { getPosts } from "../content";

// TODO: It would be better to use 11ty data loader for this. The question is
// how to control the amount of pages then (through env?).
function init(amountOfPosts?: number) {
  // Write posts.json on run to control the amount of posts
  // generated by 11ty. Maybe it's possible to do the same
  // with a data fetching function somehow.
  const postsPath = path.join(
    process.cwd(),
    "11ty-input",
    "_data",
    "posts.json"
  );
  const posts = getPosts(amountOfPosts);

  return fs.writeFile(postsPath, JSON.stringify(posts, null, 2));
}

async function run() {
  return measure(async () => {
    const eleventy = new Eleventy("./11ty-input", "./dist/11ty/", {
      quietMode: true,
    });

    await eleventy.write();
  });
}

if (require.main === module) {
  init();
  run();
}

export { init, run };
