import { IArtistSpotifyTrack } from "@music/models/artist.interface"
import apiService from "../api/api"

export const artistService = (id: string) => {
  return apiService.get<IArtistSpotifyTrack>(`/artists/${id}/top-tracks`)
}
