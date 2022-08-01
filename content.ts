import { LoremIpsum } from "lorem-ipsum";
import seed from "seedrandom";

const random = seed("panda");

function getPosts(n = 1000) {
  const lorem = new LoremIpsum({ random });

  return Array.from(Array(n).keys()).map((id) => ({
    id,
    title: lorem.generateWords(4),
    content: lorem.generateParagraphs(20),
  }));
}

export { getPosts };
