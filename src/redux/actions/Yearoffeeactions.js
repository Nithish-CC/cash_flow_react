import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { ActionTypes } from "../constants/action-types";
import { toast } from "react-toastify";

export const deleteyearoffee = (fee_master_id, frontSearchYear, frontSearchGrade) => async (dispatch) => {
  try {
    getAccessToken();
    axios.delete(`${baseUrl}yearOffee/`, { data: { year_of_fees_id: fee_master_id } }).then((res) => {
      if (res.data.data.isDeletable === false) {
        toast.warning("Students exists On Year oF Fee");
      } else {
        toast.success("Year oF Fee Deleted Successsfully");
      }
      dispatch({ type: ActionTypes.DELETE_YEAR_OF_FEE, payload: fee_master_id });
      // dispatch(yearoffeeactions(frontSearchYear, frontSearchGrade));
    });
  } catch (err) {
    alert(err);
  }
};
export const yearoffeeactions = (year_id, grade_id) => async (dispatch) => {
  try {
    getAccessToken();
    const yearresponse = await axios.post(`${baseUrl}yearOffee`, {
      grade_id: grade_id,
      year_id: year_id,
    });
    yearresponse.data.data.map((map) => {
      map.optional_fee = map?.optional_fee === 1 ? true : false;
      return null;
    });
    dispatch({ type: ActionTypes.GET_YEAR_OF_FEE, payload: yearresponse.data.data });
  } catch (err) {
    alert(err);
  }
};
export const addYearOfFee = (values) => async (dispatch) => {
  try {
    getAccessToken();
    const yearresponse = await axios.post(`${baseUrl}yearOffee/create_new_yearfee`, values);

    if (yearresponse.data.message.includes("Year of Fee already present")) {
      toast.warning(yearresponse.data.message);
    } else if (yearresponse.data.message.includes("Year of Fee inserted")) {
      toast.success("Saved successfully");
    }
  } catch (err) {
    toast.warning("Enter Correct data");
  }
};
