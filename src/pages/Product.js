import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../contexts/StoreContext";
import { AddToCart } from "../components/AddToCart";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "react-bootstrap";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
  const context = useContext(StoreContext);
  const params = useParams();
  useEffect(() => {
    context.setCurrentProduct(
      context.data.find((x) => String(x.id) === String(params.id))
    );
  }, [context.data, params]);
  return (
    <>
      <AnimatePresence exitBeforeEnter={true}>
        {context.currentProduct && (
          <div key="productPagePresence" className="row">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="col-md-6"
            >
              <img
                alt=""
                className="img-fluid"
                style={{ maxHeight: "500px" }}
                src={context.currentProduct.image}
              />
            </motion.div>
            <div className="col-md-6">
              <h1>{context.currentProduct.title}</h1>
              <p>{context.currentProduct.description}</p>
              <p>
                <strong>Price: </strong>${context.currentProduct.price}
              </p>
              <p className="text-capitalize">
                <strong>Category: </strong>
                {context.currentProduct.category}
              </p>
              <AddToCart product={context.currentProduct} />
            </div>
          </div>
        )}
        <RelatedProducts />
      </AnimatePresence>
    </>
  );
}
