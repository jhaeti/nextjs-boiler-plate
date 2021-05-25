import itemReducer from "./itemReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  item: itemReducer,
});

export default rootReducer;
