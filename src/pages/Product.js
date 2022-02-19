import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../contexts/StoreContext";
import { AddToCart } from "../components/AddToCart";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";

export default function Product() {
  const context = useContext(StoreContext);
  const [product, setProduct] = useState();
  const params = useParams();

  useEffect(() => {
    setProduct(context.json[params.id - 1]);
  }, [context.json, params.id]);

  return (
    <Container>
      {product !== undefined && (
        <div className="row">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-md-6"
          >
            <img
              alt=""
              className="img-fluid"
              style={{ maxHeight: "500px" }}
              src={product.image}
            />
          </motion.div>
          <div className="col-md-6">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>
              <strong>Rating: </strong>
              {product.rating.rate}/5
            </p>
            <p>
              <strong>Price: </strong>${product.price}
            </p>
            <AddToCart product={product} />
          </div>
        </div>
      )}
    </Container>
  );
}
