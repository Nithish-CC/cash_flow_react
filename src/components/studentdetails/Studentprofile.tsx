import React, { useState, ChangeEvent, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import Feesdetails from "./Feesdetails";
import Academicfees from "./Academicfees";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";


const StudentProfile = () => {
  //To Make Edit
  const [search, setSearch] = useState<any>({
    text: "",
    suggestions: [],
  });

  const [statusStudentEdit, setStatusStudentEdit] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const [statusStudentDetailsEdit, setStatusStudentDetailsEdit] = useState<any>({});
  const [statusStudentSearch, setStatusStudentSearch] = useState<any>({});
  const [statusStudentDetails, setStatusStudentDetails] = useState<any>({});

  console.log(statusStudentDetails)

  const onTextChanged = (e: any) => {
    const value = e.target.value;
    setStatusStudentSearch(value);
    let suggestions:any = {};
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = statusStudentDetails.sort().filter((v:any) => regex.test(v.student_admissions_id));
    }
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };
  

  const suggestionSelected = (value:any) => {
    setIsComponentVisible(false);

    setSearch({
      text: value.student_admissions_id,
      suggestions: [],
    });
  };

  const { suggestions } = search;

  

  const searchData = () => {
    axios
      .get(
        `https://61ea85bfc9d96b0017700bb9.mockapi.io/search/${statusStudentSearch}`
      )
      .then((response: AxiosResponse) => {
        setStatusStudentDetails(response.data);
      });
  };

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

  const onClear = () => {
    setStatusStudentSearch("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStatusStudentDetails({ ...statusStudentDetails, [name]: value });
  };

  

  // console.log(statusStudentDetails)

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" className="d-flex flex-column">
          <div className="student-profile py-2">
            <div id="content">
              <Navbar></Navbar>
              <div className="container" style={{ marginLeft: "3%" }}>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <div className="col-xl-12 col-md-2 mb-5 text-center">
                    <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-10 my-md-0 mw-100">
                      <div className="input-group">
                        <Form.Control
                          type="search"
                          className="form-control bg-light border-0 small"
                          placeholder="Search for..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                           style={{ width: "480px" }} 
                            // value={search.text}
                           onChange={onTextChanged}
                        />

                        {/* {suggestions.length > 0 && isComponentVisible && (
                          <div>
                            {suggestions.map((item: any) => (
                              <div key={statusStudentDetails.student_admissions_id}>
                                <div
                                  key={item.student_admissions_id}
                                  onClick={() => suggestionSelected(item)}
                                >
                                  {item.student_admissions_id}
                                  {item.student_name}
                                </div>
                              </div>
                            ))}
                          </div>
                        )} */}
                        <div className="input-group-append">
                          <Button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => {
                              searchData();
                              onClear();
                            }}
                          >
                            <i className="fas fa-search fa-sm"></i>
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>

                {!statusStudentSearch ? (
                  <div>
                    <Form>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="card shadow mb-5">
                            <div className="card-body bg-transparent">
                              <div style={{ marginLeft: "80%" }}>
                                {!statusStudentEdit ? (
                                  <i
                                    className="fa fa-edit profile_btn-edit btn"
                                    onClick={() => setStatusStudentEdit(true)}
                                    style={{
                                      fontSize: "25px",
                                      color: "red",
                                      cursor: "pointer",
                                    }}
                                  ></i>
                                ) : (
                                  <Row>
                                    <Col md={5}>
                                      <i
                                        className="fa fa-save btn"
                                        onClick={()=>searchedit()}
                                        style={{
                                          fontSize: "25px",
                                          color: "red",
                                          cursor: "pointer",
                                        }}
                                      ></i>
                                    </Col>
                                    <Col
                                      md={5}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
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
                                    </Col>
                                  </Row>
                                )}
                              </div>
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
                                      {statusStudentDetails.student_id}
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
                                      value={
                                        statusStudentDetails.alt_phone_number
                                      }
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
                                          statusStudentDetails.status ===
                                          "active"
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
                                          statusStudentDetails.status ===
                                          "inactive"
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
                    <Feesdetails
                      status={statusStudentDetails.status}
                    ></Feesdetails>
                    <Academicfees></Academicfees>
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
export default StudentProfile;
