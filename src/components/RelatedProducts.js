import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { Row, Card, Col, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { motion } from "framer-motion";

export default function RelatedProducts() {
  const context = useContext(StoreContext);


  return (
    <>
      <h2 align="left" className="mt-5">
        Related Items
      </h2>
      <Row xs={1} sm={3} md={4} className="g-5">
        {context.data.map((x, i) => (
          <LinkContainer key={i} to={`/product/${x.id}`}>
            <Nav.Link>
              <Col>
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
              </Col>
            </Nav.Link>
          </LinkContainer>
        ))}
      </Row>
    </>
  );
}
