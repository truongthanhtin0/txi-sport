import { GET_PRODUCTS } from "../constants";

export function getProducts(params) {
  return {
    type: GET_PRODUCTS,
    payload: params,
  };
}
