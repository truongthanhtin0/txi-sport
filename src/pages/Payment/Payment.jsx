import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {dateTimeNow} from "../../util/dateTime";
import {createBill} from "./../../redux/actions";
import "./style.css";

function Payment({createBill}) {
  const [productsLocal, setProductsLocal] = useState(
    JSON.parse(localStorage.getItem("productsList"))
  );
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")));

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const handleSubmit = (value) => {
    createBill({
      name: value.name,
      email: value.email,
      phone: value.phone,
      address: value.address,
      products: productsLocal,
      datetime: dateTimeNow(),
      status: "Đang duyệt",
    });
  };

  const handleSumItem = (item) => {
    let sum = 0;
    sum += item.currentPrice * item.quantity;
    return sum;
  };

  const handleTotal = () => {
    let total = 0;
    productsLocal.map((item) => (total += item.currentPrice * item.quantity));
    return total;
  };

  return (
    <Container fluid>
      <Row className="my-0 width">
        <Col className="py-5 text-start ">
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
              <div className="payment__wrapper">
                <label htmlFor="name">Họ và tên</label>
                <Field id="name" type="text" name="name" />
                <p>
                  <ErrorMessage name="name" />
                </p>
              </div>
              <div className="payment__wrapper">
                <label htmlFor="email">Email</label>
                <Field id="email" type="email" name="email" />
                <p>
                  <ErrorMessage name="email" />
                </p>
              </div>
              <div className="payment__wrapper">
                <label htmlFor="phone">Số điện thoại</label>
                <Field id="phone" type="text" name="phone" />
                <p>
                  <ErrorMessage name="phone" />
                </p>
              </div>
              <div className="payment__wrapper">
                <label htmlFor="address">Địa chỉ</label>
                <Field id="address" type="text" name="address" />
                <p>
                  <ErrorMessage name="address" />
                </p>
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
        </Col>
        <Col className="py-5 checkout__right border-start border-2">
          <div className="checkout__border">
            {productsLocal.map((item) => (
              <div className="checkout__wrapper mt-2" key={item.id}>
                <div className="d-flex align-items-center ">
                  <div className="checkout__position">
                    <img
                      src={item.image[0].src}
                      alt=""
                      className="checkout__img"
                    />
                    <div className="checkout__position--item">
                      {item.quantity}
                    </div>
                  </div>
                  <p className="checkout__name">{item.name}</p>
                </div>
                <p className="checkout__price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(handleSumItem(item))}
                </p>
              </div>
            ))}
          </div>
          <div className="checkout__border mt-3">
            <div className="checkout__wrapper">
              <p className="checkout__description1">Tạm tính:</p>
              <p className="checkout__price">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(handleTotal())}
              </p>
            </div>
            <div className="checkout__wrapper">
              <p className="checkout__description1">Phí vận chuyển:</p>
              <p className="checkout__price">Miễn phí</p>
            </div>
          </div>
          <div className="checkout__border mt-3">
            <div className="checkout__wrapper">
              <p>TỔNG CỘNG:</p>
              <p className="checkout__price__total">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(handleTotal())}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
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
