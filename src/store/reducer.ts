import { combineReducers } from "redux"
import globalSlice from "./slice/globalSlice"
import authSlice from "./slice/userSlice"

const rootReducer = combineReducers({
  globalStore: globalSlice,
  authStore: authSlice,
})

export default rootReducer
