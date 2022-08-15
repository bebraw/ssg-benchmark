import { postIndexTemplate, postTemplate } from "../templates/breezewind";
import { generate } from "./utils";

function run() {
  generate("breezewind", postIndexTemplate, postTemplate);
}

if (require.main === module) {
  run();
}

export default run;
