import { getHTMLTemplate } from "./getHTMLTemplate";
import { authorize, poll, redirect, refresh } from "./provider";

async function handleRequest(request: Request, env: Env) {
  const requestUrl = new URL(request.url);

  if (
    request.method === "POST" &&
    requestUrl.pathname.startsWith("/authorize")
  ) {
    return authorize(env);
  }

  if (request.method === "GET" && requestUrl.pathname.startsWith("/redirect")) {
    const response = await redirect(env, requestUrl);

    if (response.status !== 200) {
      return response;
    }

    return new Response(getHTMLTemplate(), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  if (request.method === "POST" && requestUrl.pathname.startsWith("/poll")) {
    return poll(env, requestUrl);
  }

  if (request.method === "POST" && requestUrl.pathname.startsWith("/refresh")) {
    return refresh(env, requestUrl);
  }

  if (request.method === "GET" && requestUrl.pathname === "/") {
    return new Response("✅ OAuth Worker is up and running!");
  }

  return new Response("Page not found", { status: 404 });
}

function getCORSAllowOriginHeader(request: Request, env: Env) {
  const origin = request.headers.get("Origin");

  const defaultCORSHeader = `https://${env.PLUGIN_ID}.${env.PLUGIN_PARENT_DOMAIN}`;

  if (!origin) return defaultCORSHeader;

  const originURL = new URL(origin);
  if (originURL.hostname === "localhost") {
    return originURL.origin;
  }

  // Support for versioned plugins
  const [hostLabel, ...parentDomainLabels] = originURL.hostname.split(".");
  if (
    parentDomainLabels.join(".") === env.PLUGIN_PARENT_DOMAIN &&
    hostLabel.startsWith(env.PLUGIN_ID)
  ) {
    return originURL.origin;
  }

  // Otherwise set the CORS header to non versioned plugin URI always
  return defaultCORSHeader;
}

function addCorsHeaders(request: Request, response: Response, env: Env) {
  const headers = new Headers(response.headers);

  headers.set(
    "Access-Control-Allow-Origin",
    getCORSAllowOriginHeader(request, env)
  );

  return new Response(response.body, {
    headers: headers,
    status: response.status,
    statusText: response.statusText,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await handleRequest(request, env).catch((error) => {
      const message = error instanceof Error ? error.message : "Unknown";

      return new Response(`😔 Internal error: ${message}`, {
        status: 500,
      });
    });

    return addCorsHeaders(request, response, env);
  },
};
