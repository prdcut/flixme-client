import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { FavoritesList } from '../favorites-list/favorites-list';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
    }
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

  getMovies(token) {
    axios.get('https://flixmebackend.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    this.props.setUser(authData);
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <div className="main-view justify-conten-center">

          <Navbar bg="dark" expand="lg" sticky="top" className="mb-5 shadow-lg">
            <Navbar.Brand href="http://localhost:1234">
              <img src="../img/logo.svg" width="30" height="30" className="d-inline-block align-top" alt="flixMe logo" />{' '}
              <h1 className="text-info">flixMe</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              {!user ? (
                <div>
                  <Link to={`/`}>
                    <Button variant="link" className="m-2 navbar-link text-warning">Login</Button>
                  </Link>
                  <Link to={`/register`}>
                    <Button variant="link" className="m-2 navbar-link text-warning">Register</Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to={`/`}>
                    <Button variant="link" className="m-2 navbar-link text-warning">Movies</Button>
                  </Link>
                  <Link to={`/users/${user}`}>
                    <Button variant="link" className="m-2 navbar-link text-warning">My Profile</Button>
                  </Link>
                  <Link to={`/`}>
                    <Button variant="link" className="m-2 navbar-link text-warning" onClick={() => this.onLoggedOut()}>Logout</Button>
                  </Link >
                </div>
              )
              }
            </Navbar.Collapse>
          </Navbar>

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:Title" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <MovieView
                editUserLists={(movieID, list, requestString) => this.editUserLists(movieID, list, requestString)}
                user={user}
                movie={movies.find(m => m._id === match.params.Title)}
                onClick={() => history.goBack()}
              />
            </Col>
          }} />

          <Route path="/director/:Name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director} onClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genre/:Name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} onClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/users/:Username" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Container>
                <Row>
                  <Col>
                    <ProfileView movies={movies} />
                  </Col>
                  <Col>
                    <FavoritesList user={user} movies={movies} />
                  </Col>
                </Row>
              </Container>
            );
          }} />

        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user, }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);