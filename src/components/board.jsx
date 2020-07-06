import React, { Component } from "react";
import List from "./list";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import Modal from "./modalBoard";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import http from "../services/httpService";

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
  };

  handleClick = () => {
    this.setState({ show: true });
  };

  handleTitle = (e) => {
    this.setState({ title: e });
  };

  hide = async (title) => {
    debugger;
    const titleIndex = this.state.titleChanged;

    if (titleIndex >= 0) {
      let titleUpdate = [...this.state.panel];
      titleUpdate[titleIndex].title = title;
      const panelEdit = titleUpdate[titleIndex];
      await http.post(
        `http://localhost:5000/panels/update/${panelEdit._id}`,
        panelEdit
      );
      this.setState({ show: false, panel: titleUpdate });
    } else {
      const panel = [...this.state.panel];
      const newPanel = { show: false, title: title, id: uuidv4() };

      const { data: addedPanel } = await http.post(
        "http://localhost:5000/panels/add",
        newPanel
      );
      addedPanel.task = [];
      const update = [...panel, addedPanel];

      this.setState({ show: false, panel: update });
    }
    console.log(this.state);
  };

  async populatePanel() {
    const { data: panel } = await http.get("http://localhost:5000/panels/");
    console.log(panel);
    const { data: task } = await http.get("http://localhost:5000/tasks/");
    console.log(task);
    const newPanel = panel.map((panel) => {
      const taskList = task.filter((task) => task.panelId === panel._id);
      panel = { ...panel, task: taskList };
      console.log(panel);
      return panel;
    });

    console.log(newPanel);
    this.setState({ panel: newPanel });
  }

  async componentDidMount() {
    await this.populatePanel();
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

  onReg = (indexLista) => {
    const task = {
      name: this.state.name,
      description: this.state.description,
      index: this.state.indexEdit,
      id: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      _id: this.state.taskId,
    };
    this.hideModal(task, indexLista);
  };

  showModalNew = (index) => {
    console.log(index);
    const panel = [...this.state.panel];
    const key = index;

    console.log(index);
    panel[key].show = true;

    this.setState({
      panel,
      name: "",
      description: "",
      indexEdit: -1,
      listIndex: index,
    });
  };

  onShowModalEdit = (index, taskIndex) => {
    console.log("pressed");
    const key = index;
    console.log(index, taskIndex);

    const panel = this.state.panel;
    panel[key].show = true;

    this.setState({
      panel: panel,
      name: this.state.panel[key].task[taskIndex].name,
      description: this.state.panel[key].task[taskIndex].description,
      indexEdit: taskIndex,
      taskId: this.state.panel[key].task[taskIndex]._id,
    });
  };

  hideModal = async (task, indexLista) => {
    console.log(task);
    const key = indexLista;
    if (task.index === -1) {
      const panel = this.state.panel;
      console.log(panel[key]);
      panel[key].show = false;

      console.log(panel[key]);

      const newTask = { ...task, panelId: panel[key]._id, indexEdit: 0 };

      await http.post("http://localhost:5000/tasks/add", newTask);

      panel[key].task = [...panel[key].task, newTask];
      this.setState({ panel });
    } else {
      const index = this.state.indexEdit;
      const panel = [...this.state.panel];
      panel[key].show = false;

      const taskEdit = panel[key].task[index];
      console.log(taskEdit);

      taskEdit.name = this.state.name;
      taskEdit.description = this.state.description;
      taskEdit.indexEdit = this.state.indexEdit;
      taskEdit.panelId = panel[key]._id;

      panel[key].task[index] = taskEdit;

      await http.post(
        `http://localhost:5000/tasks/update/${task._id}`,
        taskEdit
      );
      this.setState({ panel });
    }
  };

  onDragEnd = async (result) => {
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
      task: await this.removeFromList(sourceList.task, source.index),
    };

    const panel = [...this.state.panel];

    const newDestinationList = {
      ...destinationList,
      task: await this.addToList(
        source.droppableId === destination.droppableId
          ? newSourceList.task
          : destinationList.task,
        destination.index,
        sourceList.task[source.index],
        source.droppableId === destination.droppableId
          ? panel[sourceListIndex]._id
          : panel[destinationListIndex]._id
      ),
    };

    const newPanel = [...this.state.panel];
    newPanel[sourceListIndex] = newSourceList;
    newPanel[destinationListIndex] = newDestinationList;

    this.setState({ panel: newPanel });
    console.log(this.state.panel);
  };

  removeFromList = async (list, index) => {
    const newList = [...list];
    const taskId = newList[index]._id;
    newList.splice(index, 1);

    await http.delete(`http://localhost:5000/tasks/${taskId}`);
    return newList;
  };

  addToList = async (taskList, index, task, listID) => {
    const newtaskList = [...taskList];
    const firstHalf = newtaskList.splice(0, index);
    const newTask = task;
    newTask.panelId = listID;
    const secondHalf = newtaskList;

    await http.post("http://localhost:5000/tasks/add", newTask);
    return [...firstHalf, task, ...secondHalf];
  };

  deleteTask = async (listIndex, taskIndex) => {
    debugger;
    console.log("pressed");
    let panel = [...this.state.panel];
    await http.delete(
      `http://localhost:5000/tasks/${panel[listIndex].task[taskIndex]._id}`
    );
    delete panel[listIndex].task[taskIndex];
    this.setState({ panel });
  };

  deleteList = async (listIndex) => {
    debugger;
    console.log("pressed");
    let panel = [...this.state.panel];
    await http.delete(`http://localhost:5000/panels/${panel[listIndex]._id}`);
    const tasks = [...panel[listIndex].task];

    tasks.forEach(async (element) => {
      console.log(element);
      await http.delete(`http://localhost:5000/tasks/${element._id}`);
    });

    const update = panel.filter((p) => p._id !== panel[listIndex]._id);
    this.setState({ panel: update });
  };

  editList = async (index) => {
    let show = this.state.show;
    show = true;
    this.setState({ show, titleChanged: index });
  };

  render() {
    console.log(this.state);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <React.Fragment>
          <div className="row">
            {this.state.panel.map((item, index) => {
              return (
                <List
                  key={index}
                  index={index}
                  title={item.title}
                  onDescp={this.handleDescpChange}
                  onName={this.handleNameChange}
                  onSModal={this.state.panel[index].show}
                  onModalEdit={(taskIndex) =>
                    this.onShowModalEdit(index, taskIndex)
                  }
                  onReg={() => this.onReg(index)}
                  task={item.task}
                  onModalNew={() => this.showModalNew(index)}
                  name={this.state.name}
                  description={this.state.description}
                  id={this.state.panel[index].id}
                  className="col"
                  deleteTask={(listIndex, taskIndex) =>
                    this.deleteTask(listIndex, taskIndex)
                  }
                  deleteList={() => this.deleteList(index)}
                  editList={() => this.editList(index)}
                />
              );
            })}
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
