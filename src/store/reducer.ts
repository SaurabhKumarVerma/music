import { combineReducers } from "redux"
import globalSlice from "./slice/globalSlice"
import authSlice from "./slice/authSlice"
import topPicksSlice from "./slice/topPicksSlice"
import userSlice from "./slice/userSlice"

const rootReducer = combineReducers({
  globalStore: globalSlice,
  authStore: authSlice,
  topPicks: topPicksSlice,
  userStore: userSlice,
})

export default rootReducer
