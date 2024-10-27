import { SCOPES } from "@music/service/api/scope"

const AUTH_CONFIG = {
  clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
  clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
  redirectUrl: "music://auth/spotify",
  scopes: SCOPES,
  serviceConfiguration: {
    authorizationEndpoint: process.env.EXPO_PUBLIC_AUTHORIZATION_ENDPOINT,
    tokenEndpoint: process.env.EXPO_PUBLIC_TOKEN_ENDPOINT,
  },
}

export default AUTH_CONFIG
