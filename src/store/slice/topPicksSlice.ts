import { EUSER_TOP_ITEM, EUSER_TOP_ITEM_TIME_RANGE } from "@music/models/toppicks.interface"
import { ISpotifyTopTracksResponse, ITrack } from "@music/models/toptrack.interface"
import apiService from "@music/service/api/api"
import { createAsyncThunk, createSlice, GetThunkAPI } from "@reduxjs/toolkit"

interface ITopPicks {
  topTracks: ITrack[] | undefined
  isLoading: boolean
}

const initialState: ITopPicks = {
  topTracks: undefined,
  isLoading: false,
}

export const topPicks = createAsyncThunk(
  "song/toppicks",
  async (param: EUSER_TOP_ITEM = EUSER_TOP_ITEM.TRACKS, thunkAPI: GetThunkAPI<any>) => {
    try {
      const response = await apiService.get<ISpotifyTopTracksResponse>(
        `me/top/${param}?time_range=${EUSER_TOP_ITEM_TIME_RANGE.LONG_TERM}&limit=5`,
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while getting items")
    }
  },
)

const topPicksSlice = createSlice({
  name: "topPickSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(topPicks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(topPicks.fulfilled, (state, action) => {
      state.topTracks = action.payload?.items
      state.isLoading = false
    })
    builder.addCase(topPicks.rejected, (state) => {
      state.isLoading = false
      state.topTracks = undefined
    })
  },
})

export default topPicksSlice.reducer
