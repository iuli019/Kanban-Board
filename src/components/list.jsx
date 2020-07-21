import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import MyVerticallyCenteredModal from "./taskBModal";
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
      <div className="d-inline-flex flex-row flex-wrap justify-content-center">
        <h4 className="mb-4">{props.title}</h4>
        {props.user && (
          <FontAwesomeIcon
            className="mt-2 ml-2"
            icon={faEdit}
            onClick={() => props.editList()}
          />
        )}
      </div>
      <Droppable droppableId={props.id}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="task mb-4"
            >
              {props.task.map((item, index) => {
                return (
                  <div
                    className="d-flex flex-column flex-wrap justify-content-center "
                    key={index}
                  >
                    <div className="">
                      <div>
                        <Task
                          className=""
                          name={item.name}
                          description={item.description}
                          id={item.id}
                          index={index}
                          delete={() => {
                            props.deleteTask(props.index, index);
                          }}
                          user={props.user}
                          onClick={() => showModalEdit(index)}
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
      <div className="d-flex flex-row justify-content-between">
        {props.user && (
          <button
            className="btn  btn-outline-dark button-modal"
            type="button"
            onClick={() => props.onModalNew(props.index)}
          >
            Add New Task
          </button>
        )}

        {props.user && (
          <FontAwesomeIcon
            className="mt-3"
            icon={faTrash}
            onClick={() => props.deleteList()}
          />
        )}
      </div>
      <MyVerticallyCenteredModal
        className="container"
        show={props.onSModal}
        onClose={reg}
        onNameChange={handleNameChange}
        onDescpChange={handleDescpChange}
        name={props.name}
        description={props.description}
      />
    </React.Fragment>
  );
};

export default List;
