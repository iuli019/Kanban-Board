import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import MyVerticallyCenteredModal from "./listModal";
import List from "./list";
import http from "../services/httpService";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

function Board(props) {
  const [panel, setPanel] = useState([
    // { id: "45676", show: false, task: [], title: "", __v: "", _id: "" },
  ]);
  const [show, setShow] = useState(false);

  const [name, setName] = useState();
  const [description, setDescp] = useState();
  const [title, setTitle] = useState();

  const [taskId, setTaskId] = useState();
  const [indexEdit, setIndexEdit] = useState(0);
  const [titleIndex, setTitleIndex] = useState();

  console.log(panel);
  const populatePanel = async () => {
    const panel = await http.getPanels();
    const task = await http.getTasks();

    const newPanel = panel.map((panel) => {
      const taskList = task.filter((task) => task.panelId === panel._id);
      panel = { ...panel, task: taskList };

      return panel;
    });

    setPanel(newPanel);
  };

  useEffect(() => {
    populatePanel();
  }, []);

  const onNewList = () => {
    setShow(true);
    setTitleIndex(-1);
  };

  const manageLists = async (title) => {
    if (titleIndex >= 0) {
      let titleUpdate = [...panel];
      titleUpdate[titleIndex].title = title;

      http.updatePanel(titleUpdate[titleIndex], titleUpdate[titleIndex]._id);

      setShow(false);
      setPanel(titleUpdate);

      toast("Updated list!");
    } else {
      const aPanel = [...panel];
      const newPanel = { show: false, title: title, id: uuidv4() };

      const addedPanel = await http.addPanel(newPanel);
      addedPanel.task = [];
      const update = [...aPanel, addedPanel];

      setShow(false);
      setPanel(update);
      toast("List added!");
    }
  };

  const setTask = (indexLista, state) => {
    const task = {
      name,
      description,
      index: indexEdit,
      id: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      _id: taskId,
    };
    manageTasks(task, indexLista, state);
  };

  const showModalNew = (index) => {
    const newPanel = [...panel];

    newPanel[index].show = true;

    setPanel(newPanel);
    setName("");
    setDescp("");
    setIndexEdit(-1);
  };

  const showModalEdit = (index, taskIndex) => {
    const key = index;

    const taskPanel = [...panel];
    taskPanel[key].show = true;

    setPanel(taskPanel);
    setName(panel[key].task[taskIndex].name);
    setDescp(panel[key].task[taskIndex].description);
    setIndexEdit(taskIndex);
    setTaskId(panel[key].task[taskIndex]._id);
  };

  const manageTasks = async (task, indexLista, state) => {
    const key = indexLista;

    if (state) {
      if (task.index === -1) {
        const update = [...panel];
        update[key].show = false;

        const newTask = { ...task, panelId: update[key]._id, indexEdit: 0 };
        const addedTask = await http.addTask(newTask);

        console.log(addedTask);
        update[key].task = [...update[key].task, addedTask];

        setPanel(update);
        toast("Task added!");
      } else {
        const index = indexEdit;
        const update = [...panel];
        update[key].show = false;

        const taskEdit = update[key].task[index];
        taskEdit.name = name;
        taskEdit.description = description;
        taskEdit.indexEdit = indexEdit;
        taskEdit.panelId = update[key]._id;

        update[key].task[index] = taskEdit;

        http.updateTask(taskEdit, task._id);

        setPanel(update);
        toast("Task updated!");
      }
    } else {
      const hPanel = [...panel];
      hPanel[key].show = false;
      setPanel(hPanel);
    }
  };

  const modalCloseButton = () => {
    setShow(false);
  };

  const onDragEnd = async (result) => {
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

    const sourceList = panel.find((list) => list.id === source.droppableId);
    const destinationList = panel.find(
      (list) => list.id === destination.droppableId
    );

    const sourceListIndex = panel.findIndex(
      (list) => list.id === source.droppableId
    );
    const destinationListIndex = panel.findIndex(
      (list) => list.id === destination.droppableId
    );

    const newSourceList = {
      ...sourceList,
      task: removeFromList(sourceList.task, source.index),
    };

    const panels = [...panel];

    const newDestinationList = {
      ...destinationList,
      task: addToList(
        source.droppableId === destination.droppableId
          ? newSourceList.task
          : destinationList.task,
        destination.index,
        sourceList.task[source.index],
        source.droppableId === destination.droppableId
          ? panels[sourceListIndex]._id
          : panels[destinationListIndex]._id
      ),
    };

    const newPanel = [...panel];
    newPanel[sourceListIndex] = newSourceList;
    newPanel[destinationListIndex] = newDestinationList;

    setPanel(newPanel);

    await updateTask(
      sourceList.task[source.index],
      source.droppableId === destination.droppableId
        ? panels[sourceListIndex]._id
        : panels[destinationListIndex]._id
    );
  };

  const removeFromList = (list, index) => {
    const newList = [...list];
    const taskId = newList[index]._id;
    newList.splice(index, 1);

    // await http.deleteTask(taskId);
    return newList;
  };

  const addToList = (taskList, index, task, listID) => {
    const newtaskList = [...taskList];
    const firstHalf = newtaskList.splice(0, index);
    const newTask = { ...task };
    newTask.panelId = listID;
    const secondHalf = newtaskList;

    // http.addTask(newTask);
    return [...firstHalf, task, ...secondHalf];
  };

  const updateTask = async (task, destinationListID) => {
    const movedTask = { ...task };
    movedTask.panelId = destinationListID;
    await http.updateTask(movedTask, movedTask._id);
  };

  const deleteTask = async (listIndex, taskIndex) => {
    let panels = [...panel];
    http.deleteTask(panels[listIndex].task[taskIndex]._id);
    delete panels[listIndex].task[taskIndex];

    setPanel(panels);
    toast("Deleted task!");
  };

  const deleteList = async (listIndex) => {
    let panels = [...panel];
    http.deleteList(panels[listIndex]._id);

    const tasks = [...panels[listIndex].task];
    tasks.forEach(async (element) => {
      await http.deleteTask(element._id);
    });

    const update = panels.filter((p) => p._id !== panel[listIndex]._id);

    setPanel(update);
    toast("Deleted list!");
  };

  const editList = async (index) => {
    let listShow = show;
    listShow = true;

    setShow({ listShow });
    setTitleIndex(index);
  };

  const { user } = props;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <React.Fragment>
        <div className="d-flex flex-row flex-wrap justify-content-around align-content-around  p-2 ">
          {panel.map((item, index) => {
            return (
              <div
                className="list-border d-flex flex-column justify-content-centre"
                key={index}
              >
                <List
                  listIndex={index}
                  title={item.title}
                  onDescp={(e) => {
                    setDescp(e);
                  }}
                  onName={(e) => {
                    setName(e);
                  }}
                  onSModal={panel[index].show}
                  onModalEdit={(taskIndex) => showModalEdit(index, taskIndex)}
                  onTaskEdit={(state) => setTask(index, state)}
                  task={item.task}
                  onModalNew={() => showModalNew(index)}
                  name={name}
                  description={description}
                  id={panel[index].id}
                  className="col"
                  deleteTask={(listIndex, taskIndex) =>
                    deleteTask(listIndex, taskIndex)
                  }
                  deleteList={() => deleteList(index)}
                  editList={() => editList(index)}
                  user={user}
                />
              </div>
            );
          })}
        </div>
        {user && (
          <Button variant="outline-dark" onClick={onNewList}>
            New List
          </Button>
        )}
        <MyVerticallyCenteredModal
          show={show}
          onTitleChange={(e) => {
            setTitle(e);
          }}
          onClick={() => {
            manageLists(title);
          }}
          onClose={modalCloseButton}
        />
      </React.Fragment>
    </DragDropContext>
  );
}
export default Board;
