import React, {useState} from "react";
import {BiChevronLeft} from "react-icons/bi";
import {Link} from "react-router-dom";
import history from "../../util/history";
import {toastSuccess} from "../../util/toast";
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

function Checkout(props) {
  const [bill, setBill] = useState(JSON.parse(localStorage.getItem("bill")));

  const handleClick = () => {
    localStorage.removeItem("productsList");
    history.push("/bill");
    toastSuccess("Thanh toán thành công !");
  };

  return (
    <section className="payment">
      <h3>TXI-SPORT</h3>
      <div className="mt-3 mb-4">
        <h6 className="checkout__notify">Đặt hàng thành công!</h6>
        <p>Mã đơn hàng: {bill?.paymentCode}</p>
        <p>Cảm ơn bạn đã mua hàng!</p>
      </div>
      <div className="p-2 border rounded">
        <h6 className="payment__title mt-2 mb-1">Thông tin giao hàng</h6>
        <p className="fst-italic">{bill?.name}</p>
        <p className="fst-italic">{bill?.address}</p>
        <p className="fst-italic">{bill?.phone}</p>
        <p className="fst-italic">{bill?.email}</p>
        <h6 className="payment__title mt-3 mb-1">Phương thức thanh toán</h6>
        {checkData.map((item) => {
          if (item.id === bill?.payment) {
            return (
              <p key={item.id} className="fst-italic">
                {item.label}
              </p>
            );
          } else return null;
        })}
      </div>
      <div className="d-flex align-items-center justify-content-between mt-4">
        <div className="d-flex align-items-center">
          <BiChevronLeft className="text-primary" />
          <Link to="/payment" className="text-decoration-none">
            Quay lại
          </Link>
        </div>
        <button className="btn btn-primary" onClick={handleClick}>
          Hoàn tất thanh toán
        </button>
      </div>
    </section>
  );
}

export default Checkout;
