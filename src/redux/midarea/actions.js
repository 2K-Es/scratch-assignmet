import { SET_LIST, ADD_LIST, REMOVE_LIST } from "./types";

export const updateList = (id, new_list) => {
  return {
    type: SET_LIST,
    list: new_list,
    id: id,
  };
};

export const addList = () => {
  return {
    type: ADD_LIST,
  };
};

export const removeList = (index) => {
  return {
    type: REMOVE_LIST,
    index: index,
  };
}