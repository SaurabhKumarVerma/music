import { combineReducers } from 'redux'
import globalSlice from './slice/globalSlice';


const rootReducer = combineReducers({
    globalStore: globalSlice
})

export default rootReducer;