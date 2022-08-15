import { postIndexTemplate, postTemplate } from "../templates/vanilla";
import { generate } from "./utils";

function run() {
  generate("vanilla", postIndexTemplate, postTemplate);
}

if (import.meta) {
  run();
}

export { run };
