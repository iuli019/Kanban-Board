import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal";
import "../App.css";
import Task from "./task";

const List = (props) => {
  const showModalEdit = (index) => {
    props.onModalEdit(index);
  };

  const handleNameChange = (e) => {
    props.onName(e);
  };

  const handleDescpChange = (e) => {
    props.onDescp(e);
  };

  const reg = () => {
    props.onReg();
  };
  if (!props.task) return null;
  else console.log(props.task);

  return (
    <React.Fragment>
      <div className="list-container">
        <div className="title">
          <h4>{props.title}</h4>
          <FontAwesomeIcon
            className="little"
            icon={faEdit}
            onClick={() => props.editList()}
          />
        </div>
        <Droppable droppableId={props.id}>
          {(provided) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.task.map((item, index) => {
                  return (
                    <div className="task" key={index}>
                      <div className="row">
                        <div
                          className="col"
                          onClick={() => showModalEdit(index)}
                        >
                          <Task
                            name={item.name}
                            description={item.description}
                            id={item.id}
                            index={index}
                          />
                        </div>
                        <div className="col">
                          <FontAwesomeIcon
                            onClick={() => {
                              props.deleteTask(props.index, index);
                            }}
                            className="icon"
                            icon={faTimesCircle}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <button
          className="btn  btn-outline-dark button-modal"
          type="button"
          onClick={() => props.onModalNew(props.index)}
        >
          Add New Task
        </button>

        <FontAwesomeIcon
          className="icon2"
          icon={faTrash}
          onClick={() => props.deleteList()}
        />
      </div>
      <Modal
        className="container"
        show={props.onSModal}
        onClose={reg}
        onNameChange={handleNameChange}
        onDescpChange={handleDescpChange}
        name={props.name}
        description={props.description}
      ></Modal>
    </React.Fragment>
  );
};

export default List;
