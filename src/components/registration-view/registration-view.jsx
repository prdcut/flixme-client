import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegister(username);
  };

  return (
    <Form>

      <h2>Sing Up</h2>

      <Form.Group controlid="formEmail">
        <Form.Label>
          <b>Email</b>
        </Form.Label>
        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlid="formUsername">
        <Form.Label>
          <b>Username</b>
        </Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlid="formPassword">
        <Form.Label>
          <b>Password</b>
        </Form.Label>
        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlid="formBirthdate">
        <Form.Label>
          <b>Birthdate</b>
        </Form.Label>
        <Form.Control type="date" placeholder="Date of Birth" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
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