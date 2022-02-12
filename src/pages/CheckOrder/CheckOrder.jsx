import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {BiSearchAlt2} from "react-icons/bi";
import {connect} from "react-redux";
import Captcha from "../../components/Captcha/Captcha";
import InputRadio from "../../components/InputRadio/InputRadio";
import OrderItem from "../../components/OrderItem/OrderItem";
import Paging from "../../components/Paging/Paging";
import {getListBill} from "../../redux/actions";
import "./style.css";

const checkData = [
  {
    id: 1,
    label: "Số điện thoại",
  },
  {
    id: 2,
    label: "Email",
  },
];

function CheckOrder({listBill, getListBill}) {
  const [checked, setChecked] = useState(1);
  const [value, setValue] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {data, total} = listBill;

  // useEffect(() => {
  //   getListBill({
  //     page: currentPage,
  //     limit: 2,
  //     search: value,
  //   });
  // }, [currentPage, value]);

  const handleClickBtn = () => {
    getListBill({
      page: currentPage,
      limit: 2,
      search: value,
    });
  };

  return (
    <Container>
      <div className="check-order table__border">
        <h5 className="table__title check__title">TRA CỨU ĐƠN HÀNG</h5>
        <Row className="p-4">
          <Col xs={12} sm={12} md={12} lg={4}>
            <div className="check__wrapper table__border">
              <h3 className="check__subtitle">
                <BiSearchAlt2 /> Tra cứu đơn hàng của bạn
              </h3>
              <p>Tra cứu thông qua:</p>
              <div className="d-flex justify-content-around">
                {checkData.map((item) => (
                  <div className="form-check" key={item.id}>
                    <InputRadio
                      item={item}
                      checked={checked}
                      setChecked={setChecked}
                    />
                  </div>
                ))}
              </div>
              <p>{checked === 1 ? "Số điện thoại" : "Email"}</p>
              <input
                type="text"
                className="form-control check__input"
                placeholder={
                  checked === 1 ? "0905 xxx xxx" : "example@gmail.com"
                }
                onChange={(e) => setValue(e.target.value)}
              />
              <Captcha setIsVerified={setIsVerified} />
              <p>
                Nếu quý khách có bất kỳ thắc mắc nào, xin vui lòng gọi{" "}
                <b>0935 633 219</b>
              </p>
              <button
                className="btn btn-warning"
                onClick={handleClickBtn}
                disabled={!isVerified}
              >
                Xem ngay
              </button>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8}>
            {data?.length > 0 ? (
              <ul className="list-unstyled list-order">
                {data?.map((item, index) => (
                  <OrderItem item={item} index={index} />
                ))}
              </ul>
            ) : (
              <p>Không tìm thấy dữ liệu...</p>
            )}
            {total && (
              <Paging
                total={total}
                currentPage={currentPage}
                limit={2}
                setCurrentPage={setCurrentPage}
              />
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

// export default CheckOrder;

const mapStateToProps = (state) => {
  const {listBill} = state.paymentReducer;
  return {
    listBill,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListBill: (params) => dispatch(getListBill(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOrder);
