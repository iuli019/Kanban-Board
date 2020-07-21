import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Task = (props) => (
  <React.Fragment>
    <Draggable draggableId={String(props.id)} index={props.index}>
      {(provided) => {
        return (
          <div
            className="btask d-flex flex-row justify-content-between mr-2  m-1"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h5 className="m-2 " onClick={props.onClick}>
              {props.name}
            </h5>
            <div className="m-2">
              {props.user && (
                <FontAwesomeIcon
                  onClick={props.delete}
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

export default Task;
