import axios from "axios";
import Router from "next/router";
import { apiUrl } from "../../config";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAIL = "LOAD_USER_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const CLEAR_MSG = "CLEAR_MSG";
export const SET_MSG = "SET_MSG";

// Attempt to login
export const login = (user) => (dispatch) => {
  axios
    .post(`${apiUrl}/api/users/login`, user, {
      withCredentials: true,
    })
    .then((res) => {
      // Redirect to Homepage after successfully loggin in
      Router.push("/");
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response,
      });
    });
};

export const setMsg = (msg) => {
  return { type: SET_MSG, payload: msg };
};

// Attempt to logout a user
export const logout = () => (dispatch) => {
  axios
    .get(`${apiUrl}/api/users/logout`, {
      withCredentials: true,
    })
    .then((res) => dispatch({ type: LOGOUT_SUCCESS }));
};

// Attempt to load user on page reload
export const loadUser = () => (dispatch) => {
  axios
    .get(`${apiUrl}/api/auth`, { withCredentials: true })
    .then((res) => {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: err.response,
      });
    });
};

// Attempt to register a user
export const register = (user) => (dispatch) => {
  axios
    .post(`${apiUrl}/api/users/register`, user, {
      withCredentials: true,
    })
    .then((res) => {
      // Redirect to the Homepage after successfully registering
      Router.push("/");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response,
      });
    });
};

export const clearMsg = () => {
  return {
    type: CLEAR_MSG,
  };
};
