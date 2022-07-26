import { useState, ChangeEvent, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import Feesdetails from "./Feesdetails";
import Academicfees from "./Academicfees";
import { Row, Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Hostel from "./Hostel";
import { useDispatch, useSelector } from "react-redux";
import {
  studentDetailsPost,
  studentProfileSearchWithIdData,
  stuProfileSearchSetAllSection,
} from "../../Redux/Actions/studentProfileSearchActions";

const StudentprofileSearch = () => {
  const urlParams: any = useParams();
  const id = urlParams.id;

  const [statusStudentEdit, setStatusStudentEdit] = useState(false);
  const [statusStudentSearch, setStatusStudentSearch] = useState<any>({});
  const [statusStudentDetails, setStatusStudentDetails] = useState<any>({});
  const [UpdateProfileActive, setUpdateProfileActive] = useState<any>({});
  const [StatusStudentDetailsData, setStatusStudentDetailsData] = useState<any>(
    []
  );
  const [FinalSectionIdData, setFinalSectionIdData] = useState<any>([]);
  const [sectionFilter, setSectionFilter] = useState<any>([]);
  const mobileNoPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const dispatch = useDispatch<any>();
  const studentProfile = useSelector(
    (state: any) => state.studentDetailsGet.studentProfile?.data?.data
  );

  useEffect(() => {
    if (studentProfile && studentProfile?.length) {
      setStatusStudentDetailsData(studentProfile[0].grade_id);
      setStatusStudentDetails(studentProfile[0]);
    }
  }, [studentProfile]);

  const searchData = () => {
    dispatch(studentDetailsPost(id));
  };

  const studentdetailsgetdata = useSelector(
    (state: any) => state.studentDetailsGet.studentProfile_gradeSection
  );
  console.log(studentdetailsgetdata);

  useEffect(() => {
    searchData();
    dispatch(stuProfileSearchSetAllSection());
  }, []);

  useEffect(() => {
    if (studentdetailsgetdata && studentdetailsgetdata.length > 0) {
      SectionId(StatusStudentDetailsData);
    }
  }, [StatusStudentDetailsData, studentdetailsgetdata]);
  function SectionId(Sectiondata: any) {
    var matchedyearid: any =
      studentdetailsgetdata &&
      studentdetailsgetdata.length &&
      studentdetailsgetdata.filter(
        (data: any) => data.grade_id === Sectiondata
      );
    return FinalSectionId(matchedyearid, statusStudentDetails.academic_year_id);
  }
  function FinalSectionId(get: any, Year: any) {
    var matchedyearidfinal: any =
      get &&
      get.length &&
      get.filter((data: any) => data.academic_year_id === Year);
    setFinalSectionIdData(matchedyearidfinal);
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStatusStudentDetails({ ...statusStudentDetails, [name]: value });
  };

  const studentProfileParameters = {
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
  };

  const studentprofilewithid = useSelector(
    (state: any) => state.studentDetailsGet.studentProfileSearch_edit?.data
  );
  console.log(studentprofilewithid);

  useEffect(() => {
    if (studentprofilewithid && studentprofilewithid?.length) {
      setStatusStudentDetails(studentprofilewithid);
    }
  }, [studentprofilewithid]);

  const searchedit = () => {
    if (
      statusStudentDetails.alt_phone_number
        .toString()
        .match(mobileNoPattern) ===
      statusStudentDetails.phone_number.toString().match(mobileNoPattern)
    ) {
      toast.warning("please Check Phone Number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(studentProfileSearchWithIdData(id, studentProfileParameters));
      setStatusStudentEdit(false);
      setUpdateProfileActive("");
    }
  };

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
                                          UpdateProfileActive === "Active"
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
                                          UpdateProfileActive === "Inactive"
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
                      Student_status={statusStudentDetails.status}
                    ></Feesdetails>
                    <Hostel
                      student_id={statusStudentDetails.student_id}
                      year={statusStudentDetails.academic_year_id}
                      admissions_id={statusStudentDetails.student_admissions_id}
                      section={statusStudentDetails.grade_section_id}
                      fee_master_id={statusStudentDetails.fee_master_id}
                      grade={statusStudentDetails.grade_id}
                      transport={statusStudentDetails.mode_of_transport}
                      Student_status={statusStudentDetails.status}
                    ></Hostel>
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
