import react from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../index";
import axios, { AxiosResponse } from "axios";

const Feesdetails = (props: any) => {
    let history = useHistory()
    const status = props.student_id;
    console.log(status)

    const [YearOfBalanceByYear ,setYearOfBalanceByYear] = useState<any>({});
	const [allGotFinalData, setAllGotFinalData] = useState<any>([]);

	const Year_of_fee = ()=>{
	axios.post(`${baseUrl}autoSearch`,{
        allbalance:status,
	})
	.then(res => {
	 console.log("Getting from ::::",res.data.data)
	 setYearOfBalanceByYear(res.data.data)
	 console.log(YearOfBalanceByYear)
 	}).catch(err => console.log(err))
}
 useEffect(() => {
    if (status  && status.length>0){
        Year_of_fee();
    }
    
  }, [status])
console.log(YearOfBalanceByYear);
  useEffect(() => {
    let AllRoundData: any[] = [];
    console.log(YearOfBalanceByYear);   
    
    if (YearOfBalanceByYear && YearOfBalanceByYear.length > 0) {
        console.log(YearOfBalanceByYear);
        YearOfBalanceByYear.forEach((allData: any) => {
            //	console.log(allData[0]);
            //	console.log(allData[1]);
            let newData = allData[1];
            let ParticularStudentData: any = [];
            let ParticularStudentBalance: any = [];
            newData.forEach((element: any) => {
                //		console.log(element);
                if (element && element.balance) {
                    ParticularStudentBalance.push({ Allbalance: element.balance });
                }
                if (element && element.studentData && Object.keys(element.studentData).length > 0) {
                    //			console.log(element.studentData);
                    if (ParticularStudentData && ParticularStudentData.length == 0) {
                        ParticularStudentData.push(element.studentData);
                    }
                }
            });
            let newFinalArr = [{ ...ParticularStudentBalance[0], ...ParticularStudentData[0] }];
            AllRoundData.push(newFinalArr[0]);
        });
        	console.log(AllRoundData);
        setAllGotFinalData(AllRoundData);
        // console.log(searchResultData[0]);
        // console.log(searchResultData[0][0]);
        // console.log(searchResultData[0][1]);
    } else {
        setAllGotFinalData([]);
    }
}, [YearOfBalanceByYear]);

  //stupay/mvm10006/2021-2022
    return (
        <div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h4 className="m-0 text-danger text-center">
                                <a>
                                    <i className="far fa-clone"></i> Payment
                                </a>{" "}
                                {status === "aa" ? (
                                    <Link to="/Stu_pay">
                                        {" "}
                                        <a className="btn btn-success btn-sm float-right">Pay or View All</a>
                                    </Link>
                                ) : null}
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-4 col-md-3 mb-1">
                                    <div>
                                        <h6>Date</h6>
                                    </div>
                                    <div>
                                        <label>2022-01-04</label>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-3 mb-1">
                                    <div>
                                        <h6>Fee Type</h6>
                                    </div>
                                    <div>
                                        <label>Admission Fees</label>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-3 mb-1">
                                    <div>
                                        <h6>Amount ₹</h6>
                                    </div>
                                    <div>
                                        <label>14000.00</label>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-3 mb-1">
                               
                                    <div>
                                        <label>2022-01-04</label>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-3 mb-1">
                                 
                                    <div>
                                        <label>Uniform Fees</label>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-3 mb-1">
                                  
                                    <div>
                                        <label>3500.00</label>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-3 mb-1">                                   
                                    <div>
                                        <label>2022-01-04</label>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-3 mb-1">
                                   
                                    <div>
                                        <label>Book Fees</label>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-3 mb-1">
                                   
                                    <div>
                                        <label>10000.00</label>
                                    </div>
                                </div>

                            
                              
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h4 className="m-0  text-danger text-center">
                                <i className="far fa-clone"></i> Year of Balance
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-4 col-md-4 mb-1">
                                    <div>
                                        <h6>Academic Year</h6>
                                    </div>
                                    <div>
                                        <label>{allGotFinalData && allGotFinalData.length && allGotFinalData.map( (amount:any) =>{
                                            return <option>  {amount=amount.academic_year}</option>
                                        } )} </label>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-4 mb-1">
                                    <div>
                                        <h6>Balance ₹</h6>
                                    </div>
                                    <div>
                                    <label>{allGotFinalData && allGotFinalData.length && allGotFinalData.map( (amount:any) =>{
                                            return <option>  {amount=amount.balance}</option>
                                        } )} </label>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-4 mb-1">
                                    <div>
                                        <h6>Action</h6>
                                    </div>
                                    <div>
                                        <Button onClick={(e)=>{history.push('/stu_pay')}} className="btn-success btn-sm">Pay / View All</Button>
                                    </div>
                                </div>
                          
                                <div className="col-xl-4 col-md-4 mb-1">
                                    <div>
                                        <label>2023-2024</label>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-4 mb-1">
                                    <div>
                                        <label>0</label>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-4 mb-1">
                                    <div>
                                        <Button className="btn-success btn-sm" disabled>
                                            Pay / View All
                                        </Button>
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
export default Feesdetails;
