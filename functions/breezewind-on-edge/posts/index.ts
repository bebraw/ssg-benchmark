import { postIndexTemplate } from "../../../templates/breezewind";
import type { Post } from "../../../types";

const ONE_HOUR = 60 * 60;

export async function onRequest({ request: { url } }: { request: Request }) {
  const res = await fetch(`${new URL(url).origin}/api/posts`);
  const posts = await res.json<Post[]>();

  return new Response(
    await postIndexTemplate({
      base: "/breezewind-on-edge/posts/",
      title: "Posts",
      posts,
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
