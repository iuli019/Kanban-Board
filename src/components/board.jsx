import React, { Component } from "react";
import List from "./list";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import Modal from "./modalBoard";

class Board extends Component {
  state = { show: false, title: " ", list: [] };

  handleClick = () => {
    this.setState({ show: true });
  };

  handleTitle = (e) => {
    this.setState({ title: e });
  };

  hide = (title) => {
    console.log("pressed");
    this.setState({ show: false, list: this.state.list.concat(title) });
    const save = JSON.stringify(this.state.list);
    console.log(save);
    localStorage.setItem("title", save);
  };

  componentDidMount() {
    const save = localStorage.getItem("title");
    console.log(save);
    if (save) {
      const list = JSON.parse(save);
      this.setState({ list });
    }
  }

  reg = () => {
    const title = { name: this.state.title };
    console.log(title);
    this.hide(title);
  };

  handleTask = (e) => {
    this.setState({ task: e });
    console.log(e);
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="row">
          {this.state.list.map((item, index) => (
            <List
              key={index}
              index={index}
              title={item.name}
              onTask={this.handleTask}
              className="col"
            />
          ))}
        </div>
        <button
          className=" button btn  btn-outline-dark"
          onClick={this.handleClick}
        >
          New List
        </button>
        <Modal
          show={this.state.show}
          onTitleChange={this.handleTitle}
          onClick={this.reg}
        />
      </React.Fragment>
    );
  }
}

export default Board;
