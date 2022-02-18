import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from "./components/Navbar";
import Cart from "./pages/Cart";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Container fluid className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Container>
    </Router>
  );
}
