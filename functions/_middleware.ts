export async function onRequest(context: EventContext<{}, "_middleware", {}>) {
  try {
    const { pathname } = new URL(context.request.url);

    // For anything else than api, wait 100ms to simulate load.
    if (!pathname.startsWith("/api/")) {
      await new Promise((r) => setTimeout(r, 100));
    }

    return await context.next();
  } catch (err) {
    // @ts-expect-error This is ok for now
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
