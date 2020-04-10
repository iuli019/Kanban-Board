import React, { Component } from "react";
import Modal from "./modal";
import "../App.css";
import Task from "./task";

class List extends Component {
  state = {
    show: false,
    task: [{ name: "task1", description: "task2" }],
    name: "",
    description: " ",
    title: "",
    indexEdit: 0,
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = (task) => {
    if (task.index === -1) {
      this.setState({
        show: false,
        task: this.state.task.concat(task),
      });
    } else {
      const index = task.index;
      const changedTask = [...this.state.task];
      changedTask[index].name = this.state.name;
      changedTask[index].description = this.state.description;
      changedTask[index].description = this.state.indexEdit;
      this.setState({ show: false, task: changedTask });
    }
    this.props.onTask(this.state.task);

    console.log(this.state);
    const save = JSON.stringify(this.state.task);
    console.log(save);
    localStorage.setItem("task", save);
  };

  reg = () => {
    const task = {
      name: this.state.name,
      description: this.state.description,
      index: this.state.indexEdit,
      title: this.props.title,
    };
    this.hideModal(task);
  };

  componentDidMount() {
    // const save = localStorage.getItem("task");
    // console.log(save);
    // if (save) {
    //   const task = JSON.parse(save);
    //   this.setState({ task });
    // }
  }

  showModalEdit = (index) => {
    console.log("pressed");
    this.setState({
      show: true,
      name: this.state.task[index].name,
      description: this.state.task[index].description,
      indexEdit: index,
      title: this.state.title,
    });
  };

  showModalNew = () => {
    this.setState({
      show: true,
      name: "",
      description: "",
      indexEdit: -1,
      title: this.props.title,
    });
  };

  handleNameChange = (e) => {
    this.setState({ name: e });
  };

  handleDescpChange = (e) => {
    this.setState({ description: e });
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="list-container">
          <h4 className="title">{this.props.title}</h4>

          <div className="task">
            {this.state.task.map((item, index) => {
              return (
                <div key={index} onClick={() => this.showModalEdit(index)}>
                  <Task name={item.name} description={item.description} />
                </div>
              );
            })}
          </div>

          <button
            className="btn  btn-outline-dark"
            type="button"
            onClick={this.showModalNew}
          >
            Add New Task
          </button>
        </div>
        <Modal
          className="container"
          show={this.state.show}
          onClose={this.reg}
          onNameChange={this.handleNameChange}
          onDescpChange={this.handleDescpChange}
          name={this.state.name}
          description={this.state.description}
        ></Modal>
      </React.Fragment>
    );
  }
}

export default List;
