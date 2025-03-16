import { StatusBarProps, StatusBarStyle } from "expo-status-bar"
import { ReactNode } from "react"
import { ViewStyle } from "react-native"

export interface IGlobal {
  showSplash: boolean
  isDarkMode: boolean
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
  AUDIOBOOKS = "book-outline",
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
  authentication: string | null
  error: IAuthError | null | undefined
  errorCode: string | null
  params: IAuthParams
  type: "success" | "error" | IAuthEvent
  url: string
}

export interface IMusicScreen {
  statusBarStyle?: StatusBarStyle
  statusBarProps?: StatusBarProps
  style?: ViewStyle
  children: ReactNode
}

export interface IAuthRefreshTokenResponse {
  access_token: string
  token_type: string
  scope: string
  expires_in: number
  refresh_token: string
}

export const enum ETITLE_NAME {
  TOP_PICKS = "Top Picks",
  RECENTLY_PLAYED = "Recently Played",
  ARTIST_DETAIL = "Artist Detail",
  ARTIST_ALBUM = "Album Detail",
  ARTIST_TOP_TRACKS = "Artist Top Tracks",
}

export interface IMenuData {
  id: number
  icon: string
  title: string
  onClick: () => void
}

export const BLUR_HASH =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
