import { navigate } from "@music/navigation/Rootnavigation"
import { ESCREEN } from "@music/types/screen"
import { ACCESS_TOKEN } from "@music/utils/pckeVerifier"
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
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const accessToken = await this.getAccessToken()

          if (accessToken) {
            // Set the Authorization header with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`

            // Retry the original request with the new token
            return this.axiosInstance(originalRequest)
          }
        } else if (error.response?.status === 403) {
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
