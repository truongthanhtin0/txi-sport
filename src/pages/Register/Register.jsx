import React, {useState, useEffect} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "../../util/history";
import {createAccount} from "./../../redux/actions";
import "./style.css";

function Register({createList, createAccount}) {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const notifyRegisterSuccess = () =>
    toast.info("Đăng ký thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyRegisterFail = () =>
    toast.error("Tài khoản đã tồn tại!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleClickRegister = () => {
    if (!createList?.length) {
      createAccount({
        name: fullName,
        userName: userName,
        password: password,
        role: "user",
      });
      notifyRegisterSuccess();
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    } else {
      const checkId = createList?.findIndex(
        (item) => item.userName === userName
      );
      if (checkId === -1) {
        createAccount({
          name: fullName,
          userName: userName,
          password: password,
          role: "user",
        });
        notifyRegisterSuccess();
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      } else notifyRegisterFail();
    }
  };
  return (
    <Container>
      <Row>
        <Col sm={12} className="mt-3">
          <h4>ĐĂNG KÝ</h4>
        </Col>
        <Col sm={6} className="offset-sm-3">
          <ToastContainer className="mt-3" />
          <Form className="form">
            <Form.Group className="mb-3" controlId="formBasicFullName">
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Control
                type="text"
                placeholder="Tài khoản"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => handleClickRegister()}>
              Đăng ký
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

// export default Register;
const mapStateToProps = (state) => {
  const {createList} = state.accountReducer;
  return {
    createList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAccount: (params) => dispatch(createAccount(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
