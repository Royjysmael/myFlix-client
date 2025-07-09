import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
        ? new Date(birthday).toISOString().split("T")[0]
        : undefined,
    };

    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          console.log("Full response object:", response);
          return response.text().then((text) => {
            try {
              const data = JSON.parse(text);
              console.error("Signup error:", data);
              const errorMsg =
                data?.errors?.[0]?.msg || data?.message || "Unknown error";
              alert("Signup failed: " + errorMsg);
            } catch (err) {
              console.error("Non-JSON error response:", text);
              alert("Signup failed: " + text);
            }
          });
        }
      })

      .catch((e) => {
        console.error("Network error:", e);
        alert("Something went wrong");
      });
  };

  return (
    <Card className="p-4 mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Create Account
        </Button>
      </Form>
    </Card>
  );
};
