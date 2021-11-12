import axios from "axios";
import {all, put, takeEvery} from "redux-saga/effects";
import {GET_HOME, GET_HOME_FAIL, GET_HOME_SUCCESS} from "../constants";

const url = "http://localhost:3002";

function* getHomeSagaList(action) {
  try {
    const [responseCategory, responseProducts, responsePosition] = yield all([
      axios({
        method: "GET",
        url: `${url}/category`,
      }),
      axios({
        method: "GET",
        url: `${url}/products`,
      }),
      axios({
        method: "GET",
        url: `${url}/playerPosition`,
      }),
    ]);

    const data = {
      categories: responseCategory.data,
      products: responseProducts.data,
      positions: responsePosition.data,
    };

    yield put({
      type: GET_HOME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_HOME_FAIL,
      payload: error,
    });
  }
}

export default function* getHomeSaga() {
  yield takeEvery(GET_HOME, getHomeSagaList);
}
