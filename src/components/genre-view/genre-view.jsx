import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";


export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { genre, onClick } = this.props;


    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="p-3" bg="dark" text="white">
            <Card.Body>
              <Card.Title className="text-center p-3">
                <h3 className="text-info">{genre.Name}</h3>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
              <Card.Text>{genre.Description}</Card.Text>
              <Row className="justify-content-md-center">
                <Col md={8}>
                  <Button onClick={() => { onClick(); }} variant="outline-info" className="text-info" block>Back</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row >

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