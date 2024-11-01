import { ISpotifyUserProfile } from "@music/models/user.interface"
import apiService from "@music/service/api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface IUserProfile {
  profile: ISpotifyUserProfile
  isLoading: boolean
}

const initialState: IUserProfile = {
  profile: undefined,
  isLoading: false,
}

export const userProfile = createAsyncThunk("user/profile", async (param, thunkApi) => {
  try {
    const response = await apiService.get("me")
    return response.data as unknown as ISpotifyUserProfile
  } catch (error) {
    return thunkApi.rejectWithValue("Error")
  }
})

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.profile = action.payload
      state.isLoading = false
    })
    builder.addCase(userProfile.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export default userSlice.reducer
