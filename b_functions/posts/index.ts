import { postIndexTemplate } from "../../templates.mjs";

const ONE_HOUR = 60 * 60;

export async function onRequest({
  request: { url },
}: {
  request: { url: string };
}) {
  const res = await fetch(`${new URL(url).origin}/api/posts`);
  const posts = await res.json();

  return new Response(postIndexTemplate({ title: "Posts", posts }), {
    status: 200,
    headers: {
      "content-type": "text/html",
      "cache-control": `max-age=${ONE_HOUR}`,
    },
  });
}
