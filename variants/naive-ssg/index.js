async function generate() {
  const res = await fetch("localhost:3000/posts");

  console.log(res);
}

generate();
