import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    axios.post('https://flixmebackend.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
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
    <Form>

      <h2>Sing Up</h2>

      <Form.Group controlId="formEmail">
        <Form.Label>
          <b>Email</b>
        </Form.Label>
        <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formUsername">
        <Form.Label>
          <b>Username</b>
        </Form.Label>
        <Form.Control required minlenght="5" maxlenght="360" type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>
          <b>Password</b>
        </Form.Label>
        <Form.Control required minlenght="5" maxlenght="50" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBirthdate">
        <Form.Label>
          <b>Birthdate</b>
        </Form.Label>
        <Form.Control required type="date" placeholder="Date of Birth" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </Form.Group>

      <Button variant="warning" type="submit" size="lg" block type="submit" onClick={handleSubmit}>Sign Up</Button>

    </Form>
  );
};

RegistrationView.propTypes = {
  register: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
  onRegister: PropTypes.func.isRequired,
};