import React from "react";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick, similarMovies }) => {
  if (!movie) return <div>Loading...</div>;

  console.log(movie);
  return (
    <div className="movie-view">
      <h1>{movie.Title}</h1>
      <h2>Directed by: {movie.Director?.Name || "N/A"}</h2>
      <img
        className="movie-view-image"
        src={movie.ImagePath}
        alt={movie.Title}
      />
      <p>
        <strong>Description:</strong> {movie.Description}
      </p>
      <p>
        <strong>Genre:</strong> {movie.Genre?.Name}
      </p>
      <br />
      <button onClick={onBackClick}>Back</button>
      <hr />
      <h3>Similar Movies</h3>
      <div className="similar-movies">
        {similarMovies && similarMovies.length > 0 ? (
          similarMovies.map((m) => (
            <div
              key={m._id}
              onClick={() => onBackClick(m)}
              style={{ cursor: "pointer" }}
            >
              <h4>{m.Title}</h4>
              <img style={{ width: "150px" }} src={m.ImagePath} alt={m.Title} />
            </div>
          ))
        ) : (
          <p>No similar movies found.</p>
        )}
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  similarMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ),
};
