import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect} from "react";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import history from "../../util/history";
import {toastError} from "../../util/toast";
import {createAccount, getListAccount} from "./../../redux/actions";
import "./style.css";

function Register({createAccount, getList, getListAccount}) {
  useEffect(() => {
    getListAccount();
  }, []);

  const handleClickRegister = (value) => {
    if (!getList.length) {
      createAccount({
        name: value.name,
        userName: value.userName,
        password: value.password,
        role: "user",
      });
    } else {
      const accountFind = getList?.find(
        (item) => item.userName === value.userName
      );
      if (!accountFind) {
        createAccount({
          name: value.name,
          userName: value.userName,
          password: value.password,
          role: "user",
        });
      } else {
        toastError("Tài khoản đã tồn tại !");
      }
    }
  };
  return (
    <section className="register">
      <h4>ĐĂNG KÝ</h4>
      <Formik
        initialValues={{
          name: "",
          userName: "",
          password: "",
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Họ và tên không được để trống!")
            .min(3, "Họ và tên không được ít hơn 3 kí tự")
            .max(40, "Họ và tên không được quá 40 kí tự"),
          userName: Yup.string()
            .required("Tài khoản không được để trống!")
            .min(3, "Tài khoản không được ít hơn 3 kí tự")
            .max(30, "Tài khoản không được quá 30 kí tự"),
          password: Yup.string()
            .required("Mật khẩu không được để trống!")
            .min(8, "Mật khẩu không được ít hơn 8 ký tự!")
            .max(30, "Mật khẩu không được quá 30 kí tự"),
        })}
        onSubmit={(value) => handleClickRegister(value)}
      >
        <Form>
          <div className="account__wrapper">
            <label htmlFor="name">Họ và tên</label>
            <Field id="name" type="text" name="name" />
            <p>
              <ErrorMessage name="name" />
            </p>
          </div>
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
            Bạn đã có tài khoản?
            <span onClick={() => history.push("/login")}> Đăng nhập</span>
          </p>
          <div>
            <Button htmlType="submit" type="primary">
              Đăng ký
            </Button>
          </div>
        </Form>
      </Formik>
      <ToastContainer className="mt-3" />
    </section>
  );
}

// export default Register;
const mapStateToProps = (state) => {
  const {getList} = state.accountReducer;
  return {
    getList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAccount: (params) => dispatch(createAccount(params)),
    getListAccount: (params) => dispatch(getListAccount(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
