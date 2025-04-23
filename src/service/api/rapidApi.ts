import { IArtistPostData, IArtistUnion } from "@music/models/artistProfile.interface"
import axios, { AxiosInstance, AxiosResponse } from "axios"

class RapidApi {
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.EXPO_PUBLIC_RAPID_API_URL,
      headers: {
        "x-rapidapi-key": process.env.EXPO_PUBLIC_RAPID_API_KEY,
        "x-rapidapi-host": process.env.EXPO_PUBLIC_RAPID_API_HOST_KEY,
        "Content-Type": "application/json",
      },
    })
  }

  public async RapidApiGet<T = any>(id: string): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(id)
  }

  public async RapidApiPost<T = IArtistUnion>(
    url: string = process.env.EXPO_PUBLIC_RAPID_API_URL || "",
    data: IArtistPostData,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data)
  }
}

export default RapidApi
