import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../../index";
import { toast } from "react-toastify";
import { ActionTypes } from "../constants/action-types";

export const gettinggradesection = (year, master) => async (dispatch) => {
    try {
        getAccessToken();
        const response = await axios.get(`${baseUrl}gradeSection`);
        response.data.data.map((data, index) => {
            data.index = index + 1;
        }, dispatch({ type: ActionTypes.SET_GRADE, payload: response.data.data }));
        dispatch(settinggradeaction(response.data.data, year, master));
        dispatch(setfiltergradesection());
    } catch (err) {
        alert(err);
    }
};
export const deletinggradesection = (gradeid) => async (dispatch) => {
    try {
        getAccessToken();

        const deleted = await axios.delete(`${baseUrl}gradeSection?`, {
            data: { grade_section_id: gradeid },
        });

        if (deleted.data.data.isDeletable === true) {
            toast.success("Grade & Section Deleted Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(setfiltergradesection());
            dispatch(gettinggradesection());
        } else if (deleted.data.data.isDeletable === false) {
            toast.warning(`Data Exist in Year of Fee Master`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        dispatch(setfiltergradesection());
        dispatch(gettinggradesection());
    } catch (err) {
        alert(err);
    }
};
export const postinggradeactions = (sendData, setDuplication) => async (dispatch) => {
    try {
        getAccessToken();
        await axios
            .post(`${baseUrl}gradeSection`, sendData)
            .then((res) => {
                if (res.data.data.IsExsist === false) {
                    toast.success("Grade & Section Added Successfully", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(setfiltergradesection());
                    dispatch(gettinggradesection());
                } else if (res.data.data.IsExsist === true) {
                    toast.warning(`Data Already Added`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                dispatch(setfiltergradesection());
                dispatch(gettinggradesection());
                setDuplication(false);
            })
            .catch((err) => {
                setDuplication(false);
            });
    } catch (err) {
        alert(err);
    }
};
export const settinggradeaction = (grade, year, master) => async (dispatch) => {
    try {
        grade &&
            grade?.length &&
            grade.map((value) => {
                //index
                year &&
                    year?.length &&
                    year.map((years) => {
                        if (years.year_id === value.academic_year_id) value.academic_year = years.academic_year;
                    });
                master &&
                    master?.length &&
                    master.map((grades) => {
                        if (grades.grade_master_id === value.grade_id) value.grade_master = grades.grade_master;
                    });
            });
        dispatch({ type: ActionTypes.SET_GRADE_YEAR, payload: grade });
    } catch (err) {
        alert(err);
    }
};
export const setfiltergradesection = () => async (dispatch) => {
    getAccessToken();
    const allgrades = await axios.get(`${baseUrl}gradeSection/settingapicollection`);
    dispatch({
        type: ActionTypes.SET_All_VALUES,
        payload: allgrades.data.data,
    });
};
