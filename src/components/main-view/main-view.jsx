import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null,
    }
  }

  componentDidMount() {
    axios.get('https://flixmebackend.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  setInitialState() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Container>
        <div className="main-view">
          {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
          {selectedMovie
            ? (
              <Row className="justify-content-md-center">
                <Col md={8}>
                  <MovieView movie={selectedMovie} onClick={() => { this.setInitialState(); }} />
                </Col>
              </Row>
            )
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onClick={(movie) => { this.setSelectedMovie(movie) }} />
            ))
          }
        </div>
      </Container>
    );
  }
}

export default MainView;