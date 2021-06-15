import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
    const url = "https://flixmebackend.herokuapp.com/users/"

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
      <Row className=" flex-wrap justify-content-center">
        <Col md={10}>
          <Card className="mb-3 p-2" bg="light">
            <h2 className="text-warning text-center m-3">Favorite Movies List</h2>

            {FavoriteMovies.length > 0 && movies.map((movie) => {
              if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                return (
                  <Col md={5} key={movie._id}>
                    <Card className="mb-3 p-2" border="warning" >
                      <Card.Img variant="top" src={movie.ImagePath} alt="movie poster" />
                      <Card.Title className="text-center m-1">
                        <Link to={`/movies/${movie._id}`} className="text-warning">
                          <h4 className="m-3">{movie.Title}</h4>
                          <Button variant="warning" className="text-white" onClick={() => { this.removeFavorite(movie); }}>Remove</Button>
                        </Link>
                      </Card.Title>
                    </Card>
                  </Col>
                );
              }
            })}
          </Card>
        </Col>
      </Row>
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