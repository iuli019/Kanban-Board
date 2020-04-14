import React from "react";
import "./modal.css";
import { Draggable } from "react-beautiful-dnd";

const Task = (props) => (
  <React.Fragment>
    <Draggable draggableId={String(props.id)} index={props.index}>
      {(provided) => {
        return (
          <h5
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {`${props.name}-${props.id}`}
          </h5>
        );
      }}
    </Draggable>
  </React.Fragment>
);

export default Task;