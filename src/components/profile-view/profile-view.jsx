import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export const ProfileView = ({ user, token, movies }) => {
  const [userData, setUserData] = useState(user ? user : null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const favoriteMovies = movies.filter((movie) =>
    userData.FavoriteMovies.includes(movie._id)
  );

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setUsername(data.Username);
        setEmail(data.Email);
        setBirthday(data.Birthday?.slice(0, 10));
      });
  }, [user, token]);

  if (!userData) return <div>Loading profile...</div>;

  return (
    <Container>
      <Row>
        <Col>
          <h2>{userData.Username}'s Profile</h2>
          <Card className="mb-4">
            <Card.Body>
              <h4>Update Your Info</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  fetch(
                    `${process.env.REACT_APP_API_URL}/users/${user.Username}`,
                    {
                      method: "PUT",
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        Username: username,
                        Password: password,
                        Email: email,
                        Birthday: birthday,
                      }),
                    }
                  )
                    .then((res) => res.json())
                    .then((updatedUser) => {
                      alert("Profile updated!");
                      setUserData(updatedUser);
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                    });
                }}
              >
                <label className="form-label">Username</label>
                <input
                  className="form-control mb-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <label className="form-label">Password</label>
                <input
                  className="form-control mb-2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <label className="form-label">Email</label>
                <input
                  className="form-control mb-2"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label className="form-label">Birthday</label>
                <input
                  className="form-control mb-3"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />

                <Button type="submit" variant="primary">
                  Update Profile
                </Button>
              </form>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <h4>Your Favorite Movies</h4>
              <Row>
                {favoriteMovies.length === 0 ? (
                  <p>You haven't added any favorite movies yet.</p>
                ) : (
                  favoriteMovies.map((movie) => (
                    <Col
                      key={movie._id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      className="mb-4"
                    >
                      <Card>
                        <Card.Img variant="top" src={movie.ImagePath} />
                        <Card.Body>
                          <Card.Title>{movie.Title}</Card.Title>
                          <Button
                            variant="outline-danger"
                            onClick={() => {
                              fetch(
                                `${process.env.REACT_APP_API_URL}/users/${user.Username}/movies/${movie._id}`,
                                {
                                  method: "DELETE",
                                  headers: { Authorization: `Bearer ${token}` },
                                }
                              ).then((res) => {
                                if (res.ok) {
                                  setUserData((prev) => ({
                                    ...prev,
                                    FavoriteMovies: prev.FavoriteMovies.filter(
                                      (id) => id !== movie._id
                                    ),
                                  }));
                                }
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};
