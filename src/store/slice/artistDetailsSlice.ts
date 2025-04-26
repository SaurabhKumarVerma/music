import { ISpotifyArtistDetails } from "@music/models/artistdetails.interface"
import { IArtistUnion } from "@music/models/artistProfile.interface"
import apiService from "@music/service/api/api"
import { artistProfile } from "@music/service/service/artistProfile.service"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface IArtistDetailStore {
  artistData: ISpotifyArtistDetails | undefined
  isLoading: boolean
  isError: boolean
  artistProfile: IArtistUnion | undefined
  isArtistProfileLoading: boolean
}

const initialState: IArtistDetailStore = {
  artistData: {} as ISpotifyArtistDetails | undefined,
  isError: false,
  isLoading: false,
  artistProfile: undefined,
  isArtistProfileLoading: false,
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

export const artistProfileData = createAsyncThunk("artist/Profile", async (artistId: string) => {
  try {
    const response = await artistProfile(artistId)
    return response.data
  } catch (error) {
    console.log("Fetching Artist Profile", error)
  }
})

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
    builder.addCase(artistProfileData.pending, (state) => {
      state.isArtistProfileLoading = true
    })
    builder.addCase(artistProfileData.fulfilled, (state, action) => {
      state.artistProfile = action.payload
      state.isArtistProfileLoading = false
    })
    builder.addCase(artistProfileData.rejected, (state) => {
      state.isArtistProfileLoading = false
    })
  },
})

export default artistDetailStore.reducer
