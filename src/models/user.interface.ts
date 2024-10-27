export interface IAuth {
  isAuthenticated: boolean
  access_token: string | null
  refresh_token: string | null
}
