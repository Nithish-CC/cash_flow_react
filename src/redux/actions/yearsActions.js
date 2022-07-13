import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../..";
import { getAccessToken } from "../../config/getAccessToken";
import { ActionTypes } from "../constants/action-types";

export const fecthYears = () => {
    return async function (dispatch, getState) {
        getAccessToken();
        const response = await axios.get(`${baseUrl}year`);
        console.log(response);
        response.data.data.map((data, index) => {
            data.index = index + 1;
        });
        dispatch({ type: ActionTypes.FETCH_YEARS, payload: response.data });
    };
};
export const addYear = (acdYear) => {
    return async function (dispatch, getState) {
        getAccessToken();
        const response = await axios
            .post(`${baseUrl}year`, {
                academic_year: `${acdYear.fromYear}-${acdYear.toYear}`,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.data.insertId) {
                    toast.success("Year Added Successfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch({ type: ActionTypes.ADD_YEAR, payload: response });
                } else {
                    toast.warning("Year Already Added", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
    };
};

export const deleteYear = (year, index) => {
    return async function (dispatch, getState) {
        getAccessToken();
        const response = await axios
            .delete(`${baseUrl}year`, { data: { year_id: year } })
            .then((res) => {
                if (res.data.data.isDeletable) {
                    toast.success("Year Deleted Successfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    dispatch(fecthYears());
                } else if (res.data.data.isDeletable === false) {
                    toast.warning("Year Existing in Grade&Section", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
        console.log(response);
    };
};

export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product,
    };
};
export const removeSelectedProduct = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_PRODUCT,
    };
};
