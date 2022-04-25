import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { Image, Carousel, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { motion } from "framer-motion";

const variants = {
  initial: {
        y: 0,
      opacity: 0,
  },
  animate: {
      y: 50,
      opacity:1
  },
};

export default function Hero() {
  const context = useContext(StoreContext);
  const [images, setImages] = useState([]);
  useEffect(() => {
    setImages(context.data.map((x) => x));
  }, [context.data]);
  return (
    <div className="hero text-center">
      <Carousel variant="dark">
        {images !== [] &&
          images
            .filter((x, i) => x.id > images.length - 5)
            .map((x, i) => (
              <Carousel.Item key={i}>
                <LinkContainer to={`product/${x.id}`}>
                  <Nav.Link>
                    <motion.img
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      whileHover={{ scale: 1.2 }}
                      style={{ maxHeight: "400px" }}
                      src={x.image}
                      alt={x.title}
                    />
                    <Carousel.Caption className="shadow" style={{ background: "#ffffff88" }}>
                      <h3 className="h6">{x.title}</h3>
                      <p>${x.price}</p>
                    </Carousel.Caption>
                  </Nav.Link>
                </LinkContainer>
              </Carousel.Item>
            ))}
      </Carousel>
    </div>
  );
}
