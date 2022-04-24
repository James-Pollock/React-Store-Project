import { useContext } from "react";
import { Link } from "react-router-dom";
import { Form, FormControl, FloatingLabel, Row, Col } from "react-bootstrap";
import { StoreContext } from "../contexts/StoreContext";
import { AddToCart } from "../components/AddToCart";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";

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
      {context.isLoading && "Loading..."}
      <div className="container">
        <h1 className="display-1">React Framer Store</h1>
        <Hero />
        <Form className="my-5">
        <Row>
        <Col sm={12}>
          <Form.Group>
          <FormControl
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={context.handleSearch}
          className="form-control mb-4 me-2 mr-sm-2"
          />
          </Form.Group>
          </Col>
            <Col>
              <FloatingLabel controlId="floatingSelect" label="Category Filter">
                <Form.Select
                  onChange={(e) => context.filterCategories(e)}
                  style={{ textTransform: "capitalize" }}
                  size="sm"
                >
                  <option disabled>Category</option>
                  <option>All Products</option>
                  {[...context.categories].map((category, i) => (
                    <option value={category} key={i}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingPrice" label="Price">
                <Form.Select
                  onChange={(e) => context.sortPrice(e)}
                  style={{ textTransform: "capitalize" }}
                  size="sm"
                >
                  <option disabled>Price</option>
                  <option value="unsorted">Unsorted</option>
                  <option value="high-to-low">High to Low</option>
                  <option value="low-to-high">Low to High</option>
                  <option value="a-z">A-Z</option>
                  <option value="rating">rating</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Form>
        <div className="row align-items-end">
          <AnimatePresence>
            {context.data.map((product, i) => (
              <motion.div
                variants={variants}
                initial="initial"
                animate="products"
                className="col-md-3 col-6 mb-4 p-3"
                layout
                transition={spring}
                exit="initial"
                key={i}
              >
                <Link title={product.title} to={`/product/${product.id}` }>
                <motion.img
                  variants={item}
                  custom={i}
                  alt=""
                  style={{ maxHeight: "150px" }}
                  className="img-fluid mb-3"
                  src={product.image}
                  />
                  </Link>
                <p className="text-truncate">
                  <strong>{product.title}</strong>
                </p>
                <p>
                  <strong>Price:</strong> ${product.price.toFixed(2)}
                </p>
                <p>
                  <strong>Rating:</strong> {product.rating.rate.toFixed(2)}
                </p>
                <p>
                  <Link to={`/product/${product.id}`}>More</Link>
                </p>
                <AddToCart product={product} />
                </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
