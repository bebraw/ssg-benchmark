import { postTemplate } from "../../templates";
import type { Post } from "../../types";

const ONE_HOUR = 60 * 60;

export async function onRequest({
  params: { id },
}: {
  params: { id: string };
}) {
  // TODO: How to fetch from a sibling?
  const res = await fetch("http://localhost:8788/api/posts");
  const posts = await res.json<Post[]>();

  const idAsNumber = parseInt(id, 10);
  const foundPost = posts.find((p) => p.id === idAsNumber);

  if (!foundPost) {
    return new Response(`{ "error": "No matching post was found" }`, {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(postTemplate(foundPost), {
    status: 200,
    headers: {
      "content-type": "text/html",
      "cache-control": `max-age=${ONE_HOUR}`,
    },
  });
}
