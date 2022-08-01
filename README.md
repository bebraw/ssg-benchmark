# ssg-benchmark

This repository contains a simple benchmark against different site generation techniques.

## Content server

To run the content server, do the following:

0. `nvm use` to use the right version of Node
1. `npm install` to install dependencies
2. `npm run serve:content` to run the content server

After that you should be able to access `localhost:3000` and the `/api/posts` behind it.

## Site generation variants

Before running any variant, make sure the content server is running.

To see the available options, use `npm run` and then do `npm run <option>` to execute the one you want.

## TypeScript

TypeScript is used for the edge code (CloudFlare workers) and the setup has been derived from `wrangler init`.
