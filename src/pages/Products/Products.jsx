import queryString from "query-string";
import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {setCollection} from "../../redux/actions/home_action";
import {getProducts} from "../../redux/actions/products_action";
import Category from "./Category";
import ProductList from "./ProductList";

function Products({getProducts, collection, setCollection, productsData}) {
  const categoryList = productsData && productsData.categories;
  // const {productsList, count} = productsData && productsData.products;
  const products = productsData && productsData.products;
  const productsList = products && products.productsList;
  const count = products && products.count;

  const [filters, setFilter] = useState({
    _page: 1,
    _limit: 6,
    ...(collection?.category === 4 && {isSale: collection.isSale}),
    ...(collection?.category !== 4 && {categoryId: collection.category}),
    ...(collection?.trademark && {trademark: collection.trademark}),
    ...(collection?.playerPosition && {
      playerPosition: collection.playerPosition,
    }),
  });

  useEffect(() => {
    getProducts(queryString.stringify(filters));

    return () => {
      setCollection({});
    };
  }, [filters]);

  const handleChangePagination = (newPage) => {
    setFilter({
      ...filters,
      _page: newPage,
    });
  };

  const handleChangeCategory = (
    categoryID,
    categoryTrademark,
    categorySale
  ) => {
    if (categoryID === 4) {
      delete filters.categoryId;
      delete filters.trademark;
      delete filters.playerPosition;
      setFilter({
        ...filters,
        _page: 1,
        isSale: categorySale,
      });
    } else if (categoryID <= 7) {
      delete filters.trademark;
      delete filters.playerPosition;
      delete filters.isSale;
      // delete filters.categoryID;
      setFilter({
        ...filters,
        _page: 1,
        categoryId: categoryID,
      });
    } else {
      // delete filters.trademark;
      delete filters.categoryId;
      delete filters.playerPosition;
      delete filters.isSale;
      setFilter({
        ...filters,
        _page: 1,
        trademark: categoryTrademark,
      });
    }
  };

  return (
    <Container>
      <Row className="my-3 py-3">
        <Col className="col-3 ps-4">
          <Category
            categoryList={categoryList}
            handleChangeCategory={handleChangeCategory}
          />
        </Col>
        <Col>
          <ProductList
            products={productsList}
            count={count}
            filters={filters}
            handleChangePagination={handleChangePagination}
          />
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {productsData} = state.productsReducer;
  const {collection} = state.homeReducer;
  return {
    collection,
    productsData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (params) => dispatch(getProducts(params)),
    setCollection: (params) => dispatch(setCollection(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
