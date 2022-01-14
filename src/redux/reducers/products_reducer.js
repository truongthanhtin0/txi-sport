import {GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS} from "../constants";

const initialState = {
  productsData: {},
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        productsData: {...action.payload},
      };
    }
    case GET_PRODUCTS_FAIL: {
      return state;
    }

    default: {
      return state;
    }
  }
}
