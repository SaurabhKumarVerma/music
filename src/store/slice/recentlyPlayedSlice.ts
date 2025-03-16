import { IRecentPlayedTrack } from "@music/models/recentlyPlayed.interface"
import apiService from "@music/service/api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface IRecentPlayed {
  data: IRecentPlayedTrack[]
  isRecentlyPlayedLoading: boolean
}

const initialState: IRecentPlayed = {
  data: [],
  isRecentlyPlayedLoading: false,
}

export const recentlyPlayed = createAsyncThunk("song/recently-played", async (param, thunkAPI) => {
  try {
    const response = await apiService.get("me/player/recently-played?limit=5")

    return response.data.items as unknown as IRecentPlayedTrack
  } catch (error) {
    thunkAPI.rejectWithValue("Error")
  }
})

const recentlyPlayedSlice = createSlice({
  name: "recentlyPlayedSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(recentlyPlayed.pending, (state, action) => {
      state.isRecentlyPlayedLoading = true
    })
    builder.addCase(recentlyPlayed.fulfilled, (state, action) => {
      state.data = action.payload || []
      state.isRecentlyPlayedLoading = false
    })
    builder.addCase(recentlyPlayed.rejected, (state, action) => {
      state.data = []
      state.isRecentlyPlayedLoading = false
    })
  },
})

export default recentlyPlayedSlice.reducer
