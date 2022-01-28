import { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Pagination, Form, Col, Row } from "react-bootstrap";

const Yearoffee = () => {
  const [statusFeeDetailsEdit, setStatusFeeDetailsEdit] = useState(false);
  const [statusFeeDetailsAdd, setStatusFeeDetailsAdd] = useState(false);
  return (
    <div>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar></Sidebar>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar></Navbar>
              <div className="container-fluid">
                <div className="col-xl-11 m-auto">
                  <div className="card-header">
                    <div
                      className="col-lg-10"
                      style={{ marginLeft: "10%", width: "90%" }}
                    >
                      <div className="card mb-3">
                        <a style={{ color: "rgb(230, 39, 39)" }}>
                          <div className="card-header mb-4 bg-transparent border-1 text-center">
                            <h4 className="mb-0 ">
                              <i className="far fa-clone pr-1"></i> Fee Details
                            </h4>
                            <div style={{ textAlign: "right" }}>
                              {!statusFeeDetailsAdd ? (
                                <Button
                                  type="submit"
                                  className="btn btn-primary btn-sm btn-save"
                                  onClick={() => setStatusFeeDetailsAdd(true)}
                                >
                                  Add
                                </Button>
                              ) : (
                                <Button
                                  className="btn btn-sm btn-secondary"
                                  onClick={() => setStatusFeeDetailsAdd(false)}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                        </a>

                        <div className="container">
                          {!statusFeeDetailsAdd ? (
                            <div className="card-body">
                              <div
                                style={{
                                  position: "relative",
                                  marginLeft: "10px",
                                }}
                              >
                                <table width="100%">
                                  <thead>
                                    <tr>
                                      <th>Academic year </th>
                                      <th>Grade</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div
                                          className="form-group"
                                          style={{ marginTop: "10px" }}
                                        >
                                          <Form.Select
                                            className="form-control"
                                            name="academic_year"
                                            id="academic_year"
                                            style={{ width: "165px" }}
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
                                        </div>
                                      </td>
                                      <td>
                                        <div className="form-group">
                                          <Form.Select
                                            className="form-control"
                                            style={{
                                              width: "165px",
                                              marginTop: "10px",
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
                                        </div>
                                      </td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                                  <div
                                    id="dataTable_filter"
                                    className="dataTables_filter"
                                  >
                                    <Form.Label style={{ marginLeft: "78%" }}>
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
                                      striped
                                      bordered
                                      hover
                                      width="100%"
                                      style={{ width: "100%" }}
                                    >
                                      <thead>
                                        <tr role="row">
                                          <th
                                            className="sorting_asc"
                                            style={{ width: "73px" }}
                                          >
                                            To Academic Year
                                          </th>
                                          <th
                                            className="sorting"
                                            style={{ width: "114px" }}
                                          >
                                            Fee amount
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
                                            style={{ width: "30%" }}
                                            className="sorting_1"
                                          >
                                            Admission Fees
                                          </td>
                                          <td>
                                            {" "}
                                            {!statusFeeDetailsEdit ? (
                                              <div>30000</div>
                                            ) : (
                                              <div>
                                                <Form.Control
                                                  style={{ width: "100%" }}
                                                  type="text"
                                                  defaultValue="300000"
                                                />
                                              </div>
                                            )}
                                          </td>

                                          <td>
                                            {" "}
                                            {!statusFeeDetailsEdit ? (
                                              <div>
                                                <i
                                                  style={{
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    setStatusFeeDetailsEdit(
                                                      true
                                                    )
                                                  }
                                                  className="fa fa-edit fa-1x text-success"
                                                ></i>
                                                <i
                                                  style={{
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  className="far fa-trash-alt text-danger"
                                                ></i>
                                              </div>
                                            ) : (
                                              <div>
                                                <i
                                                  style={{
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    setStatusFeeDetailsEdit(
                                                      false
                                                    )
                                                  }
                                                  className="fa fa-times fa-1x text-danger"
                                                  aria-hidden="true"
                                                ></i>
                                                <i
                                                  style={{
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    setStatusFeeDetailsEdit(
                                                      false
                                                    )
                                                  }
                                                  className="fa fa-save btn text-danger"
                                                ></i>
                                              </div>
                                            )}
                                          </td>
                                        </tr>

                                        <tr>
                                          <td
                                            style={{ width: "30%" }}
                                            className="sorting_1"
                                          >
                                            Miscellaneous Fee
                                          </td>
                                          <td>
                                            {" "}
                                            {!statusFeeDetailsEdit ? (
                                              <div>40000</div>
                                            ) : (
                                              <div>
                                                <Form.Control
                                                  style={{ width: "100%" }}
                                                  type="text"
                                                  defaultValue="40000"
                                                />
                                              </div>
                                            )}
                                          </td>

                                          <td>
                                            {" "}
                                            {!statusFeeDetailsEdit ? (
                                              <div>
                                                <i
                                                  style={{
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    setStatusFeeDetailsEdit(
                                                      true
                                                    )
                                                  }
                                                  className="fa fa-edit fa-1x text-success"
                                                ></i>
                                                <i
                                                  style={{
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  className="far fa-trash-alt text-danger"
                                                ></i>
                                              </div>
                                            ) : (
                                              <div>
                                                <i
                                                  style={{
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    setStatusFeeDetailsEdit(
                                                      false
                                                    )
                                                  }
                                                  className="fa fa-times fa-1x text-danger"
                                                  aria-hidden="true"
                                                ></i>
                                                <i
                                                  style={{
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    setStatusFeeDetailsEdit(
                                                      false
                                                    )
                                                  }
                                                  className="fa fa-save btn text-danger"
                                                ></i>
                                              </div>
                                            )}
                                          </td>
                                        </tr>
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
                                    <Pagination.Item active>
                                      {12}
                                    </Pagination.Item>
                                    <Pagination.Item>{13}</Pagination.Item>
                                    <Pagination.Item disabled>
                                      {14}
                                    </Pagination.Item>

                                    <Pagination.Ellipsis />
                                    <Pagination.Item>{20}</Pagination.Item>
                                    <Pagination.Next />
                                    <Pagination.Last />
                                  </Pagination>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Row className="mb-5">
                                <Col sm="4" className="mb-4">
                                  <Form.Label style={{ marginLeft: "40px" }}>
                                    Fee Type Name{" "}
                                  </Form.Label>
                                </Col>
                                <Col sm="6">
                                  <Form.Select>
                                    <option>--Select Fee Type Name--</option>
                                    <option value="1">Admission Fees</option>
                                    <option value="2">Book Fee</option>
                                    <option value="3">Uniform Fee</option>
                                  </Form.Select>
                                </Col>{" "}
                                <Col sm="4" className="mb-4">
                                  <Form.Label style={{ marginLeft: "40px" }}>
                                    Grade
                                  </Form.Label>
                                </Col>
                                <Col sm="6">
                                  <Form.Select>
                                    <option>--Select--</option>
                                    <option value="I">I</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                  </Form.Select>
                                </Col>
                                <Col sm="4" className="mb-4">
                                  <Form.Label style={{ marginLeft: "40px" }}>
                                    Amount
                                  </Form.Label>
                                </Col>
                                <Col sm="6">
                                  <Form.Control type="text" />
                                </Col>
                                <Col sm="4" className="mb-4">
                                  <Form.Label style={{ marginLeft: "40px" }}>
                                    Academic Year
                                  </Form.Label>
                                </Col>
                                <Col sm="6">
                                  <Form.Select>
                                    <option>--Select Fee Type Name--</option>
                                    <option value="1">2020-2021</option>
                                    <option value="2">2021-2022</option>
                                    <option value="3">2022-2023</option>
                                  </Form.Select>
                                </Col>
                              </Row>
                              <div className="card-footer py3">
                                <Button
                                  type="submit"
                                  className="btn btn-danger btn-save"
                                  onClick={() => setStatusFeeDetailsEdit(false)}
                                  style={{ marginLeft: "90%" }}
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          )}
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
export default Yearoffee;
