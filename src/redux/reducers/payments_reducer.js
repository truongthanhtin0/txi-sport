import {
  CREATE_BILL_FAIL,
  CREATE_BILL_SUCCESS,
  GET_LIST_BILL_SUCCESS,
  GET_LIST_BILL_FAIL,
  GET_BILL_BY_USERNAME_SUCCESS,
  GET_BILL_BY_USERNAME_FAIL,
} from "../constants";

const initialState = {
  billData: {},
  listBill: {},
  billByUsername: {},
};

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BILL_SUCCESS:
      return {
        ...state,
        billData: {...action.payload},
      };
    case CREATE_BILL_FAIL: {
      return state;
    }
    case GET_LIST_BILL_SUCCESS:
      return {
        ...state,
        listBill: {...action.payload},
      };
    case GET_LIST_BILL_FAIL: {
      return state;
    }
    case GET_BILL_BY_USERNAME_SUCCESS:
      return {
        ...state,
        billByUsername: {...action.payload},
      };
    case GET_BILL_BY_USERNAME_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
