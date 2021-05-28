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
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <Row className="text-right">
          <Button variant="dark" className="m-4" onClick={() => { this.onLoggedOut() }}>Logout</Button>
        </Row>
        <Row className="p-3 m-3">
          <Card className="p-3" bg="warning" text="white">
            <Card.Body>
              <Card.Title className="text-center p-3">
                <h3>{movie.Director.Name}</h3>
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">Born:</Card.Subtitle>
              <Card.Text>{movie.Director.Birth}</Card.Text>

              <Card.Subtitle className="mb-2 text-muted">Died:</Card.Subtitle>
              <Card.Text>{movie.Director.Death}</Card.Text>

              <Card.Subtitle className="mb-2 text-muted">Biography</Card.Subtitle>
              <Card.Text>{movie.Director.Bio}</Card.Text>

              <Button onClick={() => { onClick(); }} variant="secondary" block>Back</Button>

            </Card.Body>
          </Card>
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