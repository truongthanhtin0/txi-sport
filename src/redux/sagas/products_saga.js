import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
} from "./../constants/products_constant";
import {all, put, takeEvery} from "redux-saga/effects";
import axios from "axios";

const url = "http://localhost:3002";

function* productsSagaList(action) {
  console.log("Log :  action", action);
  try {
    const [responseCategory, responseProducts] = yield all([
      axios({
        method: "GET",
        url: `${url}/category`,
      }),
      axios({
        method: "GET",
        url: `${url}/products?${action.payload}`,
      }),
    ]);

    const data = {
      categories: responseCategory.data,
      products: {
        productsList: responseProducts.data,
        count: responseProducts.headers["x-total-count"],
      },
    };

    // const categoryList = [...responseCategory.data];
    // const productsList = [
    //   [...responseProductsList.data],
    //   responseProductsList.headers["x-total-count"],
    // ];

    yield put({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCTS_FAIL,
      payload: error,
    });
  }
}

export default function* getProductsSaga() {
  yield takeEvery(GET_PRODUCTS, productsSagaList);
}
