import {CREATE_BILL, CREATE_BILL_SUCCESS, CREATE_BILL_FAIL} from "../constants";
import {put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import history from "../../util/history";

const url = "http://localhost:3002";

function* createBill(action) {
  try {
    const response = yield axios.post(`${url}/payments`, {
      ...action.payload,
      isPayment: false,
    });

    const data = response.data;

    yield put({
      type: CREATE_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_BILL_FAIL,
      payload: error,
    });
  }
}

export default function* paymentsSaga() {
  yield takeEvery(CREATE_BILL, createBill);
}