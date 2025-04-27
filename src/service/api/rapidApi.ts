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

  public async RapidApiGet<T = any>(id: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(id)
  }

  public async RapidApiPost<T = IArtistUnion>(url: string, id: any): Promise<AxiosResponse<T>> {
    //     console.log(this.axiosInstance.defaults.baseURL)
    //     const fullUrl = `${this.axiosInstance.defaults.baseURL}${url}`
    //     console.log('tissss', fullUrl);

    // // return this.axiosInstance.post<T>(fullUrl, { id })
    //       return this.axiosInstance.post<T>(fullUrl, {
    //       id,
    //     })
    const options = {
      method: "POST",
      url: `https://spotify-web-api3.p.rapidapi.com/v1/social/spotify/${url}`,
      headers: {
        "x-rapidapi-key": "70661dcbebmshb25f32d32490cbap11d8d6jsnd551abd8ee70",
        "x-rapidapi-host": "spotify-web-api3.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        id,
      },
    }

    return await axios.request(options)
  }
}

const rapidApi = new RapidApi()

export default rapidApi
