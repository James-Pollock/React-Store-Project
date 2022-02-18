import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";

export const AddToCart = ({ product }) => {
  const context = useContext(StoreContext);

  const handleAddToCartClick = (e) => {
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
    <button
      className="btn btn-primary"
      onClick={(e) => handleAddToCartClick(e)}
    >
      Add
    </button>
  );
};
