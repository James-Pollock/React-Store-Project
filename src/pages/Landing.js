import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { StoreContext } from "../contexts/StoreContext";
import { AddToCart } from "../components/AddToCart";
import { motion, AnimatePresence } from "framer-motion";

export default function Landing() {
  const context = useContext(StoreContext);
  const variants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    products: {
      opacity: 1,
      y: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const item = {
    products: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
    initial: {
      opacity: 0,
    },
  };
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  return (
    <>
      <div className="container">
        <h1>Web Store</h1>
        <div className="row align-items-end">
          <AnimatePresence>
            {context.data.map((product, i) => (
              <motion.div
                variants={variants}
                initial="initial"
                animate="products"
                className="col-md-3 col-sm-6 p-3"
                layout
                transition={spring}
                exit="initial"
                key={i}
              >
                <motion.img
                  variants={item}
                  custom={i}
                  alt=""
                  style={{ maxHeight: "150px" }}
                  className="img-fluid"
                  src={product.image}
                />
                <p>{product.title}</p>
                <p>${product.price.toFixed(2)}</p>
                <p>
                  <Link to={`/product/${product.id}`}>More</Link>
                </p>
                <AddToCart product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Outlet />
    </>
  );
}
