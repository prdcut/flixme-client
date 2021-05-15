import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import CardDeck from 'react-bootstrap/CardDeck'
import Row from 'react-bootstrap/Row';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <CardDeck className="p-3">
        <Card
          className="p-3"
          border="warning"
          onClick={() => onClick(movie)}
        >
          <Card.Img variant="top" src={movie.ImagePath} alt="movie poster" />
          <Card.Footer className="text-center">
            <h4>{movie.Title}</h4>
          </Card.Footer>
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
  onClick: PropTypes.func.isRequired
};