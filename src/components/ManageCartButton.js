import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ManageCartButton = () => {
  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <Navbar.Toggle>
        <LinkContainer to="/cart">
          <Nav.Link className="btn btn-dark text-white mt-4">
            Manage Cart
          </Nav.Link>
        </LinkContainer>
      </Navbar.Toggle>
    </Nav>
  );
};
export default ManageCartButton;
