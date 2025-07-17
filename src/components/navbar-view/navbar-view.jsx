import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import logo from "url:../../images/royflix-nav.png";

export const NavbarView = ({ onLoggedOut, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLoggedOut();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="RoyFlix Logo"
            width="350"
            height="600"
            style={{
              maxHeight: "150px",
              borderRadius: "100px",
              verticalAlign: "baseline",
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/movies">
                  All Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
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
