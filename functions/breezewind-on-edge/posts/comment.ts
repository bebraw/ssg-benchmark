import { nanoid } from "nanoid";

export async function onRequest({
  env,
  request,
}: {
  env: { COMMENTS: KVNamespace };
  request: Request;
}) {
  const { headers } = request;
  const contentType = headers.get("content-type") || "";

  console.log("content type", contentType);

  if (contentType.includes("form")) {
    const formData = await request.formData();
    const body: Record<string, string> = {};

    // TODO: Add stronger validation here (zod etc.)
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1] as string;
    }

    const { comment, id } = body;
    let comments = [];

    try {
      const data = await env.COMMENTS.get(id);

      if (data) {
        comments = JSON.parse(data);
      }
    } catch (error) {}

    await env.COMMENTS.put(
      id,
      JSON.stringify(comments.concat({ id: nanoid(), content: comment }))
    );

    // TODO: Pass post id here so comments can be associated to it
    /*    await env.COMMENTS.put(id, body.comment, {
      metadata: { id },
    });
*/

    // TODO: Redirect back to where the request came from (request.url?)
    return new Response(JSON.stringify(body, null, 2), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response(
    "Not a valid request",
    // TODO: Use the right error code
    { status: 404 }
  );
}
