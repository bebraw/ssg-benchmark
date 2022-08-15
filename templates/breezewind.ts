import breeze, { type Component } from "breezewind";
import type { Post } from "../types";

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
        type: "ul",
        children: posts.map(({ id, title }) => ({
          type: "li",
          children: [
            { type: "a", attributes: { href: `./${id}` }, children: title },
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
  content: Component["children"];
}) {
  // Note that content is injected directly without going through context
  // as it happens to be possible in this case. For pure JSON that's not
  // feasible.
  return breeze({
    component: [
      {
        type: "!DOCTYPE",
        attributes: {
          html: "",
          language: "en",
        },
        closingCharacter: "",
      },
      {
        type: "html",
        attributes: {},
        children: [
          {
            type: "head",
            children: [
              {
                type: "base",
                attributes: {
                  href: base,
                },
              },
              {
                type: "title",
                children: title,
              },
            ],
          },
          {
            type: "body",
            children: [
              {
                type: "main",
                children: [
                  {
                    type: "h1",
                    children: title,
                  },
                  {
                    type: "div",
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
