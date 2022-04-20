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
	const [spinnerLoad, setSpinnerLoad] = useState<any>(true);
	const [feeTypeName, setFeeTypeName] = useState("");
	const [amount, setFinalAmount] = useState("");
	const [searchAcademicYear, setSearchAcademicYear] = useState("");
	const [editingYearOfFee, setEditingYearOfFee] = useState<any>({});
	const [updateYearOfFee, setUpdateYearOfFee] = useState<any>("");
	const [datatoDelete, setdatatoDelete] = useState<any>({});
	const [duplication, setDuplication] = useState(false);
	const [searchGradeId, setSearchGradeId] = useState("");
	const [FeeDetailsFinal, setFeeDetailsFinal] = useState<any[]>([]);
	const [displayFinalData, setDisplayFinalData] = useState<any[]>([]);
	const [gradeSectionList, setGradeSectionList] = useState<any>([]);
	const [academicYear, setAcademicYear] = useState<any>("");
	const [gradeSectionListAdd, setGradeSectionListAdd] = useState<any>([]);
	const [filterGradeByYear, setFilterGradeByYear] = useState<any>([]);
	const [filterSectionByYear, setFilterSectionByYear] = useState<any>([]);
	const [filterSectionByYearAdd, setFilterSectionByYearAdd] = useState<any>([]);
	const [gradeMaster, setGradeMaster] = useState<any>([]);
	const [gradeMasterParticular, setGradeMasterParticular] = useState<any>([]);
	const [termsmasterValue, setTermsmasterValue] = useState<any>([]);
	const [termFeesAdd, setTermFeesAdd] = useState(true);
	const [termFeessaveAdd, setTermFeesSaveAdd] = useState<any>([]);
	let removeFormFields = (i: any) => {
		let newFormValues = [...termFeessaveAdd];
		newFormValues.splice(i, 1);
		setTermFeesSaveAdd(newFormValues);
	};

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



	const getAllFeeMasterData = () => {
		getAccessToken();
		axios.get(`${baseUrl}year`).then((response: AxiosResponse) => {
			setAllFeeMaster(response.data.data);
			setSearchAcademicYear(response.data.data[0].year_id);
			setFrontSearchYear(response.data.data[0].year_id);
		});
	};

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
		getAccessToken();
		axios
			.post(`${baseUrl}yearOffee/create_new_yearfee`, {
				grade_id: Number(searchGradeId),
				fee_amount: amount,
				year_id: Number(searchAcademicYear),
				fee_master_id: Number(feeTypeName),
			})
			.then((res: any) => {
				console.log(res.data.data, "Optional");
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
		// console.log(filteredForSection);
		setFilterGradeByYear(filtered);
		setFilterSectionByYear(filteredForSection);
		setDisplayFinalData(filteredForSection);
	};
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
		//Filtering Grade by academic year id
		let resultData: any = [];
		gradeSectionListAdd.forEach((element: any) => {
			if (searchInput == element.academic_year_id) {
				resultData.push(element);
			}
		});
		// console.log(resultData, "gradeAdd");
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
		setFilterSectionByYearAdd(filtered);
	};
	useEffect(() => {
		getAllGradeSectionData();
		getAllFeeMasterData();
		getAllGrade();
	}, []);
	//Calling Fees Data
	useEffect(() => {
		if (frontSearchGrade && frontSearchGrade != null && frontSearchYear && frontSearchYear != null) {
			list_fee_details(frontSearchYear, frontSearchGrade);
		}
	}, [frontSearchGrade, frontSearchYear]);
	const list_fee_details = (year_id: any, grade_id: any) => {
		setSpinnerLoad(true);
		getAccessToken();
		axios
			.post(`${baseUrl}yearOffee`, {
				grade_id: grade_id,
				year_id: year_id
			})
			.then((res: any) => {
				console.log(res.data.data.length, "yearoffee");
				if (res.data.data.length === 0) {
					termFeessaveAdd.push({})
					console.log(termFeessaveAdd);
				}
				else {
					setTermFeesSaveAdd(res.data.data);
					console.log(termFeessaveAdd);
				}
				setSpinnerLoad(false);
			});
	};
	const ShowingTextBox = (terms: any, index: any) => {
		let term: any = [];
		let termTitle: any = ""
		if (terms > 0) {
			for (var i = 0; i < terms; i++) {
				termTitle = "term" + (i + 1)
				term.push({ "term_name": termTitle, "term_amount": 0 })
			}
		}

		let newFormValues = [...termFeessaveAdd];
		newFormValues[index]["term_count"] = terms
		newFormValues[index]["term_fees"] = term
		setTermFeesSaveAdd(newFormValues)
	};

	const handleSubmit = () => {
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
			})
			.catch((e: any) => {
				console.log(e);
			});
	};
	const handleClose = () => {
		setShow(false);
		deleteParticularDiscount(datatoDelete.yearoffeesid);
	};

	const [termRowAmountData, settermRowAmount] = useState<any>([])
	const handleTermAmount = (data: any) => {
		let newFormValues = [...termFeessaveAdd];
		termFeessaveAdd[data.rowindex].term_fees[data.termindex].term_amount = data.amount
		setTermFeesSaveAdd(newFormValues);
	}
	const handleTerm = (rowindex: any, editORShow: any) => {
		let im: any = []
		let term: any = termFeessaveAdd[rowindex].term_count === "12" ? 2 : 12 / termFeessaveAdd[rowindex].term_count
		for (let i: any = 0; i < 12; i++) {
			if (editORShow === "show") {
				im.push(termFeessaveAdd[rowindex].term_fees && termFeessaveAdd[rowindex].term_fees.length > 0 && termFeessaveAdd[rowindex].term_fees !== null
					? i <= termFeessaveAdd[rowindex].term_fees.length - 1 ? <td className="text-center">{"Term" + (i + 1)}<br />{termFeessaveAdd[rowindex].term_fees[i].term_amount}</td> : <></>
					: <></>)
			}
			else {
				im.push(termFeessaveAdd[rowindex].term_fees && termFeessaveAdd[rowindex].term_fees.length > 0 ? <>
					{i < termFeessaveAdd[rowindex].term_fees.length &&
						<Col md={term}>
							<Form.Control
								type="number"
								key={i}
								value={termFeessaveAdd[rowindex].term_fees[i] ? termFeessaveAdd[rowindex].term_fees[i].term_amount : ""}
								onChange={(e) => {
									handleTermAmount({
										rowindex: rowindex, termindex: i, amount: e.target.value
									})
								}}
							/>
						</Col>
					}
				</> : <></>)
			}
		}
		return im
	}

	const handleSave = (values: any) => {

		values.grade_id = frontSearchGrade
		values.fee_master_id = feeTypeName
		values.year_id = frontSearchYear
		axios.post(`${baseUrl}yearOffee/create_new_yearfee`, values)
	}

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
					<Sidebar data={"Stu_fees"}></Sidebar>
					<div id="content-wrapper" className="d-flex flex-column">
						<div id="content">
							<Navbar></Navbar>
							<div className="container-fluid">
								<div className="col-xl-12 m-auto">
									<div className="card-header">
										<div className="col-lg-12">
											<div className="card mb-3">
												<a style={{ color: "rgb(230, 39, 39)" }}>
													<div className="card-header mb-4 bg-transparent border-1 text-center">
														<h4 className="mb-0 ">
															<i className="far fa-clone pr-1"></i> Fee Details
														</h4>
														{termFeesAdd ? (
															<>
																<div style={{ textAlign: "right" }}>
																	{!statusFeeDetailsAdd ? (
																		<Button
																			type="submit"
																			className="btn btn-primary btn-sm btn-save"
																			onClick={() => {
																				setStatusFeeDetailsAdd(true);
																				setFrontSearchGrade("");
																				setFrontSearchYear("");
																				//   getAllGrade();
																				setTermsmasterValue("");
																				getAllFeeMasterData();
																				FeeDetailsFinal &&
																					FeeDetailsFinal.length &&
																					setFeeTypeName(FeeDetailsFinal[0].fee_master_id);
																				filterSectionByYearAdd &&
																					filterSectionByYearAdd.length &&
																					setSearchGradeId(filterSectionByYearAdd[0].grade_master_id);
																			}}>
																			Add
																		</Button>
																	) : (
																		<></>
																	)}
																</div>
															</>
														) : (
															<></>
														)}
													</div>
												</a>
												{!statusFeeDetailsAdd ? (
													<div className="container">
														<div className="card-body">
															<div
																style={{
																	position: "relative",
																	marginLeft: "150px",
																}}>
																<table width="120%">
																	<thead>
																		<tr>
																			<th>Academic year </th>
																			<th>Grade</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td>
																				<div className="form-group" style={{ width: "28%" }}>
																					<Form.Select
																						//view
																						value={frontSearchYear}
																						onChange={(e: any) => {
																							setFrontSearchYear(Number(e.target.value));
																							handleGradeFilter(gradeSectionList, e.target.value);
																							setTermFeesSaveAdd([])
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
																				<div className="form-group" style={{ width: "28%" }}>
																					<Form.Select
																						value={frontSearchGrade}
																						onChange={(e: any) => {
																							setFrontSearchGrade(Number(e.target.value));
																							setTermFeesSaveAdd([])
																						}}>
																						{filterGradeByYear &&
																							filterGradeByYear.length &&
																							filterGradeByYear.map((values: any, index: any) => {
																								return (
																									<option value={values.grade_master_id}>{values.grade_master}</option>
																								);
																							})}
																					</Form.Select>
																				</div>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
															<Table bordered responsive>
																<thead>
																	<tr role="row"  >
																		<th className="sorting_asc">Fee Type Name</th>
																		<th className="sorting_asc">Optional</th>
																		<th className="sorting">Fee amount</th>
																		<th className="sorting">Term</th>
																		{termFeessaveAdd && termFeessaveAdd.length > 0
																			? <> <th className="text-center">Pay By Terms</th></>
																			: null}
																		<th className="sorting">Action</th>
																	</tr>
																</thead>
																<tbody>
																	{termFeessaveAdd && termFeessaveAdd.length && termFeessaveAdd?.map((elemant: any, rowindex: any) => {
																		return (
																			<>
																				<tr key={rowindex}>
																					{termFeesAdd ? (
																						<>
																							{elemant.year_of_fees_id ? <>
																								<td>{elemant.Fee_Type_name}</td>
																								<td>{elemant.optional_fee}</td>
																								<td> {elemant.fee_amount}</td>
																								<td>
																									{/* {elemant.term_count} */}
																								</td>
																								<td>
																									{/* {handleTerm(rowindex, "show")} */}
																								</td>
																							</>
																								: <td colSpan={5} className="text-center">No data Found</td>}
																							<td>
																								<i
																									className="fas fa-trash"
																									style={{ color: "red", cursor: "pointer" }}></i>{" "}
																								<i
																									className="fas fa-plus fa-1x"
																									style={{ color: "green", cursor: "pointer" }}
																									onClick={(e: any) => {
																										setTermFeesAdd(false);
																									}}></i>
																							</td>
																						</>
																					) : (
																						<>
																							<td>
																								<Form.Select
																									value={feeTypeName}
																									onChange={(e: any) => {
																										setFeeTypeName(e.target.value);
																										setTermsmasterValue(e.target[e.target.selectedIndex].text);
																									}}>
																									{FeeDetailsFinal &&
																										FeeDetailsFinal.length &&
																										FeeDetailsFinal.map((values: any, index: any) => {
																											return (
																												<option value={values.fee_master_id} label={values.fee_type_name} >
																													{values.fee_type_name}
																												</option>
																											);
																										})}
																								</Form.Select>
																							</td>
																							<td>
																								<Form.Check type="switch" value={termFeessaveAdd[rowindex].optional_fee} onChange={(e: any) => {
																									let newFormValues = [...termFeessaveAdd];
																									console.log();

																									newFormValues[rowindex]["optional_fee"] = e.target.checked
																									setTermFeesSaveAdd(newFormValues)
																								}} id="custom-switch" style={{ position: "relative" }} />
																							</td>
																							<td>
																								<Form.Control
																									type="text"
																									value={termFeessaveAdd[rowindex].fee_amount}
																									onChange={(e: any) => {
																										let newFormValues = [...termFeessaveAdd];
																										newFormValues[rowindex]["fee_amount"] = e.target.value
																										setTermFeesSaveAdd(newFormValues)
																									}}
																								/>
																							</td>
																							{termFeesAdd ? (
																								null
																							) : (
																								< td className="form-group">
																									{termFeessaveAdd[rowindex].optional_fee ?
																										<Form.Select
																											name="term_count"
																											value={termFeessaveAdd[rowindex].term_count}
																											onChange={(e: any) => {
																												ShowingTextBox(e.target.value, rowindex);
																											}}>
																											<option value="1">Yearly</option>
																											<option value="2">2</option>
																											<option value="3">3</option>
																											<option value="4">4</option>
																											<option value="6">6</option>
																											<option value="12">12</option>
																										</Form.Select>
																										: <Form.Control value={termFeessaveAdd[rowindex].term_count} disabled></Form.Control>}
																								</td>
																							)}
																							<td style={{ minWidth: "400px", maxWidth: "500px" }}><Row>{handleTerm(rowindex, "edit")}</Row></td>
																							<td>
																								<div>
																									<i
																										className="fas fa-save fa-1x"
																										style={{ color: "blue", cursor: "pointer" }}
																										onClick={(e: any) => {

																											handleSave(termFeessaveAdd[rowindex]);
																										}}></i>{" "}
																									{rowindex ? (
																										<i
																											className="fa fa-minus fa-1x"
																											style={{ color: "red", cursor: "pointer" }}
																											onClick={() => removeFormFields(rowindex)}></i>
																									) : (
																										<i
																											className="fa fa-plus fa-1x"
																											style={{ color: "green", cursor: "pointer" }}
																											onClick={(e: any) => {
																												setTermFeesSaveAdd([
																													...termFeessaveAdd,
																													{
																														S_No: "",
																														Fee_Type_name: "",
																														fee_amount: "",
																														term_count: 1,
																														term_fees: [{
																															"term_name": "Term1",
																															"term_amount": 0
																														}]
																													},
																												]);
																											}}></i>
																									)}
																								</div>
																							</td>
																						</>
																					)}
																				</tr>
																			</>
																		);
																	})}
																</tbody>
															</Table>
															<div style={{ marginLeft: "20%" }}>
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
												) : (
													<div>
														<Row>
															<>
																<Col sm="4" className="mb-4">
																	<Form.Label style={{ marginLeft: "180px" }}>Academic Year</Form.Label>
																</Col>
																<Col sm="6">
																	<Form.Select
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
																<Form.Label style={{ marginLeft: "180px" }}>Fee Type Name</Form.Label>
															</Col>
															<Col sm="6">
																<Form.Select
																	style={{ width: "300px" }}
																	value={feeTypeName}
																	onChange={(e: any) => {
																		setFeeTypeName(e.target.value);
																		setTermsmasterValue(e.target[e.target.selectedIndex].text);
																	}}>
																	{FeeDetailsFinal &&
																		FeeDetailsFinal.length &&
																		FeeDetailsFinal.map((values: any, index: any) => {
																			return (
																				<option value={values.fee_master_id} label={values.fee_type_name} >
																					{values.fee_type_name}
																				</option>
																			);
																		})}
																</Form.Select>
															</Col>{" "}
															<Col sm="4" className="mb-4">
																<Form.Label style={{ marginLeft: "180px" }}>Grade</Form.Label>
															</Col>
															<Col sm="6">
																<Form.Select
																	style={{ width: "300px" }}
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
																<Form.Label style={{ marginLeft: "180px" }}>Amount</Form.Label>
															</Col>
															<Col sm="6">
																<Form.Control
																	style={{ width: "300px" }}
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
		</div >
	);
};
export default Yearoffee;