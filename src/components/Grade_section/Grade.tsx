import { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Pagination, Form, Col, Row } from "react-bootstrap";

const Grade = () => {
  const [statusGradeEdit, setStatusGradeEdit] = useState(false);
  const [statusGradeAdd, setStatusGradeAdd] = useState(false);

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
                  <div
                    className="col-lg-10"
                    style={{ marginLeft: "10%", width: "90%" }}
                  >
                    <div className="card mb-3">
                      <a style={{ color: "rgb(230, 39, 39)" }}>
                        <div className="card-header mb-4 bg-transparent border-1 text-center">
                          <h4 className="mb-0 ">
                            <i className="far fa-clone pr-1"></i>Grade & Section
                          </h4>
                          <div style={{ textAlign: "right" }}>
                            {!statusGradeAdd ? (
                              <Button
                                type="submit"
                                className="btn btn-primary btn-sm btn-save"
                                onClick={() => setStatusGradeAdd(true)}
                              >
                                Add
                              </Button>
                            ) : (
                              <Button
                                className="btn btn-sm btn-secondary"
                                onClick={() => setStatusGradeAdd(false)}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </a>
                      {!statusGradeAdd ? (
                        <div className="card-body">
                          <div className="table-responsive">
                            <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                              <div
                                id="dataTable_filter"
                                className="dataTables_filter"
                              >
                                <Form.Label
                                  htmlFor="inputPassword5"
                                  style={{ marginLeft: "75%" }}
                                >
                                  Search:
                                  <Form.Control
                                    type="search"
                                    className="form-control form-control-sm"
                                  />
                                </Form.Label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <Table
                                className="table dataTable no-footer"
                                width="100%"
                                style={{ width: "100%" }}
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      className="sorting_asc"
                                      style={{ width: "73px" }}
                                    >
                                      No.
                                    </th>
                                    <th
                                      className="sorting"
                                      style={{ width: "114px" }}
                                    >
                                      Grade
                                    </th>
                                    <th
                                      className="sorting"
                                      style={{ width: "114px" }}
                                    >
                                      Section
                                    </th>
                                    <th
                                      className="sorting"
                                      style={{ width: "63px" }}
                                    >
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td
                                      style={{ width: "30%" }}
                                      className="sorting_1"
                                    >
                                      1
                                    </td>
                                    <td>
                                      {" "}
                                      {!statusGradeEdit ? (
                                        <div>I</div>
                                      ) : (
                                        <div>
                                          <Form.Control
                                            style={{ width: "80%" }}
                                            type="text"
                                            defaultValue="I"
                                          />
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      {" "}
                                      {!statusGradeEdit ? (
                                        <div>A</div>
                                      ) : (
                                        <div>
                                          <Form.Control
                                            style={{ width: "80%" }}
                                            type="text"
                                            defaultValue="A"
                                          />
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      {" "}
                                      {!statusGradeEdit ? (
                                        <div>
                                          <i
                                            style={{
                                              marginLeft: "10px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              setStatusGradeEdit(true)
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
                                              marginLeft: "5px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              setStatusGradeEdit(false)
                                            }
                                            className="fa fa-times fa-1x text-danger"
                                            aria-hidden="true"
                                          ></i>
                                          <i
                                            style={{
                                              marginLeft: "5px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              setStatusGradeEdit(false)
                                            }
                                            className="fa fa-save btn text-danger"
                                          ></i>
                                        </div>
                                      )}
                                    </td>
                                  </tr>

                                  <tr className="even">
                                    <td style={{ width: "30%" }}>2</td>
                                    <td>
                                      {" "}
                                      {!statusGradeEdit ? (
                                        <div>II</div>
                                      ) : (
                                        <div>
                                          <Form.Control
                                            style={{ width: "80%" }}
                                            type="text"
                                            defaultValue="II"
                                          />
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      {" "}
                                      {!statusGradeEdit ? (
                                        <div>B</div>
                                      ) : (
                                        <div>
                                          <Form.Control
                                            style={{ width: "80%" }}
                                            type="text"
                                            defaultValue="B"
                                          />
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      {" "}
                                      {!statusGradeEdit ? (
                                        <div>
                                          <i
                                            style={{
                                              marginLeft: "10px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              setStatusGradeEdit(true)
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
                                              marginLeft: "5px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              setStatusGradeEdit(false)
                                            }
                                            className="fa fa-times fa-1x text-danger"
                                            aria-hidden="true"
                                          ></i>
                                          <i
                                            style={{
                                              marginLeft: "5px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              setStatusGradeEdit(false)
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
                          <div style={{ marginLeft: "100px" }}>
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
                      ) : (
                        <div>
                          <Row className="mb-4">
                            <Col sm="4" className="mb-4">
                              <Form.Label style={{ marginLeft: "40px" }}>
                                Grade{" "}
                              </Form.Label>
                            </Col>
                            <Col sm="6">
                              <Form.Control type="text" style={{width:"50%"}} />
                            </Col>{" "}
                            <Col sm="4">
                              <Form.Label style={{ marginLeft: "40px" }}>
                                Section
                              </Form.Label>
                            </Col>
                            <Col sm="6">
                              <Form.Control type="text" style={{width:"50%"}}/>
                            </Col>
                          </Row>
                          <div className="card-footer py3">
                            <Button
                              type="submit"
                              className="btn btn-danger btn-save"
                              onClick={() => setStatusGradeEdit(false)}
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
  );
};
export default Grade;
