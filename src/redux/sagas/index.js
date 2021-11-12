import {fork} from "redux-saga/effects";
import home_saga from "./home_saga";
import products_saga from "./products_saga";
import productsDetail_saga from "./productsDetail_saga";
import payments_saga from "./payments_saga";
import account_saga from "./account_saga";

export default function* mySaga() {
  yield fork(home_saga);
  yield fork(products_saga);
  yield fork(productsDetail_saga);
  yield fork(payments_saga);
  yield fork(account_saga);
}
