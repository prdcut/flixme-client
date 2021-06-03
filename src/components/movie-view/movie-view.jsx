import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="p-3" bg="dark" text="white">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title className="text-center p-3">
                <h3 className="text-info">{movie.Title}</h3>
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
              <Card.Text>{movie.Description}</Card.Text>

              <Card.Subtitle className="mb-2 text-muted">Genre</Card.Subtitle>
              <Card.Text>
                <Link to={`/genre/${movie.Genre.Name}`} className="text-white">
                  <Button variant="link" className="text-info">{movie.Genre.Name}</Button>
                </Link>
              </Card.Text>

              <Card.Subtitle className="mb-2 text-muted">Director</Card.Subtitle>
              <Card.Text>
                <Link to={`/director/${movie.Director.Name}`}>
                  <Button variant="link" className="text-info">{movie.Director.Name}</Button>
                </Link>
              </Card.Text>
              <Row className="justify-content-md-center">
                <Col md={8}>
                  <Button onClick={() => { onClick(); }} variant="outline-info" className="text-info" block>Back</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row >
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
  }),
  onClick: PropTypes.func.isRequired
};