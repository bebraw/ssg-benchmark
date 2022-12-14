import React, { type ReactElement } from "react";
import type { Post } from "../types";

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
    content: (
      <ul>
        {posts.map(({ id, title }) => (
          <li key={id}>
            <a href={`./${id}`}>{title}</a>
          </li>
        ))}
      </ul>
    ),
  });
}

function baseTemplate({
  base,
  title,
  content,
}: {
  base: string;
  title: string;
  content: ReactElement | string;
}) {
  // TODO: Figure out how to set <!DOCTYPE html> in JSX
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <base href={base} />
        <title>{title}</title>
      </head>
      <body>
        <main>
          <h1>{title}</h1>
          <div>{content}</div>
        </main>
      </body>
    </html>
  );
}

export { baseTemplate, postIndexTemplate, baseTemplate as postTemplate };
