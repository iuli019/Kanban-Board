import React, { Component } from "react";
import List from "./list";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import Modal from "./modalBoard";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";

class Board extends Component {
  state = {
    show: false,
    title: "",
    panel: [],
    name: "",
    description: "",
    indexEdit: 0,
    index: 0,
    listIndex: 0,
    result: {},
  };

  handleClick = () => {
    this.setState({ show: true });
  };

  handleTitle = (e) => {
    this.setState({ title: e });
  };

  hide = (title) => {
    const index = this.state.index;
    console.log("pressed");
    const panel = { show: false, title: title, id: uuidv4(), task: [] };
    this.setState({
      show: false,
      panel: [...this.state.panel.concat(panel)],
      index: index + 1,
    });
    console.log(this.state);
    const save = JSON.stringify(this.state.panel);
    console.log(save);
    localStorage.setItem("panel", save);
  };

  componentDidMount() {
    let save = localStorage.getItem("panel");
    console.log(save);
    if (save) {
      const panel = JSON.parse(save);
      this.setState({ panel });
    }
    save = localStorage.getItem("allPanel");
    if (save) {
      const panel = JSON.parse(save);
      this.setState({ panel });
    }
  }

  reg = () => {
    const title = this.state.title;
    console.log(title);
    this.hide(title);
  };

  handleDescpChange = (e) => {
    this.setState({ description: e });
  };

  handleNameChange = (e) => {
    this.setState({ name: e });
  };

  onReg = () => {
    const task = {
      name: this.state.name,
      description: this.state.description,
      index: this.state.indexEdit,
      id: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
    };
    this.hideModal(task);
  };

  showModalNew = (index) => {
    this.setState({ listIndex: index });
    const panel = [...this.state.panel];
    const key = index;
    console.log(index);
    panel[key].show = true;

    this.setState({ panel, name: "", description: "", indexEdit: -1 });
  };

  onShowModalEdit = (index) => {
    console.log("pressed");
    const key = this.state.listIndex;
    const panel = this.state.panel;
    panel[key].show = true;
    this.setState({
      panel: panel,
      name: this.state.panel[key].task[index].name,
      description: this.state.panel[key].task[index].description,
      indexEdit: index,
    });
  };

  hideModal = (task) => {
    const key = this.state.listIndex;
    if (task.index === -1) {
      const panel = this.state.panel;
      panel[key].show = false;
      panel[key].task = [...panel[key].task.concat(task)];
      this.setState({ panel });
    } else {
      const index = task.index;
      const panel = [...this.state.panel];
      panel[key].show = false;
      const taskEdit = [...panel[key].task];
      taskEdit[index].name = this.state.name;
      taskEdit[index].description = this.state.description;
      taskEdit[index].indexEdit = this.state.indexEdit;
      panel[key].task = [...taskEdit];
      this.setState({ panel });
    }
    const save = JSON.stringify(this.state.panel);
    console.log(save);
    localStorage.setItem("allPanel", save);
  };

  onResult = (index, indexTask) => {
    console.log(index, indexTask);
    const result = {
      draggableID: this.state.panel[index].task[indexTask].id,
      type: "TYPE",
      reason: "DROP",
      source: {
        droppableId: this.state.panel[index].id,
        index: 0,
      },
      destination: {
        droppableId: this.state.panel[index].id,
        index: 1,
      },
      index: index,
      indexTask: indexTask,
    };
    this.setState({ result });
  };

  onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceList = this.state.panel.find(
      (list) => list.id === source.droppableId
    );
    const destinationList = this.state.panel.find(
      (list) => list.id === destination.droppableId
    );

    const sourceListIndex = this.state.panel.findIndex(
      (list) => list.id === source.droppableId
    );
    const destinationListIndex = this.state.panel.findIndex(
      (list) => list.id === destination.droppableId
    );

    const newSourceList = {
      ...sourceList,
      task: this.removeFromList(sourceList.task, source.index),
    };
    const newDestinationList = {
      ...destinationList,
      task: this.addToList(
        source.droppableId === destination.droppableId
          ? newSourceList.task
          : destinationList.task,
        destination.index,
        sourceList.task[source.index]
      ),
    };

    const newPanel = [...this.state.panel];
    newPanel[sourceListIndex] = newSourceList;
    newPanel[destinationListIndex] = newDestinationList;

    this.setState({ panel: newPanel });
  };

  removeFromList = (list, index) => {
    const newList = [...list];
    newList.splice(index, 1);
    return newList;
  };

  addToList = (list, index, task) => {
    const newList = [...list];
    const firstHalf = newList.splice(0, index);
    const secondHalf = newList;
    console.log(firstHalf, secondHalf);
    return [...firstHalf, task, ...secondHalf];
  };

  render() {
    console.log(this.state);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <React.Fragment>
          <div className="row">
            {this.state.panel.map((item, index) => (
              <List
                key={index}
                index={index}
                title={item.title}
                onDescp={this.handleDescpChange}
                onName={this.handleNameChange}
                onSModal={this.state.panel[index].show}
                onModalEdit={(index) => this.onShowModalEdit(index)}
                onReg={this.onReg}
                task={item.task}
                onModalNew={(index) => this.showModalNew(index)}
                name={this.state.name}
                description={this.state.description}
                id={this.state.panel[index].id}
                result={(index, indexTask) => this.onResult(index, indexTask)}
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
      </DragDropContext>
    );
  }
}

export default Board;
