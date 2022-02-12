import {
  CREATE_ACCOUNT,
  SET_ACCOUNT,
  GET_LIST_ACCOUNT,
  GET_BILL_BY_USERNAME,
} from "../constants";

export function setAccount(params) {
  return {
    type: SET_ACCOUNT,
    payload: params,
  };
}

export function createAccount(params) {
  return {
    type: CREATE_ACCOUNT,
    payload: params,
  };
}

export function getListAccount(params) {
  return {
    type: GET_LIST_ACCOUNT,
    payload: params,
  };
}

export function getBillByUsername(params) {
  return {
    type: GET_BILL_BY_USERNAME,
    payload: params,
  };
}
