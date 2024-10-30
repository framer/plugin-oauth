# Example OAuth Backend for Plugins

Example CloudFlare Worker to proxy OAuth 2.0 login requests and communication tokens with a Framer plugin.

See our [Implementing OAuth guide](https://developers.framer.wiki/plugins/docs/oauth) on how to set this up.

## Setup

### Environment variables

The following environment variables need to be added via the CloudFlare console or CLI.

| Name               | Details                                                                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CLIENT_ID          | App ID created in the providers developer console                                                                                                                                                      |
| CLIENT_SECRET      | App secret key created in the providers developer console. **Do not expose** in source code or send back to the client!                                                                                |
| PLUGIN_ID          | The Plugin ID environment variable should be set when the Plugin is submitted to the marketplace to ensure correct CORS headers. You can find the Plugin ID in the URL of your marketplace submission. |
| REDIRECT_URI       | Callback path that provider will redirect to after logging in                                                                                                                                          |
| AUTHORIZE_ENDPOINT | Provider endpoint path for showing the log in screen                                                                                                                                                   |
| TOKEN_ENDPOINT     | Provider endpoint path for fetching and refreshing access tokens                                                                                                                                       |
| SCOPE              | Provider permissions separated by a space                                                                                                                                                              |

To test locally, create a `.dev.vars` file with your own `CLIENT_ID` and `CLIENT_SECRET`.

### Run locally

```sh
# Install the dependencies.
npm install

# Run the worker locally.
npm run dev
```

## How it works

Plugins use a different flow compared to a typical web app. This involves polling for tokens instead of passing them via `window.opener.postMessage`.

This is a high level overview of the authorization flow:

1. The plugin makes a request to `/authorize` endpoint retrieve an authorization URL and **read key**.
2. The plugin then opens a new window using the authorization URL.
3. When the window opens, in the background the plugin starts polling `/poll` endpoint with the **read key**, waiting for tokens.
4. The user logs into the provider in the new window.
5. Once the user logs in, the provider redirects to the `/redirect` endpoint with an access code.
6. The backend uses the access code and client secret to fetch tokens from the provider.
7. The backend then makes the tokens available via the `/poll` endpoint and **read key**
8. The plugin picks up the tokens via the `/poll` endpoint and stores them in local storage
