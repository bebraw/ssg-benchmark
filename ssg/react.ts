import ReactDOMServer from "react-dom/server";
import { postIndexTemplate, postTemplate } from "../templates/react";
import { measure } from "./utils";

const GENERATOR_NAME = "react";

function run(amountOfPosts?: number) {
  return measure(async () => {
    // TODO: Test renderToPipeableStream() as well to see how streaming
    // approach compares to the vanilla one
    // TODO: Set up file ops etc. (extract from utils)
    const markup = ReactDOMServer.renderToStaticMarkup(
      postIndexTemplate({ base: "/posts/", title: "Posts", posts: [] })
    );

    console.log(markup);
  });
}

async function runOnce() {
  const elapsedTime = await run();

  console.log(
    `${GENERATOR_NAME} built in ${elapsedTime.toFixed(2)} milliseconds.`
  );
}

if (require.main === module) {
  runOnce();
}

export { run };
