import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  draggableId: string;
  index: number;
}

const CustomDraggable = (props: React.PropsWithChildren<Props>) => {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.children}
        </div>
      )}
    </Draggable>
  );
};

export default CustomDraggable;
