import {SET_CART} from "../constants";

export function setCart(params) {
  return {
    type: SET_CART,
    payload: params,
  };
}
