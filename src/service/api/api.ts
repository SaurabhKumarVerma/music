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
        // this.logout()
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
            originalRequest.headers.Authorization = `Bearer ${token.access_token}`
            return this.axiosInstance(originalRequest)
          }
        } else if (error.response?.status === ERESPONSESTATUSCODE.FORBIDDEN) {
          this.logout()
        }
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
    await tokenCache.deleteSaveToken(RESFRESH_TOKEN)
    navigate(ESCREEN.LOGIN_SCREEN)
  }

  private async getRefreshToken(): Promise<IAuthRefreshTokenResponse> {
    const refreshToken = await tokenCache.getToken(RESFRESH_TOKEN)
    const response = await axios.post(
      process.env.EXPO_PUBLIC_REFRESH_TOKEN_API as string,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )
    if (response.data) {
      await tokenCache.saveToken(ACCESS_TOKEN, response?.access_token)
      await tokenCache.saveToken(RESFRESH_TOKEN, response?.refresh_token)
    }
    return response as unknown as IAuthRefreshTokenResponse
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
