import react from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../index";
import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../../config/getAccessToken";

const Feesdetails = (props: any) => {
  let history = useHistory();
  const status = props.student_id;
  const year = props.year;
  console.log(props.year);

  const [YearOfBalanceByYear, setYearOfBalanceByYear] = useState<any>({});
  const [allGotFinalData, setAllGotFinalData] = useState<any>([]);
  const [lastFourRecord, setLastFourRecord] = useState<any>([]);
  const [FeeMasterId, setFeeMasterId] = useState<any>([]);
  const [GetFinalMasterData, setGetFinalMasterData] = useState<any>([]);
  const [DisplayFinalData, setDisplayFinalData] = useState<any>([]);

  useEffect(() => {
    axios
      .post(`${baseUrl}autosearch`, {
        allbalance: status,
      })
      .then((res) => {
        console.log("Getting from ::::", res.data.data);
        setYearOfBalanceByYear(res.data.data);
        console.log(YearOfBalanceByYear, "YearOfBalance");
      })
      .catch((err) => console.log(err));
  }, [status]);

  useEffect(() => {
    getAccessToken();
    axios
      .get(`${baseUrl}feeMaster`)
      .then((res) => {
        console.log("Getting from feeMaster::::", res.data.data);
        setFeeMasterId(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [status]);

  const Year_of_fee = () => {
    axios
      .post(`${baseUrl}studentAllPayBalance/four`, {
        student_id: status,
        year_id: year,
      })
      .then((res) => {
        console.log("Getting from ::::", res.data.data);
        setLastFourRecord(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  // console.log(FeeMasterId,"Four Record");
  useEffect(() => {
    Year_of_fee();
  }, [status]);

  useEffect(() => {
    // if (status  && status.toString().length>0   ){
    console.log("hi");
    console.log(FeeMasterId);
    lastFourRecord &&
      lastFourRecord.length &&
      lastFourRecord.map((data: any) => {
        FeeMaster(data);
        console.log(data);
      });
    // }
  }, [status, lastFourRecord, FeeMasterId]);

  console.log(lastFourRecord);
  let GetId: any = [];

  function FeeMaster(feemasterdata: any) {
    console.log(feemasterdata.fee_master_id, "data");
    var matchedyearid: any =
      FeeMasterId &&
      FeeMasterId.length &&
      FeeMasterId.filter(
        (data: any) => data.fee_master_id == feemasterdata.fee_master_id
      );
    // let combindobject = { ...feemasterdata, ...matchedyearid};
    matchedyearid &&
      matchedyearid.length &&
      matchedyearid.forEach((element: any) => {
        GetId.push(element);
      });
    // GetFinalMasterData.push(combindobject);
    console.log(matchedyearid, "final");
    setDisplayFinalData(GetId);
    console.log(GetId, "ffff");
  }

  console.log(DisplayFinalData.fee_type_name);

  useEffect(() => {
    let AllRoundData: any[] = [];
    // console.log(YearOfBalanceByYear);

    if (YearOfBalanceByYear && YearOfBalanceByYear.length > 0) {
      console.log(YearOfBalanceByYear);
      YearOfBalanceByYear.forEach((allData: any) => {
        //	console.log(allData[0]);
        //	console.log(allData[1]);
        let newData = allData[1];
        let ParticularStudentData: any = [];
        let ParticularStudentBalance: any = [];
        newData.forEach((element: any) => {
          //		console.log(element);
          if (element && element.balance) {
            ParticularStudentBalance.push({ Allbalance: element.balance });
          }
          if (
            element &&
            element.studentData &&
            Object.keys(element.studentData).length > 0
          ) {
            //			console.log(element.studentData);
            if (ParticularStudentData && ParticularStudentData.length == 0) {
              ParticularStudentData.push(element.studentData);
            }
          }
        });
        let newFinalArr = [
          { ...ParticularStudentBalance[0], ...ParticularStudentData[0] },
        ];
        AllRoundData.push(newFinalArr[0]);
      });
      console.log(AllRoundData);
      setAllGotFinalData(AllRoundData);
      // console.log(searchResultData[0]);
      // console.log(searchResultData[0][0]);
      // console.log(searchResultData[0][1]);
    } else {
      setAllGotFinalData([]);
    }
  }, [YearOfBalanceByYear]);
  console.log(YearOfBalanceByYear, "yyyyyyyy");

  //stupay/mvm10006/2021-2022
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
                    <a className="btn btn-success btn-sm float-right">
                      Pay or View All
                    </a>
                  </Link>
                ) : null}
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-4 col-md-3 mb-1">
                  <div>
                    <h6>Date</h6>
                  </div>
                  <div>
                    <label>
                      {lastFourRecord &&
                        lastFourRecord.length &&
                        lastFourRecord.map((data: any) => {
                          return (
                            <option> {data.date_of_transcation.toString().slice(0,10)}</option>
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
                      {lastFourRecord &&
                        lastFourRecord.length &&
                        lastFourRecord.map((data: any) => {
                          return <option> {data.amount_paid}</option>;
                        })}
                    </label>
                  </div>
                </div>
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
                <div className="col-xl-4 col-md-4 mb-1">
                  <div>
                    <h6>Academic Year</h6>
                  </div>
                  <div>
                    <label>
                      {allGotFinalData &&
                        allGotFinalData.length &&
                        allGotFinalData.map((amount: any) => {
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
                    <label>
                      {allGotFinalData &&
                        allGotFinalData.length &&
                        allGotFinalData.map((amount: any) => {
                          return <option> {(amount = amount.balance)}</option>;
                        })}{" "}
                    </label>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-1">
                  <div>
                    <h6>Action</h6>
                  </div>
                  <div>
                    {allGotFinalData &&
                      allGotFinalData.length &&
                      allGotFinalData.map((amount: any) => {
                        return (
                          <Button
                            onClick={(e) => {
                              history.push(
                                `/stupay/${status}/${(amount =
                                  amount.academic_year)}`
                              );
                              // history.push("/stupay");/stupay/MVM10004/2021-2022
                            }}
                            className="btn-success btn-sm"
                          >
                            Pay / View All
                          </Button>
                        );
                      })}
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
