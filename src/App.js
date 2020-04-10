import React, { Component } from "react";
import NavBar from "./components/navBar";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Board from "./components/board";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Board />
      </React.Fragment>
    );
  }
}

export default App;
