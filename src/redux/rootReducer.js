// import { combineReducers } from "redux";
// import { characterReducer } from "./character/characterReducer";
// import { eventReducer } from "./events/eventReducer";
// import { listReducer } from "./midarea/list";

// export const rootReducer = combineReducers({
//   character: characterReducer,
//   list: listReducer,
//   event: eventReducer,
// });

import { combineReducers } from "redux";
import characterSlice from "./character/characterReducer";
import listSlice from "./midarea/list";
import eventSlice from "./events/eventReducer";

export const rootReducer = combineReducers({
  character: characterSlice,
  list: listSlice,
  event: eventSlice,
});