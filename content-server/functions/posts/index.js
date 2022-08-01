import { LoremIpsum } from "lorem-ipsum";
import random from "random";
import seedrandom from "seedrandom";

const ONE_HOUR = 60 * 60;

random.use(seedrandom("panda"));

const lorem = new LoremIpsum({ random: random.float });
const n = 1000;
const posts = Array.from(Array(n).keys()).map((id) => ({
  id,
  title: lorem.generateWords(4),
  content: lorem.generateParagraphs(20),
}));

export function onRequest() {
  return new Response(JSON.stringify(posts, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": `max-age=${ONE_HOUR}`,
    },
  });
}
