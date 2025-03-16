import { ISpotifyArtistAlbums } from "@music/models/artistAlbum.interface"
import apiService from "../api/api"

export const artistAlbumService = async (
  artistId: string,
  limit: number = 5,
  offset: number = 0,
): Promise<ISpotifyArtistAlbums> => {
  const response = await apiService.get(
    `artists/${artistId}/albums?limit=${limit}&offset=${offset}`,
  )
  return response.data as ISpotifyArtistAlbums
}
