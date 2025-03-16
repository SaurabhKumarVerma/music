import { ITopArtistTrackResponse } from "@music/models/artistsTopTracks.interface"
import apiService from "../api/api"

export const artistTopTrackService = async (artistId: string): Promise<ITopArtistTrackResponse> => {
  const response = await apiService.get(`artists/${artistId}/top-tracks`)
  return response.data as ITopArtistTrackResponse
}
