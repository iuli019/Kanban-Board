import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import http from "../services/httpService";

class Register extends Component {
  state = {};

  nameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleClick = async () => {
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const { data } = await http.post("http://localhost:5000/users", user);
      localStorage.setItem("token", data.token);
      // this.props.history.push("/board");
      window.location = "/board";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast(ex.response.data);
      }
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <h1 className="mb-5"> Register</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter name"
              onChange={(e) => this.nameChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => this.emailChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => this.passwordChange(e)}
            />
          </Form.Group>

          <Button variant="outline-dark" onClick={this.handleClick}>
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
