import {CREATE_BILL_FAIL, CREATE_BILL_SUCCESS} from "../constants";

const initialState = {
  billData: {},
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
    default:
      return state;
  }
}
