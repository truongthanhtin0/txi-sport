import {
  GET_PRODUCTS_DETAIL_SUCCESS,
  GET_PRODUCTS_DETAIL_FAIL,
} from "../constants";

const initialState = {
  productsDetail: {},
};

export default function productsDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_DETAIL_SUCCESS: {
      return {
        ...state,
        productsDetail: {...action.payload},
      };
    }
    case GET_PRODUCTS_DETAIL_FAIL: {
      return state;
    }

    default: {
      return state;
    }
  }
}
