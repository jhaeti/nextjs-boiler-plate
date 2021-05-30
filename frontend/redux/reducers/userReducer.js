import {
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
  showMsg: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        msg: null,
        showMsg: false,
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
        showMsg: false,
      };

    case LOAD_USER_FAIL:
      return {
        isAuthenticated: false,
        token: null,
        user: null,
        msg: null,
        showMsg: false,
      };
    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        token: null,
        user: null,
        msg: action.payload,
        showMsg: true,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        isAuthenticated: false,
        token: null,
        user: null,
        msg: action.payload.data,
        showMsg: true,
      };
    default:
      return state;
  }
};

export default userReducer;
