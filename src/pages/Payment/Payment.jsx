import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {dateTimeNow} from "../../util/dateTime";
import {createBill} from "./../../redux/actions";
import "./style.css";
import InputField from "../../components/InputField/InputField";

const infoData = [
  {
    id: 1,
    name: "name",
    placeholder: "Họ và tên",
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    id: 3,
    name: "phone",
    placeholder: "Số điện thoại",
  },
  {
    id: 4,
    name: "address",
    placeholder: "Địa chỉ",
  },
];

function Payment({createBill}) {
  const [productsLocal, setProductsLocal] = useState(
    JSON.parse(localStorage.getItem("productsList"))
  );
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")));

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const handleTotal = () => {
    return productsLocal.reduce(
      (total, item) => total + item.currentPrice * item.quantity,
      0
    );
  };

  const paymentCode = () => {
    const random = Math.ceil(Math.random() * 9000 + 999);
    return `#Bill${random}`;
  };

  const handleSubmit = (value) => {
    createBill({
      paymentCode: paymentCode(),
      name: value.name,
      email: value.email,
      phone: value.phone,
      address: value.address,
      products: productsLocal,
      total: handleTotal(),
      datetime: dateTimeNow(),
      status: "Đang duyệt",
    });
  };

  return (
    <section className="payment">
      <h3>TXI-SPORT</h3>
      <div className="d-flex align-items-center checkout__description">
        <Link to="/cart" className="text-decoration-none">
          Giỏ hàng
        </Link>
        <BiChevronRight />
        <p>Thông tin giao hàng</p>
      </div>
      <h6 className="checkout__title">Thông tin giao hàng</h6>
      {!info && (
        <div className="d-flex align-items-center checkout__description1">
          <p className="me-2">Bạn đã có tài khoản</p>
          <Link to="/login" className="text-decoration-none">
            Đăng nhập
          </Link>
        </div>
      )}
      <Formik
        initialValues={{
          name: info?.name || "",
          email: "",
          phone: "",
          address: "",
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Tài khoản không được để trống!")
            .min(3, "Tài khoản không được ít hơn 3 kí tự")
            .max(30, "Tài khoản không được quá 30 kí tự"),
          email: Yup.string()
            .required("Email không được để trống!")
            .email("Email không đúng định dạng!"),
          phone: Yup.string()
            .required("Số điện thoại không được để trống!")
            .matches(phoneRegExp, "Số điện thoại không đúng định dạng!"),
          address: Yup.string()
            .required("Địa chỉ không được để trống!")
            .min(10, "Địa chỉ không được ít hơn 10 kí tự")
            .max(40, "Địa chỉ không được quá 30 kí tự"),
        })}
        onSubmit={(value) => handleSubmit(value)}
      >
        <Form>
          {infoData.map((item) => (
            <div className="field" key={item.id}>
              <InputField
                name={item.name}
                type={item.type}
                placeholder={item.placeholder}
              />
            </div>
          ))}
          <h6 className="checkout__title">Phương thức thanh toán</h6>
          <div className="payment__check">
            <div class="form-check payment__check--item">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                disabled
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Chuyển khoản ngân hàng
              </label>
            </div>
            <div class="form-check payment__check--item">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Thử giày - Thanh toán tại nhà (Ship COD)
              </label>
            </div>
            <div class="form-check payment__check--item">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Thanh toán trực tiếp tại cửa hàng
              </label>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BiChevronLeft className="text-primary" />
              <Link to="/cart" className="text-decoration-none">
                Giỏ hàng
              </Link>
            </div>
            <Button htmlType="submit" type="primary">
              Hoàn tất thanh toán
            </Button>
          </div>
        </Form>
      </Formik>
    </section>
  );
}

// export default Payment;

const mapStateToProps = (state) => {
  const {billData} = state.paymentReducer;
  return {
    billData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBill: (params) => dispatch(createBill(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
