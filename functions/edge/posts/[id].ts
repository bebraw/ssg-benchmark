import { postTemplate } from "../../../templates/vanilla";
import type { Post } from "../../../types";

const ONE_HOUR = 60 * 60;

export async function onRequest({
  env,
  params: { id },
  request: { url },
}: {
  env: { COMMENTS: KVNamespace };
  params: { id: string };
  request: Request;
}) {
  const res = await fetch(`${new URL(url).origin}/api/posts`);
  const posts = await res.json<Post[]>();
  const foundPost = posts.find((p) => p.id === id);

  if (!foundPost) {
    return new Response(`{ "error": "No matching post was found" }`, {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  let comments = [];

  try {
    const data = await env.COMMENTS.get(id);

    if (data) {
      comments = JSON.parse(data);
    }
  } catch (error) {}

  return new Response(
    await postTemplate({
      ...foundPost,
      base: "/edge/posts/",
      comments,
    }),
    {
      status: 200,
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": `max-age=${ONE_HOUR}`,
      },
    }
  );
}
