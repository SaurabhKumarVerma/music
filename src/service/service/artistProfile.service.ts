import { IArtistUnion } from "@music/models/artistProfile.interface"
import rapidApi from "../api/rapidApi"

export const artistProfile = async (id: string) => {
  return await rapidApi.RapidApiPost<IArtistUnion>("getartist", id)
}
