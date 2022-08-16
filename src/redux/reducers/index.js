import { combineReducers } from "redux";
import { gradeReducer } from "./gradereducers";
import { setgradeReducer } from "./setgrademasterreducer";
import { transportfeesReducer } from "./transportfeesReducer";
import { yearsReducer } from "./yearsReducer";
import { feemasterreducer } from "./feemasterreducer";
import { yearoffeereducer } from "./yearoffeereducer";

const reducers = combineReducers({
    allgradesections: gradeReducer,
    setgrademastersections: setgradeReducer,
    allYears: yearsReducer,
    allTransportfees: transportfeesReducer,
    feemaster: feemasterreducer,
    yearoffee: yearoffeereducer,
});
export default reducers;
