import type { Comment } from "../../../types";

export async function onRequest({ request }: { request: Request }) {
  const { headers } = request;
  const contentType = headers.get("content-type") || "";

  console.log("content type", contentType);

  if (contentType.includes("form")) {
    const formData = await request.formData();
    const body: Record<string, unknown> = {};

    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }

    // TODO: Store body.comment to a db now
    console.log("body", body);

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
