import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const NavbarView = ({ onLoggedOut, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLoggedOut();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand href="#">RoyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
          </Nav>
          {user && (
            <Button className="btn-custom" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavbarView.propTypes = {
  onLoggedOut: PropTypes.func.isRequired,
  user: PropTypes.object,
};
