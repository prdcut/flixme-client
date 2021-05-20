import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="p-3 m-3">
        <Card className="p-3" bg="warning" text="white">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="text-center p-3">
              <h3>{movie.Title}</h3>
            </Card.Title>

            <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
            <Card.Text>{movie.Description}</Card.Text>

            <Card.Subtitle className="mb-2 text-muted">Genre</Card.Subtitle>
            <Card.Text>{movie.Genre.Name}</Card.Text>

            <Card.Subtitle className="mb-2 text-muted">Director</Card.Subtitle>
            <Card.Text>{movie.Director.Name}</Card.Text>

            <Card.Subtitle className="mb-2 text-muted">Featured</Card.Subtitle>
            <Card.Text>{movie.Featured}</Card.Text>

            <Button onClick={() => { onClick(); }} variant="secondary" block>Back</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequred,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequred,
      Birth: PropTypes.string.isRequred,
      Death: PropTypes.string
    }),
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};