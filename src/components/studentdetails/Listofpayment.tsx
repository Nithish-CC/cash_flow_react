import { useEffect, useState } from "react";
import { baseUrl } from "../../index";
import { Container, Form, Table } from "react-bootstrap";
import { getAccessToken } from "../../config/getAccessToken";
import axios from "axios";
import { useParams } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import {
  listOfPaymentstudentAllPayBalanceData,
  listOfPaymentStudentYearPostData,
} from "../../Redux/Actions/listOfPaymentRed";

const Listofpayment = (props: any) => {
  const studentdeta = props.studentdetails;
  const [academicyear, setAcademicyear] = useState<any>([]);
  const [academicYearId, setAcademicYearId] = useState<any>([]);

  const [Merdattwpus, setMerdattwpus] = useState<any>([]);
  const [mergedata, setmergedata] = useState<any>([]);
  const [filter, setfilter] = useState<any>([]);
  const urlParams: any = useParams();
  const id = urlParams.id;

  const dispatch = useDispatch<any>();

  const studentyearpostdata = useSelector(
    (state: any) =>
      state.studentDetailsGet.listOfPayment_StudentYearPost?.data?.data
  );
  useEffect(() => {
    if (studentyearpostdata && studentyearpostdata?.length) {
      setAcademicyear(studentyearpostdata);
      setAcademicYearId(studentyearpostdata[0].year_id);
    }
  }, [studentyearpostdata]);

  const studentallpaybalancedata = useSelector(
    (state: any) =>
      state.studentDetailsGet.listOfPayment_studentAllPayBalance?.data?.data
  );

  console.log(studentallpaybalancedata);

  const paginate = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
  ];

  useEffect(() => {
    dispatch(listOfPaymentStudentYearPostData(id));
  }, [id]);

  useEffect(() => {
    dispatch(listOfPaymentstudentAllPayBalanceData(id, academicYearId));
  }, [id, academicYearId]);

  const col: any = [
    { dataField: "fee_type_name", text: "Fee Type Name", sort: true },
    {
      dataField: "date_of_transcation",
      text: "Date of Transaction",
      sort: true,
    },
    { dataField: "actual_fees", text: "Actual Fees", sort: true },
    { dataField: "cum_amt", text: "Paid", sort: true },
    { dataField: "refund", text: "Refund Amount", sort: true },
    { dataField: "discount", text: "Discount", sort: true },
    { dataField: "comments", text: "Comments", sort: true },
  ];

  useEffect(() => {
    studentallpaybalancedata && studentallpaybalancedata.length
      ? studentallpaybalancedata.map((data: any) => {
          studentyear(data);
        })
      : setMerdattwpus([]);
  }, [studentallpaybalancedata]);

  function studentyear(gradedata: any) {
    var matchedyearid: any =
      props.feemasterid &&
      props.feemasterid.length &&
      props.feemasterid.filter(
        (data: any) => data.fee_master_id === gradedata.fee_master_id
      );
    let combindobject = { ...gradedata, ...matchedyearid[0] };
    setmergedata([]);
    mergedata.push(combindobject);
    setMerdattwpus(mergedata);
  }

  const datatoFilterNull: any =
    Merdattwpus &&
    Merdattwpus.length &&
    Merdattwpus.sort().map((data: any) => {
      let keys = Object.keys(data);
      keys.map((key: any) => {
        data[key] = data[key] == null ? "" : data[key];
      });
      return data;
    });

  const dataSearchBar: any =
    datatoFilterNull &&
    datatoFilterNull.length &&
    datatoFilterNull.sort().filter((data: any) => {
      return Object.keys(data).some((key) =>
        data[key]
          .toString()
          .toLowerCase()
          .includes(filter.toString().toLowerCase())
      );
    });
  return (
    <div>
      <div className="col-lg-12" style={{ position: "relative", top: "40px" }}>
        <div className="card shadow">
          <div className="card-header text-center">
            <h6 className="m-0 text-danger">List of Payment</h6>
          </div>
          {studentdeta &&
            studentdeta.length &&
            studentdeta.map((values: any) => {
              if (
                values.student_name ||
                values.admission_no ||
                values.academic_year
              ) {
                return (
                  <div className="row" style={{ padding: "15px" }}>
                    <div className="col-md-6">
                      <table>
                        <tr>
                          <th style={{ marginTop: "10px" }}>Student Name</th>
                          <td width="1%">:</td>
                          <td>{values.student_name}</td>
                        </tr>
                        <tr>
                          <th>Admission ID</th>
                          <td width="1%">:</td>
                          <td>{values.student_id}</td>
                        </tr>
                        <tr>
                          <th>Admission No</th>
                          <td width="1%">:</td>
                          <td>{values.admission_no}</td>
                        </tr>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <table>
                        <tr>
                          <th>Class & Section</th>
                          <td width="1%">:</td>
                          <td>
                            {values.grade_master} & {values.section}
                          </td>
                        </tr>
                        <tr>
                          <th>Academic_year</th>
                          <td width="1%">:</td>

                          <td>
                            <Form.Select
                              className="form-control"
                              style={{ width: "180px", marginTop: "5px" }}
                              id="academic_year"
                              onChange={(e: any) =>
                                setAcademicYearId(e.target.value)
                              }
                            >
                              {academicyear &&
                                academicyear.length &&
                                academicyear.map((values: any, i: any) => {
                                  return (
                                    <option value={values.year_id}>
                                      {values.academic_year}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                );
              }
            })}

          <Container>
            <div className="table-responsive">
              <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div id="dataTable_filter" className="dataTables_filter">
                  <Form.Label
                    htmlFor="inputPassword5"
                    style={{ marginLeft: "75%" }}
                  >
                    Search:
                    <Form.Control
                      type="search"
                      className="form-control form-control-sm"
                      onChange={(e) => setfilter(e.target.value)}
                    />
                  </Form.Label>
                </div>
              </div>
            </div>
            {dataSearchBar && dataSearchBar.length > 0 ? (
              <BootstrapTable
                keyField="index"
                bodyClasses="text-center"
                headerClasses="text-center"
                data={dataSearchBar}
                columns={col}
                hover
                striped
                pagination={paginationFactory({
                  sizePerPageList: paginate,
                })}
              />
            ) : (
              <Table
                striped
                bordered
                hover
                width="100%"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr role="row">
                    <th className="sorting_asc">Fee Type Name</th>
                    <th className="sorting">Date of Transaction</th>
                    <th className="sorting">Actual Fees</th>
                    {/* <th className="sorting">Cum_Amount</th> */}
                    <th className="sorting">Paid</th>
                    <th className="sorting">Refund Amount</th>
                    <th className="sorting">discount</th>
                    <th className="sorting">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="text-center">
                      No Data Found
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};
export default Listofpayment;
