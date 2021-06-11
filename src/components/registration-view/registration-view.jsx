import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactDOM from 'react-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const formValidation = (formData) => {
    let isValid = 'valid';
    if (formData.Username.length < 5) isValid = 'Username must be at least 5 characters long';
    if (formData.Password === '') isValid = 'Password can not be empty.';
    if (formData.Email.includes('.') === false || formData.Email.includes('@') === false) isValid = 'Please enter a valid Email address';
    if (formData.Birthdate === '') isValid = 'Date of birth can not be empty.'

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    formData.Username = username;
    formData.Password = password;
    formData.Email = email;
    formData.Birthdate = birthdate;

    let isValid = formValidation(formData);

    if (isValid !== 'valid') {
      alert(isValid);
      return;
    }
    if (isValid === 'valid') {
      axios.post('https://flixmebackend.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
    }

  };

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <Card className="p-3" bg="dark" text="secondary">
          <Row className="justify-content-md-center">
            <Col md={9}>
              <Form noValidate>

                <h2 className="text-info text-center m-3">Sing Up</h2>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minlenght="5"
                    maxlenght="360"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required minlenght="5"
                    maxlenght="50"
                  />
                </Form.Group>

                <Form.Group controlId="formBirthdate">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthdate"
                    placeholder="Date of Birth"
                    required
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </Form.Group>

                <Row className="p-2 justify-content-md-center">
                  <Col md={6}>
                    <Button variant="outline-info" className="text-info" type="submit" size="lg" block="md" onClick={handleSubmit}>Sing Up</Button>
                  </Col>
                </Row>

              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

RegistrationView.propTypes = {
  register: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
};
