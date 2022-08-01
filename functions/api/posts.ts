import { getPosts } from "../../content";

const ONE_HOUR = 60 * 60;
const POSTS = getPosts();

export function onRequest() {
  return new Response(JSON.stringify(POSTS, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": `max-age=${ONE_HOUR}`,
    },
  });
}
