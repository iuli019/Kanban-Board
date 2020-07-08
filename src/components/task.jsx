import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../App.css";

const Task = (props) => (
  <React.Fragment>
    <Draggable draggableId={String(props.id)} index={props.index}>
      {(provided) => {
        return (
          <div className="text">
            <h5
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {props.name}

              {/* {`${props.name}-${props.id}`} */}
            </h5>
          </div>
        );
      }}
    </Draggable>
  </React.Fragment>
);

export default Task;
