import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="mb-4 p-2" bg="dark">
            <Card.Img variant="top" src={movie.ImagePath} alt="movie poster" />
            <Card.Title className="text-center m-1">
              <Link to={`/movies/${movie._id}`} className="text-info">
                <h4 className="m-1">{movie.Title}</h4>
              </Link>
          </Card>
        </Col>
      </Row>
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