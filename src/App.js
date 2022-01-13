import {Route, Switch, Router} from "react-router";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import ProductsDetail from "./pages/Products/ProductsDetail";
import Register from "./pages/Register/Register";
import Payment from "./pages/Payment/Payment";
import Bill from "./pages/Bill/Bill";
import history from "./util/history";
import DefaultLayout from "./layout/DefaultLayout";
import PaymentLayout from "./layout/PaymentLayout";

function App() {
  return (
    <div className="App">
      {/* <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/products" component={Products} exact />
        <Route path="/products/:id" component={ProductsDetail} exact />
        <Route path="/payment" component={Payment} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/bill" component={Bill} exact />
      </Switch>
      <Footer /> */}
      <Router history={history}>
        <DefaultLayout exact path="/" component={Home} />
        <DefaultLayout exact path="/login" component={Login} />
        <DefaultLayout exact path="/register" component={Register} />
        <DefaultLayout exact path="/products" component={Products} />
        <DefaultLayout exact path="/products/:id" component={ProductsDetail} />
        <DefaultLayout exact path="/cart" component={Cart} />
        <DefaultLayout exact path="/bill" component={Bill} />

        <PaymentLayout exact path="/payment" component={Payment} />
      </Router>
    </div>
  );
}

export default App;
