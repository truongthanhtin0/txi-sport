import React from "react";
import {Card, Container, Row} from "react-bootstrap";
import banner from "../../assets/image/banner.jpg";
import history from "./../../util/history";
import Pagination from "./Pagination";

function ProductList({products, count, filters, handleChangePagination}) {
  const productsLength = products && products.length;

  return (
    <Container fluid>
      <Row>
        <img src={banner} alt="banner" />
      </Row>
      <Row className="m-3">
        {products &&
          products.map((product) => (
            <Card
              className="my-2"
              key={product.id}
              style={{width: "18rem"}}
              onClick={() => {
                history.push(`/products/${product.id}`);
              }}
            >
              <Card.Img variant="top" src={product.image[0].src} />
              <Card.Body>
                <Card.Title>
                  <h6 className="name">{product.name}</h6>
                </Card.Title>
                <div className="price">
                  <h6 className="oldPrice me-2">
                    {product.oldPrice &&
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.oldPrice)}
                  </h6>
                  <h6 className="currentPrice ms-2">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.currentPrice)}
                  </h6>
                </div>
              </Card.Body>
            </Card>
          ))}
      </Row>
      <Row className="my-5">
        {productsLength > 0 ? (
          <Pagination
            count={count}
            filters={filters}
            handleChangePagination={handleChangePagination}
          />
        ) : (
          <p>Rất tiếc, không tìm thấy sản phẩm phù hợp!!</p>
        )}
      </Row>
    </Container>
  );
}

export default ProductList;
