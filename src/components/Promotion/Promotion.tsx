import React, { useState, ChangeEvent, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Pagination, Form, Spinner } from "react-bootstrap";
import Axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { log } from "console";
const Promotion = () => {
  const [spinnerLoad, setSpinnerLoad] = useState<any>(true);
  const [getAcademicYear, setGetAcademicYear] = useState<any>([]);
  const [getGrade, setGetGrade] = useState<any>([]);
  const [getGradeSection, setGetGradeSection] = useState<any>([]);
  const [eventAcademicYear, setEventAcademicYear] = useState<any>([]);
  const [filterGradeByYear, setFilterGradeByYear] = useState<any>([]);
  const [filterSectionByYear, setFilterSectionByYear] = useState<any>([]);
  const [eventGradeByYear, setEventGradeByYear] = useState<any>([]);
  const [eventSectionByYear, setEventSectionByYear] = useState<any>([]);
  const [promoSearch, setPromoSearch] = useState<any>([]);
  const [getStudentDetails, setGetStudentDetails] = useState<any>([]);
  const [eventSectionByYearValue, setEventSectionByYearValue] = useState<any>([]);
  const [eventAcademicYearValue, setEventAcademicYearValue] = useState<any>([]);
  const [eventGradeByYearValue, setEventGradeByYearValue] = useState<any>([]);
  const [allGotFinalData, setAllGotFinalData] = useState<any>([]);
  const [filterSectionByYearUpdate, setFilterSectionByYearUpdate] = useState<any>([]);
  const [eventAcademicYearValueUpdate, setEventAcademicYearUpdate] = useState<any>([]);
  const [eventGradeByYearUpdate, setEventGradeByYearUpdate] = useState<any>([]);
  const [eventSectionByYearUpdate, setEventSectionByYearUpdate] = useState<any>([]);
  const [filterGradeByYearUpdate, setFilterGradeByYearUpdate] = useState<any>([]);
  // console.log(eventAcademicYearValueUpdate);
  // console.log(eventGradeByYear);
  // console.log(eventSectionByYear);
  const windowReload = () => {
    let interval = setInterval(() => {
      window.location.reload();
    }, 1000);
    return () => clearInterval(interval);
  };
  const Year = () => {
    getAccessToken();
    Axios.get(`${baseUrl}year`)
      .then((res) => {
        console.log("Getting from year::::", res.data.data);
        setGetAcademicYear(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAccessToken();
    Axios.get(`${baseUrl}grademaster`)
      .then((res) => {
        console.log("Getting from grademaster::::", res.data.data);
        setGetGrade(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    getAccessToken();
    Axios.post(`${baseUrl}promotion/getpromotiondetails`, {
      year_id: Number(eventAcademicYear),
      grade_id: Number(eventGradeByYear),
      section_id: Number(eventSectionByYear),
    }).then((response: AxiosResponse) => {
      console.log(response.data.data, "Search");
      setPromoSearch(response.data.data);
    });
    Year();
    Searchauto();
    Section();
  }, [eventSectionByYear]);
  useEffect(() => {
    getAccessToken();
    Axios.get(`${baseUrl}gradeSection`)
      .then((res) => {
        console.log("Getting from gradeSection::::", res.data.data);
        setGetGradeSection(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const Searchauto = () => {
    getAccessToken();
    Axios.post(`${baseUrl}autoSearch`, {
      academic_year: eventAcademicYearValue,
      grade: eventGradeByYearValue,
      section: eventSectionByYearValue,
    }).then((response: AxiosResponse) => {
      setGetStudentDetails(response.data.data);
      console.log(response.data.data, "student Details");
    });
    setSpinnerLoad(false);
  };
  // console.log(eventAcademicYear);
  const UpdatePromotionRecord = (student_admissions_id: any, student_id: any) => {
    if (eventSectionByYearUpdate <= 0) {
      toast.warning("Enter All Details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if (eventAcademicYear === eventAcademicYearValueUpdate) {
      toast.warning("Can't promote to same academic year", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      getAccessToken();
      Axios.post(`${baseUrl}promotion/makepromotion`, {
        year_id: Number(eventAcademicYearValueUpdate),
        grade_id: Number(eventGradeByYearUpdate),
        section_id: Number(eventSectionByYearUpdate),
        student_admissions_id: Number(student_admissions_id),
        student_id: student_id,
        from_grade: eventGradeByYearValue,
      }).then((response: AxiosResponse) => {
        console.log(response.data.data, "Update");
        if (response.data.data.IsExsist == false) {
          toast.success(" Updated Successsfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setEventAcademicYearUpdate("");
          setEventGradeByYearUpdate("");
          setEventSectionByYearUpdate("");
        }
      });
    }
  };
  const [split, setSplit] = useState("")
  const onchangeyear = (event: any) => {
    if (String(event).length > 0) {
      let splitvalue: any

      getAcademicYear.map((ele: any) => {
        if (ele.year_id === Number(event)) {
          splitvalue = ele.academic_year.split("-");
        }
      })
      getAcademicYear.map((ele: any) => {
        if (ele.academic_year.split("-")[0] === splitvalue[1]) {
          setSplit(ele.academic_year);
          setEventAcademicYearUpdate(ele.year_id)
          UpdatePromotion(getGradeSection, Number(ele.year_id));
        }
      })      
    }
  }
  const Section = () => {
    getAcademicYear &&
      getAcademicYear.length &&
      getAcademicYear.map((year: any) => {
        let getyear: any = [];
        // console.log(year.year_id);
        if (year.year_id === eventAcademicYear) {
          // console.log(year);
          getyear.push(year);
        }
        // console.log(getyear);
      });
  };
  const UpdatePromotion = (getChangeGrade: any, input: any) => {
    let changedGrade: any = [];
    getChangeGrade &&
      getChangeGrade.length &&
      getChangeGrade.map((changegrade: any) => {
        if (input == changegrade.academic_year_id) {
          changedGrade.push(changegrade);
        }
      });
    let Got_grade_id: any[] = [];
    changedGrade.forEach((element: any) => {
      getGrade.forEach((grade: any) => {
        if (element.grade_id == grade.grade_master_id) {
          let object: any = { ...element, ...grade };
          Got_grade_id.push(object);
        }
      });
    });
    // console.log(Got_grade_id);
    const ids = Got_grade_id.map((o) => o.grade_master_id);
    const filtered = Got_grade_id.filter(({ grade_master_id }, index) => !ids.includes(grade_master_id, index + 1));
    console.log(filtered);
    const idsofSection = Got_grade_id.map((o) => o.section);
    const filteredForSection = Got_grade_id.filter(({ section }, index) => !idsofSection.includes(section, index + 1));
    // console.log(filteredForSection);
    setFilterGradeByYearUpdate(filtered);
    setFilterSectionByYearUpdate(filteredForSection);
  };
  const handleGradeFilter = (getChangeGrade: any, input: any) => {
    let changedGrade: any = [];
    getChangeGrade &&
      getChangeGrade.length &&
      getChangeGrade.map((changegrade: any) => {
        if (input == changegrade.academic_year_id) {
          changedGrade.push(changegrade);
        }
      });
    let Got_grade_id: any[] = [];
    changedGrade.forEach((element: any) => {
      getGrade.forEach((grade: any) => {
        if (element.grade_id == grade.grade_master_id) {
          let object: any = { ...element, ...grade };
          Got_grade_id.push(object);
        }
      });
    });
    const ids = Got_grade_id.map((o) => o.grade_master_id);
    const filtered = Got_grade_id.filter(({ grade_master_id }, index) => !ids.includes(grade_master_id, index + 1));
    // console.log(filtered);
    const idsofSection = Got_grade_id.map((o) => o.section);
    const filteredForSection = Got_grade_id.filter(({ section }, index) => !idsofSection.includes(section, index + 1));
    setFilterGradeByYear(filtered);
    setFilterSectionByYearUpdate(filteredForSection);
    setFilterSectionByYearUpdate(filteredForSection);
  };
  useEffect(() => {
    let AllRoundData: any[] = [];
    if (getStudentDetails && getStudentDetails.length > 0) {
      // console.log(getStudentDetails);
      getStudentDetails.forEach((allData: any) => {
        let newData = allData[1];
        let ParticularStudentData: any = [];
        let ParticularStudentBalance: any = [];
        newData.forEach((element: any) => {
          if (element && element.balance) {
            ParticularStudentBalance.push({ Allbalance: element.balance });
          }
          if (element && element.studentData && Object.keys(element.studentData).length > 0) {
            if (ParticularStudentData && ParticularStudentData.length == 0) {
              ParticularStudentData.push(element.studentData);
            }
          }
        });
        let newFinalArr = [{ ...ParticularStudentBalance[0], ...ParticularStudentData[0] }];
        AllRoundData.push(newFinalArr[0]);
      });
      // console.log(AllRoundData);
      setAllGotFinalData(AllRoundData);
      if (AllRoundData && AllRoundData.length > 0) {
        setSpinnerLoad(false);
      }
    } else {
      setAllGotFinalData([]);
    }
  }, [getStudentDetails]);
  return (
    <div id="page-top">
      <div id="wrapper">
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
        <Sidebar data={"Stupro"}></Sidebar>
        <div className="d-flex flex-column">
          <div id="content">
            <Navbar></Navbar>
            <div className="container-fluid">
              <div className="col-lg-12" style={{ position: "relative", top: "20px" }}>
                <div className="card mb-3">
                  <a style={{ color: "rgb(230, 39, 39)" }}>
                    <div className="card-header bg-transparent border-1 text-center">
                      <h4 className="mb-0 ">
                        <i className="far fa-clone pr-1"></i> Promotion
                      </h4>
                    </div>
                  </a>
                  <div className="card-body bg-transparent">
                    <div className="container-fluid">
                      <div className="row">
                        <table>
                          <div
                            style={{
                              position: "relative",
                              marginBottom: "30px",
                            }}></div>
                          <thead>
                            <th className="col-xl-4">From Academic year</th>
                            <th className="col-xl-4">Grade</th>
                            <th className="col-xl-4">Section</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="form-group col-xl-4">
                                  <Form.Select
                                    className="form-control"
                                    name="academic_year"
                                    id="academic_year"
                                    style={{ width: "165px" }}
                                    required
                                    onChange={(e: any) => {
                                      setEventAcademicYear(e.target.value);
                                      // console.log(e.target.value, "yr");
                                      setEventAcademicYearValue(e.target[e.target.selectedIndex].text);
                                      handleGradeFilter(getGradeSection, e.target.value);
                                      onchangeyear(e.target.value)
                                    }}>
                                    <option> --Academic_Year--</option>
                                    {getAcademicYear &&
                                      getAcademicYear.map((data: any) => {
                                        return (
                                          <option value={data.year_id} label={data.academic_year}>
                                            {data.academic_year}
                                          </option>
                                        );
                                      })}
                                  </Form.Select>
                                </div>
                              </td>
                              <td>
                                <div className="form-group col-xl-4">
                                  <Form.Select
                                    className="form-control"
                                    name="from_grade_id"
                                    id="from_grade_id"
                                    style={{ width: "165px" }}
                                    required
                                    onChange={(e: any) => {
                                      setEventGradeByYear(e.target.value);
                                      setEventGradeByYearValue(e.target[e.target.selectedIndex].text);
                                      setEventGradeByYearUpdate((Number(e.target.value) + 1).toString());
                                    }}>
                                    {/* {console.log(eventGradeByYearUpdate, "Hiiiii")} */}
                                    <option> --Select Grade--</option>
                                    {filterGradeByYear &&
                                      filterGradeByYear.length &&
                                      filterGradeByYear.map((grade: any) => {
                                        return (
                                          <>
                                            {grade.academic_year_id === Number(eventAcademicYear) && (
                                              <option value={grade.grade_master_id} label={grade.grade_master}>
                                                {grade.grade_master}
                                              </option>
                                            )}
                                          </>
                                        );
                                      })}
                                  </Form.Select>
                                </div>
                              </td>
                              <td>
                                <div className="form-group col-xl-4">
                                  <Form.Select
                                    className="form-control"
                                    name="from_section_id"
                                    id="from_section_id"
                                    style={{ width: "165px" }}
                                    required
                                    onChange={(e: any) => {
                                      setEventSectionByYear(e.target.value);
                                      // console.log(e.target[e.target.selectedIndex].text);
                                      setEventSectionByYearValue(e.target[e.target.selectedIndex].text);
                                      // console.log(e.target.value, "section");
                                    }}>
                                    <option> --Select Section--</option>
                                    {getGradeSection &&
                                      getGradeSection.length &&
                                      getGradeSection.map((section: any) => {
                                        return (
                                          <>
                                            {" "}
                                            {section.grade_id === Number(eventGradeByYear) &&
                                              section.academic_year_id === Number(eventAcademicYear) && (
                                                <option value={section.grade_section_id}>{section.section}</option>
                                              )}
                                          </>
                                        );
                                      })}
                                  </Form.Select>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="table-responsive">
                          <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                            <Form.Label style={{ marginLeft: "80%" }}>
                              Search:
                              <Form.Control type="search" className="form-control form-control-sm" />
                            </Form.Label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <Table striped bordered hover width="100%" style={{ width: "100%" }}>
                              <thead>
                                <tr role="row">
                                  <th className="sorting_asc" style={{ width: "13px" }}>
                                    Student Code
                                  </th>
                                  <th className="sorting" style={{ width: "14px" }}>
                                    Student Name
                                  </th>
                                  <th className="sorting" style={{ width: "63px" }}>
                                    Admission No
                                  </th>
                                  <th className="sorting" style={{ width: "63px" }}>
                                    To Academic Year
                                  </th>
                                  <th className="sorting" style={{ width: "63px" }}>
                                    Grade
                                  </th>
                                  <th className="sorting" style={{ width: "63px" }}>
                                    Section
                                  </th>
                                  <th className="sorting" style={{ width: "63px" }}>
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {spinnerLoad ? (
                                  <td
                                    colSpan={7}
                                    style={{
                                      textAlign: "center",
                                    }}>
                                    <Spinner animation="border" variant="danger" />
                                  </td>
                                ) : allGotFinalData && allGotFinalData.length ? (
                                  allGotFinalData.map((values: any) => {
                                    return (
                                      <tr>
                                        <td style={{ width: "10%" }} className="sorting_1">
                                          {values.student_id}
                                        </td>
                                        <td>{values.student_name}</td>
                                        <td>{values.admission_no}</td>
                                        <td>
                                          {" "}
                                          <Form.Control
                                            name="academic_year"
                                            id="academic_year"
                                            value={split}
                                            style={{ width: "150px" }}
                                            disabled
                                          />
                                        </td>
                                        <td>
                                          <Form.Select
                                            className="form-control"
                                            style={{
                                              width: "150px",
                                            }}
                                            onChange={(e: any) => {
                                              setEventGradeByYearUpdate(e.target.value);
                                            }}>
                                            {filterGradeByYearUpdate &&
                                              filterGradeByYearUpdate.length &&
                                              filterGradeByYearUpdate.map((grade: any) => {
                                                return (
                                                  <>
                                                    {Number(eventGradeByYear) + 1 === Number(grade.grade_master_id) ? <option
                                                      value={grade.grade_master_id}
                                                      selected={true}
                                                      defaultValue={Number(eventGradeByYear) + 1}
                                                      label={grade.grade_master}>
                                                      {grade.grade_master}
                                                    </option> : Number(eventGradeByYear) === Number(grade.grade_master_id) ? <option
                                                      value={grade.grade_master_id}
                                                      label={grade.grade_master}>
                                                      {grade.grade_master}
                                                    </option> : ''}
                                                  </>
                                                );
                                              })}
                                          </Form.Select>
                                        </td>
                                        <td>
                                          <Form.Select
                                            className="form-control"
                                            style={{
                                              width: "150px",
                                            }}
                                            onChange={(e: any) => {
                                              setEventSectionByYearUpdate(e.target.value);
                                            }}>
                                            <option value=""> --Select Section--</option>
                                            {getGradeSection &&
                                              getGradeSection.length &&
                                              getGradeSection.map((section: any) => {
                                                return (
                                                  <>
                                                    {section.grade_id === Number(eventGradeByYearUpdate) &&
                                                      section.academic_year_id === Number(eventAcademicYearValueUpdate) && (
                                                        <option value={section.grade_section_id}>
                                                          {section.section}
                                                        </option>
                                                      )}
                                                  </>
                                                );
                                              })}
                                          </Form.Select>
                                        </td>
                                        <td>
                                          <Button
                                            onClick={() => {
                                              UpdatePromotionRecord(values.student_admissions_id, values.student_id);
                                            }}>
                                            Update
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <>
                                    <tr
                                      style={{
                                        textAlign: "center",
                                      }}>
                                      <td
                                        colSpan={7}
                                        style={{
                                          textAlign: "center",
                                        }}>
                                        <p>No Data Found</p>
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                        <div style={{ marginLeft: "20%" }}>
                          <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />
                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item>{11}</Pagination.Item>
                            <Pagination.Item active>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item disabled>{14}</Pagination.Item>
                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                          </Pagination>
                        </div>
                      </div>
                    </div>
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
export default Promotion;