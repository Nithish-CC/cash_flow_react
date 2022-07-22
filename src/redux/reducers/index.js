import { combineReducers } from "redux";
import { gradeReducer } from "./gradereducers";
import { setgradeReducer } from "./setgrademasterreducer";
import { studentReducerGet } from "./studentReducer";
import { yearsReducer } from "./yearsReducer";

const reducers = combineReducers({
  studentDetailsGet: studentReducerGet,
  allgradesections: gradeReducer,
  setgrademastersections: setgradeReducer,
  allYears: yearsReducer,
});
export default reducers;
