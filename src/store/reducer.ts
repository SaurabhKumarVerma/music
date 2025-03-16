import { combineReducers } from "redux"
import globalSlice from "./slice/globalSlice"
import authSlice from "./slice/authSlice"
import topPicksSlice from "./slice/topPicksSlice"
import userSlice from "./slice/userSlice"
import listenStore from "./slice/listenStore"
import recentlyPlayedSlice from "./slice/recentlyPlayedSlice"
import menuStore from "./slice/menuSlice"
import artistDetailStore from "./slice/artistDetailsSlice"
import artistAlbumSlice from "./slice/artistAlbumSlice"
import artistTopTrackSlice from "./slice/artistTopTrackSlice"
import artistSlice from "./slice/artistSlice"

const rootReducer = combineReducers({
  globalStore: globalSlice,
  authStore: authSlice,
  topPicks: topPicksSlice,
  userStore: userSlice,
  listenStore,
  recentlyPlayedStore: recentlyPlayedSlice,
  menuStore,
  artistDetailStore,
  artistAlbumSlice,
  artistTopTrackSlice,
  artist: artistSlice,
})

export default rootReducer
