import React from "react";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  id: string;
}

const CustomDroppable = (props: React.PropsWithChildren<Props>) => {
  return (
    <Droppable droppableId={props.id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {props.children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CustomDroppable;
