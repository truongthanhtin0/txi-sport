import React from "react";
import {Route} from "react-router";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import {Col, Row} from "react-bootstrap";
import InfoCart from "../components/InfoCart/InfoCart";

function PaymentLayout({component: Component, ...props}) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <div className="main">
            <div className="layout__payment">
              <Row>
                <Col xs={12} md={6} className="payment__left">
                  <Component {...routerProps} />
                </Col>
                <Col xs={12} md={6} className="payment__right">
                  <InfoCart />
                </Col>
              </Row>
            </div>
            <ToastContainer />
          </div>
        </>
      )}
    />
  );
}

export default PaymentLayout;
