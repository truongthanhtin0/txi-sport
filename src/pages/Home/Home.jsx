import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {BiChevronRight} from "react-icons/bi";
import {connect} from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {formatCurrency} from "../../util/formatCurrency";
import history from "../../util/history";
import {getHome, setCollection} from "./../../redux/actions/home_action";
import "./style.css";

function Home({getHome, setCollection, homeData}) {
  useEffect(() => {
    getHome();
  }, []);

  const categoryList = homeData && homeData.categories;
  const productsList = homeData && homeData.products;
  const positionList = homeData && homeData.positions;

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

  const handleChangeRoute = ({category, isSale, trademark, playerPosition}) => {
    setCollection({category, isSale, trademark, playerPosition});
    history.push("/products");
  };

  const handleChangeRouteDetail = ({id}) => {
    setCollection({id});
    history.push(`/products/${id}`);
  };

  return (
    <Container>
      <Row className="hot my-4">
        <h3 className="home__title">SẢN PHẨM HOT</h3>
        <Col>
          <Slider {...settings} className="hot__slider">
            {productsList &&
              productsList
                .filter((product) => product.status)
                .map((hot) => (
                  <div
                    key={hot.id}
                    className="p-3 slick__item"
                    onClick={() => handleChangeRouteDetail({id: hot.id})}
                  >
                    <img
                      className="slick__img"
                      src={hot.image[0].src}
                      alt="pictures"
                    ></img>
                    <p className="hot__name">{hot.name}</p>
                    <div className="d-flex align-items-center justify-content-center">
                      {hot.oldPrice && (
                        <p className="hot__oldPrice me-2">
                          {formatCurrency(hot.oldPrice)}
                        </p>
                      )}
                      <p className="hot__currentPrice ms-2">
                        {formatCurrency(hot.currentPrice)}
                      </p>
                    </div>
                  </div>
                ))}
          </Slider>
        </Col>
      </Row>
      <Row className="search mb-4">
        <h3 className="home__title">BẠN ĐANG TÌM KIẾM</h3>
        <ul className="d-flex list-unstyled">
          {categoryList &&
            categoryList
              .filter((category) => category.id <= 4)
              .map((category) => (
                <li
                  key={category.id}
                  className="search__item col-3 p-2"
                  onClick={() =>
                    handleChangeRoute({
                      category: category.id,
                      isSale: category.isSale,
                    })
                  }
                >
                  <img src={category.image} alt="" className="search__img1" />
                  <h6 className="search__status1">{`${category.name} ${
                    category.status ? `(${category.status})` : ""
                  }`}</h6>
                </li>
              ))}
        </ul>
        <ul className="d-flex list-unstyled">
          {categoryList &&
            categoryList
              .filter((category) => category.id > 4 && category.id <= 7)
              .map((category) => (
                <li
                  key={category.id}
                  className="search__item col-4 p-2"
                  onClick={() => handleChangeRoute({category: category.id})}
                >
                  <div className="search__hover">
                    <img src={category.image} alt="" className="search__img2" />
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <h6 className="search__status2">{`${category.name} ${
                      category.status ? `(${category.status})` : ""
                    }`}</h6>
                    <BiChevronRight className="search__icon" />
                  </div>
                </li>
              ))}
        </ul>
      </Row>
      <Row className="trademark mb-4">
        <h3 className="home__title">THƯƠNG HIỆU</h3>
        <ul className="d-flex list-unstyled flex-wrap">
          {categoryList &&
            categoryList
              .filter((category) => category.id >= 8)
              .map((trademark) => (
                <li
                  key={trademark.id}
                  className="search__item col-4 p-2"
                  onClick={() =>
                    handleChangeRoute({trademark: trademark.trademark})
                  }
                >
                  <div className="search__hover">
                    <img
                      src={trademark.image}
                      alt=""
                      className="search__img2"
                    />
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <h6 className="search__status2">{trademark.name}</h6>
                    <BiChevronRight className="search__icon" />
                  </div>
                </li>
              ))}
        </ul>
      </Row>
      <Row className="position mb-4">
        <h3 className="home__title">CHỌN GIÀY THEO VỊ TRÍ</h3>
        <ul className="d-flex list-unstyled">
          {positionList &&
            positionList.map((position) => (
              <li
                key={position.key}
                className="search__item col-4 p-2"
                onClick={() =>
                  handleChangeRoute({playerPosition: position.key})
                }
              >
                <img src={position.image} alt="" className="position__img" />
                <h6 className="search__status1">{position.name}</h6>
              </li>
            ))}
        </ul>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {homeData} = state.homeReducer;
  return {
    homeData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHome: (params) => dispatch(getHome(params)),
    setCollection: (params) => dispatch(setCollection(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
