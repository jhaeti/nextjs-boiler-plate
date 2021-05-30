import axios from "axios";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAIL = "LOAD_USER_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const login = (user) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/login", user, {
      withCredentials: true,
    })
    .then((res) => {
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

export const logout = (name) => (dispatch) => {
  axios
    .get(`http://localhost:5000/api/users/logout/${name}`, {
      withCredentials: true,
    })
    .then(() => dispatch({ type: LOGOUT_SUCCESS }));
};

export const loadUser = () => (dispatch, getState) => {
  axios
    .get("http://localhost:5000/api/auth", { withCredentials: true })
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

export const register = (user) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/register", user, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      localStorage.removeItem("token");
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response,
      });
    });
};
