import {
  GET_PRODUCTS_DETAIL,
  GET_PRODUCTS_DETAIL_SUCCESS,
  GET_PRODUCTS_DETAIL_FAIL,
} from "../constants";
import {put, takeEvery} from "redux-saga/effects";
import axios from "axios";

const url = "http://localhost:3002";

function* productsDetailSagaList(action) {
  try {
    const {id} = action.payload;
    const response = yield axios({
      method: "GET",
      url: `${url}/products?id=${id}`,
      // params: {
      //   id: id,
      // },
    });

    const data = response.data;

    yield put({
      type: GET_PRODUCTS_DETAIL_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCTS_DETAIL_FAIL,
      payload: error,
    });
  }
}

export default function* getProductsDetailSaga() {
  yield takeEvery(GET_PRODUCTS_DETAIL, productsDetailSagaList);
}
