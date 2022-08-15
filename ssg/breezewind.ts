import { postIndexTemplate, postTemplate } from "../templates/breezewind";
import { generate } from "./utils";

function run() {
  generate("breezewind", postIndexTemplate, postTemplate);
}

if (import.meta) {
  run();
}

export { run };
