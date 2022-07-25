import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  feesDetailsAutosearchData,
  feesDetailsLastFourRecordData,
} from "../../Redux/Actions/feesDetail";
import { academicFeesSetFeeMasterIdData } from "../../Redux/Actions/academicYearActions";
const Feesdetails = (props: any) => {
  let history = useHistory();
  const status = props.student_id;
  const year = props.year;
  const [YearOfBalanceByYear, setYearOfBalanceByYear] = useState<any>({});

  const [allGotFinalData, setAllGotFinalData] = useState<any>([]);
  // const [feesdetailslastfourrecord, setLastFourRecord] = useState<any>([]);
  const [FeeMasterId, setFeeMasterId] = useState<any>([]);
  const [DisplayFinalData, setDisplayFinalData] = useState<any>([]);

  const dispatch = useDispatch<any>();

  const feesdetailsautosearch = useSelector(
    (state: any) => state.studentDetailsGet.feesDetailsautoSearch
  );

  const feesdetailslastfourrecord = useSelector(
    (state: any) => state.studentDetailsGet.feesDetailsLastFourRecordsReducer
  );
  console.log(feesdetailslastfourrecord);

  const setfeemasterdata = useSelector(
    (state: any) => state.studentDetailsGet.feesDetails_SetFeeMasterId
  );
  console.log(setfeemasterdata);

  useEffect(() => {
    if (status && status.toString().length > 0) {
      dispatch(feesDetailsAutosearchData(status));
      dispatch(academicFeesSetFeeMasterIdData());
    }
    if (
      status &&
      status.toString().length > 0 &&
      year &&
      year.toString().length > 0
    ) {
      dispatch(feesDetailsLastFourRecordData(status, year));
    }
  }, [status, year]);

  useEffect(() => {
    feesdetailslastfourrecord &&
      feesdetailslastfourrecord.length &&
      feesdetailslastfourrecord.map((data: any) => {
        FeeMaster(data);
      });
  }, [status, feesdetailslastfourrecord, FeeMasterId]);
  let GetId: any = [];
  function FeeMaster(feemasterdata: any) {
    var matchedyearid: any =
      FeeMasterId &&
      FeeMasterId.length &&
      FeeMasterId.filter(
        (data: any) => data.fee_master_id === feemasterdata.fee_master_id
      );
    matchedyearid &&
      matchedyearid.length &&
      matchedyearid.forEach((element: any) => {
        GetId.push(element);
      });
    setDisplayFinalData(GetId);
  }
  useEffect(() => {
    let AllRoundData: any[] = [];
    if (YearOfBalanceByYear && YearOfBalanceByYear.length > 0) {
      YearOfBalanceByYear.forEach((allData: any) => {
        let newData = allData;
        let ParticularStudentData: any = [];
        let ParticularStudentBalance: any = [];
        let ParticularStudentYear: any = [];
        let tempArr: any[] = [];
        newData.forEach((element: any) => {
          if (element && element.length > 0) {
            let tempObj: any = {};
            element.forEach((data: any) => {
              if (data && data.hasOwnProperty("studentData")) {
                delete data.studentData;
              }
              if (data && data.hasOwnProperty("academic_year")) {
                tempObj.academic_year = data.academic_year;
              }
              if (data && data.hasOwnProperty("balance")) {
                tempObj.balance = data.balance;
              }
            });
            tempArr.push(tempObj);
          }
          setAllGotFinalData(tempArr);
          if (
            element &&
            element.studentData &&
            Object.keys(element.studentData).length > 0
          ) {
            if (ParticularStudentData && ParticularStudentData.length == 0) {
            }
          }
        });
        let newFinalArr = [
          { ...ParticularStudentBalance, ...ParticularStudentYear },
        ];
        AllRoundData.push(newFinalArr);
      });
    } else {
      setAllGotFinalData([]);
    }
  }, [YearOfBalanceByYear]);
  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h4 className="m-0 text-danger text-center">
                <a>
                  <i className="far fa-clone"></i> Payment
                </a>{" "}
                {status === "aa" ? (
                  <Link to="/Stu_pay">
                    {" "}
                    <a className="btn btn-success btn-sm float-right disabled">
                      Pay or View All
                    </a>
                  </Link>
                ) : null}
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
                {feesdetailslastfourrecord &&
                feesdetailslastfourrecord.length > 0 ? (
                  <>
                    <div className="col-xl-4 col-md-3 mb-1">
                      <div>
                        <h6>Date</h6>
                      </div>

                      <div>
                        <label>
                          {feesdetailslastfourrecord &&
                            feesdetailslastfourrecord.length &&
                            feesdetailslastfourrecord.map((data: any) => {
                              return (
                                <option>
                                  {" "}
                                  {data.date_of_transcation
                                    .toString()
                                    .slice(0, 10)}
                                </option>
                              );
                            })}
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-4 col-md-3 mb-1">
                      <div>
                        <h6>Fee Type</h6>
                      </div>
                      <div>
                        <label>
                          {DisplayFinalData &&
                            DisplayFinalData.length &&
                            DisplayFinalData.map((data: any) => {
                              return <option> {data.fee_type_name}</option>;
                            })}
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-4 col-md-3 mb-1">
                      <div>
                        <h6>Amount ₹</h6>
                      </div>
                      <div>
                        <label>
                          {feesdetailslastfourrecord &&
                            feesdetailslastfourrecord.length &&
                            feesdetailslastfourrecord.map((data: any) => {
                              return <option> {data.cum_amt}</option>;
                            })}
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div style={{ textAlign: "center" }}>NIL</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h4 className="m-0  text-danger text-center">
                <i className="far fa-clone"></i> Year of Balance
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-4 col-md-8 mb-1">
                  <div>
                    <h6>Academic Year</h6>
                  </div>
                  <div>
                    <label style={{ margin: "3px" }}>
                      {feesdetailsautosearch.data &&
                        feesdetailsautosearch.data.length &&
                        feesdetailsautosearch.data.map((amount: any) => {
                          return (
                            <option> {(amount = amount.academic_year)}</option>
                          );
                        })}{" "}
                    </label>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-1">
                  <div>
                    <h6>Balance ₹</h6>
                  </div>
                  <div>
                    <label style={{ margin: "3px" }}>
                      {feesdetailsautosearch.data &&
                        feesdetailsautosearch.data.length &&
                        feesdetailsautosearch.data.map((amount: any) => {
                          return <option> {amount.balance}</option>;
                        })}{" "}
                    </label>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-1">
                  <div>
                    <h6>Action</h6>
                  </div>
                  <div>
                    {props.Student_status === "Active" ? (
                      <>
                        {feesdetailsautosearch.data &&
                          feesdetailsautosearch.data.length &&
                          feesdetailsautosearch.data.map((amount: any) => {
                            return (
                              <Button
                                style={{ margin: "2px" }}
                                onClick={(e) => {
                                  history.push(
                                    `/stupay/${status}/${(amount =
                                      amount.academic_year)}`
                                  );
                                }}
                                className="btn-success btn-sm  "
                              >
                                Pay / View All
                              </Button>
                            );
                          })}
                      </>
                    ) : (
                      <>
                        {feesdetailsautosearch.data &&
                          feesdetailsautosearch.data.length &&
                          feesdetailsautosearch.data.map((amount: any) => {
                            return (
                              <Button
                                style={{ margin: "2px" }}
                                onClick={(e) => {
                                  history.push(
                                    `/stupay/${status}/${(amount =
                                      amount.academic_year)}`
                                  );
                                }}
                                className="btn-success btn-sm disabled"
                              >
                                Pay / View All
                              </Button>
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feesdetails;
