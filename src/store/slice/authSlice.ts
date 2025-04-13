import { IAuth } from "@music/models/user.interface"
import { navigate } from "@music/navigation/Rootnavigation"
import { ESCREEN } from "@music/types/screen"
import { ACCESS_TOKEN, RESFRESH_TOKEN } from "@music/utils/pckeVerifier"
import tokenCache from "@music/utils/tokenCache"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface AuthState extends IAuth {
  isAuthenticated: boolean
  access_token: string | null
  isLoading: boolean
  refresh_token: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  access_token: null,
  isLoading: true,
  refresh_token: null,
}

export const getStoreToken = createAsyncThunk<string | null>("auth/getToken", async () => {
  try {
    const token = await tokenCache.getToken(ACCESS_TOKEN as unknown as string)
    return token || null
  } catch (error) {
    return null
  }
})

export const storeUserToken = createAsyncThunk("auth/save/token", async (param: string) => {
  try {
    await tokenCache.saveToken(ACCESS_TOKEN, param)
    return param
  } catch (error) {
    return null
  }
})

export const getRefreshToken = createAsyncThunk("auth/get/refresh_token", async () => {
  try {
    const refreshToken = await tokenCache.getToken(RESFRESH_TOKEN)
    return refreshToken || null
  } catch (error) {
    return null
  }
})

export const saveRefreshToken = createAsyncThunk(
  "auth/save/refresh_token",
  async (params: string) => {
    try {
      await tokenCache.saveToken(RESFRESH_TOKEN, params)
      return params
    } catch (error) {
      return null
    }
  },
)

export const onLogout = createAsyncThunk("auth/logout", async (params, thunkAPI) => {
  //   const state = thunkAPI.getState()
  console.log("clearing store....")
  try {
    await tokenCache.deleteSaveToken(ACCESS_TOKEN)
    await tokenCache.deleteSaveToken(RESFRESH_TOKEN)
    thunkAPI.dispatch(onUserLogout())
    navigate(ESCREEN.LOGIN_SCREEN)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onUserLogout: (state) => {
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreToken.fulfilled, (state, action) => {
        state.access_token = action.payload
        state.isAuthenticated = !!action.payload
        state.isLoading = false
      })
      .addCase(storeUserToken.fulfilled, (state, action) => {
        state.access_token = action.payload as any
        state.isAuthenticated = true
        state.isLoading = false
      })
      .addCase(saveRefreshToken.fulfilled, (state, action) => {
        state.refresh_token = action.payload
      })
      .addCase(getRefreshToken.fulfilled, (state, action) => {
        state.refresh_token = action.payload
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
        //   state.isLoading = true
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.access_token = null
          state.refresh_token = null
          state.isAuthenticated = false
        },
      )
  },
})

export const { onUserLogout } = authSlice.actions

export default authSlice.reducer
