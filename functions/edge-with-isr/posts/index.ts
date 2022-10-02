import { isr } from "../../../utils";
import { postIndexTemplate } from "../../../templates/vanilla";
import type { Post } from "../../../types";

export async function onRequest({
  env,
  request,
  waitUntil,
}: {
  env: { PAGE_CACHE: KVNamespace };
  request: Request;
  waitUntil: (promise: Promise<any>) => void;
}) {
  const res = await fetch(`${new URL(request.url).origin}/api/posts`);
  const posts = await res.json<Post[]>();

  return isr(
    request,
    env,
    waitUntil,
    {
      "content-type": "text/html;charset=UTF-8",
    },
    () => ({
      status: 200,
      body: postIndexTemplate({
        base: "/edge-with-isr/posts/",
        title: "Posts",
        posts,
      }),
    })
  );
}
