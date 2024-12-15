import { combineReducers } from "redux"
import globalSlice from "./slice/globalSlice"
import authSlice from "./slice/authSlice"
import topPicksSlice from "./slice/topPicksSlice"
import userSlice from "./slice/userSlice"
import listenStore from "./slice/listenStore"
import recentlyPlayedSlice from "./slice/recentlyPlayedSlice"
import artistStore from "./slice/artistSlice"

const rootReducer = combineReducers({
  globalStore: globalSlice,
  authStore: authSlice,
  topPicks: topPicksSlice,
  userStore: userSlice,
  listenStore,
  recentlyPlayedStore: recentlyPlayedSlice,
  artist: artistStore,
})

export default rootReducer
