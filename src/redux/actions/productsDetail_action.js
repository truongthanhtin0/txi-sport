import { GET_PRODUCTS_DETAIL } from "../constants";

export function getProductsDetail(params) {
  return {
    type: GET_PRODUCTS_DETAIL,
    payload: params,
  };
}
