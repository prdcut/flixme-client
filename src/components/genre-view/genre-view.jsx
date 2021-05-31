import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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

      <Card className="p-3" bg="warning" text="white">
        <Card.Body>
          <Card.Title className="text-center p-3">
            <h3 className="text-info">{genre.Name}</h3>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
          <Card.Text>{genre.Description}</Card.Text>
          <Button onClick={() => { onClick(); }} variant="dark" className="text-info" block>Back</Button>
        </Card.Body>
      </Card>

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