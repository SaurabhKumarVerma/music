import { ISpotifyArtistAlbums } from "@music/models/artistAlbum.interface"
import { artistAlbumService } from "@music/service/service/artistAlbum.service"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface IArtistAlbum {
  artistAlbumList: ISpotifyArtistAlbums[] | undefined
  isLoading: boolean
  isError: boolean
}

const initialState: IArtistAlbum = {
  artistAlbumList: [],
  isLoading: false,
  isError: false,
}

export const artistAlbum = createAsyncThunk("artistAlbum", async (param: string) => {
  try {
    const response = await artistAlbumService(`${param}`)
    return response
  } catch (error) {
    console.log(error)
    return []
  }
})

const artistAlbumSlice = createSlice({
  name: "artistAlbum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(artistAlbum.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(artistAlbum.fulfilled, (state, payload) => {
      state.artistAlbumList = payload.payload as ISpotifyArtistAlbums[]
      state.isLoading = false
    })
    builder.addCase(artistAlbum.rejected, (state) => {
      state.artistAlbumList = []
      state.isLoading = false
    })
  },
})

export default artistAlbumSlice.reducer
