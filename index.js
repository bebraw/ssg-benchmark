// Usage: node_modules/.bin/json-server ./index.js 1000
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const random = require("random");
const seedrandom = require('seedrandom');

random.use(seedrandom('panda'));

const lorem = new LoremIpsum({ random: random.float });
const n = parseInt(process.argv.slice(-1)[0], 10);

module.exports = () => ({
  posts: Array.from(Array(n).keys()).map(id => ({
    id,
    title: lorem.generateWords(4),
    content: lorem.generateParagraphs(20)
  }))
});
