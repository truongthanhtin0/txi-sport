import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FcCheckmark} from "react-icons/fc";
import {connect} from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {setCart} from "../../redux/actions/cart_action";
import {toastSuccess} from "../../util/toast";
import {getProductsDetail} from "./../../redux/actions/productsDetail_action";
import history from "./../../util/history";
import "./style.css";
import {formatCurrency} from "./../../util/formatCurrency";

function ProductsDetail({getProductsDetail, productsDetail, match, setCart}) {
  const [indexImg, setIndexImg] = useState(0);

  useEffect(() => {
    getProductsDetail({
      id: match.params.id,
    });
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    // autoplay: true,
    swipe: true,
    arrows: true,
    // autoplaySpeed: 1000,
    cssEase: "ease-in-out",
  };

  const handleSlideImg = (imgIndex) => {
    setIndexImg(imgIndex);
  };

  const handleProducts = (newProducts) => {
    let arrData = [];
    const productItem = {...newProducts, quantity: 1};
    const cartData = JSON.parse(localStorage.getItem("productsList"));
    if (cartData?.length) {
      const findItem = cartData.find((item) => item.id === newProducts.id);
      if (findItem) {
        const indexItem = cartData.findIndex(
          (item) => item.id === newProducts.id
        );
        cartData.splice(indexItem, 1, {
          ...findItem,
          quantity: parseInt(findItem.quantity) + 1,
        });
        arrData = [...cartData];
      } else arrData = [...cartData, productItem];
    } else arrData.push(productItem);
    localStorage.setItem("productsList", JSON.stringify(arrData));
    setCart(arrData);
  };

  const handleToCheckout = (productsDetail) => {
    handleProducts(productsDetail);
    history.push("/payment");
  };

  const handleAddToCart = (productsDetail) => {
    handleProducts(productsDetail);
    toastSuccess("Th??m gi??? h??ng th??nh c??ng!");
  };

  const renderImg = () => {
    return (
      <Slider {...settings} className="slider">
        {productsDetail.image &&
          productsDetail.image.map((imgItem, imgIndex) => {
            return (
              <div key={imgIndex} className="slider__img">
                <img
                  className={
                    indexImg === imgIndex
                      ? "slider__img__item active"
                      : "slider__img__item"
                  }
                  src={imgItem.src}
                  alt="pictures"
                  onClick={() => handleSlideImg(imgIndex)}
                ></img>
              </div>
            );
          })}
      </Slider>
    );
  };

  return (
    <Container>
      {productsDetail.id && (
        <Row className="mt-4">
          <>
            <Col xs={12} md={6} className="d-flex">
              {renderImg()}
              <img
                src={productsDetail?.image[indexImg]?.src}
                alt="img"
                className="img"
              />
            </Col>
            <Col xs={12} md={6} className="detail my-3">
              <h3 className="detail__name">{productsDetail.name}</h3>
              <div className="wrapper">
                <h6 className="detail__oldPrice me-2">
                  {productsDetail.oldPrice &&
                    formatCurrency(productsDetail.oldPrice)}
                </h6>
                <h6 className="detail__currentPrice ms-2">
                  {formatCurrency(productsDetail.currentPrice)}
                </h6>
              </div>
              <p className="detail__trademark">
                Nh?? cung c???p: {productsDetail.trademark}
              </p>
              <h3 className="detail__sale">KHUY???N M??I T???NG K??M</h3>
              <div className="wrapper">
                <FcCheckmark className="detail__icon" />
                <h6 className="detail__offer">
                  1 T??I H???P FOOTBALL BLACK TXI-SPORT
                </h6>
              </div>
              <div className="wrapper">
                <FcCheckmark className="detail__icon" />
                <h6 className="detail__offer">1 T???T D???T KIM TXI-SPORT</h6>
              </div>
              <h3 className="detail__commit">
                CAM K???T H??NG CH??NH H??NG 100%. HO??N TI???N G???P 3 L???N N???U KH??NG PH???I
                H??NG CH??NH H??NG!
              </h3>
              <div className="wrapper">
                <Button
                  className="btn btn-primary detail__button"
                  onClick={() => handleToCheckout(productsDetail)}
                >
                  MUA NGAY
                </Button>
                <Button
                  className="btn btn-danger detail__button"
                  onClick={() => handleAddToCart(productsDetail)}
                >
                  TH??M V??O GI??? H??NG
                </Button>
              </div>
              <div className="wrapper">
                <img
                  src="https://theme.hstatic.net/1000061481/1000738531/14/icon_promotion1.png?v=187"
                  alt=""
                  className="description_img"
                />
                <span>0935.633.219</span>
                <span>-</span>
                <span className="description__phone">
                  ?????t h??ng qua s??? ??i???n tho???i (7h30-21h30)
                </span>
              </div>
              <div className="wrapper">
                <img
                  src="https://theme.hstatic.net/1000061481/1000738531/14/icon_promotion2.png?v=187"
                  alt=""
                  className="description_img"
                />
                <span>GI???M GI?? 10% ph??? ki???n ch??nh h??ng</span>
              </div>
              <div className="wrapper">
                <img
                  src="https://theme.hstatic.net/1000061481/1000738531/14/icon_promotion5.png?v=187"
                  alt=""
                  className="description_img"
                />
                <span>
                  Thanh to??n ti???n l???i b???ng ti???n m???t, chuy???n kho???n, th??? t??n d???ng,
                  v?? Momo...
                </span>
              </div>
              <div className="wrapper">
                <img
                  src="https://theme.hstatic.net/1000061481/1000738531/14/icon_promotion4.png?v=187"
                  alt=""
                  className="description_img"
                />
                <span>
                  Free ship to??n qu???c khi thanh to??n chuy???n kho???n v???i ????n h??ng
                  t??? 1.000.000 VN??
                </span>
              </div>
            </Col>
          </>
        </Row>
      )}
    </Container>
  );
}
const mapStateToProps = (state) => {
  const {productsDetail} = state.productsDetailReducer;
  const {cart} = state.cartReducer;
  return {
    productsDetail,
    cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsDetail: (params) => dispatch(getProductsDetail(params)),
    setCart: (params) => dispatch(setCart(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail);
