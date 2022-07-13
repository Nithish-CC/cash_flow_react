import { combineReducers } from "redux";
import { yearsReducer, selectedYearsReducer } from "./yearsReducer";
const reducers = combineReducers({
    allYears: yearsReducer,
    allStudents: studentsReducer,
});
export default reducers;
