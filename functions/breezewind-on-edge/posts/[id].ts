import { postTemplate } from "../../../templates/breezewind";
import type { Post } from "../../../types";

const ONE_HOUR = 60 * 60;

export async function onRequest({
  params: { id },
  request: { url },
}: {
  params: { id: string };
  request: Request;
}) {
  const res = await fetch(`${new URL(url).origin}/api/posts`);
  const posts = await res.json<Post[]>();

  const idAsNumber = parseInt(id, 10);
  const foundPost = posts.find((p) => p.id === idAsNumber);

  if (!foundPost) {
    return new Response(`{ "error": "No matching post was found" }`, {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(
    await postTemplate({
      ...foundPost,
      base: "/breezewind-on-edge/posts/",
      comments: [], // TODO: Read from db
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
