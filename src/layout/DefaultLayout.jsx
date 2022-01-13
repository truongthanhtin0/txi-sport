import React from "react";
import {Route} from "react-router";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "./style.css";

function DefaultLayout({component: Component, ...props}) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <Header {...routerProps} />
          <div className="main">
            <Component {...routerProps} />
          </div>
          <Footer />
          <ToastContainer />
        </>
      )}
    />
  );
}

export default DefaultLayout;
