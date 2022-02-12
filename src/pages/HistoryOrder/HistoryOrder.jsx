import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {connect} from "react-redux";
import Paging from "../../components/Paging/Paging";
import {getBillByUsername} from "../../redux/actions";
import OrderItem from "./../../components/OrderItem/OrderItem";
import "./style.css";

function HistoryOrder({billByUsername, getBillByUsername}) {
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getBillByUsername({
      userName: info.userName,
      page: currentPage,
      limit: 3,
    });
  }, []);

  const {data, total} = billByUsername;

  return (
    <Container>
      <div className="check-order table__border">
        <h5 className="table__title check__title">LỊCH SỬ MUA HÀNG</h5>
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
            limit={3}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </Container>
  );
}

// export default HistoryOrder;

const mapStateToProps = (state) => {
  const {billByUsername} = state.paymentReducer;
  return {
    billByUsername,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillByUsername: (params) => dispatch(getBillByUsername(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrder);
