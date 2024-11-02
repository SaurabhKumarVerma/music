import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { topPicks } from "./topPicksSlice"
import { userProfile } from "./userSlice"
import { RootState } from "../store"
import { ETITLE_NAME } from "@music/types/type"
import { recentlyPlayed } from "./recentlyPlayedSlice"

interface IListen {
  listenData: any
  isLoading: boolean
}

const initialState: IListen = {
  listenData: [],
  isLoading: false,
}

export const listen = createAsyncThunk(
  "listen/song",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      await Promise.all([dispatch(userProfile()), dispatch(topPicks()), dispatch(recentlyPlayed())])

      const state = getState() as RootState
      const topTracksData = state.topPicks?.topTracks || []
      //   const userData = state.userStore?.profile || []

      return [
        { title: ETITLE_NAME.TOP_PICKS, data: topTracksData },
        { title: ETITLE_NAME.RECENTLY_PLAYED, data: [] },
      ]
    } catch (error) {
      return rejectWithValue("Failed To Fetch Value")
    }
  },
)

const listenStore = createSlice({
  name: "listenStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listen.pending, (state) => {
      state.isLoading = true
      state.listenData = []
    })
    builder.addCase(listen.fulfilled, (state, action) => {
      state.listenData = action.payload
      state.isLoading = false
    })
    builder.addCase(listen.rejected, (state) => {
      state.listenData = []
      state.isLoading = false
    })
  },
})

export default listenStore.reducer
