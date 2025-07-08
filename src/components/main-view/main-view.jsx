import React, { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.REACT_APP_API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, [token]);

  if (!user) {
    return (
      <>
        <div className="auth-wrapper">
          {showSignup ? (
            <SignupView />
          ) : (
            <div className="auth-container">
              <h1>Welcome to RoyFlix</h1>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("token", token);
                }}
              />
            </div>
          )}
          <button onClick={() => setShowSignup(!showSignup)}>
            {showSignup ? "Back to Login" : "Sign Up"}
          </button>
        </div>
      </>
    );
  }

  if (selectedMovie) {
    const similarMovies = movies.filter(
      (movie) =>
        movie.Genre?.Name === selectedMovie.Genre?.Name &&
        movie._id !== selectedMovie._id
    );

    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={(movie) => {
          if (movie && movie.Title) {
            setSelectedMovie(movie);
          } else {
            setSelectedMovie(null);
          }
        }}
        similarMovies={similarMovies}
      />
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>

      {movies.map((movie) => (
        <div key={movie._id} onClick={() => setSelectedMovie(movie)}>
          <h2>{movie.Title}</h2>
          <img
            className="movie-view-image"
            src={movie.ImagePath}
            alt={movie.Title}
          />
        </div>
      ))}
    </div>
  );
};
export default MainView;
