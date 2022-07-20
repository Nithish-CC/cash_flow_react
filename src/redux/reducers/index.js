import { combineReducers } from "redux";
import { gradeReducer } from "./gradereducers";
import { setgradeReducer } from "./setgrademasterreducer";
import { transportfeesReducer } from "./transportfeesReducer";
import { yearsReducer } from "./yearsReducer";

const reducers = combineReducers({
    allgradesections: gradeReducer,
    setgrademastersections: setgradeReducer,
    allYears: yearsReducer,
    allTransportfees: transportfeesReducer,
});
export default reducers;
