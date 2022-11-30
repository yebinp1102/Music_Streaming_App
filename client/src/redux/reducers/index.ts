import { combineReducers } from "redux";
import albumReducer from './albumReducer'

const reducers = combineReducers({
  album : albumReducer
})

export default reducers

export type State = ReturnType<typeof reducers>