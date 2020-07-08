import React, { Component } from "react";
import "../comp.css";

class Login extends Component {
  state = {};
  render() {
    return (
      <div className="container-sm box">
        <h1 className="title">Login</h1>
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className=" btn  btn-outline-dark">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
