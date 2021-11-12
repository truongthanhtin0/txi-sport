import axios from "axios";
import {put, takeEvery} from "redux-saga/effects";
import {
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT,
  GET_LIST_ACCOUNT,
  GET_LIST_ACCOUNT_SUCCESS,
  GET_LIST_ACCOUNT_FAIL,
} from "./../constants";

const url = "http://localhost:3002";

function* createAccountSaga(action) {
  try {
    const response = yield axios.post(`${url}/accounts`, {...action.payload});

    const data = response.data;

    yield put({
      type: CREATE_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_ACCOUNT_FAIL,
      payload: error,
    });
  }
}

function* getListAccountSaga(action) {
  try {
    const response = yield axios.get(`${url}/accounts`);

    const data = response.data;

    yield put({
      type: GET_LIST_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_LIST_ACCOUNT_FAIL,
      payload: error,
    });
  }
}

export default function* getAccountSaga() {
  yield takeEvery(CREATE_ACCOUNT, createAccountSaga);
  yield takeEvery(GET_LIST_ACCOUNT, getListAccountSaga);
}
