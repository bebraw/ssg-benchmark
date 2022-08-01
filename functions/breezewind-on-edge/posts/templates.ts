import breeze from "breezewind";
import type { Post } from "../../../types";

async function postIndexTemplate({
  base,
  title,
  posts,
}: {
  base: string;
  title: string;
  posts: Post[];
}) {
  return await baseTemplate({
    base,
    title,
    content: [
      {
        element: "ul",
        children: posts.map(({ id, title }) => ({
          element: "li",
          children: [
            { element: "a", attributes: { href: `./${id}` }, children: title },
          ],
        })),
      },
    ],
  });
}

function baseTemplate({
  base,
  title,
  content,
}: {
  base: string;
  title: string;
  // TODO: Figure out how to get Components type from breezewind correctly
  content: Record<string, unknown>[] | string;
}) {
  // Note that content is injected directly without going through context
  // as it happens to be possible in this case. For pure JSON that's not
  // feasible.
  return breeze({
    component: [
      {
        element: "!DOCTYPE",
        attributes: {
          html: "",
          language: "en",
        },
        closingCharacter: "",
      },
      {
        element: "html",
        attributes: {},
        children: [
          {
            element: "head",
            children: [
              {
                element: "base",
                attributes: {
                  href: base,
                },
              },
              {
                element: "title",
                children: title,
              },
            ],
          },
          {
            element: "body",
            children: [
              {
                element: "main",
                children: [
                  {
                    element: "h1",
                    children: title,
                  },
                  {
                    element: "div",
                    // @ts-ignore TODO: Fix breezewind type exports
                    children: content,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    components: {},
    context: {},
    extensions: [],
  });
}

export { baseTemplate, postIndexTemplate, baseTemplate as postTemplate };
