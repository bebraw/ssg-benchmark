# ssg-benchmark

This repository contains a simple benchmark against different site generation techniques.

## Edge server

To run the edge server locally, do the following:

0. `nvm use` to use the right version of Node
1. `npm install` to install dependencies
2. `npm start` to run the server

After that you should be able to access `localhost:3000` and the `/api/posts` behind it.

## SSG

To see the available options, use `npm run` and then do `npm run <option>` to execute the one you want. For example, `build:vanilla` can be used to generate a static build that's using ES templates for templating. To run the output, `cd dist/vanilla` and then run `serve` or `npx serve`.

## TypeScript

TypeScript is used for the edge code (CloudFlare workers) and the setup has been derived from `wrangler init`.

## Playwright + Lighthouse

To run the playwright tests, do the following

```bash
NAME=edge HOST=http://127.0.0.1:8788/edge npm run test:playwright
```

Above assumes that you've performed `npm start` earlier.

The code is hosted on `https://ssg-benchmark.pages.dev/`.

The output can be found at the `benchmark-output` directory.

To generate both vanilla and edge results, run the following:

```
NAME=vanilla HOST=https://ssg-benchmark.pages.dev/vanilla npm run test:playwright
NAME=edge HOST=https://ssg-benchmark.pages.dev/edge npm run test:playwright
NAME=edge-with-isr HOST=https://ssg-benchmark.pages.dev/edge-with-isr npm run test:playwright
```

## Creating KV stores

Use the following commands to create KV stores at Cloudflare:

```
wrangler kv:namespace create COMMENTS
wrangler kv:namespace create COMMENTS --preview
wrangler kv:namespace create PAGE_CACHE
wrangler kv:namespace create PAGE_CACHE --preview
```

## Tools

* https://github.com/Polymer/tachometer
* https://www.npmjs.com/package/benny

## Earlier benchmarks

* https://www.zachleat.com/web/build-benchmark/
* https://github.com/BuilderIO/framework-benchmarks
* https://eklausmeier.goip.de/blog/2021/11-13-performance-comparison-saaze-vs-hugo-vs-zola/
* https://github.com/seancdavis/ssg-build-performance-tests
