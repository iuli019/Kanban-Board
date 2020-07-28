import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import http from "../services/httpService";

function Register() {
  const [user, setUser] = useState();

  const handleClick = async () => {
    http.loginUser("http://localhost:5000/users", user);
  };

  console.log(user);

  return (
    <div className="container mt-5">
      <h1 className="mb-5"> Register</h1>
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>

        <Button variant="outline-dark" onClick={handleClick}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
