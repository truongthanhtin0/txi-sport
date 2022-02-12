import axios from "axios";
import {all, put, takeEvery} from "redux-saga/effects";
import {dateTimeNow} from "../../util/dateTime";
import history from "../../util/history";
import {toastSuccess} from "../../util/toast";
import {
  CREATE_BILL,
  CREATE_BILL_FAIL,
  CREATE_BILL_SUCCESS,
  GET_LIST_BILL,
  GET_LIST_BILL_FAIL,
  GET_LIST_BILL_SUCCESS,
  GET_BILL_BY_USERNAME,
  GET_BILL_BY_USERNAME_SUCCESS,
  GET_BILL_BY_USERNAME_FAIL,
} from "../constants";

const url = "http://localhost:3002";

function* createBillSaga(action) {
  try {
    const response = yield axios.post(`${url}/payments`, {
      ...action.payload,
      isPayment: false,
      datetime: dateTimeNow(),
      status: "Đang duyệt",
    });

    const data = response.data;

    yield put({
      type: CREATE_BILL_SUCCESS,
      payload: data,
    });
    localStorage.setItem("bill", JSON.stringify(data));
    toastSuccess("Đặt hàng thành công!");
    history.push("/checkout");
  } catch (error) {
    yield put({
      type: CREATE_BILL_FAIL,
      payload: error,
    });
  }
}

function* getListBillSaga(action) {
  try {
    const {page, limit, search} = action.payload;
    const [responseData, responseTotal] = yield all([
      axios({
        url: `${url}/payments`,
        method: "get",
        params: {
          ...(page && {_page: page}),
          ...(limit && {_limit: limit}),
          ...(search && {q: search}),
        },
      }),
      axios({
        url: `${url}/payments`,
        method: "get",
        params: {
          ...(search && {q: search}),
        },
      }),
    ]);

    const data = {
      data: responseData.data,
      total: responseTotal.data.length,
    };

    yield put({
      type: GET_LIST_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_LIST_BILL_FAIL,
      payload: error,
    });
  }
}

function* getBillByUsernameSaga(action) {
  try {
    const {userName, page, limit} = action.payload;
    const [responseData, responseTotal] = yield all([
      axios({
        url: `${url}/payments?user.userName=${userName}`,
        method: "get",
        params: {
          ...(page && {_page: page}),
          ...(limit && {_limit: limit}),
        },
      }),
      axios({
        url: `${url}/payments?user.userName=${userName}`,
        method: "get",
      }),
    ]);

    const data = {
      data: responseData.data,
      total: responseTotal.data.length,
    };

    yield put({
      type: GET_BILL_BY_USERNAME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_BILL_BY_USERNAME_FAIL,
      payload: error,
    });
  }
}

export default function* paymentsSaga() {
  yield takeEvery(CREATE_BILL, createBillSaga);
  yield takeEvery(GET_LIST_BILL, getListBillSaga);
  yield takeEvery(GET_BILL_BY_USERNAME, getBillByUsernameSaga);
}
