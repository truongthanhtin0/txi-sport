import React from "react";
import FooterItem from "./FooterItem";
import "./style.css";

function Footer(props) {
  const arrData = [
    {
      title: "GIAO HÀNG SIÊU TỐC",
      content: "Giao hàng nội thành TP.Đà Nẵng trong vòng 1--> 2 tiếng",
      image:
        "http://theme.hstatic.net/1000061481/1000780311/14/policy_new_image_1.png?v=499",
    },
    {
      title: "TƯ VẤN ONLINE 24/7",
      content:
        "Đội ngũ CSKH tư vấn 24/7 qua Hotline, Facebook, Zalo, Instagram",
      image:
        "http://theme.hstatic.net/1000061481/1000780311/14/policy_new_image_2.png?v=499",
    },
    {
      title: "ĐỔI HÀNG LINH HOẠT",
      content: "Đổi hàng trong vòng 7 ngày với sản phẩm chưa sử dụng",
      image:
        "http://theme.hstatic.net/1000061481/1000780311/14/policy_new_image_3.png?v=499",
    },
    {
      title: "QUÀ TẶNG HẤP DẪN",
      content: "Nhiều quà tặng hấp dẫn khi hàng tại TXI-SPORT",
      image:
        "http://theme.hstatic.net/1000061481/1000780311/14/policy_new_image_4.png?v=499",
    },
    {
      title: "THANH TOÁN TIỆN LỢI",
      content:
        "Thanh toán tiện lợi bằng tiền mặt, chuyển khoản, thẻ ngân hàng, Visa/Master card, ví Momo...",
      image:
        "http://theme.hstatic.net/1000061481/1000780311/14/policy_new_image_5.png?v=499",
    },
  ];

  return (
    <section className="footer">
      <div className="container">
        <div className="footer__wrapper">
          {arrData.map((item, index) => (
            <div className="footer__item column-5" key={index}>
              <FooterItem data={item} />
            </div>
          ))}
        </div>
        <h6 className="footer__description">© Bản quyền thuộc về TXI-SPORT</h6>
      </div>
    </section>
  );
}

export default Footer;
