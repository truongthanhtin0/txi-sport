import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FcCheckmark} from "react-icons/fc";
import {connect} from "react-redux";
import Slider from "react-slick";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {setCart} from "../../redux/actions/cart_action";
import {getProductsDetail} from "./../../redux/actions/productsDetail_action";
import history from "./../../util/history";
import "./style.css";

function ProductsDetail({getProductsDetail, productsDetail, match, setCart}) {
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

  const notifyCart = () =>
    toast.success("Thêm vào giỏ hàng thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [indexImg, setIndexImg] = useState(0);

  const handleSlideImg = (imgIndex) => {
    setIndexImg(imgIndex);
  };

  const handleToCheckout = (productsDetail) => {
    let arrData = [];
    const productItem = {...productsDetail, quantity: 1};
    const cartData = JSON.parse(localStorage.getItem("productsList"));
    if (cartData?.length) {
      const findItem = cartData.find((item) => item.id === productsDetail.id);
      if (findItem) {
        const indexItem = cartData.findIndex(
          (item) => item.id === productsDetail.id
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
    history.push("/payment");
  };

  const handleAddToCart = (productsDetail) => {
    let arrData = [];
    const productItem = {...productsDetail, quantity: 1};
    const cartData = JSON.parse(localStorage.getItem("productsList"));
    if (cartData?.length) {
      const findItem = cartData.find((item) => item.id === productsDetail.id);
      if (findItem) {
        const indexItem = cartData.findIndex(
          (item) => item.id === productsDetail.id
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
              <ToastContainer className="mt-3 --toastify-color-info" />
              <h3 className="detail__name">{productsDetail.name}</h3>
              <div className="wrapper">
                <h6 className="detail__oldPrice me-2">
                  {productsDetail.oldPrice &&
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(productsDetail.oldPrice)}
                </h6>
                <h6 className="detail__currentPrice ms-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(productsDetail.currentPrice)}
                </h6>
              </div>
              <p className="detail__trademark">
                Nhà cung cấp: {productsDetail.trademark}
              </p>
              <h3 className="detail__sale">KHUYẾN MÃI TẶNG KÈM</h3>
              <div className="wrapper">
                <FcCheckmark className="detail__icon" />
                <h6 className="detail__offer">
                  1 TÚI HỘP FOOTBALL BLACK TXI-SPORT
                </h6>
              </div>
              <div className="wrapper">
                <FcCheckmark className="detail__icon" />
                <h6 className="detail__offer">1 TẤT DỆT KIM TXI-SPORT</h6>
              </div>
              <h3 className="detail__commit">
                CAM KẾT HÀNG CHÍNH HÃNG 100%. HOÀN TIỀN GẤP 3 LẦN NẾU KHÔNG PHẢI
                HÀNG CHÍNH HÃNG!
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
                  onClick={() => {
                    handleAddToCart(productsDetail);
                    notifyCart();
                  }}
                >
                  THÊM VÀO GIỎ HÀNG
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
                  Đặt hàng qua số điện thoại (7h30-21h30)
                </span>
              </div>
              <div className="wrapper">
                <img
                  src="https://theme.hstatic.net/1000061481/1000738531/14/icon_promotion2.png?v=187"
                  alt=""
                  className="description_img"
                />
                <span>GIẢM GIÁ 10% phụ kiện chính hãng</span>
              </div>
              <div className="wrapper">
                <img
                  src="https://theme.hstatic.net/1000061481/1000738531/14/icon_promotion5.png?v=187"
                  alt=""
                  className="description_img"
                />
                <span>
                  Thanh toán tiện lợi bằng tiền mặt, chuyển khoản, thẻ tín dụng,
                  ví Momo...
                </span>
              </div>
              <div className="wrapper">
                <img
                  src="https://theme.hstatic.net/1000061481/1000738531/14/icon_promotion4.png?v=187"
                  alt=""
                  className="description_img"
                />
                <span>
                  Free ship toàn quốc khi thanh toán chuyển khoản với đơn hàng
                  từ 1.000.000 VNĐ
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
