import { combineReducers } from "redux";
import { studentReducerGet } from "./studentReducer";

export const reducers = combineReducers({
  studentDetailsGet: studentReducerGet,
});
