import {CREATE_BILL} from "../constants";

export function createBill(params) {
  return {
    type: CREATE_BILL,
    payload: params,
  };
}
