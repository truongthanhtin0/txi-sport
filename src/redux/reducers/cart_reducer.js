import {SET_CART} from "../constants";

const initialState = {
  cart: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART: {
      return {
        ...state,
        cart: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
