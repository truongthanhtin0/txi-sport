import {CREATE_BILL, GET_LIST_BILL} from "../constants";

export function createBill(params) {
  return {
    type: CREATE_BILL,
    payload: params,
  };
}

export function getListBill(params) {
  return {
    type: GET_LIST_BILL,
    payload: params,
  };
}
