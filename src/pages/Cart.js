import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { RemoveFromCart } from "../components/RemoveFromCart";
import { motion } from "framer-motion";
export default function Cart() {
  const context = useContext(StoreContext);
  const [cartTotal, setCartTotal] = useState();

  useEffect(() => {
    if (context.cart.length > 0) {
      setCartTotal(
        context.cart
          .map((x) => x.price * x.quantity)
          .reduce((x, i) => x + i)
          .toFixed(2)
      );
    } else {
      setCartTotal(undefined);
    }
  }, [context.cart]);

  const setQuantity = (currentProduct, amount) => {
    context.setCart((cart) =>
      cart.map((item) =>
        item.id === currentProduct.id
          ? {
              ...item,
              quantity:
                item.quantity > -1
                  ? Math.abs(item.quantity + amount)
                  : Math.abs(item.quantity),
            }
          : item
      )
    );
  };
 
  const variants = {
    initial: {
      y: 100,
      opacity:0
    },
    animate:{
      opacity: 1,
      y: 0,
      transition: {
        when:'afterChildren'
      }
    }
}

  const cartVariant = {
    initial: {
      opacity: 0,
    },
    animate: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
  };
  return (
    <div>
      <h1>Cart</h1>
      {context.cart.map((product, i) => (
        <motion.div
          key={i}
          variants={variants}
          animate="animate"
          initial="initial"
        >
          <motion.div
            className="row align-items-center p-3 mb-3 border-bottom"
            variants={cartVariant}
            key={i}
          >
            <div className="col-md-2">
              <img
                alt=""
                style={{ height: "50px" }}
                className="img-fluid"
                src={product.image}
              />
            </div>
            <div className="col">
              <strong>Item: </strong>
              {product.title}
            </div>
            <div className="col-md-2">
              <strong>Price: </strong>${product.price.toFixed(2)}
            </div>
            <div className="col-md-2 d-flex align-items-center justify-content-center">
              <div className="m-4">
                <strong>Quantity: </strong>
                {product.quantity}
              </div>
              <div>
                <button onClick={(e) => setQuantity(product, -1)}>-</button>
                <button onClick={(e) => setQuantity(product, 1)}>+</button>
              </div>
            </div>
            <div className="col-md-2">
              <strong>total: </strong>$
              {(product.price * product.quantity).toFixed(2)}
            </div>
            <div className="col-md-1">
              <RemoveFromCart product={product.id} />
            </div>
          </motion.div>
        </motion.div>
      ))}
      {cartTotal === undefined && <div>No Items in Cart</div>}
      {cartTotal !== undefined && (
        <div className="text-right">
          <p>
            <strong>Cart Total: </strong>${cartTotal}
          </p>
        </div>
      )}
    </div>
  );
}
