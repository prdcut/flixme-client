import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';


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

  handleDelete(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const url = "https://flixmebackend.herokuapp.com/users/";

    axios.delete(url + user, {
      headers: { Authotization: `Bearer ${token}` }
    })
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser({
          user: null,
          token: null
        });
        window.open('/login', '_self');
        alter(user + " has been deleted.");
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
      PasswordInvalid.passwordShort = "Must contain at least 5 characters.";
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
    console.log(this.props);
    const { UsernameInvalid, PasswordInvalid, EmailInvalid, BirthdateInvalid } = this.state;

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
        </Col>
      </Row >

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

export default connect(mapStateToProps, { setUser })(ProfileView);