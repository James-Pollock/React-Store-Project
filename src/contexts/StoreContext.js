import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [currentProduct,setCurrentProduct] = useState(null)
  const [cartTotal, setCartTotal] = useState([]);
  const URL = "https://fakestoreapi.com/products/";
  // const URL = "../products.json";
  const { json, isLoading } = useFetch(URL);

  useEffect(() => {
    isLoading ? setData(json) : false
  }, [json,isLoading]);


  const handleSearch = (e) => {
    e.preventDefault();
    setData(
      json.filter((x) =>
        x.title.toLowerCase().match(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (cart.length > 0) {
      setCartTotal(
        cart
          .map((x) => x.quantity * x.price)
          .reduce((a, c) => a + c)
          .toFixed(2)
      );
    }
  }, [cart]);

  const value = {
    isLoading:isLoading,
    data: data,
    cart: cart,
    setCart: setCart,
    handleSearch,
    cartTotal: cartTotal,
    currentProduct: currentProduct,
    setCurrentProduct:setCurrentProduct
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
