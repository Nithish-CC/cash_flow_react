import { combineReducers } from "redux";
import { studentDetailsGet } from "../Actions/studentActions";
import { studentReducerGet } from "./studentReducer";

export const reducers = combineReducers({
  studentDetailsGet: studentReducerGet,
});
