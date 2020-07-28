import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import MyVerticallyCenteredModal from "./listModal";
import List from "./list";
import http from "../services/httpService";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

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
    const titleIndex = this.state.titleChanged;
    console.log(titleIndex);
    if (!titleIndex) {
      const panel = [...this.state.panel];
      const newPanel = { show: false, title: title, id: uuidv4() };

      const addedPanel = await http.addPanel(newPanel);
      addedPanel.task = [];
      const update = [...panel, addedPanel];

      this.setState({ show: false, panel: update });
      toast("List added!");
    } else {
      let titleUpdate = [...this.state.panel];
      titleUpdate[titleIndex].title = title;
      const panelEdit = titleUpdate[titleIndex];

      http.updatePanel(panelEdit, panelEdit._id);

      this.setState({ show: false, panel: titleUpdate });
      toast("Updated list!");
    }
  };

  async populatePanel() {
    const panel = await http.getPanels();
    const task = await http.getTasks();

    const newPanel = panel.map((panel) => {
      const taskList = task.filter((task) => task.panelId === panel._id);
      panel = { ...panel, task: taskList };

      return panel;
    });

    this.setState({ panel: newPanel });
  }

  async componentDidMount() {
    await this.populatePanel();
  }

  reg = () => {
    const title = this.state.title;

    this.hide(title);
  };

  handleDescpChange = (e) => {
    this.setState({ description: e });
  };

  handleNameChange = (e) => {
    this.setState({ name: e });
  };

  onReg = (indexLista, state) => {
    const task = {
      name: this.state.name,
      description: this.state.description,
      index: this.state.indexEdit,
      id: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      _id: this.state.taskId,
    };
    this.hideModal(task, indexLista, state);
  };

  showModalNew = (index) => {
    const panel = [...this.state.panel];
    const key = index;

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

  hideModal = async (task, indexLista, state) => {
    const key = indexLista;
    if (state) {
      if (task.index === -1) {
        const panel = this.state.panel;

        panel[key].show = false;

        const newTask = { ...task, panelId: panel[key]._id, indexEdit: 0 };

        http.addTask(newTask);

        panel[key].task = [...panel[key].task, newTask];
        this.setState({ panel });

        toast("Task added!");
      } else {
        const index = this.state.indexEdit;
        const panel = [...this.state.panel];
        panel[key].show = false;

        const taskEdit = panel[key].task[index];

        taskEdit.name = this.state.name;
        taskEdit.description = this.state.description;
        taskEdit.indexEdit = this.state.indexEdit;
        taskEdit.panelId = panel[key]._id;

        panel[key].task[index] = taskEdit;

        http.updateTask(taskEdit, task._id);
        this.setState({ panel });
        toast("Task updated!");
      }
    } else {
      const panel = [...this.state.panel];
      panel[key].show = false;
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
  };

  removeFromList = async (list, index) => {
    const newList = [...list];
    const taskId = newList[index]._id;
    newList.splice(index, 1);

    await http.deleteTask(taskId);
    return newList;
  };

  addToList = async (taskList, index, task, listID) => {
    const newtaskList = [...taskList];
    const firstHalf = newtaskList.splice(0, index);
    const newTask = task;
    newTask.panelId = listID;
    const secondHalf = newtaskList;

    http.addTask(newTask);
    return [...firstHalf, task, ...secondHalf];
  };

  deleteTask = async (listIndex, taskIndex) => {
    console.log("pressed");
    let panel = [...this.state.panel];
    http.deleteTask(panel[listIndex].task[taskIndex]._id);
    delete panel[listIndex].task[taskIndex];
    this.setState({ panel });
    toast("Deleted task!");
  };

  deleteList = async (listIndex) => {
    console.log("pressed");
    let panel = [...this.state.panel];
    http.deleteList(panel[listIndex]._id);
    const tasks = [...panel[listIndex].task];

    tasks.forEach(async (element) => {
      await http.deleteTask(element._id);
    });

    const update = panel.filter((p) => p._id !== panel[listIndex]._id);
    this.setState({ panel: update });
    toast("Deleted list!");
  };

  editList = async (index) => {
    let show = this.state.show;
    show = true;
    this.setState({ show, titleChanged: index });
  };

  modalCloseButton = () => {
    this.setState({ show: false });
  };

  render() {
    const { user } = this.props;
    console.log(this.state);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <React.Fragment>
          <div className="d-flex flex-row flex-wrap justify-content-around align-content-around  p-2 ">
            {this.state.panel.map((item, index) => {
              return (
                <div
                  className="list-border d-flex flex-column justify-content-centre"
                  key={index}
                >
                  <List
                    listIndex={index}
                    title={item.title}
                    onDescp={this.handleDescpChange}
                    onName={this.handleNameChange}
                    onSModal={this.state.panel[index].show}
                    onModalEdit={(taskIndex) =>
                      this.onShowModalEdit(index, taskIndex)
                    }
                    onReg={(state) => this.onReg(index, state)}
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
                    user={user}
                  />
                </div>
              );
            })}
          </div>
          {user && (
            <Button variant="outline-dark" onClick={this.handleClick}>
              New List
            </Button>
          )}
          <MyVerticallyCenteredModal
            show={this.state.show}
            onTitleChange={this.handleTitle}
            onClick={this.reg}
            onClose={this.modalCloseButton}
          />
        </React.Fragment>
      </DragDropContext>
    );
  }
}

export default Board;
