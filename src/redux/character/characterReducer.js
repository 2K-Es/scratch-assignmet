import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [{ id: "sprite-1", angle: 0 }],
  active: "sprite-1",
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setActiveCharacter(state, action) {
      state.active = action.payload;
    },
    addCharacter(state, action) {
      state.characters.push({
        id: `sprite-${state.characters.length + 1}`,
        angle: 0,
      });
    },
    setAngle(state, action) {
      const curr_character = state.characters.find(
        (character) => character.id === state.active
      );
      const curr_character_index = state.characters.findIndex(
        (character) => character.id === state.active
      );
      if (curr_character_index > -1) {
        curr_character.angle = action.payload;
        state.characters[curr_character_index] = curr_character;
      }
    },
  }
});

export const { setActiveCharacter, addCharacter, setAngle } = characterSlice.actions;
export default characterSlice.reducer;