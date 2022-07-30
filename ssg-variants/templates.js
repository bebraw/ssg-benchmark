function postIndexTemplate({ title, posts }) {
  return baseTemplate({
    title,
    content: `<ul>${posts
      .map(({ id, title }) => `<li><a href="./${id}">${title}</a></li>`)
      .join("")}</ul>`,
  });
}

function baseTemplate({ title, content }) {
  return `<!DOCTYPE html language="en">
  <html>
    <head>
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

module.exports = {
  baseTemplate,
  postIndexTemplate,
  postTemplate: baseTemplate,
};
