import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';

import { Link } from 'react-router-dom';


export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthdate: "",
      FavoriteMovies: [],
      UsernameInvalid: "",
      EmailInvalid: "",
      PasswordInvalid: "",
      BirthdateInvalid: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const user = localStorage.getItem("user")
    axios.get(`https://flixmebackend.herokuapp.com/users/${user}`, {
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
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorite(movie) {
    const token = localStorage.getItem("token");
    const url =
      `https://flixmebackend.herokuapp.com/users/${user}` +
      localStorage.getItem("user") +
      "/favorites/" +
      movie._id;

    axios.delete(url, {
      headers: { Authotization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
        alert(movie.Title + "has been removed from your favorite list.")
      });
  }

  handleDeregister() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios.delete(`https://flixmebackend.herokuapp.com/users/${user}`, {
      headers: { Authotization: `Bearer ${token}` },
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

  handleUpdate(e) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    console.log(this.state);
    const setisValid = this.formValidation();
    if (setisValid) {
      console.log(this.props);
      console.log(this.state);
      axios
        .put(
          `https://flixmebackend.herokuapp.com/users/${user}`,
          {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthdate: this.state.Birthdate,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          const data = response.data;
          localStorage.setItem("user", data.Username);
          console.log(data);
          alert(user + " has been updated.");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  }

  formValidation() {
    let UsernameInvalid = {};
    let EmailInvalid = {};
    let PasswordInvalid = {};
    let BirthdateInvalid = {};
    let isValid = true;
    if (this.state.Username.trim().length < 5) {
      UsernameInvalid.usernameShort = "Must be alphanumeric and contain at least 5 characters.";
      isValid = false;
    }
    if (this.state.Password.trim().length < 5) {
      PasswordError.passwordShort = "Must contain at least 5 characters.";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailInvalid.emailNotEmail = "A valid email address is required.";
      isValid = false;
    }
    if (this.state.birthdate === '') {
      BirthdateInvalid.birthdateEmpty = "Please enter your date of birth.";
      isValid = false;
    }
    this.setState({
      UsernameInvalid: UsernameInvalid,
      PasswordInvalid: PasswordInvalid,
      EmailInvalid: EmailInvalid,
      BirthdateInvalid: BirthdateInvalid,
    })
    return isValid;
  };

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { movies } = this.props;
    console.log(this.props);
    const { UsernameInvalid, PasswordInvalid, EmailInvalid, BirthdateInvalid } = this.state;
    const FavoriteMovieList = movies.filter((movie) => {
      return this.state.FavoriteMovies.includes(movie._id);
    });

    return (


      <Row className="justify-content-center">

        <Col md={8}>
          <Card className="p-3 mb-4" bg="dark" text="secondary">
            <Row className="justify-content-md-center">
              <Col md={9}>
                <Form className="justify-content-md-center mb-30">
                  <h2 className="text-info text-center m-3">Update Profile</h2>

                  <Form.Group controlId="formEmail">
                    <Form.Label>
                      Email
                </Form.Label>
                    <FormControl size="sm" type="email" name="Email" value={this.state.Email} onChange={(e) => this.handleChange(e)} placeholder="Change Email" />
                    {Object.keys(EmailInvalid).map((key) => {
                      return (
                        <div key={key} style={{ color: "red" }}>
                          {EmailInvalid[key]}
                        </div>
                      );
                    })}

                  </Form.Group>

                  <Form.Group controlId="formUsername">
                    <Form.Label>
                      Username
                </Form.Label>
                    <FormControl size="sm" type="text" name="Username" value={this.state.Username} onChange={(e) => this.handleChange(e)} placeholder="Change username" />
                    {Object.keys(UsernameInvalid).map((key) => {
                      return (
                        <div key={key} style={{ color: "red" }}>
                          {UsernameInvalid[key]}
                        </div>
                      );
                    })}

                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>
                      Password
                </Form.Label>
                    <FormControl size="sm" type="password" name="Password" value={this.state.Password} onChange={(e) => this.handleChange(e)} placeholder="Enter your password or Change password" />
                    {Object.keys(PasswordInvalid).map((key) => {
                      return (
                        <div key={key} style={{ color: "red" }}>
                          {PasswordInvalid[key]}
                        </div>
                      );
                    })}

                  </Form.Group>

                  <Form.Group controlId="formBirthdate">
                    <Form.Label>
                      Date of Birth
                </Form.Label>
                    <FormControl size="sm" name="Birthdate" value={this.state.Birthdate} onChange={(e) => this.handleChange(e)} required type="date" />
                    {Object.keys(BirthdateInvalid).map((key) => {
                      return (
                        <div key={key} style={{ color: "red" }}>
                          {BirthdateInvalid[key]}
                        </div>
                      );
                    })}

                  </Form.Group>
                  <Row className="p-2 justify-content-md-center">
                    <Col md={8}>
                      <Link to={`/users/${this.state.Username}`}>
                        <Button variant="outline-info" type="submit" size="lg" block="md" onClick={(e) => this.handleUpdate(e)}>Save</Button>
                      </Link>
                    </Col>
                  </Row>
                  <Row className="p-2 justify-content-md-center">
                    <Col md={8}>
                      <Button variant="outline-danger" type="submit" size="lg" block="md" onClick={() => this.handleDelete()}>Delete Account</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
          <Card className="p-3" bg="dark" text="secondary">

            <h2 className="text-info text-center m-3">Favorite Movies</h2>
            <Row className='mb-20'>
              {FavoriteMovieList.map((movie) => {
                return (
                  <Col md={3} key={movie._id}>
                    <div key={movie._id}>
                      <Card className='mb-20'>
                        <Card.Img variant="top" src={movie.ImagePath} />
                        <Card.Body>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title as='h6'>{movie.Title}</Card.Title>
                          </Link>
                        </Card.Body>
                      </Card>
                      <Button className='mb-30' onClick={() => this.removeFavorite(movie)}>Remove</Button>
                    </div>
                  </Col>
                );
              })}
            </Row>

          </Card>


        </Col>

      </Row >

    );




  }
}

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileView;