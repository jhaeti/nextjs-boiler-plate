import itemReducer from "./itemReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  item: itemReducer,
  auth: userReducer,
});

export default rootReducer;
