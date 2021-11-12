import React, {useState} from "react";
import {Button, Container, Modal, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {setCart} from "../../redux/actions/cart_action";
import "./style.css";

function Cart({setCart}) {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("productsList"))
  );
  console.log("Log :  cartData", cartData);

  const [value, setValue] = useState({id: null, image: null, name: null});
  console.log("Log :  value", value);

  const [show, setShow] = useState({
    isActive: false,
    id: null,
    image: null,
    name: null,
  });

  const handleClose = () => setShow({isActive: false, id: null});
  const handleShow = (id, image, name) =>
    setShow({isActive: true, id, image, name});

  const handleDeleteItem = (productId) => {
    const newCartData = cartData.filter((item) => item.id !== productId);
    localStorage.setItem("productsList", JSON.stringify(newCartData));
    setCartData(newCartData);
    setCart(newCartData);
    handleClose();
  };

  const handleUpdateQuantity = (id, quantity) => {
    const handleUpdate = (quantityParams) => {
      const arrData = JSON.parse(JSON.stringify(cartData));
      const index = arrData.findIndex((item) => item.id === id);
      const item = arrData.find((item) => item.id === id);
      arrData.splice(index, 1, {
        ...item,
        quantity: quantityParams,
      });
      setCartData(arrData);
      quantityParams &&
        localStorage.setItem("productsList", JSON.stringify(arrData));
    };
    quantity = parseInt(quantity);
    if (isNaN(quantity)) handleUpdate("");
    else if (quantity <= 0) {
      handleShow(value.id, value.image, value.name);
      handleUpdate(1);
    } else if (quantity > 0 && quantity < 10) {
      handleUpdate(Number(quantity));
    } else if (quantity >= 10) {
      console.log("quantity không đc lớn hơn 10");
      handleUpdate(9);
      // handleShow();
    }
  };

  return (
    <Container>
      <Row className="my-5">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th colSpan="5" className="text-start">
                <h5>GIỎ HÀNG</h5>
              </th>
            </tr>
          </thead>
          {cartData?.length ? (
            <>
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th className="cart__name">Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => (
                  <tr key={item.id} className="tr__item">
                    <td>
                      <img
                        src={item.image[0].src}
                        alt=""
                        className="cart__img"
                      />
                    </td>
                    <td className="cart__name">{item.name}</td>
                    <td className="d-flex justify-content-center align-center-center quantity">
                      <input
                        value={item.quantity}
                        type="number"
                        onChange={(event) =>
                          handleUpdateQuantity(item.id, event.target.value)
                        }
                        onClick={() =>
                          setValue({
                            id: item.id,
                            image: item.image[0].src,
                            name: item.name,
                          })
                        }
                      />
                    </td>
                    <td>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.currentPrice)}
                    </td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          handleShow(item.id, item.image[0].src, item.name);
                        }}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <thead>
              <tr>
                <th colSpan="5" className="text-center">
                  <h5>Giỏ hàng trống!</h5>
                </th>
              </tr>
            </thead>
          )}
        </table>
        <Link to="/payment" className="button__checkout">
          <Button className="btn btn-primary">Thanh Toán</Button>
        </Link>
      </Row>
      <Modal show={show.isActive} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal__title">
            Bạn muốn xóa sản phẩm này?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <img src={show.image} alt="" className="cart__img me-4" />
            <p className="modal__name">{show.name}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDeleteItem(show.id);
            }}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

// export default Cart;
const mapStateToProps = (state) => {
  const {cart} = state.cartReducer;
  return {
    cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (params) => dispatch(setCart(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
