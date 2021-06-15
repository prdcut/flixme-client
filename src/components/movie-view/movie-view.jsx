import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  addFavorite(movie) {
    const token = localStorage.getItem("token");
    const url =
      "https://flixmebackend.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/favorites/"
      + movie._id;

    axios.post(url, "", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        // console.log(response);
        alert("Added to favorites!");
      });
  }

  render() {
    const { movie, onClick } = this.props;



    if (!movie) return null;

    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="p-3 mb-3" border="warning" text="secondary">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title className="text-center mb-3 p-3">
                <h3 className="text-warning">{movie.Title}</h3>
                <Button variant="outline-warning" className="text-warning m-3" onClick={() => { this.addFavorite(movie); }}>Favorite</Button>
              </Card.Title>

              <Card.Subtitle className="mb-2 text-dark">Description</Card.Subtitle>
              <Card.Text className="text-justify" >{movie.Description}</Card.Text>

              <Card.Subtitle className="mb-2 text-dark">Genre</Card.Subtitle>
              <Card.Text>
                <Link to={`/genre/${movie.Genre.Name}`} className="text-white">
                  <Button variant="link" className="text-warning">{movie.Genre.Name}</Button>
                </Link>
              </Card.Text>

              <Card.Subtitle className="mb-2 text-dark">Director</Card.Subtitle>
              <Card.Text>
                <Link to={`/director/${movie.Director.Name}`}>
                  <Button variant="link" className="text-warning">{movie.Director.Name}</Button>
                </Link>
              </Card.Text>
              <Row className="justify-content-md-center">
                <Col md={4}>
                  <Button onClick={() => { onClick(); }} variant="warning" className="text-white" block>Back</Button>
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