import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../utils/StrictModeDroppable";
import { getComponent } from "./getComponents";
import {
  motionComponents,
  looksComponents,
  eventsComponents,
} from "./SidebarConstants";

export default function Sidebar() {
  return (
    <div className="w-80 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="flex justify-between bg-blue-300 rounded-lg items-center p-2 w-full">
        <div className="text-2xl font-bold text-white p-2">
          Side Bar
        </div>
      </div>
      {/* Motion */}
      <div className="font-bold"> {"Motion"} </div>
      <StrictModeDroppable droppableId="sideArea-motion" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-motion my-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {motionComponents.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <>
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="my-2"
                      >
                        {getComponent(x)}
                      </li>
                      {snapshot.isDragging ?
                      <li
                        className="dnd-copy transform-none"
                      >
                        {getComponent(x)}
                      </li>
                    : null
                    }
                    </>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>

      {/* Looks */}
      <div className="font-bold"> {"Looks"} </div>
      <StrictModeDroppable droppableId="sideArea-looks" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-looks my-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {looksComponents.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <>
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="my-2"
                      >
                        {getComponent(x)}
                      </li>
                      {snapshot.isDragging ?
                      <li
                        className="dnd-copy transform-none"
                      >
                        {getComponent(x)}
                      </li>
                    : null
                    }
                    </>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>

      {/* Events */}
      <div className="font-bold"> {"Events"} </div>
      <StrictModeDroppable droppableId="sideArea-events" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-events my-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {eventsComponents.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <>
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="my-2"
                      >
                        {getComponent(x)}
                      </li>
                      {snapshot.isDragging ?
                      <li
                        className="dnd-copy transform-none"
                      >
                        {getComponent(x)}
                      </li>
                    : null
                    }
                    </>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
    </div>
  );
}
