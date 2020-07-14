import React, { Component } from "react";
import http from "../services/httpService";
import { toast } from "react-toastify";

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
      <div className="container-sm box">
        <h1 className="title">Register</h1>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              onChange={(e) => this.nameChange(e)}
              type="name"
              className="form-control"
              id="exampleInputName"
            />
          </div>

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
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
