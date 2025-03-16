import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { artist } from "./artistTopTrackSlice"
import { artistDetails } from "./artistDetailsSlice"
import { artistAlbum } from "./artistAlbumSlice"
import { RootState } from "../store"
import { ETITLE_NAME } from "@music/types/type"

export const artistData = createAsyncThunk(
  "artist/getArtist-details",
  async (params: string, { dispatch, getState, rejectWithValue }) => {
    try {
      await Promise.allSettled([
        dispatch(artist(params)),
        dispatch(artistDetails(params)),
        dispatch(artistAlbum(params)),
      ])
      const state = getState() as RootState
      const artistDetailData = state.artistDetailStore.artistData || []
      const artistTopTrackData = state.artistTopTrackSlice.artistData || []
      const artistAlbumData = state.artistAlbumSlice.artistAlbum || []

      if (artistDetailData || artistTopTrackData || artistAlbumData) {
        return [
          { title: ETITLE_NAME.ARTIST_DETAIL, data: artistDetailData },
          { title: ETITLE_NAME.ARTIST_TOP_TRACKS, data: artistTopTrackData },
          { title: ETITLE_NAME.ARTIST_ALBUM, data: artistAlbumData },
        ]
      } else {
        return []
      }
    } catch (error) {
      return rejectWithValue("Failed To Fetch Value")
    }
  },
)

interface IArtist {
  artist: any[]
  isArtistLoading: boolean
  isArtistError: boolean
}

const initialState: IArtist = {
  artist: [],
  isArtistLoading: false,
  isArtistError: false,
}

const artistSlice = createSlice({
  name: "artistSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(artistData.pending, (state) => {
      state.isArtistLoading = true
      state.isArtistError = false
      state.artist = []
    })
    builder.addCase(artistData.fulfilled, (state, action) => {
      state.isArtistLoading = false
      state.isArtistError = false
      state.artist = action.payload as any
    })
    builder.addCase(artistData.rejected, (state) => {
      state.isArtistLoading = false
      state.isArtistError = true
      state.artist = []
    })
  },
})

export default artistSlice.reducer
