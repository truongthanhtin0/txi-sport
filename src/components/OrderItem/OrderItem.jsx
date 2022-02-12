import React from "react";
import {formatCurrency} from "../../util/formatCurrency";
import {FcShipped} from "react-icons/fc";
import {RiPriceTag2Line} from "react-icons/ri";
import "./style.css";

function OrderItem({item, index}) {
  return (
    <li key={index} className="mb-3 py-4 list__item table__border">
      <div className="px-4 pb-3 d-flex align-items-center justify-content-between border-bottom">
        <p>Họ và tên: {item.name}</p>
        <p>Địa chỉ: {item.address}</p>
        <p>Số điện thoại: {item.phone}</p>
        <p>Email: {item.email}</p>
      </div>
      <ul className="px-4 list-unstyled border-bottom">
        <li>
          <div className="mt-2 py-2 d-flex align-items-center justify-content-between border-bottom">
            <div className="d-flex align-items-center">
              <p className="me-3 list__like">Yêu thích +</p>
              <p>
                <b>TXI-SPORT</b>
              </p>
            </div>
            <div className="d-flex align-items-center">
              <p>Ngày đặt hàng: {item.datetime}</p>
              <span className="mx-2">|</span>
              <p className="list__ship">
                <FcShipped className="list__icon--ship" /> Giao hàng thành công
              </p>
            </div>
          </div>
        </li>
        {item.products.map((prod, prodIndex) => (
          <li key={prodIndex} className="py-2 list__item--item">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-between">
                <img
                  src={prod.image[0].src}
                  alt=""
                  className="cart__img me-4 img__border"
                />
                <div className="text-start">
                  <p className="modal__name">{prod.name}</p>
                  <p className="modal__name">
                    Phân loại hàng: {prod.trademark}, {prod.playerPosition}
                  </p>
                  <p className="modal__name">x{prod.quantity}</p>
                </div>
              </div>
              <p className="modal__price">
                {formatCurrency(prod.currentPrice)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-4 mt-3 d-flex align-items-center justify-content-end">
        <p className="me-3 list__total">
          <RiPriceTag2Line /> Tổng số tiền:
        </p>
        <p className="list__total">{formatCurrency(item.total)}</p>
      </div>
      <div className="px-4 mt-3 d-flex align-items-center justify-content-end">
        <button className="me-3 btn btn-primary">Mua lại</button>
        <button className="btn btn-outline-primary">Xem đánh giá</button>
      </div>
    </li>
  );
}

export default OrderItem;
