import React, {useState} from "react";
import {Button, Container, Modal, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {setCart} from "../../redux/actions/cart_action";
import {formatCurrency} from "../../util/formatCurrency";
import "./style.css";

function Cart({setCart}) {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("productsList"))
  );

  const [value, setValue] = useState({
    id: null,
    image: null,
    name: null,
    currentPrice: null,
  });

  const [show, setShow] = useState({
    isActive: false,
    id: null,
    image: null,
    name: null,
    currentPrice: null,
  });

  const handleClose = () => setShow({isActive: false, id: null});
  const handleShow = (id, image, name, currentPrice) =>
    setShow({isActive: true, id, image, name, currentPrice});

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
      handleShow(value.id, value.image, value.name, value.currentPrice);
      handleUpdate(1);
    } else if (quantity > 0 && quantity < 10) {
      handleUpdate(Number(quantity));
    } else if (quantity >= 10) {
      handleUpdate(9);
    }
  };

  return (
    <Container>
      <Row className="my-5">
        <table className="table table-bordered table__border">
          <thead>
            <tr>
              <th colSpan="5" className="text-start">
                <h5 className="table__title">GI??? H??NG</h5>
              </th>
            </tr>
          </thead>
          {cartData?.length ? (
            <>
              <thead>
                <tr>
                  <th>H??nh ???nh</th>
                  <th>T??n s???n ph???m</th>
                  <th>S??? l?????ng</th>
                  <th>Gi?? ti???n</th>
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
                    <td>{formatCurrency(item.currentPrice)}</td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          handleShow(
                            item.id,
                            item.image[0].src,
                            item.name,
                            item.currentPrice
                          );
                        }}
                      >
                        X??a
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
                  <h5>Gi??? h??ng tr???ng!</h5>
                </th>
              </tr>
            </thead>
          )}
        </table>
        <Link to="/payment" className="button__checkout">
          <Button className="btn btn-primary">Thanh To??n</Button>
        </Link>
      </Row>
      <Modal show={show.isActive} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal__title">
            B???n mu???n x??a s???n ph???m n??y?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <img
              src={show.image}
              alt=""
              className="cart__img me-4 img__border"
            />
            <p className="modal__name">{show.name}</p>
            <p className="modal__price">{formatCurrency(show.currentPrice)}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tho??t
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDeleteItem(show.id);
            }}
          >
            X??a
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
