import React, { useState, useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  ToastContainer,
  ToastBody,
  ToastHeader,
  Toast,
} from "react-bootstrap";

const MotionToast = motion(Toast);

const variant = {
  animate: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, duration: 1 },
  },
  initial: { y: 100, scale: 0, opacity: 0 },
  exit: { y: 100, scale: 0, opacity: 0 },
};
export const AddToCart = ({ product }) => {
  const [show, setShow] = useState(false);
  const context = useContext(StoreContext);

  const handleAddToCartClick = (e) => {
    setShow(true);
    const addItemToCart = (cartItems, cartItemToAdd) => {
      const existingCartItem = cartItems.find(
        (item) => item.id === cartItemToAdd.id
      );
      if (existingCartItem) {
        return cartItems.map((item) =>
          item.id === cartItemToAdd.id
            ? { ...cartItemToAdd, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
    };
    context.setCart(addItemToCart(context.cart, product));
  };

  return (
    <>
      <div className="position-relative">
        <div
          className="position-absolute"
          style={{
            height: "200px",
            transform: "translate(-50%,-50%)",
            left: "50%",
            top: "0",
          }}
        >
          <AnimatePresence>
            {show && (
              <MotionToast
                variants={variant}
                animate="animate"
                initial="initial"
                exit="exit"
                onClose={() => setShow(false)}
                show={show}
                delay={1000}
                style={{ width: "100%" }}
                animation={false}
                autohide
              >
                <Toast.Body className="btn-success rounded">Item Added!</Toast.Body>
              </MotionToast>
            )}
          </AnimatePresence>
        </div>
      </div>
        <Button variant="primary" onClick={(e) => handleAddToCartClick(e)}>
          Add
        </Button>
    </>
  );
};
