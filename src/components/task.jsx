import React, { Component } from "react";
import "./modal.css";

class Task extends Component {
  state = {
    show: false,
    name: this.props.name,
    description: this.props.description,
  };
  openModal;
  render() {
    return (
      <React.Fragment>
        <h5>{this.state.name}</h5>
      </React.Fragment>
    );
  }
}

export default Task;
