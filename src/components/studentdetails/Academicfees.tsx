import { useState, useEffect } from "react";
import { Table, Button, Col, Spinner, Form } from "react-bootstrap";
import "../../assets/vendor/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  academicFeesDiscountTypeData,
  academicFeesSchoolDetailsData,
  academicFeesSetAcademicYearData,
  academicFeesSetFeeMasterIdData,
  academicFeesStudentDiscountData,
  academicfeesStudentDiscountData2,
  academicYearStudentYearData,
} from "../../Redux/Actions/academicYearActions";

const Academicfees = (props: any) => {
  const urlParams: any = useParams();
  const id = urlParams.id;

  const [academicYear, setAcademicYear] = useState<any>([]);
  const [academic, setAcademic] = useState<any>();
  const [total, setTotal] = useState<any>({
    Total_initial_fees: 0,
    Total_balance: 0,
    Total_discount: 0,
  });

  let student_id = props.studentDetails.student_id;
  const [studentdiscount, setstudentdiscount] = useState<any>([]);
  const [spinnerLoad, setSpinnerLoad] = useState<any>(false);
  const [feemasterid, setfeemasterid] = useState<any>([]);
  const [mergedata, setmergedata] = useState<any[]>([]);
  const [Merdattwpus, setMerdattwpus] = useState<any>([]);
  const [editingdiscount, setEditingYearOfFee] = useState<any>({});
  const [discounttt, setdiscounttt] = useState<any>([]);
  const [discountallrecord, setDiscountallrecord] = useState<any>([]);
  const [updateYearOfFee, setUpdateYearOfFee] = useState<any>([]);
  const [updateDiscountFeeType, setUpdateDiscountFeeType] = useState<any>([]);
  const [termsmaster, setTermsmaster] = useState<any>("Term1");
  const [gotSchoolDetails, setGotSchoolDetails] = useState<any>([]);
  const [finalterms, setFinalterms] = useState<any>([]);

  const dispatch = useDispatch<any>();

  const studentYearData = useSelector(
    (state: any) =>
      state.studentDetailsGet.academicFeesStuYearPostRed?.data?.data
  );

  useEffect(() => {
    if (studentYearData && studentYearData?.length) {
      setAcademic(studentYearData);
      setAcademicYear(studentYearData[0].year_id);
    }
  }, [studentYearData]);

  const studentDiscountData = useSelector(
    (state: any) =>
      state.studentDetailsGet.academicFeesStudentDiscount2Red?.data?.data
  );

  useEffect(() => {
    if (studentDiscountData && studentDiscountData?.length) {
      setstudentdiscount(studentDiscountData);
      setSpinnerLoad(false);
    } else if (studentDiscountData && studentDiscountData?.length === 0) {
    }
  }, [studentDiscountData]);
  const discountType = useSelector(
    (state: any) => state.studentDetailsGet.academicFeesDiscountTypeRed
  );

  const feeId = useSelector(
    (state: any) => state.studentDetailsGet.feesDetails_SetFeeMasterId
  );

  const handlespechar = (values: any, char: any) => {
    let pattern = /[^0-9]/g;
    let result = char.toString().match(pattern);

    if (result && result.length >= 1) {
      toast.warning("Enter only Number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(
        academicFeesStudentDiscountData(
          updateYearOfFee,
          discountType,
          values,
          setEditingYearOfFee,
          getapi
        )
      );
    }
  };
  useEffect(() => {
    if (student_id && student_id.toString().length) yearacademic();
  }, [student_id]);

  useEffect(() => {
    if (termsmaster !== "") {
      getapi();
    }
  }, [academicYear, termsmaster]);

  useEffect(() => {
    feemaster();
    discountname();
  }, []);

  useEffect(() => {
    studentdiscount && studentdiscount.length
      ? studentdiscount.map((data: any) => {
          studentyear(data);
        })
      : setMerdattwpus([]);
  }, [studentdiscount]);

  useEffect(() => {
    fetchData();
  }, [Merdattwpus]);

  const yearacademic = () => {
    dispatch(academicYearStudentYearData(id, student_id));
    dispatch(
      academicFeesSetAcademicYearData(
        id,
        student_id,
        setAcademic,
        setAcademicYear
      )
    );
  };

  const feemaster = () => {
    dispatch(academicFeesSetFeeMasterIdData());
  };
  const getapi = () => {
    setSpinnerLoad(true);
    dispatch(academicfeesStudentDiscountData2(id, academicYear, termsmaster));
  };
  function studentyear(gradedata: any) {
    var matchedyearid: any =
      feemasterid &&
      feemasterid.length &&
      feemasterid.filter(
        (data: any) => data.fee_master_id === gradedata.fee_master_id
      );
    let combindobject = { ...gradedata, ...matchedyearid[0] };
    setmergedata([]);
    mergedata.push(combindobject);
    setMerdattwpus(mergedata);
  }

  const discountname = () => {
    dispatch(academicFeesDiscountTypeData());
  };

  useEffect(() => {
    if (discountType && discountType.length && discountType[1]) {
      setUpdateDiscountFeeType(discountType[1].dis_feetype_id);
    }
  }, [discountname]);

  const updateDiscount = (values: any) => {};

  function setdiscountt(gdata: any) {
    var matcheddiscou: any =
      discountType &&
      discountType.length &&
      discountType.filter(
        (data: any) => data.dis_feetype_id === gdata.dis_feetype_id
      );
    let margedat = { ...matcheddiscou[0], ...gdata };
    discounttt.push(margedat);
    setDiscountallrecord(discounttt);
  }
  const fetchData = () => {
    setdiscounttt([]);
    Merdattwpus && Merdattwpus.length
      ? Merdattwpus.map((data: any) => {
          setdiscountt(data);
        })
      : setDiscountallrecord([]);
  };

  const Total = () => {
    let Total_initial_fees = 0;
    let Total_discount = 0;
    let Total_balance = 0;
    discountallrecord.map((value: any) => {
      Total_initial_fees = Number(value.term_amount) + Total_initial_fees;
      Total_balance = Number(value.balance) + Total_balance;
      Total_discount = value.discount_amount + Total_discount;
    });
    setTotal({
      Total_initial_fees: Total_initial_fees,
      Total_balance: Total_balance,
      Total_discount: Total_discount,
    });
  };

  useEffect(() => {
    Total();
  }, [discountallrecord]);

  useEffect(() => {
    dispatch(academicFeesSchoolDetailsData(setGotSchoolDetails));
  }, []);

  useEffect(() => {
    ShowingTermsValue(gotSchoolDetails);
  }, [gotSchoolDetails]);

  const ShowingTermsValue = (termsss: any) => {
    {
      termsss &&
        termsss.length &&
        termsss.map((terms: any) => {
          let termscount = [];
          for (var i = 1; i <= terms.max_count; i++) {
            termscount.push("Term" + i);
          }
          setFinalterms(termscount);
        });
    }
  };

  feeId &&
    feeId.length &&
    feeId.map((value: any) => {
      discountallrecord &&
        discountallrecord.length &&
        discountallrecord.map((feeTypeName: any) => {
          if (feeTypeName.fee_master_id === value.fee_master_id)
            feeTypeName.fee_type_name = value.fee_type_name;
        });
    });

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="row mt-4">
        <div className="col-lg-11">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h4 className="m-0 text-danger text-center">
                <a>
                  <i className="far fa-clone"></i> Student Academic Fees
                </a>
              </h4>

              <Col sm="2" style={{ float: "right", marginBottom: "1px" }}>
                <Form.Select
                  onChange={(e: any) => {
                    setTermsmaster(e.target.value);
                  }}
                >
                  {finalterms &&
                    finalterms.length &&
                    finalterms.map((count: any) => {
                      return <option value={count}>{count}</option>;
                    })}
                </Form.Select>
              </Col>

              <Col sm="2" style={{ float: "right", marginRight: "10px" }}>
                <Form.Select
                  onChange={(e: any) => setAcademicYear(e.target.value)}
                >
                  {academic &&
                    academic.length &&
                    academic.map((value: any, i: any) => {
                      return (
                        <>
                          <option value={value.year_id}>
                            {value.academic_year}
                          </option>
                        </>
                      );
                    })}
                </Form.Select>
              </Col>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12">
                  <Table
                    striped
                    bordered
                    hover
                    width="100%"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr role="row">
                        <th>Fee Type Name</th>
                        <th style={{ textAlign: "center" }}>Actual Fees</th>
                        <th>Term Amount</th>
                        <th>Balance</th>
                        <th>Discount</th>
                        <th>Fee Discount Type</th>
                        {/* <th style={{ textAlign: "center" }}>Updated Fees</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spinnerLoad ? (
                        <td colSpan={4}>
                          <Spinner animation="border" variant="danger" />
                        </td>
                      ) : discountallrecord && discountallrecord.length ? (
                        discountallrecord.map((values: any, index: any) => {
                          return (
                            <tr style={{ textAlign: "center" }}>
                              <td>{values.fee_type_name}</td>
                              <td>{values.actual_fees}</td>
                              <td>{values.term_amount}</td>
                              <td>{values.balance}</td>
                              {index !== editingdiscount.id ? (
                                <td>
                                  <div>{values.discount_amount}</div>
                                </td>
                              ) : (
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={updateYearOfFee}
                                    onChange={(e: any) => {
                                      Number(values.balance) <
                                      Number(e.target.value)
                                        ? alert("Discount Greater the Balance")
                                        : setUpdateYearOfFee(e.target.value);
                                    }}
                                  />
                                </td>
                              )}
                              {index !== editingdiscount.id ? (
                                <td>
                                  <div>{values.dis_feetype_name}</div>
                                </td>
                              ) : (
                                <td>
                                  <Form.Select
                                    value={discountType}
                                    onChange={(e) =>
                                      setUpdateDiscountFeeType(e.target.value)
                                    }
                                  >
                                    {discountType &&
                                      discountType.length &&
                                      discountType.map((value: any, i: any) => {
                                        return (
                                          <>
                                            {value.dis_feetype_name !==
                                              "No Discount" && (
                                              <option
                                                value={value.dis_feetype_id}
                                              >
                                                {value.dis_feetype_name}
                                              </option>
                                            )}
                                          </>
                                        );
                                      })}
                                  </Form.Select>
                                </td>
                              )}
                              {index == editingdiscount.id ? (
                                <>
                                  <td>
                                    <Button
                                      variant="warning"
                                      onClick={() => {
                                        updateDiscount(values);
                                        handlespechar(values, updateYearOfFee);
                                      }}
                                    >
                                      Update
                                    </Button>
                                    {"  "}
                                    <Button
                                      variant="secondary"
                                      onClick={() => {
                                        setEditingYearOfFee({});
                                        setUpdateYearOfFee("");
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  {props.studentDetails.status === "Active" ? (
                                    <>
                                      <td>
                                        <Button
                                          variant="primary"
                                          onClick={() => {
                                            setUpdateYearOfFee(
                                              Number(values.discount_amount)
                                            );
                                            setEditingYearOfFee({
                                              id: index,
                                            });
                                          }}
                                        >
                                          Edit
                                        </Button>
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td>
                                        <Button
                                          variant="primary"
                                          onClick={() => {
                                            setUpdateYearOfFee(
                                              Number(values.discount_amount)
                                            );
                                            setEditingYearOfFee({
                                              id: index,
                                            });
                                          }}
                                          disabled
                                        >
                                          Edit
                                        </Button>
                                      </td>
                                    </>
                                  )}
                                </>
                              )}
                            </tr>
                          );
                        })
                      ) : (
                        <>
                          <tr>
                            <td colSpan={7} style={{ textAlign: "center" }}>
                              No Term Fees
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th style={{ textAlign: "center" }}>Total</th>
                        <th style={{ textAlign: "center" }}>
                          {total.Total_initial_fees}
                        </th>
                        <th style={{ textAlign: "center" }}>
                          {total.Total_balance}
                        </th>
                        <th style={{ textAlign: "center" }}>
                          {total.Total_discount}
                        </th>
                        <th style={{ textAlign: "center" }}></th>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Academicfees;
