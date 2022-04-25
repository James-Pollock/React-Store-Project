import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { ReactComponent as CartIcon } from "@material-design-icons/svg/filled/shopping_cart.svg";
import { motion, useAnimation } from "framer-motion";
import CartListOffCanvas from "./CartListOffCanvas";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


export default function Navigation() {
  const context = useContext(StoreContext);
  const [totalItemsInCart, setTotalItemsInCart] = useState();
  const controls = useAnimation();

  useEffect(() => {
    if (context.cart.length > 0) {
      setTotalItemsInCart(
        context.cart.map((x) => x.quantity).reduce((a, b) => a + b)
      );
    } else {
      setTotalItemsInCart(0);
    }
    controls.start({
      scale: [1.3, 1],
      transition: {
        type: "spring",
        duration: 0.3,
      },
    });
  }, [controls, context.cart]);

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand={false}>
      <Container className="d-flex justify-content-bewteen">
        <LinkContainer to="/">
          <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle className="border-0" aria-controls="offcanvasNavbar">
          <motion.div className="p-2 text-light" animate={controls}>
            <CartIcon style={{ fill: "currentColor", color: "white" }} />
            {totalItemsInCart}
          </motion.div>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Items in your cart
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CartListOffCanvas />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
