import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { RemoveFromCart } from "../components/RemoveFromCart";

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

  return (
    <div>
      <h1>Cart</h1>
      {context.cart.map((product, i) => (
        <div className="row align-items-center p-3 mb-3 border-bottom" key={i}>
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
        </div>
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
