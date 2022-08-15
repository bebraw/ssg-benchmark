import { postIndexTemplate } from "../../../templates/vanilla";
import type { Post } from "../../../types";

const ONE_HOUR = 60 * 60;

export async function onRequest({
  request: { url },
}: {
  request: { url: string };
}) {
  const res = await fetch(`${new URL(url).origin}/api/posts`);
  const posts = await res.json<Post[]>();

  return new Response(
    postIndexTemplate({ base: "/edge/posts/", title: "Posts", posts }),
    {
      status: 200,
      headers: {
        "content-type": "text/html",
        "cache-control": `max-age=${ONE_HOUR}`,
      },
    }
  );
}
