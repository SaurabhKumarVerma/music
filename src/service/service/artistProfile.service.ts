import { IArtistUnion } from "@music/models/artistProfile.interface"
import rapidApi from "../api/rapidApi"

export const artistProfile = (id: string) => {
  const data = {
    id,
  }
  return rapidApi.RapidApiPost<IArtistUnion>("getartist", { id: data.id })
}
