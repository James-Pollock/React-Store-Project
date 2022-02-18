import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const ManageCartButton = () => {
  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <LinkContainer to="/cart">
        <Nav.Link align="right" className="btn btn-dark text-white mt-4">
          Manage Cart
        </Nav.Link>
      </LinkContainer>
    </Nav>
  );
};
export default ManageCartButton
