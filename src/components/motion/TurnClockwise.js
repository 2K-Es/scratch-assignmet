import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import RedoIcon from "@material-ui/icons/Redo";
import Paper from "@material-ui/core/Paper";

const TurnClockWise = ({ comp_id }) => {
  const dispatch = useDispatch();
  const characterAngle = (angle) => dispatch(setCharacterAngle(angle));
  const character = useSelector((state) => state.character);
  const [angle, setAngle] = useState(0);

  // handle turn clockwise component
  const handleClick = () => {
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + angle}deg)`;
      characterAngle(character_angle.angle + angle);
    }
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-500 p-2 my-3">
        <div className="grid grid-cols-3">
          <div className="text-white grid grid-cols-2">
            Turn <RedoIcon className="mx-2" />
          </div>
          <input
            className="mx-1 p-1 py-0 text-center"
            type="number"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
          />
          <div className="text-white">degrees</div>
        </div>
        <div
          id={comp_id}
          // className={`flex bg-blue-700 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer text-center`}
          onClick={() => handleClick()}
        >
          {/* <div className="flex mx-auto">
            Turn
            <RedoIcon className="mx-2" /> {angle} degrees
          </div> */}
        </div>
      </div>
    </Paper>
  );
};

export default TurnClockWise;
