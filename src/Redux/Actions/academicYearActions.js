import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../..";
import { toast } from "react-toastify";

export const academicFeesStudentDiscountData =
  (
    updateYearOfFee,
    updateDiscountFeeType,
    values,
    setEditingYearOfFee,
    getapi
  ) =>
  async (dispatch) => {
    try {
      getAccessToken();
      axios
        .put(`${baseUrl}studentdiscount/${values.student_payment_info_id}`, {
          discount_amount: updateYearOfFee,
          dis_feetype_id: updateDiscountFeeType,
        })
        .then((res) => {
          toast.success("Discount amount is saved successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setEditingYearOfFee({});
          getapi();
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {}
  };
