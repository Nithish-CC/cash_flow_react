import { Actiontypes } from "../constants/Actiontypes";
import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { toast, ToastContainer } from "react-toastify";
import { fecthYears } from "./yearsActions";
import { settinggradesection } from "./Setgrademasteractions";

export const gettinggradesection = () => async (dispatch) => {
  try {
    getAccessToken();
    const response = await axios.get(`${baseUrl}gradeSection`);
    dispatch(settinggradesection());
    dispatch(fecthYears());
    response.data.data.map((data, index) => {
      data.index = index + 1;
    }, dispatch({ type: Actiontypes.SET_GRADE, payload: response.data.data }));
  } catch (err) {
    alert(err);
  }
};
export const deletinggradesection = (gradeid) => async (dispatch) => {
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
};
export const postinggradeactions = (sendData, grade, setDuplication) => async (dispatch) => {
  getAccessToken();
  console.log(grade, "ds");
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
};
