import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (

      <Card className="movie-card mb-3 p-2" border="warning">
        <Card.Img className="movie-card-img" variant="top" src={movie.ImagePath} alt="movie poster" />
        <Card.Title className="text-center m-1">
          <Link to={`/movies/${movie._id}`} className="text-warning">
            <h4 className="m-3">{movie.Title}</h4>
          </Link>
        </Card.Title>
      </Card>

    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};