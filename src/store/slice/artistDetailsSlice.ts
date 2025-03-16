import { ISpotifyArtistDetails } from "@music/models/artistdetails.interface"
import apiService from "@music/service/api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface IArtistDetailStore {
  artistData: ISpotifyArtistDetails | undefined
  isLoading: boolean
  isError: boolean
}

const initialState: IArtistDetailStore = {
  artistData: {} as ISpotifyArtistDetails | undefined,
  isError: false,
  isLoading: false,
}

export const artistDetails = createAsyncThunk(
  "artist/artistDetails",
  async (artistId: string | undefined): Promise<ISpotifyArtistDetails | undefined> => {
    try {
      const response = await apiService.get<ISpotifyArtistDetails>(`artists/${artistId}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const artistDetailStore = createSlice({
  name: "artistDetailStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(artistDetails.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(artistDetails.fulfilled, (state, action) => {
      state.artistData = action.payload || ({} as ISpotifyArtistDetails)
      state.isLoading = false
    })
    builder.addCase(artistDetails.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
  },
})

export default artistDetailStore.reducer
