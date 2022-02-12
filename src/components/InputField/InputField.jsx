import {ErrorMessage, Field} from "formik";
import React from "react";
import "./style.css";

function InputField({item}) {
  return (
    <>
      {item.label && <label htmlFor={item.name}>{item.label}</label>}
      <Field
        id={item.name}
        type={item.type ? item.type : "text"}
        name={item.name}
        placeholder={item.placeholder && item.placeholder}
      />
      <p>
        <ErrorMessage name={item.name} />
      </p>
    </>
  );
}

export default InputField;
