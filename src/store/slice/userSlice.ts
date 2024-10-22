import { IAuth } from "@music/models/user.interface"
import { keys } from "@music/utils/pckeVerifier"
import tokenCache from "@music/utils/tokenCache"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface AuthState extends IAuth {
  isAuthenticated: boolean
  token: string | null
  isLoading: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  isLoading: false,
}

export const getStoreToken = createAsyncThunk<string | null>("auth/getToken", async () => {
  try {
    const token = await tokenCache.getToken(keys as unknown as string)
    return token || null
  } catch (error) {
    return null
  }
})

export const storeUserToken = createAsyncThunk("auth/save/token", async (param: string) => {
  try {
    await tokenCache.saveToken(keys, param)
    return param
  } catch (error) {
    return null
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogout: (state) => {
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreToken.fulfilled, (state, action) => {
        state.token = action.payload
        state.isAuthenticated = !!action.payload
        state.isLoading = false
      })
      .addCase(storeUserToken.fulfilled, (state, action) => {
        state.token = action.payload as any
        state.isAuthenticated = true
        state.isLoading = false
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.token = null
          state.isAuthenticated = false
        },
      )
  },
})

export const { onLogout } = authSlice.actions

export default authSlice.reducer
