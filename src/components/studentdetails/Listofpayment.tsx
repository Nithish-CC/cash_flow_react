import {useEffect,useState} from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { baseUrl } from "../../index";
import { Container, Form, Table, Pagination } from "react-bootstrap";
import { getAccessToken } from "../../config/getAccessToken";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";


const Listofpayment = (props: any) => {
    const studentdeta = props.studentdetails;
	const [academicyear,setAcademicyear] =useState<any>([]);
	const [payments,setPayments] = useState<any>([]);
	const [academicYearId,setAcademicYearId] = useState<any>([]);
    const [feemasterid,setfeemasterid] = useState<any>([]);
    const [Merdattwpus,setMerdattwpus] = useState<any>([]);
    const [mergedata,setmergedata] = useState<any>([]);
	let history = useHistory();
	const urlParams: any = useParams();
	const id = urlParams.id;
	console.log(id);

     
	useEffect(() => {
        getAccessToken();
		axios.post(`${baseUrl}studentyear`, {student_id:id}).then((response:any) => {
			setAcademicyear(response.data.data)
            setAcademicYearId(response.data.data[0].year_id);
		});
	},[]);

	useEffect(() => {
        getAccessToken();
      axios.post(`${baseUrl}studentAllPayBalance`,{
		"student_id":id,
		"year_id":academicYearId
	}).then((res:any) =>{
		setPayments(res.data.data)
	})
	},[academicYearId]);

    const feemaster = () => {
        getAccessToken();
        axios.get(`${baseUrl}feeMaster`).then((res: any) => {
          setfeemasterid(res.data.data);
        });
      };

     useEffect(() => {
        payments && payments.length
      ? payments.map((data: any) => {
          studentyear(data);
        })
      : setMerdattwpus([]);
  }, [payments]);

  useEffect(() =>{
    feemaster();
  },[])

  function studentyear(gradedata: any) {
    
    var matchedyearid: any =
      feemasterid &&
      feemasterid.length &&
      feemasterid.filter(
        (data: any) => data.fee_master_id === gradedata.fee_master_id
      );
    let combindobject = { ...gradedata, ...matchedyearid[0]};
    setmergedata([]);
    mergedata.push(combindobject);
    setMerdattwpus(mergedata);
  }

console.log(Merdattwpus)
console.log(academicyear);
    return (
        <div>
            <div className="col-lg-12" style={{ position: "relative", top: "40px" }}>
                <div className="card shadow">
                    <div className="card-header text-center">
                        <h6 className="m-0 text-danger">List of Payment</h6>
                    </div>

                    {/* <div className="card-header text-center">
						<h6 className="m-0 text-danger">Under Construction {`\u{1F6A7}`}</h6>
					</div> */}
                    {studentdeta &&
                        studentdeta.length &&
                        studentdeta.map((values: any) => {
                            if (values.student_name || values.admission_no || values.academic_year) {
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
                                                    <td>{values.grade_master} & {' '}{values.section}</td>
                                                </tr>
                                                <tr>
                                                    <th>Academic_year</th>
                                                    <td width="1%">:</td>

                                                    <td>
														
                                                        <Form.Select className="form-control" style={{ width: "180px", marginTop: "5px" }} id="academic_year" onChange = {(e:any)=>setAcademicYearId(e.target.value)}>
														{academicyear && academicyear.length && academicyear.map((values:any,i:any) =>{
															return(
																<option value={values.year_id}>{values.academic_year}</option>
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
                        <div>
                            <Form.Label style={{ marginLeft: "85%" }}>
                                Search:
                                <Form.Control type="search" className="form-control form-control-sm" />
                            </Form.Label>
                        </div>

                        <Table striped bordered hover width="100%" style={{ width: "100%" }}>
                            <thead>
                                <tr role="row">
                                    <th className="sorting_asc" style={{ width: "165px" }}>
                                        Fee Type Name
                                    </th>
                                    <th className="sorting" style={{ width: "14px" }}>
                                        Date of Transaction
                                    </th>
                                    <th className="sorting" style={{ width: "63px" }}>
                                        Actual Fees
                                    </th>
                                    <th className="sorting" style={{ width: "63px" }}>
                                        Paid Amount
                                    </th>
                                    <th className="sorting" style={{ width: "63px" }}>
                                        Refund Amount
                                    </th>
                                    <th className="sorting" style={{ width: "63px" }}>
                                         discount
                                    </th>
                                    <th className="sorting" style={{ width: "33px" }}>
                                        Comments
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {Merdattwpus && Merdattwpus.length > 0 ? (
                            Merdattwpus.map((values:any,i:any) =>{
                                return(
                                    <tr>
                                    <td style={{ width: "20%" }} className="sorting_1">
                                       {values.fee_type_name}
                                    </td>
                                    <td>{values.date_of_transcation}</td>
                                    <td>{values.actual_fees}</td>
                                    <td>{values.amount_paid}</td>
                                    <td>{values.refund}</td>
                                    <td>{values.discount}</td>
                                    <td>{values.comments}</td>
                                </tr>
                                )
                            }) ) : (
                                <tr>
                                    <td colSpan={7} className="text-center">
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                                
                            </tbody>
                        </Table>
                        <div style={{ marginLeft: "25%" }}>
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
    );
};
export default Listofpayment;
