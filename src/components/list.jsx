import React from "react";
import Modal from "./modal";
import "../App.css";
import Task from "./task";
import { Droppable } from "react-beautiful-dnd";

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
        <h4 className="title">{props.title}</h4>
        <Droppable droppableId={props.id}>
          {(provided) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.task.map((item, index) => {
                  return (
                    <div key={index} onClick={() => showModalEdit(index)}>
                      <Task
                        name={item.name}
                        description={item.description}
                        id={item.id}
                        index={index}
                      />
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
