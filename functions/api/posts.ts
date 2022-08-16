import { getPosts } from "../../content";

const ONE_HOUR = 60 * 60;

export function onRequest() {
  return new Response(JSON.stringify(getPosts(), null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": `max-age=${ONE_HOUR}`,
    },
  });
}
