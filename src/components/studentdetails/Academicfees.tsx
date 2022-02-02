import React, { useState } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";

const Academicfees = () => {
  //table status edit
  const [updateTableStatus, setUpdateTableStatus] = useState(false);
  return (
    <div>
      <div className="row mt-4">
        <div className="col-lg-11">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h4 className="m-0 text-danger text-center">
                <a>
                  <i className="far fa-clone"></i> Student Academic Fees
                </a>{" "}
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
              <div className="col-sm-12">
                <Table striped bordered hover width="100%"
                              style={{ width: "100%" }}>
                  <thead>
                    <tr role="row">
                      <th>Fee Type Name</th>
                      <th>Actual fees</th>
                      <th>Discount</th>
                      <th>Fee Discount Type</th>
                      <th>Updated Fees</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{textAlign:'center'}} >
                      <td style={{ width: "20%",textAlign:'center' }}>Bus Fee</td>
                      <td style={{textAlign:'center'}}>333</td>
                      <td>
                        {!updateTableStatus ? (
                          <div style={{textAlign:'center'}}>3000</div>
                        ) : (
                          <Form.Control
                          type="text"
                          defaultValue="2000"
                           />
                          
                        )}
                      </td>
                      <td>
                        {!updateTableStatus ? (
                          <div>Correspondent</div>
                        ) : (
                          <Form.Select aria-label="Default select example">
                            <option>--Select--</option>
                            <option value="1">Staff Children</option>
                            <option value="2">Correspondent</option>
                            <option value="3">Trust</option>
                            <option value="3">TC</option>
                          </Form.Select>
                        )}
                      </td>
                      <td></td>
                      <td>
                        {!updateTableStatus ? (
                          <i
                            className="fa fa-edit profile_btn-edit btn"
                            onClick={() => setUpdateTableStatus(true)}
                            style={{
                             
                              color: "red",
                              cursor: "pointer",
                            }}
                          ></i>
                        ) : (
                          <Row>
                            <Col md={5}>
                              <i
                                className="fa fa-save btn"
                                onClick={() => setUpdateTableStatus(false)}
                                style={{
                                  
                                  color: "red",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </Col>
                            <Col
                              md={5}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <i
                                className="fa fa-times"
                                aria-hidden="true"
                                onClick={() => setUpdateTableStatus(false)}
                                style={{
                                  
                                  color: "red",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </Col>
                          </Row>
                        )}
                      </td>
                    </tr>
                    <tr style={{textAlign:'center'}}>
                      <td style={{ width: "20%" }}>Admission Fees</td>
                      <td style={{textAlign:'center'}}>333</td>
                      <td style={{textAlign:'center'}}>
                        {!updateTableStatus ? (
                          <div>2000</div>
                        ) : (
                          <Form.Control
                          type="text"
                          defaultValue="2000"
                           />
                          
                        )}
                      </td>
                      <td style={{textAlign:'center'}}>
                        {!updateTableStatus ? (
                          <div>Staff Children</div>
                        ) : (
                          <Form.Select aria-label="Default select example">
                            <option>--Select--</option>
                            <option value="1">Staff Children</option>
                            <option value="2">Correspondent</option>
                            <option value="3">Trust</option>
                            <option value="3">TC</option>
                          </Form.Select>
                        )}
                      </td>
                      <td></td>
                      <td>
                        {!updateTableStatus ? (
                          <i
                            className="fa fa-edit profile_btn-edit btn"
                            onClick={() => setUpdateTableStatus(true)}
                            style={{
                             
                              color: "red",
                              cursor: "pointer",
                            }}
                          ></i>
                        ) : (
                          <Row>
                            <Col md={5}>
                              <i
                                className="fa fa-save btn"
                                onClick={() => setUpdateTableStatus(false)}
                                style={{
                                  
                                  color: "red",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </Col>
                            <Col
                              md={5}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <i
                                className="fa fa-times"
                                aria-hidden="true"
                                onClick={() => setUpdateTableStatus(false)}
                                style={{
                                  
                                  color: "red",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </Col>
                          </Row>
                        )}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th style={{textAlign:'center'}}>Total</th>
                      <th style={{textAlign:'center'}}>333</th>
                      <th style={{textAlign:'center'}}>50</th>
                      <th style={{textAlign:'center'}}></th>
                      <th style={{textAlign:'center'}}></th>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academicfees;
