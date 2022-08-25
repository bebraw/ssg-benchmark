import breeze, { type Component } from "breezewind";
import type { Comment, Post } from "../types";

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

async function postTemplate({
  id,
  base,
  title,
  comments = [],
}: {
  id: Post["id"];
  base: string;
  title: string;
  comments: Comment[];
}) {
  return await baseTemplate({
    base,
    title,
    content: [
      {
        type: "div",
        children: [
          {
            type: "h2",
            children: "Comments",
          },
          {
            type: "ul",
            children: comments.map(({ content }) => ({
              type: "li",
              children: [{ type: "div", children: content }],
            })),
          },
          {
            type: "form",
            attributes: {
              action: base + "comment",
              method: "post",
            },
            children: [
              {
                type: "label",
                attributes: {
                  for: "new-comment",
                },
                children: "Leave a comment",
              },
              {
                type: "input",
                attributes: {
                  type: "hidden",
                  name: "id",
                  value: id,
                },
              },
              {
                type: "textarea",
                attributes: {
                  id: "new-comment",
                  name: "comment",
                  rows: "4",
                  cols: "40",
                },
              },
              {
                type: "button",
                attributes: {
                  type: "submit",
                },
                children: "Send a comment",
              },
            ],
          },
        ],
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
        },
        closingCharacter: "",
      },
      {
        type: "html",
        attributes: {
          lang: "en",
        },
        children: [
          {
            type: "head",
            children: [
              {
                type: "meta",
                attributes: {
                  charset: "UTF-8",
                },
              },
              {
                type: "meta",
                attributes: {
                  content: "width=device-width, initial-scale=1.0",
                  name: "viewport",
                },
              },
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

export { baseTemplate, postIndexTemplate, postTemplate };
