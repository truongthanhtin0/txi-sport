import {Form, Formik} from "formik";
import React, {useEffect} from "react";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import * as Yup from "yup";
import InputField from "../../components/InputField/InputField";
import history from "../../util/history";
import {toastError} from "../../util/toast";
import {createAccount, getListAccount} from "./../../redux/actions";
import "./style.css";

const infoData = [
  {
    id: 1,
    label: "Họ và tên",
    name: "name",
    placeholder: "Họ và tên",
  },
  {
    id: 2,
    label: "Tài khoản",
    name: "userName",
    placeholder: "Tài khoản",
  },
  {
    id: 3,
    label: "Mật khẩu",
    name: "password",
    type: "password",
    placeholder: "Mật khẩu",
  },
];

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
        <Form className="account__form">
          {infoData.map((item) => (
            <div className="field" key={item.id}>
              <InputField item={item} />
            </div>
          ))}
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
