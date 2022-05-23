import React, { useState, ChangeEvent, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import Feesdetails from "./Feesdetails";
import Academicfees from "./Academicfees";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const StudentprofileSearch = () => {
  //To Make Edit
  let history = useHistory();
  const urlParams: any = useParams();
  const id = urlParams.id;
  console.log(id);
  const [search, setSearch] = useState<any>({
    text: "",
    suggestions: [],
  });
  const [statusStudentEdit, setStatusStudentEdit] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const [statusStudentDetailsEdit, setStatusStudentDetailsEdit] = useState<any>(
    {}
  );
  const [statusStudentSearch, setStatusStudentSearch] = useState<any>({});
  const [statusStudentDetails, setStatusStudentDetails] = useState<any>({});
  const [UpdateProfileActive, setUpdateProfileActive] = useState<any>({});
  const [AllSection, setAllSection] = useState<any>({});
  const [StatusStudentDetailsData, setStatusStudentDetailsData] = useState<any>(
    []
  );
  const [FinalSectionIdData, setFinalSectionIdData] = useState<any>([]);
  const [sectionFilter, setSectionFilter] = useState<any>([]);
  const mobileNoPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const onTextChanged = (e: any) => {
    const value = e.target.value;
    setStatusStudentSearch(value);
    let suggestions: any = {};
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = statusStudentDetails
        .sort()
        .filter((v: any) => regex.test(v.student_admissions_id));
    }
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };
  const suggestionSelected = (value: any) => {
    setIsComponentVisible(false);
    setSearch({
      text: value.student_admissions_id,
      suggestions: [],
    });
  };
  const { suggestions } = search;
  const searchData = () => {
    getAccessToken();
    axios
      .post(`${baseUrl}studentProfile`, { student_admissions_id: Number(id) })
      .then((response: AxiosResponse) => {
        setStatusStudentDetails(response.data.data[0]);
        // setStatusStudentDetailsData(response.data.data)
        setStatusStudentDetailsData(response.data.data[0].grade_id);
        console.log(response.data.data[0]);
      });
  };

  useEffect(() => {
    // if(statusStudentDetails && statusStudentDetails.length ){
    searchData();
    // }
  }, []);
  useEffect(() => {
    axios.get(`${baseUrl}gradeSection`).then((res: AxiosResponse) => {
      setAllSection(res.data.data);
      // console.log(res.data.data);
      // console.log(statusStudentDetails);
      // setGradeSectionList(res.data.data);
      // setGradeSectionListAdd(res.data.data);
      // setFrontSearchGrade(res.data.data[0].grade_id);
      // setSearchGradeId(res.data.data[0].grade_id);
    });
  }, []);
  useEffect(() => {
    if (AllSection && AllSection.length > 0) {
      SectionId(StatusStudentDetailsData);
    }
  }, [StatusStudentDetailsData, AllSection]);
  function SectionId(Sectiondata: any) {
    // console.log(AllSection,"sectionidata");
    var matchedyearid: any =
      AllSection &&
      AllSection.length &&
      AllSection.filter((data: any) => data.grade_id === Sectiondata);
    // console.log(matchedyearid,"section");
    return FinalSectionId(matchedyearid, statusStudentDetails.academic_year_id);
    // let combindobject = { ...Sectiondata, ...matchedyearid[0] };
    // GetFinalYearData.push(combindobject);
  }
  function FinalSectionId(get: any, Year: any) {
    var matchedyearidfinal: any =
      get &&
      get.length &&
      get.filter((data: any) => data.academic_year_id === Year);
    setFinalSectionIdData(matchedyearidfinal);
    // setFinalSectionIdData(matchedyearidfinal[0]);
    // console.log(matchedyearidfinal,"Year_id");
  }
  // const searchedit = () => {
  //     axios
  //         .put(`${baseUrl}studentProfile/${id}`, {
  //             student_name: statusStudentDetails.student_name,
  //             grade_section_id:Number( sectionFilter),
  //             father_name: statusStudentDetails.father_name,
  //             student_id: statusStudentDetails.student_id,
  //             phone_number: statusStudentDetails.phone_number,
  //             alt_phone_number: statusStudentDetails.alt_phone_number,
  //             address: statusStudentDetails.address,
  //             email: statusStudentDetails.email,
  //             status: UpdateProfileActive,
  //             admission_no: statusStudentDetails.admission_no,
  //         })
  //         .then((response: AxiosResponse) => {
  //             setStatusStudentDetails(response.data);
  // 			setStatusStudentEdit(false)
  // 			searchData()
  // 			setUpdateProfileActive("");
  //         })
  //         .catch((error) => {
  //             alert(error);
  //         });
  // };
  const onClear = () => {
    setStatusStudentSearch("");
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStatusStudentDetails({ ...statusStudentDetails, [name]: value });
  };

  const searchedit = () => {
    if (
      statusStudentDetails.alt_phone_number.match(mobileNoPattern) &&
      statusStudentDetails.phone_number.match(mobileNoPattern)
    ) {
      axios
        .put(`${baseUrl}studentProfile/${id}`, {
          student_name: statusStudentDetails.student_name,
          grade_section_id: Number(sectionFilter),
          father_name: statusStudentDetails.father_name,
          student_id: statusStudentDetails.student_id,
          phone_number: statusStudentDetails.phone_number,
          alt_phone_number: statusStudentDetails.alt_phone_number,
          address: statusStudentDetails.address,
          email: statusStudentDetails.email,
          status: UpdateProfileActive,
          admission_no: statusStudentDetails.admission_no,
        })
        .then((response: AxiosResponse) => {
          if (response.data.status == true) {
            toast.success("Student Details Updated", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }

          setStatusStudentDetails(response.data);
          setStatusStudentEdit(false);
          searchData();
          setUpdateProfileActive("");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      toast.warning("please Check Phone Number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  console.log(statusStudentDetails, "studentid");

  return (
    <div id="page-top">
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
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" className="d-flex flex-column">
          <div className="student-profile py-2">
            <div id="content">
              <Navbar></Navbar>
              <div className="container" style={{ marginLeft: "3%" }}>
                {statusStudentSearch ? (
                  <div>
                    <Form>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="card shadow mb-5">
                            <div className="card-header py-2">
                              <h4 className="m-0 text-danger">
                                <a>Profile</a>
                                {!statusStudentEdit ? (
                                  <i
                                    className="fa fa-edit profile_btn-edit btn"
                                    onClick={() => {
                                      setUpdateProfileActive(
                                        statusStudentDetails.status
                                      );
                                      setSectionFilter(
                                        statusStudentDetails.grade_section_id
                                      );
                                      setStatusStudentEdit(true);
                                    }}
                                    style={{
                                      fontSize: "25px",
                                      color: "red",
                                      cursor: "pointer",
                                      marginLeft: "70%",
                                    }}
                                  ></i>
                                ) : (
                                  <>
                                    <i
                                      className="fa fa-save btn"
                                      onClick={() => searchedit()}
                                      style={{
                                        fontSize: "25px",
                                        color: "red",
                                        cursor: "pointer",
                                        marginLeft: "70%",
                                      }}
                                    ></i>
                                    <i
                                      className="fa fa-times"
                                      aria-hidden="true"
                                      onClick={() =>
                                        setStatusStudentEdit(false)
                                      }
                                      style={{
                                        fontSize: "25px",
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                    ></i>
                                  </>
                                )}
                              </h4>
                            </div>
                            <div className="card-body bg-transparent">
                              <Form.Group as={Row}>
                                <Form.Label column sm="4">
                                  <strong>Student Name</strong>
                                </Form.Label>
                                <Col
                                  sm="8"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  {!statusStudentEdit ? (
                                    <div className="col-md-6 text-black">
                                      {statusStudentDetails.student_name}
                                    </div>
                                  ) : (
                                    <Form.Control
                                      type="text"
                                      name="student_name"
                                      value={statusStudentDetails.student_name}
                                      onChange={handleChange}
                                      size="sm"
                                    />
                                  )}
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label column sm="4">
                                  <strong>grade</strong>
                                </Form.Label>
                                <Col
                                  sm="8"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  {!statusStudentEdit ? (
                                    <div
                                      className="col-md-6 text-black"
                                      id="stud_name"
                                    >
                                      {statusStudentDetails.grade_master}
                                    </div>
                                  ) : (
                                    <div
                                      className="col-md-6 text-black"
                                      id="stud_name"
                                    >
                                      {statusStudentDetails.grade_master}
                                    </div>
                                  )}
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label column sm="4">
                                  <strong>Section</strong>
                                </Form.Label>
                                <Col
                                  sm="8"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  {!statusStudentEdit ? (
                                    <div
                                      className="col-md-6 text-black"
                                      id="stud_name"
                                    >
                                      {statusStudentDetails.section}
                                    </div>
                                  ) : (
                                    <Form.Select
                                      name="grade_section_id"
                                      size="sm"
                                      value={sectionFilter}
                                      onChange={(e: any) =>
                                        setSectionFilter(e.target.value)
                                      }
                                    >
                                      {FinalSectionIdData &&
                                        FinalSectionIdData.length &&
                                        FinalSectionIdData.map(
                                          (values: any, i: any) => {
                                            return (
                                              <option
                                                value={values.grade_section_id}
                                              >
                                                {" "}
                                                {values.section}
                                              </option>
                                            );
                                          }
                                        )}
                                    </Form.Select>
                                  )}
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label column sm="4">
                                  <strong>Admission ID</strong>
                                </Form.Label>
                                <Col
                                  sm="8"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    className="col-md-6 text-black"
                                    id="stud_name"
                                  >
                                    {statusStudentDetails.student_admissions_id}
                                  </div>
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label column sm="4">
                                  <strong>Admission No</strong>
                                </Form.Label>
                                <Col
                                  sm="8"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  {!statusStudentEdit ? (
                                    <div
                                      className="col-md-6 text-black"
                                      id="stud_name"
                                    >
                                      {statusStudentDetails.admission_no}
                                    </div>
                                  ) : (
                                    <Form.Control
                                      onChange={handleChange}
                                      type="text"
                                      name="admission_no"
                                      value={statusStudentDetails.admission_no}
                                      size="sm"
                                    />
                                  )}
                                </Col>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="card shadow mb-5">
                            <div className="card-body bg-transparent">
                              <Form.Group as={Row}>
                                <Form.Label column sm="4">
                                  <strong>Father Name</strong>
                                </Form.Label>
                                <Col
                                  sm="8"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  {!statusStudentEdit ? (
                                    <div
                                      className="col-md-12 text-black"
                                      id="stud_name"
                                    >
                                      {statusStudentDetails.father_name}
                                    </div>
                                  ) : (
                                    <Form.Control
                                      onChange={handleChange}
                                      type="text"
                                      name="father_name"
                                      value={statusStudentDetails.father_name}
                                      size="sm"
                                    />
                                  )}
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label column sm="4">
                                  <strong>Phone No</strong>
                                </Form.Label>
                                <Col
                                  sm="8"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  {!statusStudentEdit ? (
                                    <div
                                      className="col-md-12 text-black"
                                      id="stud_name"
                                    >
                                      {statusStudentDetails.phone_number}
                                    </div>
                                  ) : (
                                    <Form.Control
                                      onChange={handleChange}
                                      type="number"
                                      max={10}
                                      name="phone_number"
                                      value={statusStudentDetails.phone_number}
                                      size="sm"
                                    />
                                  )}
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label column sm="4">
                                  <strong>Alt. Phone No</strong>
                                </Form.Label>
                                <Col
                                  sm="8"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  {!statusStudentEdit ? (
                                    <div
                                      className="col-md-12 text-black"
                                      id="stud_name"
                                    >
                                      {statusStudentDetails.alt_phone_number}
                                    </div>
                                  ) : (
                                    <Form.Control
                                      onChange={handleChange}
                                      type="number"
                                      name="alt_phone_number"
                                      value={
                                        statusStudentDetails.alt_phone_number
                                      }
                                      size="sm"
                                    />
                                  )}
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label
                                  column
                                  sm="4"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  <strong>Address</strong>
                                </Form.Label>
                                <Col sm="8">
                                  {!statusStudentEdit ? (
                                    <div
                                      className="col-md-12 text-black"
                                      id="stud_name"
                                    >
                                      {statusStudentDetails.address}
                                    </div>
                                  ) : (
                                    <Form.Control
                                      onChange={handleChange}
                                      type="text"
                                      name="address"
                                      value={statusStudentDetails.address}
                                      size="sm"
                                    />
                                  )}
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label
                                  column
                                  sm="4"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  <strong>Email</strong>
                                </Form.Label>
                                <Col sm="8">
                                  {!statusStudentEdit ? (
                                    <div
                                      className="col-md-12 text-black"
                                      id="stud_name"
                                    >
                                      {statusStudentDetails.email}
                                    </div>
                                  ) : (
                                    <Form.Control
                                      onChange={handleChange}
                                      type="text"
                                      name="email"
                                      value={statusStudentDetails.email}
                                      size="sm"
                                    />
                                  )}
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label column sm="4">
                                  <strong>Status</strong>
                                </Form.Label>
                                <Col
                                  sm="8"
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                  }}
                                >
                                  {!statusStudentEdit ? (
                                    <div className="col-md-12 text-black">
                                      {statusStudentDetails.status}
                                    </div>
                                  ) : (
                                    <div
                                      onChange={handleChange}
                                      key={`inline-radio`}
                                      className="mb-3"
                                    >
                                      <Form.Check
                                        inline
                                        checked={
                                          statusStudentDetails.status ===
                                          "Active"
                                            ? true
                                            : false
                                        }
                                        label="Active"
                                        name="status"
                                        type="radio"
                                        id={`inline-radio-1`}
                                        value={UpdateProfileActive}
                                        onChange={(e: any) => {
                                          setUpdateProfileActive("Active");
                                        }}
                                      />
                                      <Form.Check
                                        inline
                                        checked={
                                          statusStudentDetails.status ===
                                          "Inactive"
                                            ? true
                                            : false
                                        }
                                        label="Inactive"
                                        name="status"
                                        type="radio"
                                        id={`inline-radio-2`}
                                        value={UpdateProfileActive}
                                        onChange={(e: any) => {
                                          setUpdateProfileActive("Inactive");
                                        }}
                                      />
                                    </div>
                                  )}
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label> </Form.Label>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label> </Form.Label>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                    <Feesdetails
                      student_id={statusStudentDetails.student_id}
                      year={statusStudentDetails.academic_year_id}
                    ></Feesdetails>
                    <Academicfees
                      studentDetails={statusStudentDetails}
                    ></Academicfees>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>No Data found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentprofileSearch;
