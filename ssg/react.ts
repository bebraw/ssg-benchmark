import ReactDOMServer from "react-dom/server";
import { postIndexTemplate, postTemplate } from "../templates/react";
import { generate } from "./utils";

const GENERATOR_NAME = "react";

function run(amountOfPosts?: number) {
  return generate(
    GENERATOR_NAME,
    (...args) =>
      ReactDOMServer.renderToStaticMarkup(postIndexTemplate(...args)),
    (...args) => ReactDOMServer.renderToStaticMarkup(postTemplate(...args)),
    amountOfPosts
  );
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
