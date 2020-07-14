import React, { Component } from "react";
import http from "../services/httpService";
import { toast } from "react-toastify";
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
      <div className="container-sm box">
        <h1 className="title">Login</h1>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              onChange={(e) => this.emailChange(e)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              onChange={(e) => this.passwordChange(e)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button
            onClick={this.handleClick}
            type="button"
            className=" btn  btn-outline-dark"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
