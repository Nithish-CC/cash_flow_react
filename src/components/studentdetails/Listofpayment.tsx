import React from 'react';

import Sidebar from '../Layouts/Sidebar';
import Navbar from '../Layouts/Navbar';
import { Container,Form,Table,Pagination } from 'react-bootstrap';

const Listofpayment = ()=>{
    
    return(
        <div>
          
            <div className="col-lg-12" style={{ position: "relative", top: "40px" }}>
       <div className="card shadow">  
          <div className="card-header text-center">
            <h6 className="m-0 text-danger">List of Payment</h6>
          </div>
          <div className="row" style={{"padding":"15px"}}>
            <div className="col-md-6">
        <table> 
          <tr>
            <th style={{marginTop:"10px"}}>Student Name</th>
            <td width="1%">:</td>
            <td>asainkk</td>
          </tr>
		  <tr>
            <th>Admission ID</th>
            <td width="1%">:</td>
            <td >MVM100065</td>
          </tr>
          <tr>
            <th>Admission No</th>
            <td width="1%">:</td>
            <td>100065</td>
          </tr>
        </table>
      </div>
      <div className="col-md-6"  >
        <table>
          <tr>
            <th>Class & Section</th>
            <td width="1%">:</td>
            <td>I</td>
          </tr>
          <tr>
            <th>Academic_year</th>
            <td width="1%">:</td>
            
            <td>
              <Form.Select className="form-control" style={{width:"180px",marginTop:"5px"}} id="academic_year">
              <option value=""> --Select--</option>
				    	<option >2022-2023</option> 
                  </Form.Select>
            </td>
          </tr>
          
        </table>
        </div>
        </div>
        <Container>
                   <div>
                            <Form.Label style={{"marginLeft":"85%"}}>
                                Search:
                                <Form.Control
                                  type="search"
                                  className="form-control form-control-sm"
                                />
                              </Form.Label>
                            
                          </div>
                      
        
                          <Table
                              striped bordered hover
                              width="100%"
                              style={{ width: "100%" }}
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    className="sorting_asc"
                                    style={{ width: "165px" }}
                                  >
                                  Fee Type Name
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "14px" }}
                                  >
                                    Payment Date
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "63px" }}
                                  >
                                   Actual Fees
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "63px" }}
                                  >
                                   Paid Amount
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "63px" }}
                                  >
                                    Refund Amount
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "63px" }}
                                  >
                                   Payment Mode
                                  </th>
                                  <th
                                    className="sorting"
                                    style={{ width: "33px" }}
                                  >
                                    Comments
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                <td
                                    style={{ width: "20%" }}
                                    className="sorting_1">
                                 Admission Fees
                                  </td>
                                <td>
                                2022-01-04
                                  </td>
                                  <td>
                                  333
                                  </td>
                                  <td> 
                                  1.00
                                  </td>
                                  <td>
                                  0.00
                                  </td>
                                  <td>
                                  Cash
                                  </td>
                                  <td>
                                    
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                            <div style={{marginLeft:"25%"}}>
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
        </Container>
        </div>
        </div>
        </div>
    )

}
export default Listofpayment;

