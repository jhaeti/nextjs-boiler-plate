import axios from "axios";
import { apiUrl } from "../../config";
import { setMsg } from "./userAction";

export const GET_ITEMS = "GET_ITEMS";
export const IS_LOADING = "IS_LOADING";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

// Get all items in database
export const getItems = () => (dispatch) => {
    dispatch({ type: IS_LOADING });

    axios.get(`${apiUrl}/api/items`, { withCredentials: true }).then((res) =>
        dispatch({
            type: GET_ITEMS,
            payload: res.data,
        })
    );
};

// Try to add an item to database
export const addItem = (name) => (dispatch) => {
    axios
        .post(`${apiUrl}/api/items`, { name }, { withCredentials: true })
        .then((res) => {
            dispatch({
                type: ADD_ITEM,
                payload: res.data,
            });
        })
        // Notify user for login before action
        .catch((err) => dispatch(setMsg("Login to add an item")));
};

// Try to delete and item from database
export const deleteItem = (id) => (dispatch) => {
    axios
        .delete(`${apiUrl}/api/items/${id}`, { withCredentials: true })
        .then(() => {
            dispatch({
                type: DELETE_ITEM,
                payload: id,
            });
        })
        // Notify User to login before action
        .catch((err) => dispatch(setMsg("Login to delete an item")));
};
