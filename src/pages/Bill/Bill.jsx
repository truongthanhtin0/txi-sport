import React, {useState} from "react";
import Logo from "../../assets/image/TXI-SPORT.png";
import history from "../../util/history";
import {formatCurrency} from "./../../util/formatCurrency";
import "./style.css";

const checkData = [
  {
    id: 1,
    label: "Chuyển khoản ngân hàng",
  },
  {
    id: 2,
    label: "Thử giày - Thanh toán tại nhà (Ship COD)",
  },
  {
    id: 3,
    label: "Thanh toán trực tiếp tại cửa hàng",
  },
];

function Bill(props) {
  const [bill, setBill] = useState(JSON.parse(localStorage.getItem("bill")));

  const handleCleanupLocal = () => {
    localStorage.removeItem("bill");
    history.push("/");
  };

  return (
    <section className="bill">
      <div className="d-flex justify-content-between">
        <img
          src={Logo}
          alt="logo"
          className="header__img"
          onClick={handleCleanupLocal}
        />
        <div className="text-end">
          <h1 className="bill__title">Hóa đơn</h1>
          <h3 className="bill__code">{bill?.paymentCode}</h3>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="text-start mt-3">
          <h4 className="m-0">{bill?.name}</h4>
          <p>{bill?.address}</p>
          <p>{bill?.phone}</p>
          <p>{bill?.email}</p>
          <p>{bill?.datetime}</p>
          {checkData.map((item) => {
            if (item.id === bill?.payment) {
              return <p key={item.id}>{item.label}</p>;
            } else return null;
          })}
        </div>
        <div className="text-end">
          <br />
          <br />
          <h6 className="mb-2">Tổng tiền</h6>
          <h6>{formatCurrency(bill?.total)}</h6>
        </div>
      </div>
      <table className="table my-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Giá</th>
          </tr>
        </thead>
        <tbody>
          {bill.products.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={item.image[0].src}
                  alt="img"
                  className="cart__img me-4 img__border"
                />
              </td>
              <td className="modal__name">{item.name}</td>
              <td className="bill__price">
                {formatCurrency(item.currentPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between mt-4 bill__wrapper">
        <h6>Tạm tính:</h6>
        <h6>{formatCurrency(bill.total)}</h6>
      </div>
      <div className="d-flex justify-content-between mt-3 bill__wrapper">
        <h6>Phí vận chuyển:</h6>
        <h6>{formatCurrency(0)}</h6>
      </div>
      <div className="d-flex justify-content-between mt-5 bill__wrapper">
        <h6>TỔNG TIỀN:</h6>
        <h6>{formatCurrency(bill.total)}</h6>
      </div>
      <button className="btn btn-primary mt-4" onClick={handleCleanupLocal}>
        Tiếp tục mua hàng
      </button>
    </section>
  );
}

export default Bill;
