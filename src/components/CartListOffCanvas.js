import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { Image, ListGroup, Row, Col, Badge } from "react-bootstrap";
import ManageCartButton from "./ManageCartButton";

const CartListOffCanvas = () => {
  const context = useContext(StoreContext);
  function truncate(str) {
    return str.length > 10 ? str.substring(0, 25) + "..." : str;
  }

  

  return (
    <>
      <ListGroup as="ul" variant="flush">
        {context.cart.map((x, i) => (
          <ListGroup.Item as="li" key={i}>
            <Row variant="dark">
              <Col sm="3" style={{ overflow: "hidden" }}>
                <Image alt="" style={{ height: "75px" }} src={x.image} />
              </Col>
              <Col sm="9">
                <Row>
                  <Col sm="10">
                    <span
                      style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {truncate(x.title)}
                    </span>
                    <br />
                    <span>${x.price * x.quantity}</span>
                  </Col>
                  <Col sm="2">
                    <Badge bg="primary" pill>
                      {x.quantity}
                    </Badge>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2 align="center" className="h5">
        {context.cart.length === 0 && "Cart Empty!"}
        {context.cart.length > 0 &&
          `Total: $${context.cartTotal}`
            }

      </h2>
        {context.cart.length > 0 && <ManageCartButton />}
    </>
  );
};

export default CartListOffCanvas;
