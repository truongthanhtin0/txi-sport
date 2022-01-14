import {Form, Formik} from "formik";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import InputField from "../../components/InputField/InputField";
import {createBill} from "./../../redux/actions";
import "./style.css";

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

function Payment({createBill}) {
  const [checked, setChecked] = useState(1);

  const [productsLocal, setProductsLocal] = useState(
    JSON.parse(localStorage.getItem("productsList"))
  );
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")));

  const [bill, setBill] = useState(JSON.parse(localStorage.getItem("bill")));

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
      payment: checked,
    });
  };

  return (
    <section className="payment">
      <h3>TXI-SPORT</h3>
      <div className="d-flex align-items-center payment__description">
        <Link to="/cart" className="text-decoration-none">
          Giỏ hàng
        </Link>
        <BiChevronRight />
        <p>Thông tin giao hàng</p>
      </div>
      <h6 className="payment__title">Thông tin giao hàng</h6>
      {!info && (
        <div className="d-flex align-items-center payment__description">
          <p className="me-2">Bạn đã có tài khoản</p>
          <Link to="/login" className="text-decoration-none">
            Đăng nhập
          </Link>
        </div>
      )}
      <Formik
        initialValues={{
          name: bill?.name || info?.name || "",
          email: bill?.email || "",
          phone: bill?.phone || "",
          address: bill?.address || "",
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
          <h6 className="payment__title">Phương thức thanh toán</h6>
          <div className="payment__check">
            {checkData.map((item, index) => (
              <div className="form-check payment__check--item" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id={item.id}
                  checked={item.id === checked}
                  onChange={() => setChecked(item.id)}
                />
                <label className="form-check-label" htmlFor={item.id}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BiChevronLeft className="text-primary" />
              <Link to="/cart" className="text-decoration-none">
                Giỏ hàng
              </Link>
            </div>
            <Button htmlType="submit" type="primary">
              Tiếp tục thanh toán
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
