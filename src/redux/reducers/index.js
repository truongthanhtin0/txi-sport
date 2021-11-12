import {combineReducers} from "redux";
import homeReducer from "./home_reducer";
import productsReducer from "./products_reducer";
import productsDetailReducer from "./productsDetail_reducer";
import cartReducer from "./cart_reducer";
import accountReducer from "./account_reducer";
import paymentReducer from "./payments_reducer";

export default combineReducers({
  homeReducer,
  productsReducer,
  productsDetailReducer,
  cartReducer,
  accountReducer,
  paymentReducer,
});
