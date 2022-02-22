import React,{useState, useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { Button, ToastBody,ToastHeader, Toast } from "react-bootstrap";

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
    <div>
      <Toast onClose={() => setShow(false)} show={show} delay={1000} autohide>
        <Toast.Body>Item Added!</Toast.Body>
      </Toast>
      <Button variant="primary" onClick={(e)=>handleAddToCartClick(e)}>
        Add
      </Button>
    </div>
  );
};
