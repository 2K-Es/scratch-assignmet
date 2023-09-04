import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../utils/StrictModeDroppable";
import { getComponent } from "./getComponents";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { green, purple } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import { addList, removeList } from "../redux/midarea/list";

// Styling for MaterialUI Components
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: 0,
    },
  })
);

// Customized button for Running Lists
const RunButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    fontSize: "13px",
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

// Mid Area Component
function MidArea(props) {

  const dispatch = useDispatch();
  const area_list = useSelector((state) => state.list);
  const event_values = useSelector((state) => state.event);


  const classes = useStyles();
  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  // Handle Running the list
  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;

    let repeat = 1;

    let str1 = `comp${arr[i]}-${id}-${i}`;

    // Handle Wait at first index
    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    }

    // Handle Repeat at first index
    else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    /* Each function execution takes 2 seconds */
    var cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
      }

      // Handle Wait
      if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      }
      // Handle Repeat Component at current index
      else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      }
      // If Repeat component is at previous index
      else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
  };
  
  return (
    <div className="flex-1 h-full overflow-auto p-3">
      <div className="flex justify-between bg-blue-300 rounded-lg items-center p-2">
        <div className="text-2xl font-bold text-white p-2">
          Mid Area
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => dispatch(addList())}
          >
            Add List{" "}
          </Button>
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<RemoveIcon />}
            onClick={() => dispatch(removeList(area_list.midAreaLists.length - 1))}
          >
            Remove List{" "}
          </Button>
        </div>
      </div>
      <div className="grid grid-flow-col mt-3">
        {area_list.midAreaLists.map((l) => {
          return (
            <div className="w-80" key={l.id}>
              <Paper elevation={2} className="p-4">
                <div className="w-72 border-gray-300 p-2">
                  <StrictModeDroppable droppableId={l.id} type="COMPONENTS">
                    {(provided) => {
                      return (
                        <ul
                          className={`${l.id} w-64 h-full`}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div className="text-center mx-auto my-2 mb-4">
                            <RunButton
                              variant="contained"
                              className={classes.button}
                              startIcon={<PlayArrowIcon />}
                              onClick={() => handleClick(l.comps, l.id)}
                            >
                              Run List{" "}
                            </RunButton>
                          </div>

                          {l.comps &&
                            l.comps.map((x, i) => {
                              let str = `${x}`;
                              let component_id = `comp${str}-${l.id}-${i}`;

                              return (
                                <Draggable
                                  key={`${str}-${l.id}-${i}`}
                                  draggableId={`${str}-${l.id}-${i}`}
                                  index={i}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {getComponent(str, component_id)}
                                      {provided.placeholder}
                                    </li>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </ul>
                      );
                    }}
                  </StrictModeDroppable>
                </div>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MidArea;
