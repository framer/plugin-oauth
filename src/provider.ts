import * as store from "./store";

import { generateRandomId } from "./generateRandomId";

/**
 * Generate an authorization URL to login into the provider, and a set of read
 * and write keys for retrieving the access token later on.
 */
export async function authorize(env: Env): Promise<Response> {
  const readKey = generateRandomId();
  const writeKey = generateRandomId();

  const authorizeParams = new URLSearchParams();
  authorizeParams.append("client_id", env.CLIENT_ID);
  authorizeParams.append("redirect_uri", env.REDIRECT_URI);
  authorizeParams.append("response_type", "code");
  authorizeParams.append("access_type", "online");
  authorizeParams.append("include_granted_scopes", "true");
  authorizeParams.append("scope", env.SCOPE);

  // The write key is stored in the `state` param since this will be
  // persisted through the entire OAuth flow.
  authorizeParams.append("state", writeKey);

  // Generate the login URL for the provider.
  const authorizeUrl = new URL(env.AUTHORIZE_ENDPOINT);
  authorizeUrl.search = authorizeParams.toString();

  try {
    await store.setValue(env.DB, `readKey:${writeKey}`, readKey);
  } catch (error) {
    console.error(`Failed to store read key in database`, {
      error,
    });

    return new Response("Failed to store read key in database", {
      status: 500,
    });
  }

  const response = JSON.stringify({
    url: authorizeUrl.toString(),
    readKey,
  });

  return new Response(response, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * Once the user has been authorized via login page, the provider will
 * redirect them back this URL with an access code (not an access token) and
 * the write key we stored in the state param.
 */
export async function redirect(env: Env, url: URL): Promise<Response> {
  const authorizationCode = url.searchParams.get("code");
  const writeKey = url.searchParams.get("state");

  if (!authorizationCode) {
    return new Response(`Missing "code" URL param`, {
      status: 400,
    });
  }

  if (!writeKey) {
    return new Response(`Missing "state" URL param`, {
      status: 400,
    });
  }

  // Generate a new URL with the access code and client secret.
  const tokenParams = new URLSearchParams();
  tokenParams.append("client_id", env.CLIENT_ID);
  tokenParams.append("client_secret", env.CLIENT_SECRET);
  tokenParams.append("redirect_uri", env.REDIRECT_URI);
  tokenParams.append("grant_type", "authorization_code");
  tokenParams.append("code", authorizationCode);

  const tokenUrl = new URL(env.TOKEN_ENDPOINT);
  tokenUrl.search = tokenParams.toString();

  // This additional POST request retrieves the access token and expiry
  // information used for further API requests to the provider.
  const tokenResponse = await fetch(tokenUrl.toString(), {
    method: "POST",
  });

  if (tokenResponse.status !== 200) {
    return new Response(tokenResponse.statusText, {
      status: tokenResponse.status,
    });
  }

  try {
    const readKey = await store.getValue(env.DB, `readKey:${writeKey}`);
    if (!readKey) {
      return new Response("No read key found in storage", {
        status: 400,
      });
    }

    const tokens = await tokenResponse.json();
    await store.setValue(env.DB, `tokens:${readKey}`, JSON.stringify(tokens));

    // Remove the read key from storage since it's no longer needed.
    try {
      await store.removeValue(env.DB, `readKey:${writeKey}`);
    } catch (error) {
      console.error(`Failed to remove read key from database`, {
        error,
      });

      return new Response("Failed to remove read key from database", {
        status: 500,
      });
    }

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.error(`Failed to get read key from database`, {
      error,
    });

    return new Response("Failed to get read key from database", {
      status: 500,
    });
  }
}

/**
 * Poll for tokens using a read key. Once tokens are retrieved, they are
 * removed from storage to prevent multiple reads.
 */
export async function poll(env: Env, url: URL): Promise<Response> {
  const readKey = url.searchParams.get("readKey");

  if (!readKey) {
    return new Response("Missing read key URL param", {
      status: 400,
    });
  }

  try {
    const tokens = await store.getValue(env.DB, `tokens:${readKey}`);
    if (!tokens) {
      return new Response(null, {
        status: 404,
      });
    }

    // Remove the tokens from storage since they are no longer needed.
    try {
      await store.removeValue(env.DB, `tokens:${readKey}`);
    } catch (error) {
      console.error(`Failed to remove tokens from database`, {
        error,
      });

      return new Response("Failed to remove tokens from database", {
        status: 500,
      });
    }

    return new Response(tokens, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`Failed to get tokens from database`, {
      error,
    });

    return new Response("Failed to get tokens from database", {
      status: 500,
    });
  }
}

/**
 * Refresh an expired access token using a refresh token.
 */
export async function refresh(env: Env, url: URL): Promise<Response> {
  const refreshToken = url.searchParams.get("code");

  if (!refreshToken) {
    return new Response("Missing refresh token URL param", {
      status: 400,
    });
  }

  const refreshParams = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: env.CLIENT_ID,
    client_secret: env.CLIENT_SECRET,
    grant_type: "refresh_token",
  });

  const refreshUrl = new URL(env.TOKEN_ENDPOINT);
  refreshUrl.search = refreshParams.toString();

  const refreshResponse = await fetch(refreshUrl.toString(), {
    method: "POST",
  });

  if (refreshResponse.status !== 200) {
    return new Response(refreshResponse.statusText, {
      status: refreshResponse.status,
    });
  }

  const tokens = await refreshResponse.json();
  return new Response(JSON.stringify(tokens), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
