import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import Listofpayment from "./Listofpayment";
import { Button, Row, Col, Table, Form } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import "./index.css";
import { useHistory, useParams } from "react-router-dom";
import { values } from "lodash";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Right } from "react-bootstrap/lib/Media";
const Studentpay = () => {
	const [RefundTableStatus, setRefundTableStatus] = useState(false);
	const [feemasterid, setfeemasterid] = useState<any>([]);
	const [searchResultData, setMainSearch] = useState<any>([]);
	const [allGotFinalData, setAllGotFinalData] = useState<any>([]);
	const [priceChange, setPriceChange] = useState(0);
	const [paymentDetails, setPaymentDetails] = useState<any>([]);
	const [newDate, setNewDate] = useState<any>(new Date());
	const [AllDetailsOfStudent, setAllDetailsOfStudent] = useState<any>([]);
	const [buttonDisable, setButtonDisable] = useState(false);
	const [admissionidd, setadmissionsid] = useState<any>([]);

	const [Payment, setPayment] = useState<any>([]);
	const [termsTextBox, setTermsTextBox] = useState<any>([]);
	const [termsmaster, setTermsmaster] = useState<any>([]);
	const [gotSchoolDetails, setGotSchoolDetails] = useState<any>([]);
	const [finalterms, setFinalterms] = useState<any>([]);

	const [amountTextBox, setAmountTextBox] = useState<any>([]);

console.log(amountTextBox,"rewrewrwerwe");

	console.log(termsmaster,"4444444");
	
	const urlParams: any = useParams();
	const id = urlParams.id;
	const year = urlParams.year;
	console.log(year);
	console.log(allGotFinalData);
	const ShowingTextBox = (terms: any) => {
		let Textbox = [];
		console.log(terms);
		if (terms > 0) {
			for (var i = 0; i < terms; i++) {
				console.log(i);
				Textbox.push(i);
			}
			console.log(Textbox);
		}

		setTermsTextBox(Textbox);
	};

	//For Refund Initiate
	const [refundSwitch, setRefundSwitch] = useState(false);

	useEffect(() => {
		callStudentData();
	}, []);
	useEffect(() => {
		setTermsmaster("");
	}, []);
	useEffect(() => {
		let AllRoundData: any[] = [];
		let resultantData: any[] = [];
		if (searchResultData && searchResultData.length > 0) {
			//console.log(searchResultData);
			searchResultData.forEach((allData: any) => {
				//	console.log(allData[0]);
				//	console.log(allData[1]);
				let newData = allData[1];
				console.log(newData);
				let ParticularStudentData: any = [];
				let ParticularStudentBalance: any = [];
				newData.forEach((element: any) => {
					console.log(element);
					if (element && element.balance >= 0) {
						ParticularStudentBalance.push({ Allbalance: element.balance });
					}
					if (element && element.totalRefund >= 0) {
						ParticularStudentBalance.push({ AlltotalRefund: element.totalRefund });
					}
					if (element && element.totalpaid >= 0) {
						ParticularStudentBalance.push({ Alltotalpaid: element.totalpaid });
					}
					if (element && element.totalFees >= 0) {
						ParticularStudentBalance.push({ AlltotalFees: element.totalFees });
					}
					if (element && element.totalcumamt >= 0) {
						ParticularStudentBalance.push({ Allcumamt: element.totalcumamt });
					}
					if (element && element.totaldiscountamount >= 0) {
						ParticularStudentBalance.push({ AllDiscount: element.totaldiscountamount });
					}
					if (element && element.studentData && Object.keys(element.studentData).length > 0) {
						console.log(element.studentData);
						resultantData.push(element.studentData);
						if (ParticularStudentData && ParticularStudentData.length == 0) {
							ParticularStudentData.push(element.studentData);
							//	console.log(element.studentData)
						}
					}
				});

				console.log(ParticularStudentBalance);
				let newFinalArr = [{ ...ParticularStudentBalance[0], ...ParticularStudentData[0] }];
				AllRoundData.push(newData[0]);
				console.log(newFinalArr);
				setAllDetailsOfStudent([...ParticularStudentBalance, ...newFinalArr]);
			});
			//	console.log(AllRoundData);
			setAllGotFinalData(resultantData);
			handleGetAllData(resultantData);
			setPaymentDetails(resultantData);
			let amountRfundStatus: any[] = [];
			let amoundRefundDate: any[] = [];
			let modeOfPaymentStart: any[] = [];
			let commentsStart: any[] = [];
			resultantData.forEach((value, index) => {
				amountRfundStatus.push({ index: index, amoundTyped: 0 });
				amoundRefundDate.push({ index: index, date: moment(new Date()).format("YYYY-MM-DD") });
				modeOfPaymentStart.push({ index: index, payment_mode: "Cash" });
				commentsStart.push({ index: index, comments: "" });
			});
			setPriceRefundDateChange(amoundRefundDate);
			setPriceDateChange(amoundRefundDate);
			setPriceRefundArr(amountRfundStatus);
			setmodeOFPaymnetChange(modeOfPaymentStart);
			setmodeOfPayRefundChange(modeOfPaymentStart);
			setcommentChange(commentsStart);
			setcommentRefundChange(commentsStart);
			//	console.log(AllRoundData)
			// console.log(searchResultData[0]);
			// console.log(searchResultData[0][0]);
			// console.log(searchResultData[0][1]);
		} else {
			setAllGotFinalData([]);
		}
	}, [searchResultData]);

	const handleGetAllData = (resultantData: any) => {
		let amountStatus: any[] = [];
		resultantData.forEach((value: any, index: any) => {
			amountStatus.push({ index: index, amoundTyped: 0 });
		});
		setPriceArr(amountStatus);
	};

	const callStudentData = () => {
		//setIsComponentVisible(false);
		let academicYear = urlParams.year;
		let searchBy = urlParams.id;
		if (academicYear && academicYear.length > 0) {
			if (searchBy && searchBy.length > 0) {
				if (searchBy && searchBy.length > 0 && academicYear && academicYear.length > 0) {
					axios
						.post(`${baseUrl}autoSearch`, {
							searchby: searchBy,
							academic_year: academicYear,
						})
						.then((response: AxiosResponse) => {
							setMainSearch(response.data.data);
 							
							setadmissionsid(response.data.data[0][0]);
							console.log(response.data.data);
							termsChange(response.data.data[0][1][1].studentData, "term1")
						});
				}
			}

		} else {
			alert("Please Academic Year or Student Id not present");
		}
	};

	//======================Handle Date Change=================================//
	const [priceDateChange, setPriceDateChange] = useState<any>([]);
	const handleDateChange = (value: any) => {
		let tempPriceArr: any[] = [];
		priceDateChange.forEach((element: any) => {
			if (element.index != value.index) {
				tempPriceArr.push(element);
			}
		});
		let SortByOrder = [...tempPriceArr, value];
		var sortedObjs = _.sortBy(SortByOrder, "index");
		setPriceDateChange(sortedObjs);
	};
	console.log(priceDateChange);
	useEffect(() => {
		feemaster();
	}, []);

	const feemaster = () => {
		getAccessToken();
		axios.get(`${baseUrl}feeMaster`).then((res: any) => {
			setfeemasterid(res.data.data);
		});
	};

	const [priceRefundDateChange, setPriceRefundDateChange] = useState<any>([]);
	const handleRefundDateChange = (value: any) => {
		let tempRefundPriceArr: any[] = [];
		priceRefundDateChange.forEach((element: any) => {
			if (element.index != value.index) {
				tempRefundPriceArr.push(element);
			}
		});
		let SortByOrder = [...tempRefundPriceArr, value];
		var sortedObjs = _.sortBy(SortByOrder, "index");
		setPriceRefundDateChange(sortedObjs);
	};

	//======================Handle Mode Of Payment Change=================================//
	const [modeOFPaymnetChange, setmodeOFPaymnetChange] = useState<any>([]);
	const handleModeOFPaymnetChange = (value: any) => {
		let tempPriceArr: any[] = [];
		modeOFPaymnetChange.forEach((element: any) => {
			if (element.index != value.index) {
				tempPriceArr.push(element);
			}
		});
		let SortByOrder = [...tempPriceArr, value];
		var sortedObjs = _.sortBy(SortByOrder, "index");
		setmodeOFPaymnetChange(sortedObjs);
	};
	console.log(modeOFPaymnetChange);

	const [modeOfPayRefundChange, setmodeOfPayRefundChange] = useState<any>([]);
	const handlemodeOfPayRefundChange = (value: any) => {
		let tempRefundPriceArr: any[] = [];
		modeOfPayRefundChange.forEach((element: any) => {
			if (element.index != value.index) {
				tempRefundPriceArr.push(element);
			}
		});
		let SortByOrder = [...tempRefundPriceArr, value];
		var sortedObjs = _.sortBy(SortByOrder, "index");
		setmodeOfPayRefundChange(sortedObjs);
	};
	console.log(modeOfPayRefundChange);

	//======================Handle Mode Of Comment Change=================================//
	const [commentChange, setcommentChange] = useState<any>([]);
	const handleCommentChange = (value: any) => {
		let tempPriceArr: any[] = [];
		commentChange.forEach((element: any) => {
			if (element.index != value.index) {
				tempPriceArr.push(element);
			}
		});
		let SortByOrder = [...tempPriceArr, value];
		var sortedObjs = _.sortBy(SortByOrder, "index");
		setcommentChange(sortedObjs);
	};
	console.log(commentChange);

	const [commentRefundChange, setcommentRefundChange] = useState<any>([]);
	const handleRefundCommentChange = (value: any) => {
		let tempRefundPriceArr: any[] = [];
		commentRefundChange.forEach((element: any) => {
			if (element.index != value.index) {
				tempRefundPriceArr.push(element);
			}
		});
		let SortByOrder = [...tempRefundPriceArr, value];
		var sortedObjs = _.sortBy(SortByOrder, "index");
		setcommentRefundChange(sortedObjs);
	};
	console.log(commentRefundChange);
	//=====================Handle Balance================================//
	const [priceArr, setPriceArr] = useState<any>([]);
	
	
	const handlePriceChange = (value: any) => {
		let tempArrData: any[] = [];
		priceArr.forEach((element: any) => {
			if (element.index != value.index) {
				tempArrData.push(element);
			}
		});
		let SortByOrder = [...tempArrData, value];
		var sortedObjs = _.sortBy(SortByOrder, "index");
		setPriceArr(sortedObjs);
	};
useEffect(()=>{
	setAmountTextBox([]) 
},[termsmaster])


 if(amountTextBox.length > 0){
	setAmountTextBox(priceArr[0].amoundTyped);
}
console.log(priceArr);

	//==============================Handle Redund====================================//
	const [priceRefundArr, setPriceRefundArr] = useState<any>([]);
	const handleRefundPriceChange = (value: any) => {
		let amountTxt = String(value.amount);
		if (amountTxt.includes(".")) {
		} else {
			let tempArrData: any[] = [];
			priceRefundArr.forEach((element: any) => {
				if (element.index != value.index) {
					tempArrData.push(element);
				}
			});
			let SortByOrder = [...tempArrData, value];
			var sortedObjsRefund = _.sortBy(SortByOrder, "index");
			setPriceRefundArr(sortedObjsRefund);
		}
	};
	console.log(priceRefundArr);

	//============================================Sending to API============================//

	const windowReload = () => {
		let interval = setInterval(() => {
			window.location.reload();
		}, 3000);

		return () => clearInterval(interval);
	};

	const termsChange = (student: any, terms: any) => {
		console.log(student, "454");

		axios.post(`${baseUrl}payment`, {
			student_id: student.student_id,
			year_id: student.year_id,
			term_name: terms
		}).then((response: AxiosResponse) => {
			setPayment(response.data.data);
		})
		
	}

	//Handle Balance
	const handleBalance = () => {
		let text = "123456789!@#$%fgfgdgdfgdfg";
		let pattern = /[^0-9]/g;
		let result = priceArr.toString().match(pattern);
		console.log(result );
		setButtonDisable(true);
		let SendBalace = priceArr;
		let FeetempArr: any[] = [];
		SendBalace.forEach((element: any) => {
			if (element.amoundTyped > 0) {
				element.Sendbalance = true;
				let date = priceDateChange[element.index].date;
				let paymentMode = modeOFPaymnetChange[element.index].payment_mode;
				let command = commentChange[element.index].comments;
				element.payment_date = date;
				element.payment_mode = paymentMode;
				element.comments = command;
				FeetempArr.push(element);
				delete element.amount_paid;
				delete element.balance
				delete element.cum_amt
				delete element.grade_id
				delete element.index
				delete element.refund

			}
		});
		if (FeetempArr && FeetempArr.length == 0) {
			alert("Please Enter Amount");
			setButtonDisable(false);
		} else {
			console.log(FeetempArr);
			getAccessToken();
			axios
				.put(`${baseUrl}updateStudentBalance`, {
					data: FeetempArr,
				})
				.then((response: AxiosResponse) => {
					console.log(response.data.data);
					toast.success("Payment Success", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					windowReload();
				})
				.catch((err: any) => {
					setButtonDisable(false);
					toast.warning("something went wrong", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				});
		}
		console.log(FeetempArr);
	};

	//Handle Refund
	const handleRefund = () => {
		setButtonDisable(true);
		let SendRefundData = priceRefundArr;
		let FeetempArr: any[] = [];
		SendRefundData.forEach((element: any, index: any) => {
			if (element.amoundTyped > 0) {
				element.Sendrefund = true;
				let date = priceRefundDateChange[element.index].date;
				let paymentMode = modeOfPayRefundChange[element.index].payment_mode;
				let command = commentRefundChange[element.index].comments;
				element.payment_date = date;
				element.payment_mode = paymentMode;
				element.comments = command;
				FeetempArr.push(element);
			}
		});
		if (FeetempArr && FeetempArr.length == 0) {
			alert("Please Enter Amount");
			setButtonDisable(false);
		} else {
			console.log(FeetempArr);
			getAccessToken();
			axios
				.put(`${baseUrl}updateStudentBalance`, {
					data: FeetempArr,
				})
				.then((response: AxiosResponse) => {
					console.log(response.data.data);
					toast.success("Refund  Success", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					windowReload();
				})
				.catch((err: any) => {
					setButtonDisable(false);
					toast.warning("something went wrong", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				});
		}
		console.log(FeetempArr);
	};
	useEffect(() => {
		getAccessToken();
		axios
			.get(`${baseUrl}school`)
			.then((res: any) => {
				console.log(res.data.data);
				setGotSchoolDetails(res.data.data);
				console.log(res.data.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
			
	},[])

useEffect (()=>{
	ShowingTermsValue(gotSchoolDetails);
 
	
},[gotSchoolDetails])

 	const ShowingTermsValue= (termsss:any ) => {
		  
 	 

		 {gotSchoolDetails && gotSchoolDetails.length && gotSchoolDetails.map((terms:any)=>{
			 
			 let termscount = [] 
			for (var i = 1; i <= terms.max_count; i++) {
				
				console.log( "Terms" + i,"----");

				termscount.push("Term" + i)
				
		   }
		  console.log(termscount);
		  setFinalterms(termscount);
		 })}
		
		 
	 
 
	};
//  const termscount = gotSchoolDetails[0].term_count;
	 
// 	for(var i=0; i<termscount; i++){
// console.log(i);

// 	}
	//============================End of Api===================================//
	return (
		<div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div id="page-top">
				<div id="wrapper">
					<Sidebar></Sidebar>
					<div>
						<div id="content">
							<Navbar></Navbar>
							<div className="container">
								<div className="row">
									<div className="col-lg-12" style={{ position: "relative", top: "20px" }}>
										<div className="card shadow  mb-3">
											<div className="card-header bg-transparent border-1 text-center">
												{!refundSwitch ? (
													<a style={{ color: "rgb(230, 63, 63)" }}>
														<h4 className="mb-0">
															<a>
																<i className="far fa-clone pr-1"></i>Pay Fees
															</a>{" "}
															<Link to={`/StudentprofileSearch/${admissionidd.student_admission_id}`}>
																<a className="btn btn-success btn float-right">Back</a>
															</Link>
															<Button
																variant="success"
																onClick={(e: any) => {
																	handleBalance();
																}}
																style={{ float: "right", marginRight: "10px" }}>
																Submit
															</Button>{" "}
															-				<div style={{ width: "120px", marginRight: "10px", float: "right" }}>
																<Form.Control
																	value={AllDetailsOfStudent && AllDetailsOfStudent.length && AllDetailsOfStudent[0].Allbalance}
																	disabled
																/>
															</div>
														</h4>
													</a>
												) : (
														<a style={{ color: "rgb(230, 63, 63)" }}>
															<h4 className="mb-0">
																<a>
																	<i className="far fa-clone pr-1"></i>Refund
															</a>{" "}
																<Link to={`/StudentprofileSearch/${admissionidd.student_admission_id}`}>
																	<a className="btn btn-success btn float-right" >Back</a>
																</Link>
																<Button
																	variant="info"
																	onClick={(e: any) => {
																		handleRefund();
																	}}
																	style={{ float: "right", marginRight: "10px" }}>
																	Initiate Refund
															</Button>
															</h4>
														</a>
													)}
											</div>
											<div className="row">
												<div className="col-md-6">
													<Table striped bordered hover>
														<thead>
															<tr>
																<th>Name</th>
																<th>Admission Number</th>
																<th>Academic Year</th>
																<th>Terms</th>
															</tr>
														</thead>
														<tbody>
															{AllDetailsOfStudent &&
																AllDetailsOfStudent.length &&
																AllDetailsOfStudent.map((values: any) => {
																	console.log(AllDetailsOfStudent);
																	
																	if (values.student_name || values.admission_no || values.academic_year) {
																		return (
																			<tr>
																				<td>{values.student_name}</td>
																				<td>{values.admission_no}</td>
																				<td>{values.academic_year}</td>
																				<td><div style={{ width: "120px", marginLeft: "10px", float: "right" }}>
			
																					<Form.Select
																						onChange={(e: any) => {
																							termsChange(values, e.target.value)
																							setTermsmaster(e.target.value);
																							{priceArr.map((map:any)=>{
																							
																								map.amoundTyped = 0
																							})}
																						}}
																					>
																						{finalterms && finalterms.length && finalterms.map((count:any)=>{
																							return(
																								<option value={count}>{count}</option>
																							)
																						})}
																					 
																					</Form.Select>
																				</div></td>
																			</tr>
																		);
																	}
																})}
														</tbody>
													</Table>
												</div>
												<div className="col-md-6">
													<Table striped bordered hover>
														<thead>
															<tr>
																<th>Refund/Pay Balance</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																{!refundSwitch ? (
																	<td>
																		<Button
																			variant="primary"
																			onClick={(e: any) => {
																				setRefundSwitch(!refundSwitch);
																			}}>
																			Refund
																		</Button>
																		<br />
																		Note: Click here to Switch to Refund
																	</td>
																) : (
																		<td>
																			<Button
																				variant="warning"
																				onClick={(e: any) => {
																					setRefundSwitch(!refundSwitch);
																				}}>
																				Pay Balance
																		</Button>
																			<br />
																		Note: Click here to Switch to Pay Balance
																		</td>
																	)}
															</tr>
														</tbody>
													</Table>
												</div>
											</div>

											<Form>
												<div className="table-responsive">
													<div className="card-body bg-transparent tableFixHead">
														<Table striped bordered hover>
															<thead>
																<tr style={{ backgroundColor: "red" }}>
																	<th>Fee Name</th>
																	<th>Fees</th>
																	<th>Paid</th>
																	<th>Refund</th>
																	<th>Discount</th>
																	 
																	{/* <th style={{ padding: "10px" }}>Balance</th> */}
																	<th>Date</th>
																	<th style={{ padding: "10px", width: "70px" }}>Pay</th>
																	<th style={{ width: "15%" }}>Amount</th>
																	<th>Mode of Payment</th>
																	<th>Comments</th>
																</tr>
															</thead>
															<tbody className="pointer">
																{Payment &&
																	Payment[0]?.map((value: any, index: any) => {
																		return (
																			<tr key={index}>
																				<td>
																					{value?.fee_type_name}
																				</td>
																				<td>{value?.actual_fees}</td>
																				<td>{value?.cum_amt}</td>
																				<td>{value?.refund}</td>
																				<td>{value?.discount_amount}</td>
																				
																				{/* <td>{Number(value.balance)}</td> */}
																				<td style={{ width: "10%" }}>
																					{!refundSwitch ? (
																						<Form.Control
																							type="date"
																							style={{ width: "82%" }}
																							value={
																								index == priceDateChange[index].index
																									? moment(priceDateChange[index].date).format("YYYY-MM-DD")
																									: moment(new Date()).format("YYYY-MM-DD")
																							}
																							onChange={(e: any) => {
																								handleDateChange({ index: index, date: e.target.value });
																							}}
																						/>
																					) : (
																							<Form.Control
																								type="date"
																								style={{ width: "82%" }}
																								value={
																									index == priceRefundDateChange[index].index
																										? moment(priceRefundDateChange[index].date).format("YYYY-MM-DD")
																										: moment(new Date()).format("YYYY-MM-DD")
																								}
																								onChange={(e: any) => {
																									handleRefundDateChange({ index: index, date: e.target.value });
																								}}
																							/>
																						)}
																				</td>
																				{!refundSwitch ? <td>{Number(value.balance)}</td> : <td>{value.amount_paid}</td>}

																				<td>
																					{!refundSwitch ? (
																						<input
																							type="number"
																							
																							className="form-control input-sm txtamt nk border border-warning"
																							placeholder="Enter Amount"
																							value={
																								priceArr && priceArr.length && priceArr[index].amoundTyped >= 0
																									? priceArr[index].amoundTyped == 0
																										? ""
																										: priceArr[index].amoundTyped
																									: ""
																							}
																							onChange={(e: any) => {
																								 
																								Number(e.target.value) > Number(value.balance)
																									? alert("Amount Greater the Actual Fees")
																									: handlePriceChange({
																										index: index,
																										amoundTyped: Number(Math.round(e.target.value)),
																										amount_paid:
																											Number(e.target.value) + Number(value.amount_paid),
																										student_payment_info_id: value.student_payment_info_id,
																										grade_id: value.grade_id,
																										student_id: value.student_id,
																										refund: Number(value.refund),
																										balance: Number(value.balance) - Number(e.target.value),
																										cum_amt: Number(e.target.value) + Number(value.cum_amt),
																									});
																							}}
																						/>
																					) : (
																							<input
																								type="number"
																								 
																								className="form-control input-sm txtamt nk border border-primary"
																								placeholder="Enter Amount"
																								value={
																									priceRefundArr && priceRefundArr.length
																										? priceRefundArr[index].amoundTyped == 0
																											? ""
																											: priceRefundArr[index].amoundTyped
																										: ""
																								}
																								onChange={(e: any) => {
																									Number(e.target.value) > Number(value.amount_paid)
																										? alert("Amount Greater the Actual Fees")
																										: handleRefundPriceChange({
																											index: index,
																											amoundTyped: Number(Math.round(e.target.value)),
																											amount_paid:
																												Number(value.amount_paid) - Number(e.target.value),
																											student_payment_info_id: value.student_payment_info_id,
																											grade_id: value.grade_id,
																											student_id: value.student_id,
																											refund: Number(e.target.value) + Number(value.refund),
																											refundtyped: Number(e.target.value),
																											balance: Number(value.balance) + Number(e.target.value),
																											cum_amt: value.cum_amt,
																										});
																								}}
																							/>
																						)}
																				</td>
																				<td>
																					{!refundSwitch ? (
																						<select
																							className="form-control pointer"
																							style={{ width: "100%" }}
																							value={modeOFPaymnetChange[index].payment_mode}
																							onChange={(e: any) => {
																								handleModeOFPaymnetChange({
																									index: index,
																									payment_mode: e.target.value,
																								});
																							}}>
																							<option style ={{fontSize:"10px!important"}} value="Cash">Cash</option>
																							<option style ={{fontSize:"10px!important"}}  value="Card">Card</option>
																							<option style ={{fontSize:"10px!important"}} value="Direct Account">Direct Acc.</option>
																							<option style ={{fontSize:"10px!important"}} value="Employee Account">Emp. Account</option>
																						</select>
																					) : (
																							<select
																								className="form-control pointer"
																								style={{ width: "100%" }}
																								value={modeOfPayRefundChange[index].payment_mode}
																								onChange={(e: any) => {
																									handlemodeOfPayRefundChange({
																										index: index,
																										payment_mode: e.target.value,
																									});
																								}}>
																								<option value="Cash">Cash</option>
																								<option value="Card">Card</option>
																								<option value="Direct Account.">Direct Acc.</option>
																								<option value="Employee Account">Emp. Account</option>
																							</select>
																						)}
																				</td>
																				<td>
																					{!refundSwitch ? (
																						<Form.Control
																							as="textarea"
																							value={commentChange[index].comments}
																							onChange={(e: any) => {
																								handleCommentChange({ index: index, comments: e.target.value });
																							}}
																							rows={1}
																						/>
																					) : (
																							<Form.Control
																								as="textarea"
																								value={commentRefundChange[index].comments}
																								onChange={(e: any) => {
																									handleRefundCommentChange({
																										index: index,
																										comments: e.target.value,
																									});
																								}}
																								rows={1}
																							/>
																						)}
																				</td>
																			</tr>
																		);
																	})}
															</tbody>
															<tfoot>
																{Payment && Payment.length && Payment[0] && Payment[0].length ? <tr>
																	<th>Total</th>
																	<th id="totalfeeamt">
																		{Payment && Payment.length && Payment[4].totalFees}
																	</th>
																	<th>{Payment && Payment.length && Payment[5].totalcumamt}</th>
																	<th>
																		{Payment && Payment.length && Payment[2].totalRefund}
																	</th>
																	<th>{Payment && Payment.length && Payment[6].totaldiscountamount}</th>
																	
																	<th />
																	<th>{Payment && Payment.length && Payment[1].balance}</th>
																	{!refundSwitch ? (
																		<th style={{ padding: "13px" }} id="totalbalamt">
																			{Payment && Payment.length && Payment[1].Allbalance}
																		</th>
																	) : (
																			<th id="totalpaidamt">
																				{" "}
																				{Payment && Payment.length && Payment[2].Alltotalpaid}
																			</th>
																		)}
																</tr> : <th colSpan={12} className="text-center">No Data Found</th>}
															</tfoot>
														</Table>
													</div>
												</div>
											</Form>
										</div>
									</div>
								</div>
								<Listofpayment feemasterid={feemasterid} studentdetails={AllDetailsOfStudent} studentadmission={AllDetailsOfStudent}></Listofpayment>
							</div>
						</div>
					</div>
				</div>
			</div >
		</div >
	);
};
export default Studentpay;