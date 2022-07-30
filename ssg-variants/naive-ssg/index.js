async function generate() {
  const res = await fetch("http://localhost:3000/posts");
  const posts = await res.json();

  console.log(posts.length);

  // TODO: Generate a page per post
  // TODO: Define some kind of a html template where to inject the content
  // That's probably shared between the solutions through a shared module.
}

generate();
