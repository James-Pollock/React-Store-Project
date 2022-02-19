import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../contexts/StoreContext";
import { AddToCart } from "../components/AddToCart";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
  const context = useContext(StoreContext);
  const params = useParams();
  useEffect(() => {
    if (!context.isLoading) {
      context.setCurrentProduct(context.data[params.id - 1]);
    }
  }, [!context.isLoading, params]);

  return (
    <Container>
      {context.isLoading && "Loading..."}
      {!context.isLoading && context.data.map((x, i) => {
        if (String(x.id) === params.id) {
          return (
            <div key={i} className="row">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-md-6"
              >
              <img
                alt=""
                className="img-fluid"
                style={{ maxHeight: "500px" }}
                src={x.image}
                />
            </motion.div>
            <div className="col-md-6">
              <h1>{x.title}</h1>
              <p>{x.description}</p>
              <p>
                <strong>Rating: </strong>
                {x.rating.rate}/5
              </p>
              <p>
                <strong>Price: </strong>${x.price}
              </p>
              <p className="text-capitalize">
                <strong>Category: </strong>
                {x.category}
              </p>
              <AddToCart product={x} />
            </div>
          </div>
              )
              }
            })}

      <RelatedProducts />
    </Container>
  );
}
