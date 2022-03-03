import { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Spinner, Modal, Col, Row } from "react-bootstrap";
import { getAccessToken } from "../../config/getAccessToken";
import axios from "axios";
import { baseUrl } from "../../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

const Feemaster = () => {
	const [statusFeeMasterAdd, setStatusFeeMasterAdd] = useState<any>(false);

	const [feeTypeName, setFeeTypeName] = useState<any>("");
	const [orderId, setOrderId] = useState<any>("");
	const [duplication, setDuplication] = useState(false);
	const [getFeeMaster, setGetFeeMaster] = useState<any>([]);
	const [datatoDelete, setdatatoDelete] = useState<any>({});
	const [loading, setloading] = useState<any>(true);
	const [filter, setfilter] = useState<any>([]);

	const [show, setShow] = useState(false);
	const handleClose = () => {
		setShow(false);
		deleteParticularDiscount(datatoDelete.id, datatoDelete.index);
	};
	const SuddenhandleClose = () => {
		setShow(false);
		setdatatoDelete({});
	};
	const handleShow = () => {
		setShow(true);
	};

	const deleteParticularDiscount = (id: any, index: any) => {
		getAccessToken();
		axios
			.delete(`${baseUrl}feeMaster?`, { data: { fee_master_id: id } })
			.then((res: any) => {
				console.log(res);
				if(res.data.data.isDeletable === true){
					let newArrVal = getFeeMaster;
					newArrVal.splice(index, 1);
					toast.success("Fee Type Name Deleted", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					feemastertype(newArrVal);
					getfee();
				}
			else if (res.data.data.isDeletable === false){
				toast.warning(`Data Exist in Year of Fee Master`, {
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
			})
			.catch((e: any) => {
				console.log(e);
				toast.error("Error Fee Type Name Deletion", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
	};

	const dataSearch: any =
	getFeeMaster && getFeeMaster.length &&
		getFeeMaster.sort().filter((data: any) => {
			return Object.keys(data).some((key) => data[key].toString().toLowerCase().includes(filter.toString().toLowerCase()));
		});
		// console.log(getFeeMaster);

// console.log(dataSearch);

	const getfee = () => {
		getAccessToken();
		axios
			.get(`${baseUrl}feeMaster`)
			.then((res: any) => {
				console.log(res.data.data);
				var sortedObjs = _.sortBy(res.data.data, "order_id");
				setGetFeeMaster(sortedObjs);
				setloading(false);
				console.log(sortedObjs);
				
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	useEffect(() => {
		getfee();
	}, []);

	const feemastertype = (newArrVal: any) => {
		setGetFeeMaster([...newArrVal]);
	};

	// console.log(getFeeMaster);

	const handleSubmit = async (e: any) => {
		setDuplication(true);
		e.preventDefault();
		if (feeTypeName.length <= 0 || orderId.length <= 0) {
			if (feeTypeName.length <= 0) {
				toast.warning("Please Enter Fee Type Name", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else if (orderId.length <= 0) {
				toast.warning("Please Enter Order", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			setDuplication(false);
		} else {
			try {
				getAccessToken();
				await axios
					.post(`${baseUrl}feeMaster`, {
						 
						fee_type_name: feeTypeName,
						order_id: orderId,
					})
					.then((res: any) => {
						console.log(res.data);
						if (res.data.data.IsExsist === false){
							toast.success("Fee Type Name Added", {
								position: "top-right",
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
						}
						else if (res.data.data.IsExsist === true){
							toast.warning(`Data Already Added`, {
								position: "top-right",
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
						}
						
						getfee();
						setStatusFeeMasterAdd(false);
						setDuplication(false);
						setFeeTypeName("");
						setOrderId("");
					});
			} catch (err) {
				setDuplication(false);
				setFeeTypeName("");
				alert("try again");
			}
		}
	};

	return (
		<div>
			<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
			<div id="page-top">
				<div id="wrapper">
					<Sidebar data={"Fee_master"}></Sidebar>
					<div id="content-wrapper" className="d-flex flex-column">
						<div id="content">
							<Navbar></Navbar>
							<div className="container-fluid">
								<div className="col-xl-11 m-auto">
									<div>
										<div className="col-lg-10" style={{ marginLeft: "10%", width: "90%" }}>
											<div className="card mb-3">
												<div style={{ color: "rgb(230, 39, 39)" }}>
													<div className="card-header mb-4 bg-transparent border-1 text-center">
														<h4 className="mb-0 ">
															<i className="far fa-clone pr-1"></i> Fee Master
														</h4>
														<div style={{ textAlign: "right" }}>
															{!statusFeeMasterAdd ? (
																<Button type="submit" className="btn btn-primary btn-sm btn-save" onClick={() => setStatusFeeMasterAdd(true)}>
																	Add
																</Button>
															) : null}
														</div>
													</div>
												</div>
												{!statusFeeMasterAdd ? (
													<div className="card-body">
														<div className="table-responsive">
															<div className="dataTables_wrapper dt-bootstrap4 no-footer">
																<div id="dataTable_filter" className="dataTables_filter">
																	<Form.Label htmlFor="inputPassword5" style={{ marginLeft: "75%" }}>
																		Search:
																		<Form.Control type="search" className="form-control form-control-sm" onChange={(e) => setfilter(e.target.value)} />
																	</Form.Label>
																</div>
															</div>
														</div>
														<div className="row">
															<div className="col-sm-12">
																<Table className="table dataTable no-footer" width="100%" style={{ width: "100%" }}>
																	<thead>
																		<tr role="row">
																			<th className="sorting_asc" style={{ width: "73px" }}>
																				Fee Type
																			</th>
																			<th className="sorting" style={{ width: "114px" }}>
																				Order
																			</th>
																			<th className="sorting" style={{ width: "63px" }}>
																				Actions
																			</th>
																		</tr>
																	</thead>
																	<tbody>
																		{loading ? (
																			<Spinner animation="border" style={{ marginLeft: "300px" }} variant="danger" />
																		) : dataSearch && dataSearch.length ? (
																			dataSearch.map((values: any, index: any) => {
																				return (
																					<tr>
																						<td>
																							{" "}
																							<div>{values.fee_type_name}</div>
																						</td>
																						<td style={{ width: "30%" }} className="sorting_1">
																							{values.order_id}
																						</td>

																						<td>
																							<Button
																								variant="danger"
																								onClick={() => {
																									setdatatoDelete({
																										name: values.fee_type_name,
																										index: index,
																										id: values.fee_master_id,
																									});
																									handleShow();
																								}}>
																								Delete
																							</Button>
																						</td>
																					</tr>
																				);
																			})
																		) : (
																			<>
																				<tr className="text-center">
																					<td colSpan={3}>No Data Found</td>
																				</tr>
																			</>
																		)}
																	</tbody>
																</Table>
															</div>
														</div>
														<div style={{ marginLeft: "10%" }}>
															{/* <Pagination>
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
															</Pagination> */}
														</div>

														<Modal show={show} onHide={SuddenhandleClose}>
															<Modal.Header closeButton>
																<Modal.Title>Delete {datatoDelete.name}</Modal.Title>
															</Modal.Header>
															<Modal.Body>Are You Sure You What To Delete {datatoDelete.name} ?</Modal.Body>
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
												) : (
													<div>
														<div style={{ marginBottom: "20px" }}>
															<Row>
																<Col sm="4" className="mb-4">
																	<Form.Label style={{ marginLeft: "40px" }}>Fee Type Name </Form.Label>
																</Col>
																<Col sm="6">
																	<Form.Control
																		type="text"
																		onChange={(e: any) => {
																			setFeeTypeName(e.target.value);
																		}}
																	/>
																</Col>{" "}
																<Col sm="4">
																	<Form.Label style={{ marginLeft: "40px" }}>Order</Form.Label>
																</Col>
																<Col sm="6">
																	<Form.Control
																		type="number"
																		onChange={(e: any) => {
																			setOrderId(e.target.value);
																		}}
																	/>
																</Col>
															</Row>
														</div>

														<div className="card-footer py3">
															<Row>
																<Col>
																	<Button style={{ marginLeft: "80%" }} className="btn btn-secondary" onClick={() => setStatusFeeMasterAdd(false)}>
																		Cancel
																	</Button>{" "}
																	<Button
																		type="submit"
																		onClick={(e: any) => {
																			handleSubmit(e);
																		}}
																		className={duplication ? "disabled btn btn-danger btn-save" : "btn btn-danger btn-save"}>
																		Save
																	</Button>
																</Col>
															</Row>
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
	);
};
export default Feemaster;
