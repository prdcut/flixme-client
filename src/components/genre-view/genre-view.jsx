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
                <h3>{movie.Genre.Name}</h3>
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
              <Card.Text>{movie.Genre.Description}</Card.Text>

              <Button onClick={() => { onClick(); }} variant="secondary" block>Back</Button>

            </Card.Body>
          </Card>
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
    }
  })
}