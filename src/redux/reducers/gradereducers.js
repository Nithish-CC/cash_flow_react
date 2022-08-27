import { ActionTypes } from "../constants/action-types";

const initialState = {
    grades: [],
    post_grades: [],
    year_grade_section: [],
    all_data_section: [],
};
export const gradeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_GRADE:
            return { ...state, grades: payload };
        case ActionTypes.CREATE_GRADE_SECTION:
            return { ...state, post_grades: payload };
        case ActionTypes.SET_GRADE_YEAR:
            return { ...state, year_grade_section: payload };
        case ActionTypes.SET_All_VALUES:
            return { ...state, all_data_section: payload };
        default:
            return state;
    }
};
