import react from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../index";
import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { Card, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { modeOfTransports } from "../../Redux/Actions/modeOfTransport";

const Hostel = (props: any) => {
  let history = useHistory();
  const status = props.student_id;
  const year = props.year;
  const grade_id = props.grade;
  const section = props.section;
  const Student_admission_id = props.admissions_id;
  const Transportation = props.transport;

  console.log(props, "Transportation");

  const [YearOfBalanceByYear, setYearOfBalanceByYear] = useState<any>({});
  const [allGotFinalData, setAllGotFinalData] = useState<any>([]);
  const [lastFourRecord, setLastFourRecord] = useState<any>([]);
  const [FeeMasterId, setFeeMasterId] = useState<any>([]);
  const [GetFinalMasterData, setGetFinalMasterData] = useState<any>([]);
  const [DisplayFinalData, setDisplayFinalData] = useState<any>([]);
  const [feemaster, setFeemaster] = useState<any>([]);
  const [allAcademicBalance, setAllAcademicBalance] = useState<any>([]);
  const [hostel, setHostel] = useState<any>(false);
  const [van, setVan] = useState<any>(false);
  const [currentRadioValue, setCurrentValue] = React.useState("");
  const [busValue, setBusValue] = useState<any>([]);
  const [hostalFeeValue, setHostalFeeValue] = useState<any>([]);
  const [transport, settransport] = useState<any>([]);
  const [datatoDelete, setdatatoDelete] = useState<any>({});
  const [show, setShow] = useState(false);
  console.log(currentRadioValue);

  console.log(van);

  const [profileHostel, setProfileHostel] = useState<any>({
    Hostal: true,
    mode_of_transport_touched: true,
    student_admissions_id: 100451,
    student_id: "2022dddf3d4",
    section_id: 71,
    year_id: 32,
    grade_id: 11,
  });

  const dispatch = useDispatch<any>();

  console.log(hostalFeeValue);
  useEffect(() => {
    setCurrentValue(Transportation);
  }, [Transportation]);
  const checkhostelvalue = () => {
    if (hostalFeeValue && hostalFeeValue.length > 0) {
      let hostelnameId = hostalFeeValue[0].fee_master_id;
      console.log(hostelnameId);
      return hostelnameId;
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const SuddenhandleClose = () => {
    setShow(false);
  };

  const handleTrans = (e: any) => {
    let transportRadio;

    if ("Transport" === currentRadioValue) {
      transportRadio = {
        transport: true,
        mode_of_transport_touched: true,
        student_admissions_id: Student_admission_id,
        student_id: status,
        section_id: section,
        grade_id: grade_id,
        year_id: year,
        fee_master_id: Number(feemaster),
      };
    } else if ("Hostal" === currentRadioValue) {
      transportRadio = {
        Hostal: true,
        mode_of_transport_touched: true,
        student_admissions_id: Student_admission_id,
        student_id: status,
        section_id: section,
        grade_id: grade_id,
        year_id: year,
        fee_master_id: checkhostelvalue(),
      };
    } else if ("Self" === currentRadioValue) {
      transportRadio = {
        Self: true,
        mode_of_transport_touched: true,
        student_admissions_id: Student_admission_id,
        student_id: status,
        section_id: section,
        grade_id: grade_id,
        year_id: year,
        fee_master_id: Number(feemaster),
      };
    }
    dispatch(modeOfTransports(transportRadio, setShow));
  };
  useEffect(() => {}, []);
  console.log(
    currentRadioValue,
    Transportation,
    Transportation === "Self" ? Transportation : true
  );
  console.log(currentRadioValue, "currentRadioValue");

  useEffect(() => {
    getAccessToken();
    axios.get(`${baseUrl}modeoftransport/hostal`, {}).then((res: any) => {
      setHostalFeeValue(res.data.data);
      console.log(res.data.data, "Hostel");
    });
  }, []);

  useEffect(() => {
    getAccessToken();
    axios.get(`${baseUrl}modeoftransport`, {}).then((res: any) => {
      setBusValue(res.data.data);
      console.log(res.data.data, "Hostel");
    });
  }, []);

  useEffect(() => {
    console.log(FeeMasterId);
    lastFourRecord &&
      lastFourRecord.length &&
      lastFourRecord.map((data: any) => {
        FeeMaster(data);
      });
  }, [status, lastFourRecord, FeeMasterId]);

  let GetId: any = [];

  function FeeMaster(feemasterdata: any) {
    var matchedyearid: any =
      FeeMasterId &&
      FeeMasterId.length &&
      FeeMasterId.filter(
        (data: any) => data.fee_master_id == feemasterdata.fee_master_id
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
    console.log(YearOfBalanceByYear);

    if (YearOfBalanceByYear && YearOfBalanceByYear.length > 0) {
      console.log(YearOfBalanceByYear);
      YearOfBalanceByYear.forEach((allData: any) => {
        console.log(allData[0]);
        console.log(allData);
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
              console.log(data);
            });
            tempArr.push(tempObj);
          }
          console.log(tempArr);
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
      console.log(AllRoundData);
    } else {
      setAllGotFinalData([]);
    }
  }, [YearOfBalanceByYear]);
  console.log(allAcademicBalance, "yyyyyyyy");

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
      <div className="row">
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h4 className="m-0 text-danger text-center">
                <a>
                  <i className="far fa-clone"></i> Student Facilities
                </a>{" "}
                {props.Student_status === "Active" ? (
                  <>
                    <Button
                      variant="success"
                      onClick={(e: any) => {
                        handleShow();
                      }}
                      style={{ float: "right", marginRight: "10px" }}
                    >
                      Submit
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="success"
                      onClick={(e: any) => {
                        handleShow();
                      }}
                      style={{ float: "right", marginRight: "10px" }}
                      disabled
                    >
                      Submit
                    </Button>
                  </>
                )}
              </h4>
            </div>
            {props.Student_status === "Active" ? <></> : <></>}
            <div className="card-body">
              <div>
                <Row>
                  <Col>
                    <div>
                      <input
                        name="radio-item-1"
                        type="radio"
                        value="Self"
                        onChange={(e) => setCurrentValue(e.target.value)}
                        checked={currentRadioValue === "Self"}
                      />
                      <Form.Label>Self</Form.Label>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <input
                        name="radio-item-1"
                        value="Transport"
                        type="radio"
                        onChange={(e) => setCurrentValue(e.target.value)}
                        checked={currentRadioValue === "Transport"}
                      />
                      <Form.Label>Transport</Form.Label>
                      {currentRadioValue === "Transport" && (
                        <div>
                          <Form.Select
                            style={{ width: "11rem" }}
                            onChange={(e: any) => {
                              setFeemaster(e.target.value);
                            }}
                          >
                            <option>Select Stopping</option>

                            {busValue &&
                              busValue.length &&
                              busValue.map((value: any, i: any) => {
                                return (
                                  <option value={value.fee_master_id}>
                                    {value.fee_type_name}
                                  </option>
                                );
                              })}
                          </Form.Select>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <input
                        name="radio-item-1"
                        value="Hostal"
                        type="radio"
                        onChange={(e) => setCurrentValue(e.target.value)}
                        checked={currentRadioValue === "Hostal"}
                      />
                      <Form.Label htmlFor="radio-item-2">Hostel</Form.Label>
                      {currentRadioValue === "Hostal" && <div></div>}
                    </div>
                  </Col>
                </Row>
                <Modal show={show} onHide={() => setShow(!show)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Mode Of Transportation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are You Sure You Want To Submit {currentRadioValue} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(!show)}>
                      Close
                    </Button>
                    <Button
                      variant="danger"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setShow(!show);
                        handleTrans(currentRadioValue);
                      }}
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hostel;
