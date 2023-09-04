import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import UndoIcon from "@material-ui/icons/Undo";
import Paper from "@material-ui/core/Paper";

const TurnAntiClockWise = ({ comp_id }) => {
  const dispatch = useDispatch();
  const characterAngle = (angle) => dispatch(setCharacterAngle(angle));
  const character = useSelector((state) => state.character);
  const [angle, setAngle] = useState(0);

  // handle anti-clockwise rotation
  const handleClick = () => {
    let anti_angle = -1 * angle;
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + anti_angle}deg)`;
      characterAngle(character_angle.angle + anti_angle);
    }
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-500 p-2 my-3">
        <div className="grid grid-cols-3">
          <div className="text-white grid grid-cols-2">
            Turn <UndoIcon className="mx-2" />
          </div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={angle}
            onChange={(e) => {
              setAngle(parseInt(e.target.value));
            }}
          />
          <div className="text-white">degrees</div>
        </div>
        <div
          id={comp_id}
          onClick={() => handleClick()}
        >
        </div>
      </div>
    </Paper>
  );
};

export default TurnAntiClockWise;
