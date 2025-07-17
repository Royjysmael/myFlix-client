import React, { useState } from "react";
import royflixLogo from "url:../../images/royflix-logo.png";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user && data.token) {
          onLoggedIn(data.user, data.token);
          navigate("/movies");
        } else {
          alert("Login failed");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
        console.error(e);
      });
  };

  return (
    <div className="login-screen">
      <div className="text-center mb-4">
        <img
          src={royflixLogo}
          alt="RoyFlix Logo"
          style={{
            width: "80%",
            maxWidth: "300px",
            filter: "drop-shadow(0 0 6px #e50914)",
          }}
          onError={(e) => {
            console.error("Image failed to load:", e);
            e.target.style.display = "none";
          }}
        />
      </div>

      <Card
        className="login-card p-4 mx-auto mt-5"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Log In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>

          <Button type="submit" className="btn-custom mt-3 w-100">
            Login
          </Button>
        </Form>

        <div className="text-center mt-3">
          <span>Don’t have an account? </span>
          <Link to="/signup" style={{ color: "#e50914", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
};
