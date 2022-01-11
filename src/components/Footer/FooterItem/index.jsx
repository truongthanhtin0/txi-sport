import React from "react";
import "./style.css";

function FooterItem({data}) {
  return (
    <>
      <img src={data.image} alt="" className="footer__img" />
      <div className="text-start">
        <p className="footer__title">{data.title}</p>
        <p className="footer__content">{data.content}</p>
      </div>
    </>
  );
}

export default FooterItem;
