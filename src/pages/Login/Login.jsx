import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect} from "react";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {ToastContainer} from "react-toastify";
import * as Yup from "yup";
import {getListAccount, setAccount} from "../../redux/actions";
import history from "../../util/history";
import {toastError, toastSuccess} from "./../../util/toast";
import "./style.css";

function Login({setAccount, getList, getListAccount}) {
  useEffect(() => {
    getListAccount();
  }, []);

  const handleOnclickLogin = (value) => {
    if (!getList.length) {
      toastError("Tài khoản không tồn tại !");
    } else {
      const accountFind = getList.find(
        (item) => item.userName === value.userName
      );
      if (!accountFind) {
        toastError("Tài khoản không tồn tại !");
      } else {
        if (accountFind.password === value.password) {
          localStorage.removeItem("productsList");
          localStorage.setItem("info", JSON.stringify(accountFind));
          setAccount(accountFind);
          history.push("/");
          toastSuccess("Đăng nhập thành công !");
        } else {
          toastError("Sai tài khoản hoặc mật khẩu !");
        }
      }
    }
  };

  return (
    <section className="login">
      <h4>ĐĂNG NHẬP</h4>
      <Formik
        initialValues={{
          userName: "",
          password: "",
        }}
        enableReinitialize
        validationSchema={Yup.object({
          userName: Yup.string()
            .required("Tài khoản không được để trống!")
            .min(3, "Tài khoản không được ít hơn 3 kí tự")
            .max(30, "Tài khoản không được quá 30 kí tự"),
          password: Yup.string()
            .required("Mật khẩu không được để trống!")
            .min(8, "Mật khẩu không được ít hơn 8 ký tự!")
            .max(30, "Mật khẩu không được quá 30 kí tự"),
        })}
        onSubmit={(value) => handleOnclickLogin(value)}
      >
        <Form>
          <div className="account__wrapper">
            <label htmlFor="userName">Tài khoản</label>
            <Field id="userName" type="text" name="userName" />
            <p>
              <ErrorMessage name="userName" />
            </p>
          </div>
          <div className="account__wrapper">
            <label htmlFor="password">Mật khẩu</label>
            <Field id="password" type="password" name="password" />
            <p>
              <ErrorMessage name="password" />
            </p>
          </div>
          <p className="account__description">
            Bạn chưa có tài khoản?
            <span onClick={() => history.push("/register")}> Đăng ký</span>
          </p>
          <div>
            <Button htmlType="submit" type="primary">
              Đăng nhập
            </Button>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </section>
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
