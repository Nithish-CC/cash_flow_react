import { useState, ChangeEvent } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import Feesdetails from "./Feesdetails";
import Academicfees from "./Academicfees";
import { Row, Col, Form } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";

const StudentProfileId = () => {
  const [statusStudentEdit, setStatusStudentEdit] = useState(false);
  const [statusStudentDetails, setStatusStudentDetails] = useState<any>({});

  const searchedit = () => {
    axios
      .put(
        `https://61ea85bfc9d96b0017700bb9.mockapi.io/search/${statusStudentDetails.student_admissions_id}`,
        {
          student_name: statusStudentDetails.student_name,
          grade_id: statusStudentDetails.grade_id,
          section: statusStudentDetails.section,
          father_name: statusStudentDetails.father_name,
          student_id: statusStudentDetails.student_id,
          phone_number: statusStudentDetails.phone_number,
          alt_phone_number: statusStudentDetails.alt_phone_number,
          address: statusStudentDetails.address,
          email: statusStudentDetails.email,
          status: statusStudentDetails.status,
        }
      )
      .then((response: AxiosResponse) => {
        setStatusStudentDetails(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStatusStudentDetails({ ...statusStudentDetails, [name]: value });
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" className="d-flex flex-column">
          <div className="student-profile py-2">
            <div id="content">
              <Navbar></Navbar>
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
                                onClick={() => setStatusStudentEdit(true)}
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
                                  onClick={() => setStatusStudentEdit(false)}
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
                            <Col sm="8">
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
                            <Col sm="8">
                              {!statusStudentEdit ? (
                                <div
                                  className="col-md-6 text-black"
                                  id="stud_name"
                                >
                                  {statusStudentDetails.grade_id}
                                </div>
                              ) : (
                                <Form.Select
                                  size="sm"
                                  onChange={(e: any) => handleChange(e)}
                                >
                                  <option value="I">I</option>
                                  <option value="II">II</option>
                                </Form.Select>
                              )}
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row}>
                            <Form.Label column sm="4">
                              <strong>Section</strong>
                            </Form.Label>
                            <Col sm="8">
                              {!statusStudentEdit ? (
                                <div
                                  className="col-md-6 text-black"
                                  id="stud_name"
                                >
                                  {statusStudentDetails.section}
                                </div>
                              ) : (
                                <Form.Select
                                  size="sm"
                                  onChange={(e: any) => handleChange(e)}
                                >
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                </Form.Select>
                              )}
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row}>
                            <Form.Label column sm="4">
                              <strong>Admission ID</strong>
                            </Form.Label>
                            <Col sm="8">
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
                            <Col sm="8">
                              {!statusStudentEdit ? (
                                <div
                                  className="col-md-6 text-black"
                                  id="stud_name"
                                >
                                  000123
                                </div>
                              ) : (
                                <Form.Control
                                  onChange={handleChange}
                                  type="text"
                                  name="student_id"
                                  value={statusStudentDetails.student_id}
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
                            <Form.Label> </Form.Label>
                          </Form.Group>
                          <Form.Group as={Row}>
                            <Form.Label column sm="4">
                              <strong>Father Name</strong>
                            </Form.Label>
                            <Col sm="8">
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
                            <Col sm="8">
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
                                  type="text"
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
                            <Col sm="8">
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
                                  type="text"
                                  name="alt_phone_number"
                                  value={statusStudentDetails.alt_phone_number}
                                  size="sm"
                                />
                              )}
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm="4">
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
                            <Form.Label column sm="4">
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
                            <Col sm="8">
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
                                      statusStudentDetails.status === "active"
                                    }
                                    label="Active"
                                    name="status"
                                    type="radio"
                                    id={`inline-radio-1`}
                                    value="active"
                                  />
                                  <Form.Check
                                    inline
                                    checked={
                                      statusStudentDetails.status === "inactive"
                                    }
                                    label="Inactive"
                                    name="status"
                                    type="radio"
                                    id={`inline-radio-2`}
                                    value="inactive"
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
                <Feesdetails status={statusStudentDetails.status}></Feesdetails>
                <Academicfees></Academicfees>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentProfileId;
