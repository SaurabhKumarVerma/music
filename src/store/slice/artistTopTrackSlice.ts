import { IArtistSpotifyTrack } from "@music/models/artist.interface"
import { artistService } from "@music/service/service/artist.service"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IArtistStore {
  isArtistLoading: boolean
  isError: boolean
  artistData: IArtistSpotifyTrack[]
}

const initialState: IArtistStore = {
  isArtistLoading: false,
  isError: false,
  artistData: [],
}

export const artist = createAsyncThunk("song/artist", async (param: string) => {
  try {
    const response = await artistService(param)
    return response.data
  } catch (error) {
    return []
  }
})

const artistStore = createSlice({
  name: "artistStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(artist.pending, (state) => {
      state.isArtistLoading = true
      state.isError = false
    })
    builder.addCase(artist.fulfilled, (state, action: PayloadAction<IArtistSpotifyTrack>) => {
      state.artistData = action.payload as unknown as IArtistSpotifyTrack[]
      state.isArtistLoading = false
    })
    builder.addCase(artist.rejected, (state) => {
      state.isArtistLoading = false
      state.isError = true
      state.artistData = []
    })
  },
})

export default artistStore.reducer
