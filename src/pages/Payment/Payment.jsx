import React, {useState} from "react";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import history from "../../util/history";
import {createBill} from "./../../redux/actions/payments_action";
import "./style.css";

function Payment({createBill}) {
  const productsLocal = JSON.parse(localStorage.getItem("productsList"));

  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  const [valueAddress, setValueAddress] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    createBill({
      name: valueName,
      email: valueEmail,
      phone: valuePhone,
      address: valueAddress,
      products: productsLocal,
      status: "Đang duyệt",
    });

    localStorage.removeItem("productsList");

    history.push("/bill");
    // else {
    //   setValidated(true);

    //   createBill({
    //     name: valueName,
    //     email: valueEmail,
    //     phone: valuePhone,
    //     address: valueAddress,
    //     products: productsLocal,
    //     status: "Đang duyệt",
    //   });

    //   localStorage.removeItem("productsList");

    //   history.push("/bill");
    // }
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
          <div className="d-flex align-items-center checkout__description1">
            <p className="me-2">Bạn đã có tài khoản</p>
            <Link to="/login" className="text-decoration-none">
              Đăng nhập
            </Link>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <InputGroup name="" hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Họ và tên"
                  required
                  value={valueName}
                  onChange={(e) => setValueName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập họ tên.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
              <InputGroup name="" hasValidation>
                <Form.Control
                  className="me-3 w-60"
                  type="email"
                  placeholder="Email"
                  required
                  value={valueEmail}
                  onChange={(e) => setValueEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập email.
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup name="" hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Số điện thoại"
                  required
                  value={valuePhone}
                  onChange={(e) => setValuePhone(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập số điện thoại.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup name="" hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Địa chỉ"
                  required
                  value={valueAddress}
                  onChange={(e) => setValueAddress(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập địa chỉ.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <h6 className="checkout__title">Phương thức thanh toán</h6>
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Check
                  type="radio"
                  label="Chuyển khoản - FREE SHIP"
                  name="formHorizontalRadios"
                  className="checkout__radioButton"
                  disabled={true}
                  feedback="Chọn hình thức thanh toán."
                  feedbackType="invalid"
                />
                <Form.Check
                  type="radio"
                  label="Thử giày - Thanh toán tại nhà (COD)"
                  name="formHorizontalRadios"
                  className="checkout__radioButton"
                  required
                  feedback="Chọn hình thức thanh toán."
                  feedbackType="invalid"
                />
              </Col>
            </Form.Group>
            <div className="checkout__wrapper">
              <div className="d-flex align-items-center">
                <BiChevronLeft className="text-primary" />
                <Link to="/cart" className="text-decoration-none">
                  Giỏ hàng
                </Link>
              </div>
              <Button variant="primary" type="submit">
                Hoàn tất thanh toán
              </Button>
            </div>
          </Form>
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
