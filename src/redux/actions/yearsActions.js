import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import { ActionTypes } from "../constants/action-types";

export const fecthYears = () => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios.get(`${baseUrl}year`);
    response.data.data.map((data, index) => {
      data.index = index + 1;
    });
    dispatch({ type: ActionTypes.FETCH_YEARS, payload: response.data });
  } catch (err) {
    alert("Error");
  }
};

export const addYear = (acdYear) => async (dispatch) => {
  try {
    const res = await axios
      .post(`${baseUrl}year`, {
        academic_year: `${acdYear.fromYear}-${acdYear.toYear}`,
      })
      .then((res) => {
        if (res.data.data.insertId) {
          toast.success("Year Added Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(fecthYears());
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
    dispatch({
      type: ActionTypes.ADD_YEAR,
    });
  } catch (err) {
    alert("Error");
  }
};

export const deleteYear = (year, index) => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios.delete(`${baseUrl}year`, { data: { year_id: year } }).then((res) => {
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
    });
  } catch (err) {
    alert("Error");
  }
};
