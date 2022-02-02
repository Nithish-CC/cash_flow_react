import { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Pagination, Form } from "react-bootstrap";

const Year = () => {
  //Academic Year
  const [statusAcademicYearEdit, setStatusAcademicYearEdit] = useState(false);
  const [statusAcademicYearAdd, setStatusAcademicYearAdd] = useState(false);

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
                              <i className="far fa-clone pr-1"></i> Academic Year
                            </h4>
                    <div style={{ textAlign: "right" }}>
                      {!statusAcademicYearAdd ? (
                        <Button
                          type="submit"
                          className="btn btn-primary btn-sm btn-save"
                          onClick={() => setStatusAcademicYearAdd(true)}
                        >
                          Add
                        </Button>
                      ) : (
                        <Button
                          className="btn btn-sm btn-secondary"
                          onClick={() => setStatusAcademicYearAdd(false)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                  </a>
                  {! statusAcademicYearAdd ? (<div className="card-body">
                    <div className="table-responsive">
                      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        
                            <div
                              id="dataTable_filter"
                              className="dataTables_filter"
                            >
                              <Form.Label htmlFor="inputPassword5" style={{marginLeft:"75%"}}>
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
                                    Academic Year
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
                                    {!statusAcademicYearEdit ? (
                                      <div>2020-2021</div>
                                    ) : (
                                      <div>
                                        <Form.Control
                                          style={{ width: "80%" }}
                                          type="text"
                                          defaultValue="2020-2021"
                                        />
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {" "}
                                    {!statusAcademicYearEdit ? (
                                      <div>
                                        <i
                                          style={{
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            setStatusAcademicYearEdit(true)
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
                                            setStatusAcademicYearEdit(false)
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
                                            setStatusAcademicYearEdit(false)
                                          }
                                          className="fa fa-save btn text-danger"
                                        ></i>
                                      </div>
                                    )}
                                  </td>
                                </tr>

                                <tr className="even">
                                  <td
                                    style={{ width: "30%" }}
                                    className="sorting_1"
                                  >
                                    2
                                  </td>
                                  <td>
                                    {" "}
                                    {!statusAcademicYearEdit ? (
                                      <div>2021-2022</div>
                                    ) : (
                                      <div>
                                        <Form.Control
                                          style={{ width: "80%" }}
                                          type="text"
                                          defaultValue="2021-2022"
                                        />
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {" "}
                                    {!statusAcademicYearEdit ? (
                                      <div>
                                        <i
                                          style={{
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            setStatusAcademicYearEdit(true)
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
                                            setStatusAcademicYearEdit(false)
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
                                            setStatusAcademicYearEdit(false)
                                          }
                                          className="fa fa-save btn text-danger"
                                        ></i>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                                <tr className="odd">
                                  <td
                                    style={{ width: "30%" }}
                                    className="sorting_1"
                                  >
                                    3
                                  </td>
                                  <td>
                                    {!statusAcademicYearEdit ? (
                                      <div>2022-2023</div>
                                    ) : (
                                      <div>
                                        <Form.Control
                                          style={{ width: "80%" }}
                                          type="text"
                                          defaultValue="2022-2023"
                                        />
                                      </div>
                                    )}{" "}
                                  </td>
                                  <td>
                                    {" "}
                                    {!statusAcademicYearEdit ? (
                                      <div>
                                        <i
                                          style={{
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            setStatusAcademicYearEdit(true)
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
                                            setStatusAcademicYearEdit(false)
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
                                            setStatusAcademicYearEdit(false)
                                          }
                                          className="fa fa-save btn text-danger"
                                        ></i>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                                <tr className="even">
                                  <td
                                    style={{ width: "30%" }}
                                    className="sorting_1"
                                  >
                                    4
                                  </td>
                                  <td>
                                    {!statusAcademicYearEdit ? (
                                      <div>2023-2024</div>
                                    ) : (
                                      <div>
                                        <Form.Control
                                          style={{ width: "80%" }}
                                          type="text"
                                          defaultValue="2023-2024"
                                        />
                                      </div>
                                    )}{" "}
                                  </td>
                                  <td>
                                    {" "}
                                    {!statusAcademicYearEdit ? (
                                      <div>
                                        <i
                                          style={{
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            setStatusAcademicYearEdit(true)
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
                                            setStatusAcademicYearEdit(false)
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
                                            setStatusAcademicYearEdit(false)
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
                      
                   ):( <div>
                    <div style={{ marginLeft: "290px"}}>
                    <Form.Label style={{textAlign:"center"}} >Academic Year
                    <Form.Control type="text" />
                    </Form.Label>
                                    </div>
                    <div className="card-footer py3">
                              <Button
                            type="submit"
                          className="btn btn-danger btn-save"
                          onClick={() => setStatusAcademicYearEdit(false)}
                          style={{marginLeft:"90%"}}
                        >Save</Button>
                        </div>
                      </div>)}
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
export default Year;
