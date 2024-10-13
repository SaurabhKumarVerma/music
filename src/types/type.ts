export interface IGlobal {
  showSplash: boolean;
}

export const enum ESCREENICON {
  PLAY = "play",
  ICON = "Icon",
  LIB = "lib",
}
export interface ITokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}
