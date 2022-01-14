import React, {useState} from "react";
import {formatCurrency} from "../../util/formatCurrency";
import "./style.css";

function InfoCart(props) {
  const [productsLocal, setProductsLocal] = useState(
    JSON.parse(localStorage.getItem("productsList"))
  );

  const handleSumItem = (item) => {
    return item.currentPrice * item.quantity;
  };

  const handleTotal = () => {
    return productsLocal.reduce(
      (total, item) => total + item.currentPrice * item.quantity,
      0
    );
  };

  return (
    <>
      <div className="checkout__border">
        {productsLocal.map((item) => (
          <div className="checkout__wrapper mt-2" key={item.id}>
            <div className="d-flex align-items-center ">
              <div className="checkout__position">
                <img
                  src={item.image[0].src}
                  alt=""
                  className="checkout__img img__border"
                />
                <div className="checkout__position--item">{item.quantity}</div>
              </div>
              <p className="checkout__name">{item.name}</p>
            </div>
            <p className="checkout__price">
              {formatCurrency(handleSumItem(item))}
            </p>
          </div>
        ))}
      </div>
      <div className="checkout__border mt-4">
        <div className="input-group mb-3 pt-1">
          <input
            type="text"
            className="form-control"
            placeholder="Mã giảm giá"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span className="input-group-text" id="basic-addon2">
            Áp dụng
          </span>
        </div>
      </div>
      <div className="checkout__border mt-4">
        <div className="checkout__wrapper">
          <p className="checkout__description1">Tạm tính:</p>
          <p className="checkout__price">{formatCurrency(handleTotal())}</p>
        </div>
        <div className="checkout__wrapper">
          <p className="checkout__description1">Phí vận chuyển:</p>
          <p className="checkout__price">{formatCurrency(0)}</p>
        </div>
      </div>
      <div className="checkout__border mt-4">
        <div className="checkout__wrapper">
          <p>TỔNG CỘNG:</p>
          <p className="checkout__price__total">
            {formatCurrency(handleTotal())}
          </p>
        </div>
      </div>
    </>
  );
}

export default InfoCart;
