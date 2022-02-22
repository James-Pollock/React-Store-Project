import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const [clearSearch, setClearSearch] = useState();
  // const URL = "https://fakestoreapi.com/products/";
  const URL = "../products.json";
  const { json, isLoading } = useFetch(URL);

  //Makes copy of the API data
  useEffect(() => {
    !isLoading ? setData(json) : false;
  }, [json, isLoading]);

  //Search bar filter
  const handleSearch = (e) => {
    e.preventDefault();
    setData(
      json.filter((x) =>
        x.title.toLowerCase().match(e.target.value.toLowerCase())
      )
    );
  };

  // Category Select Filter
  useEffect(() => {
    setCategories(new Set(json.map((x) => x.category)));
  }, [json]);

  useEffect(() => {
    window.addEventListener("onChange", filterCategories);
    return window.removeEventListener("onChange", filterCategories);
  }, [json]);

  const filterCategories = (e) => {
    e.preventDefault();
    setData(
      json.filter((x) =>
        e.target.value === "All Products"
          ? x
          : x.category.match(new RegExp(`^${e.target.value}`))
      )
    );
  };

  //Price Sort
  useEffect(() => {
    window.addEventListener("onChange", sortPrice);
    return window.removeEventListener("onChange", sortPrice);
  }, [json]);

  const sortPrice = (e) => {
    e.preventDefault();
    if (e.target.value === "high-to-low") {
      return setData(
        data
          .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
          .map((x) => x)
      );
    } else if (e.target.value === "low-to-high") {
      return setData(
        data
          .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
          .map((x) => x)
      );
    } else if (e.target.value === "a-z") {
      return setData(
        data.sort((a, b) => a.title.localeCompare(b.title)).map((x) => x)
      );
    } else if (e.target.value === "rating") {
      return setData(
        data
          .sort((a, b) => parseFloat(a.rating.rate) - parseFloat(b.rating.rate))
          .map((x) => x)
      );
    }
    console.log(data[0].rating.rate);
  };

  //Clears search filter on homepage exit
  useEffect(() => {
    window.location.pathname !== "/" ? setData(json) : false;
  }, [window.location.pathname === "/"]);

  //Gets the total of items in cart
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
    isLoading: isLoading,
    data: data,
    cart: cart,
    setCart: setCart,
    handleSearch,
    cartTotal: cartTotal,
    currentProduct: currentProduct,
    setCurrentProduct: setCurrentProduct,
    categories: categories,
    filterCategories: filterCategories,
    sortPrice: sortPrice,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
