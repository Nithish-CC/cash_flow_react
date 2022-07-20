import { combineReducers } from "redux";
import { gradeReducer } from "./gradereducers";
import { setgradeReducer } from "./setgrademasterreducer";
import { yearsReducer } from "./yearsReducer";

const reducers = combineReducers({
    allgradesections: gradeReducer,
    setgrademastersections: setgradeReducer,
    allYears: yearsReducer,
});
export default reducers;
