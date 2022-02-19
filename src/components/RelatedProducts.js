import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../contexts/StoreContext";
import { Row, Card, Col } from "react-bootstrap";
import { motion } from "framer-motion";

export default function RelatedProducts() {
  const context = useContext(StoreContext);
  
  return (
    <>
      <h2 align="left" className="mt-5">
        Related Items
      </h2>
      <Row xs={1} sm={3} md={4} className="g-5">
        {context.currentProduct &&
          context.data.filter((x) => x.category === context.currentProduct.category && x.id !== context.currentProduct.id)
            .map((x, i) => (
              <Col key={x.id}>
                <Link to={`/product/${x.id}`}>
                  <Card className="border-0">
                    <Card.Img
                      variant="top"
                      className="w-50 h-50 m-auto"
                      src={x.image}
                    />
                    <Card.Body>
                      <Card.Text>{x.title}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
      </Row>
    </>
  );
}
