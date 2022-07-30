function template({ title, content }) {
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

module.exports = template;
