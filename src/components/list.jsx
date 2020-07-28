import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import MyVerticallyCenteredModal from "./taskModal";
import "../App.css";
import Task from "./task";

function List({
  onModalEdit,
  onName,
  onDescp,
  onReg,
  task,
  title,
  editList,
  id,
  listIndex,
  onModalNew,
  onSModal,
  deleteList,
  deleteTask,
  user,
  name,
  description,
}) {
  const showModalEdit = (index) => {
    onModalEdit(index);
  };

  const handleNameChange = (e) => {
    onName(e);
  };

  const handleDescpChange = (e) => {
    onDescp(e);
  };

  const reg = (state) => {
    onReg(state);
  };
  if (!task) return null;
  else console.log(task);

  return (
    <React.Fragment>
      <div className="d-inline-flex flex-row flex-wrap justify-content-center">
        <h4 className="mb-4">{title}</h4>
        {user && (
          <FontAwesomeIcon
            className="mt-2 ml-2"
            icon={faEdit}
            onClick={() => editList()}
          />
        )}
      </div>
      <Droppable droppableId={id}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="task mb-4"
            >
              {task.map((item, index) => {
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
                          deleteT={() => {
                            deleteTask(listIndex, index);
                          }}
                          user={user}
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
        {user && (
          <button
            className="btn  btn-outline-dark button-modal"
            type="button"
            onClick={() => onModalNew(listIndex)}
          >
            Add New Task
          </button>
        )}

        {user && (
          <FontAwesomeIcon
            className="mt-3"
            icon={faTrash}
            onClick={() => deleteList()}
          />
        )}
      </div>
      <MyVerticallyCenteredModal
        className="container"
        show={onSModal}
        onClose={reg}
        onNameChange={handleNameChange}
        onDescpChange={handleDescpChange}
        name={name}
        description={description}
      />
    </React.Fragment>
  );
}

export default List;
