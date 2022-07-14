import { Actiontypes } from "../constants/Actiontypes";
import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { toast } from "react-toastify";

export const gettinggradesection = () => async (dispatch) => {
  getAccessToken();
  const response = await axios.get(`${baseUrl}gradeSection`);
  response.data.data.map((data, index) => {
    data.index = index + 1;
  }, dispatch({ type: Actiontypes.SET_GRADE, payload: response.data.data }));
};
export const deletinggradesection = (gradeid) => async (dispatch) => {
  getAccessToken();
  console.log(gradeid, "louder");
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
