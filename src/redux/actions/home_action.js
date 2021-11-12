import {GET_HOME, SET_COLLECTION} from "../constants";

export function getHome(params) {
  return {
    type: GET_HOME,
    payload: params,
  };
}

export function setCollection(params) {
  return {
    type: SET_COLLECTION,
    payload: params,
  };
}
