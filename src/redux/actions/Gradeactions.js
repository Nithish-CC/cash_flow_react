import { Actiontypes } from "../constants/Actiontypes";
import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { toast } from "react-toastify";

export const gettinggradesection = (year, master) => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios.get(`${baseUrl}gradeSection`);

    response.data.data.map((data, index) => {
      data.index = index + 1;
    }, dispatch({ type: Actiontypes.SET_GRADE, payload: response.data.data }));
    dispatch(settinggradeaction(response.data.data, year, master));
  } catch (err) {
    alert(err);
  }
};
export const deletinggradesection = (gradeid) => async (dispatch) => {
  try {
    getAccessToken();

    await axios
      .delete(`${baseUrl}gradeSection?`, {
        data: { grade_section_id: gradeid },
      })
      .then((res) => {
        if (res.data.data.isDeletable === true) {
          toast.success("Grade & Section Deleted Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(gettinggradesection());
        } else if (res.data.data.isDeletable === false) {
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

        dispatch(gettinggradesection());
      })
      .catch((e) => {
        toast.error("Grade & Section Deletion Error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  } catch (err) {
    alert(err);
  }
};
export const postinggradeactions = (sendData, grade, setDuplication) => async (dispatch) => {
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
    dispatch({ type: Actiontypes.SET_GRADE_YEAR, payload: grade });
  } catch (err) {
    alert(err);
  }
};