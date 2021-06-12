import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import { Link } from 'react-router-dom';


export class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      Email: '',
      Birthdate: '',
      FavoriteMovies: [],
    };
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const user = localStorage.getItem("user")
    const url = `https://flixmebackend.herokuapp.com/users/${user}`

    axios.get(url + user, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorite(movie) {
    const token = localStorage.getItem("token");
    const url = "https://flixmebackend.herokuapp.com/users/";
    const user = localStorage.getItem("user");

    axios.delete(url + user + "/favorites/" + movie._id, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        alert("Removed from favorites");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { FavoriteMovies } = this.state;
    const { movies } = this.props;
    return (
      <Card className="mb-3 p-2" bg="dark">
        <h2 className="text-info text-center m-3">Favorite Movies</h2>
        <div>
          {FavoriteMovies.lenght > 0 && movies.map((movie) => {
            if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie_.id)) {
              return (
                <div key={movie._id}>
                  <Card className="mb-3 p-2" bg="dark" >
                    <Card.Img variant="top" src={movie.ImagePath} alt="movie poster" />
                    <Card.Title className="text-center m-1">
                      <Link to={`/movies/${movie._id}`} className="text-info">
                        <h4 className="m-1">{movie.Title}</h4>
                        <Button variant="outline-info" className="text-info" onClick={() => { this.removeFavorite(movie); }}>Remove</Button>
                      </Link>
                    </Card.Title>
                  </Card>
                </div>
              );
            }
          })}
        </div>
      </Card>

    );
  }
}

const mapStateToProps = (state) => {
  const { user, movies } = state;
  return {
    user,
    movies
  }
}

export default connect(mapStateToProps)(FavoritesList);