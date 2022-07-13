import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Spinner, Form } from "react-bootstrap";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import axios from "axios";
import "../../assets/vendor/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

const Academicfees = (props: any) => {
  //table status edit
  const urlParams: any = useParams();
  const id = urlParams.id;

  console.log(props.studentDetails.status, "++iss");

  const [updateTableStatus, setUpdateTableStatus] = useState(false);
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
  const [studentdis, setStudentDis] = useState<any>([]);
  const [mergedata, setmergedata] = useState<any[]>([]);
  const [Merdattwpus, setMerdattwpus] = useState<any>([]);
  const [studentdisco, setStudentDisc] = useState<any>([]);
  const [Yearidd, setYearidd] = useState<any>([]);
  const [editingdiscount, setEditingYearOfFee] = useState<any>({});
  const [discounttype, setDiscounttype] = useState<any>({});
  const [discou, setdiscou] = useState<any>([]);
  const [discounttt, setdiscounttt] = useState<any>([]);
  const [discountallrecord, setDiscountallrecord] = useState<any>([]);
  const [updateYearOfFee, setUpdateYearOfFee] = useState<any>([]);
  const [updateDiscountFeeType, setUpdateDiscountFeeType] = useState<any>([]);
  // console.log(admission_id);
  const [termsmaster, setTermsmaster] = useState<any>("Term1");
  const [gotSchoolDetails, setGotSchoolDetails] = useState<any>([]);
  const [finalterms, setFinalterms] = useState<any>([]);

  const mobileNoPattern = /[`@,~,.<>;':"\/\[\]\|{}()-=_+]/;

  const handlespechar = (values: any, char: any) => {
    let text = "123456789!@#$%fgfgdgdfgdfg";
    let pattern = /[^0-9]/g;
    let result = char.toString().match(pattern);
    console.log(result);

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
      getAccessToken();
      axios
        .put(`${baseUrl}studentdiscount/${values.student_payment_info_id}`, {
          discount_amount: updateYearOfFee,
          dis_feetype_id: updateDiscountFeeType,
        })
        .then((res: any) => {
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
        .catch((e: any) => {
          console.log(e);
        });
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

  useEffect(() => {}, []);

  const yearacademic = () => {
    getAccessToken();
    console.log(student_id);
    axios
      .post(`${baseUrl}studentyear`, {
        student_admissions_id: Number(id),
        student_id: student_id,
      })
      .then((res: any) => {
        setAcademic(res.data.data);
        setAcademicYear(res.data.data[0].year_id);
      })
      .catch((e: any) => {});
  };

  const feemaster = () => {
    getAccessToken();
    axios.get(`${baseUrl}feeMaster`).then((res: any) => {
      setfeemasterid(res.data.data);
    });
  };
  const getapi = () => {
    setSpinnerLoad(true);
    getAccessToken();
    axios
      .post(`${baseUrl}studentdiscount`, {
        student_admissions_id: Number(id),
        year_id: Number(academicYear),
        term_name: termsmaster,
      })
      .then((res: any) => {
        setstudentdiscount(res.data.data);
        setSpinnerLoad(false);
      })
      .catch((e: any) => {
        console.log(e);
      });
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
    getAccessToken();
    axios.get(`${baseUrl}discountfee`).then((res: any) => {
      setDiscounttype(res.data.data);
      setUpdateDiscountFeeType(res.data.data[1].dis_feetype_id);
    });
  };

  const updateDiscount = (values: any) => {};

  function setdiscountt(gdata: any) {
    var matcheddiscou: any =
      discounttype &&
      discounttype.length &&
      discounttype.filter(
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
      console.log(value, "rewrfewrfwe");

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
    getAccessToken();
    axios
      .get(`${baseUrl}school`)
      .then((res: any) => {
        console.log(res.data.data);
        setGotSchoolDetails(res.data.data);
        console.log(res.data.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    ShowingTermsValue(gotSchoolDetails);

    console.log(gotSchoolDetails.max_count, "--08098098");
  }, [gotSchoolDetails]);

  const ShowingTermsValue = (termsss: any) => {
    {
      termsss &&
        termsss.length &&
        termsss.map((terms: any) => {
          console.log(terms);

          let termscount = [];
          for (var i = 1; i <= terms.max_count; i++) {
            console.log("Terms" + i, "----");

            termscount.push("Term" + i);
          }

          setFinalterms(termscount);
        });
    }
  };
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
                                    value={updateDiscountFeeType}
                                    onChange={(e) =>
                                      setUpdateDiscountFeeType(e.target.value)
                                    }
                                  >
                                    {discounttype &&
                                      discounttype.length &&
                                      discounttype.map((value: any, i: any) => {
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
