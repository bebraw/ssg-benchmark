import { postTemplate } from "../../../templates";
import type { Post } from "../../../types";

export async function onRequest({ params: { id } }) {
  const res = await fetch("http://localhost:3000/posts");
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
    headers: { "content-type": "text/html" },
  });
}
