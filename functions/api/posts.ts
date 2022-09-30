import { getPosts } from "../../content";

export function onRequest() {
  return new Response(JSON.stringify(getPosts(), null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "max-age=3600",
    },
  });
}
