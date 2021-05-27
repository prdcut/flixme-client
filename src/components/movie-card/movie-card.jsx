import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <CardDeck className="p-3">
        <Card className="p-3" border="warning">
          <Card.Img variant="top" src={movie.ImagePath} alt="movie poster" />
          <Card.Footer className="text-center">
            <h4>{movie.Title}</h4>
          </Card.Footer>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card>
      </CardDeck>
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