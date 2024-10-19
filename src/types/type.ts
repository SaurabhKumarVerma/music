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
