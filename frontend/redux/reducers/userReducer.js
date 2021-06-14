import {
  CLEAR_MSG,
  SET_MSG,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../actions/userAction";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  msg: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        msg: null,
        token: action.payload.token,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        msg: null,
      };

    case LOAD_USER_FAIL:
    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        token: null,
        user: null,
        msg: null,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        isAuthenticated: false,
        token: null,
        user: null,
        msg: action.payload.data,
      };
    case SET_MSG:
      return {
        ...state,
        msg: action.payload,
      };
    case CLEAR_MSG:
      return {
        ...state,
        msg: null,
      };
    default:
      return state;
  }
};

export default userReducer;
