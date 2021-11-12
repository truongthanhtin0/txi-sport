import React, {useState, useEffect} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {setAccount, getListAccount} from "../../redux/actions";
import history from "../../util/history";
import "./style.css";

function Login({setAccount, getList, getListAccount}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getListAccount();
  }, []);

  const notifyExist = () =>
    toast.error("Tài khoản không tồn tại!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyFail = () =>
    toast.error("Sai tài khoản hoặc mật khẩu!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleOnclickLogin = () => {
    if (getList.length) {
      const checkId = getList?.findIndex((item) => item.userName === userName);
      if (checkId === -1) notifyExist();
      else {
        if (getList[checkId]?.password === password) {
          setAccount(getList[checkId]);
          history.push("/");
        } else notifyFail();
      }
    } else notifyExist();
  };

  return (
    <Container>
      <Row>
        <Col sm={12} className="mt-3">
          <h4>ĐĂNG NHẬP</h4>
        </Col>
        <Col sm={6} className="offset-sm-3">
          <ToastContainer className="mt-3" />
          <Form className="form">
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
            <Button variant="primary" onClick={handleOnclickLogin}>
              Đăng nhập
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

// export default Login;
const mapStateToProps = (state) => {
  const {account, getList} = state.accountReducer;
  return {
    account,
    getList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAccount: (params) => dispatch(setAccount(params)),
    getListAccount: (params) => dispatch(getListAccount(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
