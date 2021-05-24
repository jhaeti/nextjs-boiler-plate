import {
  ADD_ITEM,
  DELETE_ITEM,
  GET_ITEMS,
  IS_LOADING,
} from "../actions/itemAction";

const initialItemState = {
  items: [],
  isLoading: false,
};

const itemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default itemReducer;
