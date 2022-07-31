import { postIndexTemplate } from "../../../templates";

const ONE_DAY = 60 * 60 * 24;

// https://github.com/cloudflare/workers-types
export async function onRequest() {
  const res = await fetch("http://localhost:3000/posts");
  const posts = await res.json();

  return new Response(postIndexTemplate({ title: "Posts", posts }), {
    status: 200,
    headers: {
      "content-type": "text/html",
      "cache-control": `max-age=${ONE_DAY}`,
    },
  });
}
