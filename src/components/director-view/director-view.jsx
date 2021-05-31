import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director, onClick } = this.props;

    console.log(this.props)

    return (

      <Card className="p-3" bg="warning" text="white">
        <Card.Body>
          <Card.Title className="text-center p-3">
            <h3 className="text-info">{director.Name}</h3>
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted">Born</Card.Subtitle>
          <Card.Text>{director.Birth}</Card.Text>

          <Card.Subtitle className="mb-2 text-muted">Died</Card.Subtitle>
          <Card.Text>{director.Death}</Card.Text>

          <Card.Subtitle className="mb-2 text-muted">Biography</Card.Subtitle>
          <Card.Text>{director.Bio}</Card.Text>

          <Button onClick={() => { onClick(); }} variant="dark" className="text-info" block>Back</Button>

        </Card.Body>
      </Card>

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
  })
};