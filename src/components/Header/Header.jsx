import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {BiChevronDown, BiSearchAlt2} from "react-icons/bi";
import {BsFillPersonFill} from "react-icons/bs";
import {TiShoppingCart} from "react-icons/ti";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import logo from "../../assets/image/TXI-SPORT.png";
import {setCart, setAccount} from "../../redux/actions";
import "./style.css";

function Header({cart, account, setAccount}) {
  const [cartLocal, setCartLocal] = useState(
    JSON.parse(localStorage.getItem("productsList"))
  );
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")));

  return (
    <Container fluid className="header">
      <Container>
        <Row className="pt-2">
          <Col xs={6}>
            <span className="float-start header__title">
              TXI-SPORT --- LUÔN CAM KẾT HÀNG CHÍNH HÃNG
            </span>
          </Col>
          <Col xs={6}>
            {!info ? (
              <div className="d-flex align-items-center float-end header__login">
                <BsFillPersonFill className="header__icon" />
                <span>Tài khoản</span>
                <BiChevronDown className="header__icon" />

                <ul className="header__login--item">
                  <li>
                    <Link to="/login" className="header__login__link">
                      Đăng nhập
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="header__login__link">
                      Đăng ký
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="header__login__link">
                      Giỏ hàng
                    </Link>
                  </li>
                  <li>
                    <Link to="/payment" className="header__login__link">
                      Thanh toán
                    </Link>
                  </li>
                  <li className="header__login__link">Lịch sử mua hàng</li>
                </ul>
              </div>
            ) : (
              <div className="d-flex align-items-center float-end header__login">
                <span>{`Hi, ${account?.name || info?.name}`}</span>

                <ul className="header__login--item">
                  <li>Giỏ hàng</li>
                  <li>Thanh toán</li>
                  <li>Tra cứu đơn hàng</li>
                  <li
                    onClick={() => {
                      localStorage.removeItem("info");
                      setInfo();
                      setAccount({});
                    }}
                  >
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
          </Col>
        </Row>
        <Row className="my-2">
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={4} sm={3}>
                <Link to="/">
                  <img
                    src={logo}
                    alt="logo-TXI-SPORT"
                    className="header__img"
                  />
                </Link>
              </Col>
              <Col xs={6} sm={6} className="pl-2">
                <div className="header__input">
                  <input placeholder="Tìm kiếm..." type="text" />
                  <BiSearchAlt2 className="header__input--icon header__icon" />
                </div>
              </Col>
              <Col xs={2} sm={3}>
                <Link
                  to="/cart"
                  className="text-decoration-none header__position"
                >
                  <TiShoppingCart className="header__icon--cart" />
                  {(cart?.length > 0 || cartLocal?.length > 0) && (
                    <div className="header__position--cart">
                      {cart.length || cartLocal.length}
                    </div>
                  )}
                </Link>
              </Col>
            </Row>
          </Container>
        </Row>
        <Row className="mt-2">
          <Col>
            <ul className="pl-0 list-unstyled d-flex header__menu">
              <li className="me-4 p-1">
                <Link className="menu__link" to="/">
                  TRANG CHỦ
                </Link>
              </li>
              <li className="me-4 p-1">
                <Link
                  className="menu__link d-flex align-items-center"
                  to="/products"
                >
                  SẢN PHẨM
                  <BiChevronDown className="header__icon" />
                </Link>
              </li>
              <li className="me-4 p-1">
                <Link className="menu__link" to="">
                  CÁCH CHỌN SIZE
                </Link>
              </li>
              <li className="me-4 p-1">
                <Link className="menu__link" to="">
                  TIN TỨC GIÀY
                </Link>
              </li>
              <li className="me-4 p-1">
                <Link className="menu__link" to="">
                  VỀ CHÚNG TÔI
                </Link>
              </li>
              <li className="me-4 p-1">
                <Link className="menu__link" to="">
                  LIÊN HỆ
                </Link>
              </li>
              <li className="me-4 p-1">
                <Link className="menu__link" to="/">
                  SALE OFF
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

// export default Header;
const mapStateToProps = (state) => {
  const {cart} = state.cartReducer;
  const {account} = state.accountReducer;
  return {
    cart,
    account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (params) => dispatch(setCart(params)),
    setAccount: (params) => dispatch(setAccount(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
