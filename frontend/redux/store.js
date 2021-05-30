import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state) {
      nextState = state;
      console.log("But nothing in there");
    }
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const initStore = () => {
  return createStore(rootReducer, bindMiddleware([thunk]));
};

export const wrapper = createWrapper(initStore);
