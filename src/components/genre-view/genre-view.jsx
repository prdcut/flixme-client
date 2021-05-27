import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";


export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, genre } = this.props;

    if (!genre) return null;

    return (
      <Container>
        <Row className="p-3 m-3">
          <Card className="p-3" bg="warning" text="white">
            <Card.Body>
              <Card.Title className="text-center p-3">
                <h3>{genre.Genre.Name}</h3>
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
              <Card.Text>{genre.Genre.Description}</Card.Text>

              // return or go back???

            </Card.Body>
          </Card>
        </Row>
        <Row>
          <h4>More {genre.Genre.Name} movies</h4>
        </Row>
        <Row>
          {movie.map((movie) => {
            if (movie.Genre.Name === genre.Genre.Name) {
              return (
                <Card className="p-3" border="warning">
                  <Card.Img variant="top" src={movie.ImagePath} alt="movie poster" />
                  <Card.Footer className="text-center">
                    <h4>{movie.Title}</h4>
                  </Card.Footer>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">More</Button>
                  </Link>
                </Card>
              )
            }
          })}
        </Row>
      </Container>
    )
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: {
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    },
  }).isRequired,
};