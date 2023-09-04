import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  midAreaLists: [
    {
      id: "midAreaList-0",
      comps: ["MOVE"],
    },
  ],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setList(state, action) {
      let index = state.midAreaLists.findIndex((x) => x.id === action.payload.id);
      let all_lists = state.midAreaLists;
      let [item] = all_lists.splice(index, 1);
      item.comps = action.payload.list;
      all_lists.splice(index, 0, item);

      state.midAreaLists = all_lists;
    },
    addList(state) {
      let old_list = state.midAreaLists;
      let new_list_add = {
        id: `midAreaList-${state.midAreaLists.length}`,
        comps: ["MOVE"],
      };
      old_list.push(new_list_add);
      state.midAreaLists = old_list;
    },
    removeList(state, action) {
      let old_list_remove = state.midAreaLists;
      old_list_remove.splice(action.payload, 1);
      state.midAreaLists = old_list_remove;
    },
  },
});

export const { setList, addList, removeList } = listSlice.actions;
export default listSlice.reducer;