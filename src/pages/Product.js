import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../contexts/StoreContext";
import { AddToCart } from "../components/AddToCart";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "react-bootstrap";
import RelatedProducts from "../components/RelatedProducts";

const variants = {
  initial: {
    y: 100,
    opacity:0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: .5,
      delayChildren:.5
    }
  }
}

const childVariants = {
  initial: {
    y: 100,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  }
}

export default function Product() {
  const context = useContext(StoreContext);
  const params = useParams();
  useEffect(() => {
    context.setCurrentProduct(
      context.data.find((x) => String(x.id) === String(params.id))
    );
  }, [context.data,params]);
  return (
    <>
      {context.isLoading && "...Loading"}
        {context.currentProduct && (
          <div className="row">
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            // transition={{type:'spring',duration:1}}
              className="col-md-6"
            >
              <img
              alt={context.currentProduct.title}
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
      <RelatedProducts childVariants={childVariants}/>
    </>
  );
}
