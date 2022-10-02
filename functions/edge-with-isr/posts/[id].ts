import { isr } from "../../../utils";
import { postTemplate } from "../../../templates/vanilla";
import type { Post } from "../../../types";

export async function onRequest({
  env,
  params: { id },
  request,
  waitUntil,
}: {
  env: { PAGE_CACHE: KVNamespace };
  params: { id: string };
  request: Request;
  waitUntil: (promise: Promise<any>) => void;
}) {
  return isr(
    request,
    env,
    waitUntil,
    {
      "content-type": "text/html;charset=UTF-8",
    },
    async (request) => {
      const res = await fetch(`${new URL(request.url).origin}/api/posts`);
      const posts = await res.json<Post[]>();
      const foundPost = posts.find((p) => p.id === id);

      if (!foundPost) {
        return { status: 500, body: "" };
      }

      return {
        status: 200,
        body: postTemplate({
          ...foundPost,
          base: "/edge-with-isr/posts/",
        }),
      };
    }
  );
}
