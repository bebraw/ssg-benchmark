import { postIndexTemplate, postTemplate } from "../templates/vanilla";
import { generate } from "./utils";

const GENERATOR_NAME = "vanilla";

function run(amountOfPosts?: number) {
  return generate(
    GENERATOR_NAME,
    postIndexTemplate,
    postTemplate,
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
