import { Routes, Route,Match } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from "./components/Navbar";
import Cart from "./pages/Cart";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  return (
     
    <Container className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/product/:id" element={<Product />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </Container>
  );
}
