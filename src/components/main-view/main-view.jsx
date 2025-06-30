import React, { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view"; // path depends on your structure

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

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
