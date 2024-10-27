import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IGlobal } from "../../types/type"

const initialState: IGlobal = {
  showSplash: true,
  isDarkMode: true,
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms)
  })

export const asyncLogIn = createAsyncThunk("change", async () => {
  await wait(10 * 1000)
})

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    onStartSplash: (state) => {
      state.showSplash = true
    },
    onStopSplash: (state) => {
      state.showSplash = false
    },
    setDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
  },
})

export const { onStartSplash, onStopSplash, setDarkMode } = globalSlice.actions
export default globalSlice.reducer
