import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthdate: "",
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getUser(token) {
    axios.get('https://flixmebackend.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  removeFavorite(movie) {
    axios.delete('https://flixmebackend.herokuapp.com/users', {
      headers: { Authotization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      });
  }

  handleDeregister() {
    axios.delete(`https://flixmebackend.herokuapp.com/users/${localStorage.getItem("user")}`, {
      headers: { Authotization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(() => {
        alter(user + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    const FavoriteMovieList = movies.filter((movie) => {
      return this.state.FavoriteMovies.includes(movie._id);
    });

    if (!movies) alert("Plsease sign in");
    return (
      <Container>
        <Row className="text-right">
          <Button variant="dark" className="m-4" onClick={() => { this.onLoggedOut() }}>Logout</Button>
        </Row>
        <div className="userProfile" style={{ display: "flex" }}>
          <Row>
            <Col>
              <Form style={{ width: "24rem", float: "left" }}>
                <h1 style={{ textAlign: "center" }}>Profile Details</h1>
                <Form.Group controlId="formBasicUsername">
                  <h3>Username: </h3>
                  <Form.Label>{this.state.Username}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <h3>Email:</h3>
                  <Form.Label>{this.state.Email}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <h3>Date of Birth:</h3>
                  <Form.Label>{this.state.Birthdate}</Form.Label>
                </Form.Group>
                <Link to={`/update/${this.state.Username}`}>
                  <Button variant="outline-dark"
                    type="link"
                    size="sm"
                    block
                  >
                    Edit Profile
                    </Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="outline-dark"
                    type="submit"
                    size="sm"
                    block
                  >
                    Back to Main
                  </Button>
                </Link>
                <Button variant="outline-warning"
                  size="sm"
                  block
                  onClick={() => this.handleDelete()}
                >
                  Delete Account
                </Button>

              </Form>
            </Col>
            <Col>
              <div
                className="favoriteMovies"
                style={{
                  float: "right",
                  textAlign: "center",
                  width: "24rem",
                }}
              >
                <h1>Favorite Movies</h1>
                {FavoriteMovieList.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <Card>
                        <Card.Img variant="top" src={movie.ImagePath} />
                        <Card.Body>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Link>
                        </Card.Body>
                      </Card>
                      <Button onClick={() => this.removeFavorite(movie)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </Container >
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};