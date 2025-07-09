import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie._id}`);
  };

  return (
    <Card
      className="card-custom h-100 movie-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
      <Card.Body className="text-center">
        <Card.Title>{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
