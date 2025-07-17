import React from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const MovieView = ({ movies, user, token }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found.</div>;

  const similarMovies = movies.filter(
    (m) => m.Genre?.Name === movie.Genre?.Name && m._id !== movie._id
  );

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
      {user && !user.FavoriteMovies.includes(movie._id) && (
        <Button
          variant="outline-success"
          className="mt-3"
          onClick={() => {
            fetch(
              `${process.env.REACT_APP_API_URL}/users/${user.Username}/movies/${movie._id}`,
              {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
              }
            ).then((res) => {
              if (res.ok) {
                alert(`${movie.Title} has been added to your favorites!`);
              }
            });
          }}
        >
          Add to Favorites
        </Button>
      )}

      <br />
      <button onClick={() => navigate(-1)}>Back</button>
      <hr />
      <h3>Similar Movies</h3>
      <div className="similar-movies">
        {similarMovies.length > 0 ? (
          similarMovies.map((m) => (
            <div
              key={m._id}
              onClick={() => navigate(`/movies/${m._id}`)}
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
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
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
    })
  ).isRequired,
};
