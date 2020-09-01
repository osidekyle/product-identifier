import imageReducer from "./imageReducer"
import {combineReducers} from "redux"

export const allReducers=combineReducers({
    images:imageReducer
})

export default allReducers;