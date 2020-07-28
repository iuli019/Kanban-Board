import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function Task({ id, index, onClick, name, user, deleteT }) {
  return (
    <React.Fragment>
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => {
          return (
            <div
              className="btask d-flex flex-row justify-content-between mr-2  m-1"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <h5 className="m-2 " onClick={onClick}>
                {name}
              </h5>
              <div className="m-2">
                {user && (
                  <FontAwesomeIcon
                    onClick={deleteT}
                    className="icon"
                    icon={faTimesCircle}
                  />
                )}
              </div>
            </div>
          );
        }}
      </Draggable>
    </React.Fragment>
  );
}

export default Task;
