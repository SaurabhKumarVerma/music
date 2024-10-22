import { TokenResponse } from "expo-auth-session"

export interface IGlobal {
  showSplash: boolean
}

export const enum ESCREENICON {
  PLAY = "play-circle",
  OUTLINE_PLAY = "play-circle-outline",
  ICON = "Icon",
  SEARCH = "search",
  OUTLINE_LAYER = "layers-outline",
  LAYER = "layers",
  OUTLINE_SETTING = "cog-outline",
  SETTING = "cog",
  OUTLINE_LOGIN = "people-outline",
  LOGIN = "people-sharp",
}
export interface ITokenCache {
  getToken: (key: string) => Promise<string | undefined | null>
  saveToken: (key: string, token: string) => Promise<void>
  clearToken?: (key: string) => void
}

export interface ITypography {
  bold: string
  extraBold: string
  light: string
  medium: string
  regular: string
  semibold: string
  thin: string
  ultraLight: string
  icomoon?: string
}

export const enum ETypography {
  BOLD = "bold",
  EXTRA_BOLD = "extraBold",
  LIGHT = "light",
  MEDIUM = "medium",
  REGULAR = "regular",
  SEMI_BOLD = "semibold",
  THIN = "thin",
  ULTRA_LIGHT = "ultraLight",
}

export interface Color {
  offset: string
  color: string
  opacity: string
}

export interface IAuthenticationResponse {
  authentication: string | null
  error: string | null
  errorCode: string | null
  params: {
    code: string
    state: string
  }
  type: "success" | "failure"
  url: string
}

export const enum ERESPONSESTATUSCODE {
  SUCCESS = 200,
  FULLFILL = 201,
  PROCESSING = 202,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUEST = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILBLE = 503,
}

interface IAuthEvent {
  type: "cancel" | "dismiss" | "opened" | "locked"
}

interface IAuthError {
  errorCode: string | null | undefined
}

interface IAuthParams {
  code: string
  state: string
}

export interface AuthResponse {
  authentication: TokenResponse | null
  error: IAuthError | null | undefined
  errorCode: string | null
  params: IAuthParams
  type: "success" | "error" | IAuthEvent
  url: string
}
