import React, {useState} from "react";
import "./style.css";
import {formatCurrency} from "./../../util/formatCurrency";

function Bill(props) {
  const [bill, setBill] = useState(JSON.parse(localStorage.getItem("bill")));
  console.log("Log :  bill", bill);

  return (
    <section className="bill">
      <div className="bill__title">
        <h1>TXI-SPORT</h1>
        <h1>Hóa đơn</h1>
        <h3>{bill?.paymentCode}</h3>
        <h4>{bill?.name}</h4>
        <p>{bill?.address}</p>
        <p>{bill?.phone}</p>
        <p>{bill?.email}</p>
        <h6>Tổng tiền</h6>
        <h6>{formatCurrency(bill?.total)}</h6>
      </div>
      <div className="bill__info"></div>
      <div className="bill__info"></div>
    </section>
  );
}

export default Bill;
