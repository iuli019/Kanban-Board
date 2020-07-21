import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import JwtDecode from "jwt-decode";
import NavBar from "./components/navBar";
import Board from "./components/board";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";
import Logout from "./components/logout";
import ProtectedRoute from "./components/protectedRoute";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = JwtDecode(jwt);
      console.log(user);

      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const user = this.state.user;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <ProtectedRoute path="/board" component={Board} user={user} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route exact path="/">
            <Redirect to="/board" />
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
