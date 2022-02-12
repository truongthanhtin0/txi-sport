import React from "react";
import "./style.css";

function InputRadio({item, checked, setChecked}) {
  return (
    <>
      <input
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id={item.id}
        checked={item.id === checked}
        onChange={() => setChecked(item.id)}
      />
      <label
        className={
          item.status === "Payment"
            ? "form-check-label"
            : "form-check-label check__input"
        }
        for={item.id}
      >
        {item.label}
      </label>
    </>
  );
}

export default InputRadio;
