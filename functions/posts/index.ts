import { postIndexTemplate } from "../../templates.mjs";

const ONE_HOUR = 60 * 60;

export async function onRequest() {
  // TODO: How to fetch from a sibling?
  const res = await fetch("http://localhost:8788/api/posts");
  const posts = await res.json();

  return new Response(postIndexTemplate({ title: "Posts", posts }), {
    status: 200,
    headers: {
      "content-type": "text/html",
      "cache-control": `max-age=${ONE_HOUR}`,
    },
  });
}
