import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, director } = this.props;

    if (!director) return null;

    return (
      <Container>
        <Row className="p-3 m-3">
          <Card className="p-3" bg="warning" text="white">
            <Card.Body>
              <Card.Title className="text-center p-3">
                <h3>{director.Director.Name}</h3>
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">Born:</Card.Subtitle>
              <Card.Text>{director.Director.Birth}</Card.Text>

              <Card.Subtitle className="mb-2 text-muted">Died:</Card.Subtitle>
              <Card.Text>{director.Director.Death}</Card.Text>

              <Card.Subtitle className="mb-2 text-muted">Biography</Card.Subtitle>
              <Card.Text>{director.Director.Bio}</Card.Text>

              // return or go back???

            </Card.Body>
          </Card>
        </Row>
        <Row>
          <h4>More {director.Director.Name}'s movies</h4>
        </Row>
        <Row>
          {movie.map((movie) => {
            if (movie.Director.Name === director.Director.Name) {
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

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    },
  }).isRequired,
};