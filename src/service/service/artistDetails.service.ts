import { ISpotifyArtistDetails } from "@music/models/artistdetails.interface"
import apiService from "../api/api"

export const artistDetails = (artistId: string) => {
  return apiService.get<ISpotifyArtistDetails>(`artists/${artistId}`)
}
