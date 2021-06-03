import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <Card className="p-3" bg="dark" text="secondary">
          <Row className="justify-content-md-center">
            <Col md={9}>
              <Form>

                <h2 className="text-info text-center m-3">Sing Up</h2>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control required minlenght="5" maxlenght="360" type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required minlenght="5" maxlenght="50" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBirthdate">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control required type="date" placeholder="Date of Birth" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </Form.Group>

                <Row className="p-2 justify-content-md-center">
                  <Col md={8}>
                    <Button variant="outline-info" lassName="text-info" type="submit" size="lg" block="md" onClick={handleSubmit}>Sing Up</Button>
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