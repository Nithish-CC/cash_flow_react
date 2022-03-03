import { useEffect, useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Col, Row, Spinner, Modal } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Yearoffee = () => {
	const [statusFeeDetailsAdd, setStatusFeeDetailsAdd] = useState(false);
	const [feeMaster, setAllFeeMaster] = useState<any[]>([]);
	const [tableFeeAmount, setTableFeeAmount] = useState<any[]>([]);
	const [spinnerLoad, setSpinnerLoad] = useState<any>(true);
	const [feeTypeName, setFeeTypeName] = useState("");
	const [amount, setFinalAmount] = useState("");
	const [searchAcademicYear, setSearchAcademicYear] = useState("");
	// const [searchGrade, setSearchGrade] = useState("");

	const [editingYearOfFee, setEditingYearOfFee] = useState<any>({});
	const [updateYearOfFee, setUpdateYearOfFee] = useState<any>("");
	const [datatoDelete, setdatatoDelete] = useState<any>({});
	const [duplication, setDuplication] = useState(false);
	const [searchGradeId, setSearchGradeId] = useState("");
	const [FeeDetailsFinal, setFeeDetailsFinal] = useState<any[]>([]);
	const [GetFinalYearData, setGetFinalYearData] = useState<any[]>([]);

	const [displayFinalData, setDisplayFinalData] = useState<any[]>([]);	
	const [gradeSectionList, setGradeSectionList] = useState<any>([]);
	const [academicYear, setAcademicYear] = useState<any>("");
	const [gradeSectionListAdd, setGradeSectionListAdd] = useState<any>([]);


	const [filterGradeByYear, setFilterGradeByYear] = useState<any>([]);
	const [filterSectionByYear, setFilterSectionByYear] = useState<any>([]);
	const [filterSectionByYearAdd, setFilterSectionByYearAdd] = useState<any>([]);

	const [gradeMaster, setGradeMaster] = useState<any>([]);
	const [gradeMasterParticular, setGradeMasterParticular] = useState<any>([]);

	// console.log(searchGradeId);

	// console.log(datatoDelete);

	//feb 26 by nithish
	const [allGrade, setAllGrade] = useState<any[]>([]);
	const [frontSearchGrade, setFrontSearchGrade] = useState<any>("");
	const [frontSearchYear, setFrontSearchYear] = useState<any>("");
	//Modal Popup
	const [show, setShow] = useState(false);


	const SuddenhandleClose = () => {
		setShow(false);
		setdatatoDelete({});
	};
	const handleShow = () => {
		setShow(true);
	};

	const getAllGradeSectionData = () => {
		getAccessToken();
		axios.get(`${baseUrl}feeMaster`).then((res: any) => {
			console.log(res.data.data);
			setFeeDetailsFinal(res.data.data);
		});
	};

	// console.log(FeeDetailsFinal);
	const getAllFeeMasterData = () => {
		getAccessToken();
		axios.get(`${baseUrl}year`).then((response: AxiosResponse) => {
			
			setAllFeeMaster(response.data.data);
			setSearchAcademicYear(response.data.data[0].year_id);
			setFrontSearchYear(response.data.data[0].year_id);
			
		});
	};

	function YearId(gradedata: any) {
		// console.log(gradedata);
		var matchedyearid: any = FeeDetailsFinal && FeeDetailsFinal.length && FeeDetailsFinal.filter((data: any) => data.fee_master_id === gradedata.fee_master_id);
		let combindobject = { ...gradedata, ...matchedyearid[0]};
		GetFinalYearData.push(combindobject);
		console.log(GetFinalYearData);
		setDisplayFinalData(GetFinalYearData);
	}

	useEffect(() => {
		setGetFinalYearData([]);
		tableFeeAmount && tableFeeAmount.length
			? tableFeeAmount.map((data: any) => {
					YearId(data);
			  })
			: setDisplayFinalData([]);
	}, [tableFeeAmount]);

	console.log(tableFeeAmount);

	const getAllGrade = () => {
		getAllFeeMasterData();
		axios.get(`${baseUrl}gradeSection`).then((res: AxiosResponse) => {
			setAllGrade(res.data.data);
			setGradeSectionList(res.data.data);
			setGradeSectionListAdd(res.data.data);

			setFrontSearchGrade(res.data.data[0].grade_id);
			setSearchGradeId(res.data.data[0].grade_id);
		});
	};
	useEffect(() => {
 		getAllFeeMasterData();
		
		getAccessToken();
		axios
			.get(`${baseUrl}grademaster`)
			.then((res: any) => {
				setGradeMaster(res.data.data);
				setGradeMasterParticular(res.data.data[0]);
			})
			.catch((error) => console.log(error));
	}, []);
	useEffect(() => {
		// console.log(gradeSectionList,filterParticularYear,gradeMaster)
		if (gradeSectionList && gradeSectionList.length > 0 && feeMaster && feeMaster.length > 0 && gradeMaster && gradeMaster.length > 0) {
			//console.log(gradeSectionList,firstAcadmicYear[0])
			setAcademicYear(feeMaster[0].academic_year);
			handleGradeFilter(gradeSectionList, feeMaster[0].year_id);
			handleGradeFilterAdd(gradeSectionListAdd, feeMaster[0].year_id);

		}
	}, [gradeSectionList, feeMaster, allGrade]);

	// console.log(gradeSectionList);

	const handleGradeFilter = (gradeSectionList: any, searchInput: any) => {
		console.log(gradeSectionList, searchInput);
		// setDisplayFinalData();
		//Filtering Grade by academic year id
		let resultData: any = [];
		gradeSectionList.forEach((element: any) => {
			if (searchInput == element.academic_year_id) {
				resultData.push(element);
			}
		});
		console.log(resultData, "grade");

		//Using Filtered Data with grade master api
		let grade_id_bind: any[] = [];
		resultData.forEach((element: any) => {
			gradeMaster.forEach((grade: any) => {
				if (element.grade_id == grade.grade_master_id) {
					let obj: any = { ...element, ...grade };
					grade_id_bind.push(obj);
				}
			});
		});

	const ids = grade_id_bind.map((o) => o.grade_master_id);
	const filtered = grade_id_bind.filter(({ grade_master_id }, index) => !ids.includes(grade_master_id, index + 1));

	const idsofSection = grade_id_bind.map((o) => o.section);
	const filteredForSection = grade_id_bind.filter(({ section }, index) => !idsofSection.includes(section, index + 1));

	console.log(grade_id_bind, "grademaster and section");
	//  console.log(filtered, "Year");
	  console.log(filteredForSection);
	setFilterGradeByYear(filtered);
	setFilterSectionByYear(filteredForSection);
	setDisplayFinalData(filteredForSection);

	}

	//Add

	useEffect(() => {
		// console.log(gradeSectionList,filterParticularYear,gradeMaster)
		if (gradeSectionList && gradeSectionList.length > 0 && feeMaster && feeMaster.length > 0 && gradeMaster && gradeMaster.length > 0) {
			//console.log(gradeSectionList,firstAcadmicYear[0])
			setAcademicYear(feeMaster[0].academic_year);
			handleGradeFilter(gradeSectionList, feeMaster[0].year_id);
		}
	}, [gradeSectionList, feeMaster, allGrade]);
 


	const handleGradeFilterAdd = (gradeSectionListAdd: any, searchInput: any) => {
		console.log(gradeSectionListAdd, searchInput);
		//Filtering Grade by academic year id

		let resultData: any = [];
		gradeSectionListAdd.forEach((element: any) => { 
			if (searchInput == element.academic_year_id) {
				resultData.push(element);
			}
		});
		console.log(resultData, "gradeAdd");

		//Using Filtered Data with grade master api
		let grade_id_bind: any[] = [];
		resultData.forEach((element: any) => {
			gradeMaster.forEach((grade: any) => {
				if (element.grade_id == grade.grade_master_id) {	
					let obj: any = { ...element, ...grade };
					grade_id_bind.push(obj);
				}
			});
		});

	const ids = grade_id_bind.map((o) => o.grade_master_id);
	const filtered = grade_id_bind.filter(({ grade_master_id }, index) => !ids.includes(grade_master_id, index + 1));
	const idsofSection = grade_id_bind.map((o) => o.section);
	const filteredForSection = grade_id_bind.filter(({ section }, index) => !idsofSection.includes(section, index + 1));

	console.log(grade_id_bind, "grademaster and sectionADD");
	//  console.log(filtered, "Year");
	  console.log(filteredForSection);
	// setFilterGradeByYear(filtered);
	// setFilterSectionByYear(filteredForSection);
	// setDisplayFinalData(filteredForSection);
	setFilterSectionByYearAdd(filtered);

	}

	useEffect(() => {
		getAllGradeSectionData();
		getAllFeeMasterData();
		getAllGrade();
		// setGradeMaster();
	}, []);
	

	//console.log(frontSearchYear, frontSearchGrade,"=====");
	//Calling Fees Data
	useEffect(() => {
		console.log(frontSearchYear, frontSearchGrade,"=====");
		if (frontSearchGrade && frontSearchGrade != null && frontSearchYear && frontSearchYear != null) {
		
			list_fee_details(frontSearchYear, frontSearchGrade);
		}
	}, [frontSearchGrade, frontSearchYear]);
	// console.log(searchGradeId);

	const list_fee_details = (year_id: any, grade_id: any) => {
		setSpinnerLoad(true)
		getAccessToken();
		axios
			.post(`${baseUrl}yearOffee`, {
				grade_id: grade_id,
				year_id: year_id,
			})
			.then((res: any) => {
				console.log(res.data.data,'yearoffee');
				setTableFeeAmount(res.data.data);
				setSpinnerLoad(false);
			});
	};

	const handleSubmit = () => {
		// alert("entered");
		let newfeeTypeName = feeTypeName.toString();
		if (amount.length <= 0 || searchGradeId.length <= 0 || searchAcademicYear.length <= 0 || newfeeTypeName.length <= 0) {
			if (amount.length <= 0) {
				toast.warning("Enter Amount", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setDuplication(false);
			} else if (searchGradeId.length <= 0) {
				toast.warning("Enter Grade", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setDuplication(false);
			} else if (newfeeTypeName.length <= 0) {
				toast.warning("Enter Fee Type Name", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setDuplication(false);
			} else if (searchAcademicYear.length <= 0) {
				toast.warning("Enter Academic Year", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setDuplication(false);
			}
		} else {
			//alert("entered sub");
			getAccessToken();
			axios
				.post(`${baseUrl}yearOffee/create_new_yearfee`, {
					grade_id: Number(searchGradeId),
					fee_amount: amount,
					year_id: Number(searchAcademicYear),
					fee_master_id: Number(feeTypeName),
				})
				.then((res: any) => {
					if (res.data.data.IsExsist == true) {
						toast.warning("Year of Fee Already Added", {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					} else {
						toast.success("Year Of Fee Added", {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					}
					setStatusFeeDetailsAdd(false);
					setFinalAmount("");
					getAllGrade();
					getAllFeeMasterData();
					list_fee_details(frontSearchYear, frontSearchGrade);
					setDuplication(false);
				})
				.catch((error: any) => {
					setDuplication(false);
					setFinalAmount("");
					getAllGrade();
					getAllFeeMasterData();
				});
		}
	};

	const updatingYearOfFee = () => {
		if (updateYearOfFee.length <= 0) {
			toast.warning("Enter Amount", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			getAccessToken();
			axios
				.put(`${baseUrl}yearOffee/${editingYearOfFee.yearoffeesid}`, {
					fee_amount: updateYearOfFee,
				})
				.then((res: any) => {
					console.log(res.data);
					if (res.data.data === "Updated Succesfully") {
						toast.success("Year oF Fee Updated Successsfully", {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
						setEditingYearOfFee({});
						setUpdateYearOfFee("");
						list_fee_details(frontSearchYear, frontSearchGrade);
						// list_fee_details();
					}
				});
		}
	};

	const deleteParticularDiscount = (fee_master_id: any) => {
		getAccessToken();
		axios
			.delete(`${baseUrl}yearOffee/`, { data: { year_of_fees_id: fee_master_id } })
			.then((res: any) => {
				if (res.data.data.isDeletable == false) {
					toast.warning("Students exists On Year oF Fee", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				} else {
					toast.success("Year oF Fee Deleted Successsfully", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
				setdatatoDelete({});
				setEditingYearOfFee({});
				setUpdateYearOfFee("");
				list_fee_details(frontSearchYear, frontSearchGrade);
				// list_fee_details();
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const handleClose = () => {
		setShow(false);
		deleteParticularDiscount(datatoDelete.yearoffeesid);
	};
	console.log(filterSectionByYearAdd)
	return (
		<div>
			<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
			<div id="page-top">
				<div id="wrapper">
					<Sidebar data={"Stu_fees"}></Sidebar>
					<div id="content-wrapper" className="d-flex flex-column">
						<div id="content">
							<Navbar></Navbar>
							<div className="container-fluid">
								<div className="col-xl-11 m-auto">
									<div className="card-header">
										<div className="col-lg-10" style={{ marginLeft: "10%", width: "90%" }}>
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
																	onClick={() => {
																		setStatusFeeDetailsAdd(true);
																		 setFrontSearchGrade("");
																			 setFrontSearchYear("");
																		//	 getAllGrade();
																			 getAllFeeMasterData();
																		  FeeDetailsFinal && FeeDetailsFinal.length && setFeeTypeName(FeeDetailsFinal[0].fee_master_id);
																		  filterSectionByYearAdd && filterSectionByYearAdd.length && setSearchGradeId(filterSectionByYearAdd[0].grade_master_id);

																	}}>
																	Add
																</Button>
															) : (
																<></>
															)}
														</div>
													</div>
												</a>

												{!statusFeeDetailsAdd ? (
													<div className="container">
														<div className="card-body">
															<div
																style={{
																	position: "relative",
																	marginLeft: "10px",
																}}>
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
																				<div className="form-group" style={{ width: "60%" }}>
																					<Form.Select
																					//view
																					value={frontSearchYear}
																						
																						onChange={(e: any) => {
																							setFrontSearchYear(Number(e.target.value));
																							handleGradeFilter(gradeSectionList, e.target.value);
																							//setFrontSearchYear(e.target.value);
																							console.log(e.target.value,"var");
																						}}>
																						{feeMaster &&
																							feeMaster.length &&
																							feeMaster.map((values: any, index: any) => {
																								return <option value={values.year_id}>{values.academic_year}</option>;
																							})}
																					</Form.Select>
																				</div>
																			</td>
																			<td>
																				<div className="form-group">
																					<Form.Select
																						value={frontSearchGrade}
																						onChange={(e: any) => {
																							setFrontSearchGrade(Number(e.target.value));
																						}}>
																						{filterGradeByYear &&
																							filterGradeByYear.length &&
																							filterGradeByYear.map((values: any, index: any) => {
																								return <option value={values.grade_master_id}>{values.grade_master}</option>;
																							})}
																					</Form.Select>
																				</div>
																			</td>
																			<td></td>
																		</tr>
																	</tbody>
																</table>
															</div>
															<div>
																<div className="row">
																	<div className="col-sm-12">
																		<Table striped bordered hover width="100%" style={{ width: "100%" }}>
																			<thead>
																				<tr role="row">
																					<th>S.No</th>
																					<th className="sorting_asc">Fee Type Name</th>
																					<th className="sorting">Fee amount</th>
																					<th className="sorting">Action</th>
																				</tr>
																			</thead>
																			<tbody>
																				{spinnerLoad ? (
																					<td
																						colSpan={4}
																						style={{
																							textAlign: "center",
																						}}>
																						<Spinner animation="border" variant="danger" />
																					</td>
																				) : displayFinalData && displayFinalData.length ? (
																					displayFinalData.map((values: any, index: any) => {
																						return (
																							<tr key={index}>
																								<td>{index + 1}</td>
																								<td>{values.fee_type_name}</td>
																								{index == editingYearOfFee.id ? (
																									<>
																										<td>
																											{" "}
																											<Form.Control
																												type="number"
																												value={updateYearOfFee}
																												onChange={(e: any) => {
																													setUpdateYearOfFee(e.target.value);
																												}}
																											/>
																										</td>
																										<td>
																											<Button
																												variant="warning"
																												onClick={() => {
																													updatingYearOfFee();
																												}}>
																												Update
																											</Button>
																											{"  "}
																											<Button
																												variant="secondary"
																												onClick={() => {
																													setUpdateYearOfFee("");
																													setEditingYearOfFee({});
																												}}>
																												Cancel
																											</Button>
																										</td>
																									</>
																								) : (
																									<>
																										<td>{values.fee_amount}</td>
																										<td>
																											<Button
																												variant="primary"
																												onClick={() => {
																													setUpdateYearOfFee(Number(values.fee_amount));
																													setEditingYearOfFee({
																														yearoffeesid: values.year_of_fees_id,
																														acdyr: values.academic_year,
																														grade: values.grade_id,
																														amt: Number(values.fee_amount),
																														id: index,
																														fee_id: values.fee_master_id,
																													});
																												}}>
																												Edit
																											</Button>
																											{"  "}
																											<Button
																												variant="danger"
																												onClick={() => {
																													setdatatoDelete({
																														feeTypeName: values.fee_type_name,
																														yearoffeesid: values.year_of_fees_id,
																														acdyr: values.academic_year,
																														grade: values.grade,
																														amt: Number(values.fee_amount),
																														id: index,
																														fee_id: values.fee_master_id,
																													});
																													handleShow();
																													setEditingYearOfFee({});
																													setUpdateYearOfFee("");
																												}}>
																												Delete
																											</Button>
																										</td>
																									</>
																								)}
																							</tr>
																						);
																					})
																				) : (
																					<>
																						<tr
																							style={{
																								textAlign: "center",
																							}}>
																							<td
																								colSpan={4}
																								style={{
																									textAlign: "center",
																								}}>
																								<p>No Data Found</p>
																							</td>
																						</tr>
																					</>
																				)}
																			</tbody>
																		</Table>
																	</div>
																</div>
																<div style={{ marginLeft: "20%" }}>
																	{/* <Pagination>
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
                                  </Pagination> */}
																	<Modal show={show} onHide={SuddenhandleClose}>
																		<Modal.Header closeButton>
																			<Modal.Title>
																				Delete {datatoDelete.feeTypeName} - {datatoDelete.amt}
																			</Modal.Title>
																		</Modal.Header>
																		<Modal.Body>
																			Are You Sure You What To Delete{" "}
																			<b>
																				{datatoDelete.feeTypeName} - {datatoDelete.amt}
																			</b>{" "}
																			?
																		</Modal.Body>
																		<Modal.Footer>
																			<Button variant="secondary" onClick={SuddenhandleClose}>
																				Close
																			</Button>
																			<Button variant="danger" onClick={handleClose}>
																				Delete
																			</Button>
																		</Modal.Footer>
																	</Modal>
																</div>
															</div>
														</div>
													</div>
												) : (
													<div>
													
														<Row>
															<>
																<Col sm="4" className="mb-4">
																	<Form.Label style={{ marginLeft: "40px" }}>Academic Year</Form.Label>
																</Col>
																<Col sm="6">
																	<Form.Select
																		//value={searchAcademicYear}
																		onChange={(e: any) => {
																			setSearchAcademicYear(e.target.value);
																			handleGradeFilterAdd(gradeSectionListAdd, e.target.value);
																		}}>
																		{feeMaster &&
																			feeMaster.length &&
																			feeMaster.map((values: any, index: any) => {
																				return <option value={values.year_id}>{values.academic_year}</option>;
																			})}
																	</Form.Select>
																</Col>
															</>
															<Col sm="4" className="mb-4">
																<Form.Label style={{ marginLeft: "40px" }}>Fee Type Name</Form.Label>
															</Col>
															<Col sm="6">
																<Form.Select
																	value={feeTypeName}
																	onChange={(e: any) => {
																		setFeeTypeName(e.target.value);
																	}}>
																	{FeeDetailsFinal &&
																		FeeDetailsFinal.length &&
																		FeeDetailsFinal.map((values: any, index: any) => {
																			return <option value={values.fee_master_id}>{values.fee_type_name}</option>;
																		})}
																</Form.Select>
															</Col>{" "}
															<Col sm="4" className="mb-4">
																<Form.Label style={{ marginLeft: "40px" }}>Grade</Form.Label>
															</Col>
															<Col sm="6">
																<Form.Select
																	value={searchGradeId}
																	onChange={(e: any) => {
																		setSearchGradeId(e.target.value);
																	}}>
																	{filterSectionByYearAdd &&
																		filterSectionByYearAdd.length &&
																		filterSectionByYearAdd.map((values: any, index: any) => {
																			return <option value={values.grade_master_id}>{values.grade_master}</option>;
																		})}
																</Form.Select>
															</Col>
															<Col sm="4" className="mb-4">
																<Form.Label style={{ marginLeft: "40px" }}>Amount</Form.Label>
															</Col>
															<Col sm="6">
																<Form.Control
																	type="number"
																	onChange={(e) => {
																		setFinalAmount(e.target.value);
																	}}
																/>
															</Col>
														</Row>
														<div className="card-footer">
															<div style={{ display: "flex", justifyContent: "right" }}>
																<Button
																	className="btn btn-sm btn-secondary"
																	onClick={() => {
																		setStatusFeeDetailsAdd(false);
																		setFinalAmount("");
																		getAllGrade();
																		getAllFeeMasterData();
																	
																	}}>
																	Cancel
																</Button>{" "}
																&nbsp;
																<Button
																	type="submit"
																	// className="btn btn-danger btn-save"
																	className={duplication ? "disabled btn btn-danger btn-save" : "btn btn-danger btn-save"}
																	onClick={() => {
																		setDuplication(true);
																		handleSubmit();
																	}}>
																	Save
																</Button>
															</div>
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
	)
}
export default Yearoffee;
