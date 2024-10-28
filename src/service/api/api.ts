import { navigate } from "@music/navigation/Rootnavigation"
import { ESCREEN } from "@music/types/screen"
import { ERESPONSESTATUSCODE, IAuthRefreshTokenResponse } from "@music/types/type"
import { ACCESS_TOKEN, RESFRESH_TOKEN } from "@music/utils/pckeVerifier"
import tokenCache from "@music/utils/tokenCache"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

class ApiService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_KEY,
    })

    this.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const accessToken = await this.getAccessToken()
        if (accessToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          }
        }
        return config
      },
      (error) => {
        console.error("No API token:", error)
        this.logout()
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config
        if (
          error.response?.status === ERESPONSESTATUSCODE.UNAUTHORIZED &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true
          const token = await this.getRefreshToken()

          if (token) {
            // Set the Authorization header with the new token
            originalRequest.headers.Authorization = `Bearer ${token.access_token}`

            // Retry the original request with the new token
            return this.axiosInstance(originalRequest)
          }
        } else if (error.response?.status === ERESPONSESTATUSCODE.FORBIDDEN) {
          // Handle logout if status is 403 (Forbidden)
          this.logout()
        }

        // Reject the error if it's not handled
        return Promise.reject(error)
      },
    )
  }

  private async getAccessToken(): Promise<string | null> {
    const token = await tokenCache.getToken(ACCESS_TOKEN)
    return token ? (token as unknown as string) : null
  }

  private async logout(): Promise<void> {
    await tokenCache.deleteSaveToken(ACCESS_TOKEN)
    navigate(ESCREEN.LOGIN_SCREEN)
  }

  private async getRefreshToken(): Promise<IAuthRefreshTokenResponse> {
    const refreshToken = await tokenCache.getToken(RESFRESH_TOKEN)
    const clientId = process.env.EXPO_PUBLIC_CLIENT_ID
    const grantType = "refresh_token"

    const data = new URLSearchParams({
      grant_type: grantType,
      refresh_token: refreshToken,
      client_id: clientId,
    })
    const response: IAuthRefreshTokenResponse = await axios.post(
      process.env.EXPO_PUBLIC_REFRESH_TOKEN_API as string,
      {
        data,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )
    if (response) {
      await tokenCache.saveToken(ACCESS_TOKEN, response?.access_token)
      await tokenCache.saveToken(RESFRESH_TOKEN, response?.refresh_token)
    }
    return response
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config)
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config)
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config)
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config)
  }
}

const apiService = new ApiService()

export default apiService
