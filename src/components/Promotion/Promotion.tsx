import { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Pagination, Form, Col, Row } from "react-bootstrap";

const Promotion = () => {

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div className="d-flex flex-column">
          <div id="content">
            <Navbar></Navbar>
            <div className="container-fluid">
              <div
                className="col-lg-12"
                style={{ position: "relative", top: "20px" }}
              >
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
                            }}
                          ></div>
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
                                  >
                                    <option> --Academic_Year--</option>
                                    <option>2020-2021</option>
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
                                  >
                                    <option> --Select Grade--</option>
                                    <option>II</option>
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
                                  >
                                    <option> --Select Section--</option>
                                    <option>A</option>
                                  </Form.Select>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="table-responsive">
                      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                        
                            <Form.Label style={{"marginLeft":"80%"}}>
                                Search:
                                <Form.Control
                                  type="search"
                                  className="form-control form-control-sm"
                                />
                              </Form.Label>
                            
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <Table
                              striped bordered hover
                              width="100%"
                              style={{ width: "100%" }}
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    className="sorting_asc"
                                    style={{ width: "13px" }}
                                  >
                                    Student Code
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "14px" }}
                                  >
                                    Student Name
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "63px" }}
                                  >
                                    Admission No
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "63px" }}
                                  >
                                    To Academic Year
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "63px" }}
                                  >
                                    Grade
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "63px" }}
                                  >
                                    Section
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "63px" }}
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                <td
                                    style={{ width: "10%" }}
                                    className="sorting_1">
                                   MVM100117
                                  </td>
                                <td>
                                    mohan
                                  </td>
                                  <td>
                                     1001
                                  </td>
                                  <td> <Form.Select
                                        className="form-control"
                                        name="academic_year"
                                        id="academic_year"
                                        style={{ width: "150px" }}
                                      >
                                        <option>--Select Year--</option>
                                        <option value="2020-2021">
                                          2020-2021
                                        </option>
                                        <option value="2021-2022">
                                          2021-2022
                                        </option>
                                        <option value="2022-2023">
                                          2022-2023
                                        </option>
                                        <option value="2023-2024">
                                          2023-2024
                                        </option>
                                      </Form.Select>

                                  </td>
                                  <td>
                                  <Form.Select
                                        className="form-control"
                                        style={{
                                          width: "150px",
                                        }}
                                      >
                                        <option value="">
                                          {" "}
                                          --Select Grade--
                                        </option>
                                        <option value="I">I</option>
                                        <option value="II">II</option>
                                        <option value="III">III</option>
                                        <option value="IV">IV</option>
                                        <option value="V">V</option>
                                        <option value="VI">VI</option>
                                        <option value="VII">VII</option>
                                        <option value="VIII">VIII</option>
                                        <option value="IX">IX</option>
                                        <option value="X">X</option>
                                        <option value="XII">XII</option>
                                        <option value="XI">XI</option>
                                      </Form.Select>
                                  </td>
                                  <td>
                                  <Form.Select
                                        className="form-control"
                                        style={{
                                          width: "150px",
                                        
                                        }}
                                      >
                                        <option value="">
                                          {" "}
                                          --Select Section--
                                        </option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                       
                                      </Form.Select>

                                  </td>
                                  <td>
                                      <Button>Update</Button>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </div>
                        <div style={{marginLeft:"20%"}}>
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

export default Promotion
