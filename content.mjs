import { LoremIpsum } from "lorem-ipsum";
import random from "random";
import seedrandom from "seedrandom";

random.use(seedrandom("panda"));

function getPosts(n = 1000) {
  const lorem = new LoremIpsum({ random: random.float });

  return Array.from(Array(n).keys()).map((id) => ({
    id,
    title: lorem.generateWords(4),
    content: lorem.generateParagraphs(20),
  }));
}

export { getPosts };
