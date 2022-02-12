import {Router} from "react-router";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout";
import PaymentLayout from "./layout/PaymentLayout";
import Bill from "./pages/Bill/Bill";
import Cart from "./pages/Cart/Cart";
import CheckOrder from "./pages/CheckOrder/CheckOrder";
import Checkout from "./pages/Checkout/Checkout";
import HistoryOrder from "./pages/HistoryOrder/HistoryOrder";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Payment from "./pages/Payment/Payment";
import Products from "./pages/Products/Products";
import ProductsDetail from "./pages/Products/ProductsDetail";
import Register from "./pages/Register/Register";
import history from "./util/history";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <DefaultLayout exact path="/" component={Home} />
        <DefaultLayout exact path="/login" component={Login} />
        <DefaultLayout exact path="/register" component={Register} />
        <DefaultLayout exact path="/products" component={Products} />
        <DefaultLayout exact path="/products/:id" component={ProductsDetail} />
        <DefaultLayout exact path="/cart" component={Cart} />
        <DefaultLayout exact path="/bill" component={Bill} />
        <DefaultLayout exact path="/check-order" component={CheckOrder} />
        <DefaultLayout exact path="/history-order" component={HistoryOrder} />

        <PaymentLayout exact path="/payment" component={Payment} />
        <PaymentLayout exact path="/checkout" component={Checkout} />
      </Router>
    </div>
  );
}

export default App;
