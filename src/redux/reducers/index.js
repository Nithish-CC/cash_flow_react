import { combineReducers } from "redux";
import { gradeReducer } from "./gradereducers";
import { setgradeReducer } from "./setgrademasterreducer";
const reducers = combineReducers({
  allgradesections: gradeReducer,
  setgrademastersections: setgradeReducer,
});
export default reducers;
