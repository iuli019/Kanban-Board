import React, { Component } from "react";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import http from "../services/httpService";
import "../comp.css";

class Login extends Component {
  state = { email: "", password: "" };

  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleClick = async () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const { data } = await http.post("http://localhost:5000/auth", user);
      const jwt = data.token;
      console.log(jwt);
      localStorage.setItem("token", jwt);
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
        <h1 className="mb-5"> Login</h1>
        <Form>
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
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
