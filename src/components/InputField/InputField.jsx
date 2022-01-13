import {ErrorMessage, Field} from "formik";
import React from "react";
import "./style.css";

function InputField({label, name, type, placeholder}) {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        id={name}
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder && placeholder}
      />
      <p>
        <ErrorMessage name={name} />
      </p>
    </>
  );
}

export default InputField;
