import { keys } from "@music/utils/pckeVerifier"
import tokenCache from "@music/utils/tokenCache"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

class ApiService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_KEY,
    })

    // this.axiosInstance.interceptors.request.use(
    //   async (config: AxiosRequestConfig) => {
    //     const accessToken = await this.getAccessToken()
    //     console.log(" this is access token", accessToken)
    //     if (accessToken) {
    //       config.headers.Authorization = `Bearer ${accessToken}`
    //     }
    //     return config
    //   },
    //   (error) => {
    //     console.log(" No api token", error)

    //     this.logout()
    //     return Promise.reject(error)
    //   },
    // )

    // this.axiosInstance.interceptors.response.use(
    //   (response: AxiosResponse) => {
    //     return response
    //   },
    //   async (error) => {
    //     const originalRequest = error.config
    //     if (error.response.status === 401 && !originalRequest._retry) {
    //       originalRequest._retry = true
    //       const accessToken = await this.getAccessToken()
    //       return accessToken
    //     } else if (error.response.status === 403) {
    //       this.logout()
    //     }
    //     return Promise.reject(error)
    //   },
    // )
  }

  private async getAccessToken(): Promise<string | null> {
    const token = await tokenCache.getToken(keys)
    if (token) {
      return token as unknown as string
    }
    return null
  }

  private async logout(): Promise<void> {
    await tokenCache.deleteSaveToken(keys)
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
