import React from "react";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <h2>Directed by: {movie.author}</h2>
      <img className="movie-view-image" src={movie.image} alt={movie.title} />
      <p>
        <strong>Description:</strong> {movie.description}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Year:</strong> {movie.year}
      </p>
      <br />
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
