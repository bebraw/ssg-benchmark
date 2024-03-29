# ssg-benchmark

This repository contains a simple benchmark against different site generation techniques.

## Edge server

To run the edge server locally, do the following:

0. `nvm use` to use the right version of Node
1. `npm install` to install dependencies
2. `npm start` to run the server

After that you should be able to access `localhost:3000` and the `/api/posts` path behind it.

## SSG

To see the available options, use `npm run` and then do `npm run <option>` to execute the one you want. For example, `build:vanilla` can be used to generate a static build that's using ES templates for templating. To run the output, `cd dist/vanilla` and then run `serve` or `npx serve`.

## TypeScript

TypeScript is used for the edge code (CloudFlare workers) and the setup has been derived from `wrangler init`.

## Playwright + Lighthouse

To generate Lighthouse results, run the following:

```
npm run playwright
```

You can see the summaries in the output (FCP in ms) as a CSV to copy to `main.tex`.

To test ISR properly, make sure to remove the cache manually through Cloudflare UI before running the tests to capture the caching behavior of the first run properly.

## Creating KV stores

Use the following commands to create KV stores at Cloudflare:

```
wrangler kv:namespace create COMMENTS
wrangler kv:namespace create COMMENTS --preview
wrangler kv:namespace create PAGE_CACHE
wrangler kv:namespace create PAGE_CACHE --preview
```

To make sure your Pages instance find them, [see these instructions](https://developers.cloudflare.com/pages/platform/functions/#kv-namespace) on how to bind them.

## Autocannon tests

Autocannon (req/s) tests are behind `autocannon:` namespace. Example.

```
npm run autocannon:edge
npm run autocannon:edge-with-isr
npm run autocannon:ssg
```

To run the whole suite that emits a CSV suitable for `main.tex`, use `npm run autocannon` and copy the output. Since each test takes about 30 seconds, expect running the whole suite to take roughly two minutes.

## Tools

* https://github.com/Polymer/tachometer
* https://www.npmjs.com/package/benny

## Earlier benchmarks

* https://www.zachleat.com/web/build-benchmark/
* https://github.com/BuilderIO/framework-benchmarks
* https://eklausmeier.goip.de/blog/2021/11-13-performance-comparison-saaze-vs-hugo-vs-zola/
* https://github.com/seancdavis/ssg-build-performance-tests
