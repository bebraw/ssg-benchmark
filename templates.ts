import type { Post } from "./types";

function postIndexTemplate({
  base,
  title,
  posts,
}: {
  base: string;
  title: string;
  posts: Post[];
}) {
  return baseTemplate({
    base,
    title,
    content: `<ul>${posts
      .map(({ id, title }) => `<li><a href="./${id}">${title}</a></li>`)
      .join("")}</ul>`,
  });
}

function baseTemplate({
  base,
  title,
  content,
}: {
  base: string;
  title: string;
  content: string;
}) {
  return `<!DOCTYPE html language="en">
  <html>
    <head>
      <base href="${base}" />
      <title>${title}</title>
    </head>
    <body>
      <main>
        <h1>${title}</h1>
        <div>${content}</div>
      </main>
    </body>
  </html>`;
}

export { baseTemplate, postIndexTemplate, baseTemplate as postTemplate };
