import React, { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { NavbarView } from "../navbar-view/navbar-view";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ?? null);
  const [token, setToken] = useState(storedToken ?? null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.REACT_APP_API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, [token]);

  const syncUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("token", token);
            }}
          />
        }
      />

      <Route path="/signup" element={<SignupView />} />

      <Route
        path="/movies"
        element={
          !user ? (
            <Navigate to="/" replace />
          ) : (
            <>
              <NavbarView
                onLoggedOut={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
                user={user}
              />

              <Container className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Container>

              <Container fluid className="pb-4">
                <Row className="g-4">
                  {movies
                    .filter((movie) =>
                      movie.Title.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      )
                    )
                    .map((movie) => (
                      <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          token={token}
                          syncUser={syncUser}
                        />
                      </Col>
                    ))}
                </Row>
              </Container>
            </>
          )
        }
      />

      <Route
        path="/profile"
        element={
          !user ? (
            <Navigate to="/" replace />
          ) : (
            <ProfileView user={user} token={token} movies={movies} />
          )
        }
      />

      <Route
        path="/movies/:movieId"
        element={
          !user ? (
            <Navigate to="/" replace />
          ) : (
            <MovieView
              movies={movies}
              onBackClick={() => window.history.back()}
            />
          )
        }
      />
    </Routes>
  );
};

export default MainView;
