import React, { useState, ChangeEvent, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";

import { Row, Col, Form, Button, Container, Table, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Optional = () => {
	//To Make Edit
	let history = useHistory();
	const [search, setSearch] = useState<any>({
		text: "",
		studentid: "",
		PhoneNumber: "",
		GradeId: "",
	});
	const [isComponentVisible, setIsComponentVisible] = useState(true);
	const [statusStudentDetailsEdit, setStatusStudentDetailsEdit] = useState<any>({});
	const [statusStudentSearch, setStatusStudentSearch] = useState<any>({});
	const [statusStudentDetails, setStatusStudentDetails] = useState<any>({});
	const [Autosearch, setAutoSearch] = useState<any>([]);
	const [suggest, setSuggest] = useState<any>([]);
	const [acdyear, setAcdYear] = useState<any>([]);
	const [Grdsec, setGrdsec] = useState<any>([]);
	const [academicYear, setAcademicYear] = useState<any>("");
	const [gradeSectionList, setGradeSectionList] = useState<any>([]);
	const [gradeBasedOnYearFinal, setGradeBasedOnYearFinal] = useState<any>([]);
	const [addGrade, setAddGrade] = useState("");
	const [filterParticularYear, setFilterParticularYear] = useState<any>([]);
	const [academicYearFinal, setAcademicYearFinal] = useState<any>([]);
	const [sectionBasedOnGrade, SetsectionBasedOnGrade] = useState<any>([]);
	const [addSection, setAddSection] = useState<any>("");
	const [section, setsection] = useState<any>("");
	const [acas, setacas] = useState<any>("");
	const [searchResultData, setMainSearch] = useState<any>([]);
	const [gradea, setGradea] = useState<any>("");
	const [GotAutoSearchOut, setGotAutoSearchOut] = useState<any>([]);
	const [allGotFinalData, setAllGotFinalData] = useState<any>([]);
	const [gradeMaster, setGradeMaster] = useState<any>([]);
	const [gradeMasterParticular, setGradeMasterParticular] = useState<any>([]);
	const [firstAcadmicYear, setFirstAcademicYear] = useState<any>([]);
	const [filterGradeByYear, setFilterGradeByYear] = useState<any>([]);
	const [filterSectionByYear, setFilterSectionByYear] = useState<any>([]);
	const [searchBy, setSearchBy] = useState("");
	const [optionalFees, setOptionalFees] = useState<any>([]);
	const [grade, setGradeID] = useState<any>("");
	const [academicYearId, setAcademicYearId] = useState<any>();
	const [checkboxValue, setCheckboxValue] = useState(false);
	const [optionalValuesData, setOptionalValuesData] = useState<any>([]);

	const [foundOptionaldata, setFoundOptionaldata] = useState<any>([]);
	const [optionaldrop, setOptionaldrop] = useState<any>("none");
	const [gotStudentDetails, setGotStudentDetails] = useState<any>([]);
	const [gotStudentDetailsChecked, setGotStudentDetailsChecked] = useState<any>([]);
	const [selected, setSelected] = useState<string[]>([]);

	const [secionId, setSecionId] = useState<any>("");
	const [loading, setloading] = useState<any>(true);
	const [duplicateSection, setDuplicateSection] = useState<any>([]);

	//All Select CheckBox
	const [allCheck, setAllCheck] = useState(false);
	const [getAllCheckedValues, setGetAllCheckedValues] = useState([]);
	// console.log(section);
	// console.log(grade);
	console.log(Autosearch, "kkkkkkkk");
	console.log(Autosearch.studentid, "gradeeeeeefinal");
	console.log(section);
	console.log(filterSectionByYear);
	//Year
	const getAllAcademicYears = () => {
		getAccessToken();
		axios
			.get(`${baseUrl}year`)
			.then((res: any) => {
				setAcademicYearFinal(res.data.data);
				setFirstAcademicYear(res.data.data);
				setAcademicYearId(res.data.data[0].year_id);
				//      console.log(res.data.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = gotStudentDetails.map((n: any) => n);
			console.log(newSelecteds, "jjj");

			OptionalValuesData(event, newSelecteds);

			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};
	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};
	//Grade Api
	useEffect(() => {
		getAccessToken();
		axios
			.get(`${baseUrl}grademaster`)
			.then((res: any) => {
				setGradeMaster(res.data.data);
				setGradeMasterParticular(res.data.data[0]);
			})
			.catch((error) => console.log(error));
	}, []);

	const [GotOptionaldata, setGotOptionaldata] = useState<any[]>([]);
	const OptionalValuesData = (e: any, data: any) => {
		// console.log(e.target.checked,data,"llllllll");
		let dataOnChange = {
			student_admissions_id: data.student_admissions_id,
			student_id: data.student_id,
			fee_master_id: Number(optionaldrop),
			year_id: data.year_id,
			grade_id: Number(grade) === 0 ? filterGradeByYear[0].grade_master_id : Number(grade),
			grade_section_id: Number(section),
		};
		if (e.target.checked) {
			setGotOptionaldata([...GotOptionaldata, dataOnChange]);
		} else {
			let newoptionaldata = [...GotOptionaldata];
			let indexvalue = GotOptionaldata.indexOf(dataOnChange);
			newoptionaldata.splice(indexvalue, 1);
			setGotOptionaldata([...newoptionaldata]);
		}

		// data.forEach((element:any) => {
		//   console.log(element);

		// GotOptionaldata.remove
		// GotOptionaldata.push(dataOnChange);
		// });
		setFoundOptionaldata(GotOptionaldata);
		// console.log(GotOptionaldata,"optionaldatattttt");
	};
	const submitOptional = () => {
		getAccessToken();

		axios.post(`${baseUrl}optional`, GotOptionaldata).then((response: AxiosResponse) => {
			setOptionalFees(response.data.data);

			if (response.data.data.IsExsist === false) {
				toast.success("Optional fee Added Successfully", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			onSuggesthandler("");
		});
	};

	const Searchauto = () => {
		if (Autosearch.length > 0) {
			getAccessToken();
			axios
				.post(`${baseUrl}autoSearch`, {
					search: Autosearch,
				})
				.then((response: AxiosResponse) => {
					setSuggest(response.data.data);
					setAcademicYearId(response.data.data[0].year_id);
					setGradeID(response.data.data[0].grade_master_id);
					setsection(response.data.data[0].grade_section_id);

					//    console.log(response.data.data);
					setIsComponentVisible(true);
				});
			setAcademicYearId("");
		}
	};
	const onSuggesthandler = (value: any) => {
		console.log(value.year_id, "yearrrrr");
		console.log(value.grade_id, "gradeeee");
		console.log(value, "gradeeee");

		// setAcademicYearId(value.year_id)
		// setGradeID(value.grade_master_id)
		setIsComponentVisible(false);

		setAutoSearch({
			text: value.student_name,
			studentid: value.student_id,
			PhoneNumber: value.phone_number,
			GradeId: value.grade_master,
		});
		getAccessToken();
		axios
			.post(`${baseUrl}autoSearch`, {
				search: Autosearch,
			})
			.then((response: AxiosResponse) => {
				//  console.log(response.data.data);
				// setMainSearch(response.data.data);
				// setGradeID(response.data.data[0][1][1].studentData.grade_master_id)
				// setsection(response.data.data[0][1][1].studentData.grade_section_id)
				// console.log(response.data.data[0][1][1].studentData.grade_section_id,"555555");
				// console.log(response.data.data[0][1][1].studentData.grade_master_id,"444444");
			});
		getAccessToken();
	};

	const optionaldata = GotOptionaldata;

	// console.log(searchResultData[0][1]);
	useEffect(() => {
		getAllAcademicYears();
		setOptionaldrop([]);
	}, []);
	useEffect(() => {
		let AllRoundData: any[] = [];
		if (searchResultData && searchResultData.length > 0) {
			//console.log(searchResultData);
			searchResultData.forEach((allData: any) => {
				//  console.log(allData[0]);
				//  console.log(allData[1]);
				let newData = allData[1];
				let ParticularStudentData: any = [];
				let ParticularStudentBalance: any = [];
				newData.forEach((element: any) => {
					//        console.log(element);
					if (element && element.balance) {
						ParticularStudentBalance.push({ Allbalance: element.balance });
					}
					if (element && element.studentData && Object.keys(element.studentData).length > 0) {
						//          console.log(element.studentData);
						if (ParticularStudentData && ParticularStudentData.length == 0) {
							ParticularStudentData.push(element.studentData);
						}
					}
				});
				let newFinalArr = [{ ...ParticularStudentBalance[0], ...ParticularStudentData[0] }];
				AllRoundData.push(newFinalArr[0]);
			});
			//    console.log(AllRoundData);
			setAllGotFinalData(AllRoundData);
			// console.log(searchResultData[0]);
			// console.log(searchResultData[0][0]);
			// console.log(searchResultData[0][1]);
		} else {
			setAllGotFinalData([]);
		}
	}, [searchResultData]);

	useEffect(() => {
		if (gradea && gradea === "none") setGradea("");
		if (section && section === "none") setsection("");
	}, [gradea, section]);

	const callStudentData = () => {
		setIsComponentVisible(false);

		axios
			.post(`${baseUrl}optional/opt`, {
				year_id: Number(academicYearId),
				grade_id: Number(grade) === 0 ? filterGradeByYear[0]?.grade_master_id : Number(grade),
			})
			.then((response: AxiosResponse) => {
				let { data } = response;
				console.log(data);
				if (data.hasOwnProperty("data") && data.data.length <= 0) {
					sessionStorage.setItem("studentDetails", JSON.stringify([]));
				}
				setOptionalFees(response.data.data);
			});
	};
	// useEffect(() => {
	//    getAccessToken();
	//   axios
	//  .post(`${baseUrl}optional/opt`, {
	//       year_id:academicYear,
	//       grade_id: gradea,
	//     })
	//     .then((response: AxiosResponse) => {
	//       //  console.log(response.data.data);
	//       setOptionalFees(response.data.data);
	//     });
	// }, []);

	useEffect(() => {
		// console.log(gradeSectionList,filterParticularYear,gradeMaster)

		if (
			gradeSectionList &&
			gradeSectionList.length > 0 &&
			firstAcadmicYear &&
			firstAcadmicYear.length > 0 &&
			gradeMaster &&
			gradeMaster.length > 0
		) {
			//console.log(gradeSectionList,firstAcadmicYear[0])
			setAcademicYear(firstAcadmicYear[0].academic_year);
			handleGradeFilter(gradeSectionList, firstAcadmicYear[0].year_id);
		}
	}, [gradeSectionList, firstAcadmicYear, gradeMaster]);

	const handleGradeFilter = (gradeSectionList: any, searchInput: any) => {
		//Filtering Grade by academic year id
		let resultData: any = [];
		gradeSectionList.forEach((element: any) => {
			if (searchInput == element.academic_year_id) {
				resultData.push(element);
			}
		});
		// console.log(resultData, "grade");
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
		console.log(grade_id_bind, "gggggggg");

		//Removing Duplicates ex:I-a,I-b
		const ids = grade_id_bind.map((o) => o.grade_master_id);
		const filtered = grade_id_bind.filter(({ grade_master_id }, index) => !ids.includes(grade_master_id, index + 1));
		const idsofSection = grade_id_bind.map((o) => o.section);
		const filteredForSection = grade_id_bind.filter(({ section }, index) => !idsofSection.includes(section, index + 1));
		//  console.log(filtered);
		console.log(filtered);
		setFilterGradeByYear(filtered);
		setGradeID(filtered[0].grade_master_id);
		setDuplicateSection(grade_id_bind);
		// setWithDuplicatesGrade(grade_id_bind);
		handleSectionSearch(filtered[0].grade_master_id, grade_id_bind);
	};

	function handleSectionSearch(gradeIdPass: any, filteredGrade: any) {
		//Filtering Section by Grade
		console.log(gradeIdPass);
		console.log(filteredGrade);
		let resultData: any = [];
		filteredGrade.forEach((element: any) => {
			if (gradeIdPass == element.grade_master_id) {
				resultData.push(element);
			}
		});
		console.log(resultData);
		setFilterSectionByYear(resultData);
		setsection(resultData[0].grade_section_id);
	}

	//    console.log(academicYearFinal);
	//    console.log(gradeSectionList);
	function YearId(yeardata: any) {
		//  console.log(yeardata);
		var matchedyearid: any =
			gradeSectionList &&
			gradeSectionList.length &&
			gradeSectionList.filter((data: any) => data.academic_year_id === yeardata.year_id);
		//  console.log(matchedyearid);
		// let combindobject = { ...gradedata, ...matchedyearid[0] };
		// GetFinalYearData.push(combindobject);
		// console.log(GetFinalYearData);
		// setDisplayFinalData(GetFinalYearData);
		//setFinalAcademicYr(GetFinalYearData);
		// console.log(matchedyearid);
	}
	useEffect(() => {
		academicYearFinal &&
			academicYearFinal.length &&
			academicYearFinal.map((data: any) => {
				YearId(data);
			});
	});
	console.log(selected);

	const mainsearch = () => {
		getAccessToken();
		axios
			.get(`${baseUrl}student_admissions_search/search_student?academic_year=${acas}&grade_id=${gradea}&section=${section}`)
			.then((response: AxiosResponse) => {
				setMainSearch(response.data);
				// console.log(response.data);
			});
	};
	useEffect(() => {
		getAccessToken();
		axios
			.get(`${baseUrl}gradeSection`)
			.then((res: any) => {
				setGradeSectionList(res.data.data);
				//console.log(res.data.data);
			})
			.catch((error) => console.log(error));
	}, []);
	useEffect(() => {
		console.log(Autosearch);

		if (Autosearch) {
			Searchauto();
		} else {
			setSuggest("");
			setOptionalFees([]);
		}
	}, [Autosearch]);
	const onClear = () => {
		setStatusStudentSearch("");
	};
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setStatusStudentDetails({ ...statusStudentDetails, [name]: value });
	};
	const handleSearch = (gradeSectionList: any, searchInput: any) => {
		setAddGrade("");
		setAcademicYear(searchInput);
		let mySet1 = new Set();
		let resultData = gradeSectionList.filter((obj: any) =>
			Object.values(obj)
				.flat()
				.some((v) => `${v}`.toLowerCase().includes(`${searchInput}`.toLowerCase()))
		);
		let selectedYearArr: any = [];
		resultData.forEach((element: any) => {
			selectedYearArr.push(element);
			mySet1.add(element.grade);
		});
		setGradeBasedOnYearFinal([...mySet1]);
		setFilterParticularYear(selectedYearArr);
		//  setAddGrade(resultData[0].grade);
	};
	//    console.log(gradeSectionList);
	const handlesection = (sectionList: any, searchInput: any) => {
		setAddGrade("");
		setAcademicYear(searchInput);
		let mySet1 = new Set();
		let resultData = gradeSectionList.filter((obj: any) =>
			Object.values(obj)
				.flat()
				.some((v) => `${v}`.toLowerCase().includes(`${searchInput}`.toLowerCase()))
		);
		let selectedYearArr: any = [];
		resultData.forEach((element: any) => {
			selectedYearArr.push(element);
			mySet1.add(element.section);
		});
		SetsectionBasedOnGrade([...mySet1]);
		//      setAddSection(resultData[0].section);
	};
	console.log(gotStudentDetails, "11111");

	const oprtionalApiCall = () =>{
		axios
		.post(`${baseUrl}optional/search`, {
			year_id: Number(academicYearId),
			grade_id: Number(grade),
			section_id: Number(section) === 0 ? filterSectionByYear[0]?.grade_section_id : Number(section),
			fee_master_id: Number(optionaldrop),
			// year_id: 9,
			// grade_id: 1,
			// section_id: 112,
			//fee_master_id: 12
		})
		.then((res: any) => {
			let {
				data: { data },
			} = res;
			console.log(data, "data");
			if (
				res &&
				res.hasOwnProperty("data") &&
				res.data &&
				res.data.hasOwnProperty("data") &&
				res.data.data &&
				res.data.data.data &&
				res.data.data.data.length > 0
			) {
				sessionStorage.setItem("studentDetails", JSON.stringify(res.data.data.data));
			} else {
				sessionStorage.setItem("studentDetails", JSON.stringify([]));
			}
			setGotStudentDetails(res.data.data.data);
			setGotStudentDetailsChecked(res.data.data.data);

			//      console.log(res.data.data);
			setloading(true);
		})
		.catch((e: any) => {
			console.log(e);
		});
	}


	//Function Call To Select All Student Data
	const selectAllStudent = (e: any) => {
		if (e.target.checked) {
			const studentDetails: any = sessionStorage.getItem("studentDetails");
			const newStudentDetails: any = JSON.parse(studentDetails);
			const newTempArr: any[] = [];
			newStudentDetails.forEach((element: any) => {
				let tempObj: any = {};
				tempObj["student_admissions_id"] = element.student_admissions_id;
				tempObj["student_id"] = element.student_id;
				tempObj["fee_master_id"] = optionaldrop;
				tempObj["year_id"] = element.year_id;
				tempObj["grade_id"] = element.grade_id;
				tempObj["grade_section_id"] = element.grade_section_id;
				newTempArr.push(tempObj);
			});
			console.log(newTempArr, "all check");
			sessionStorage.setItem("studentDetailsCheckedAll", JSON.stringify(newTempArr));
			return newTempArr;
		} else {
			setGotStudentDetails([])
			oprtionalApiCall()			
		}
	};

	//call the optional on any changes of year grade section
	useEffect(() => {
		console.log(academicYearId, grade, section, "333333");
		if (
			academicYearId &&
			academicYearId.toString().length > 0 &&
			grade &&
			grade.toString().length > 0 &&
			section &&
			section.toString().length > 0
		) {
			setGotStudentDetails([]);
			setOptionaldrop("none");
			setGotStudentDetailsChecked([]);
			console.log("use efect");
			callStudentData();
			sessionStorage.setItem("studentDetailsCheckedAll", JSON.stringify([]));
		}
	}, [academicYearId, grade, section]);

	
	// call the api on optional change


	useEffect(() => {
		sessionStorage.setItem("studentDetails", JSON.stringify([]));
		setGotOptionaldata([]);
		setGotStudentDetails([]);
		getAccessToken();
		// setOptionalFees([])
		console.log(optionaldrop, "feemaster", academicYearId, "year", grade, "grade", section, "section");
		if (
			academicYearId &&
			academicYearId.toString().length > 0 &&
			grade &&
			grade.toString().length > 0 &&
			section &&
			section.toString().length > 0 &&
			optionaldrop &&
			optionaldrop.toString().length > 0 &&
			optionaldrop !== "none"
		) {
			if (Autosearch.studentid && Autosearch.studentid.length > 0) {
				axios
					.post(`${baseUrl}optional/search`, {
						student_id: Autosearch.studentid,
						year_id: Number(academicYearId),
						grade_id: Number(grade),
						section_id: Number(section) === 0 ? filterSectionByYear[0]?.grade_section_id : Number(section),
						fee_master_id: Number(optionaldrop),
						// year_id: 9,
						// grade_id: 1,
						// section_id: 112,
						//fee_master_id: 12
					})
					.then((res: any) => {
						let {
							data: { data },
						} = res;
						console.log(data, "data");
						if (
							res &&
							res.hasOwnProperty("data") &&
							res.data &&
							res.data.hasOwnProperty("data") &&
							res.data.data &&
							res.data.data.data &&
							res.data.data.data.length > 0
						) {
							sessionStorage.setItem("studentDetails", JSON.stringify(res.data.data.data));
						} else {
							sessionStorage.setItem("studentDetails", JSON.stringify([]));
						}
						setGotStudentDetails(res.data.data.data);
						setGotStudentDetailsChecked(res.data.data.data);

						//      console.log(res.data.data);
						setloading(true);
					})
					.catch((e: any) => {
						console.log(e);
					});
			} else {
				oprtionalApiCall()
			}
		}
	}, [optionaldrop]);

	return (
		<div id="page-top">
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
			<div id="wrapper">
				<Sidebar data={"studentrecord"}></Sidebar>
				<div id="content-wrapper" className="d-flex flex-column">
					<div className="student-profile py-2">
						<div id="content">
							<Navbar></Navbar>
							<div className="container">
								<div className="d-sm-flex align-items-center justify-content-between mb-3">
									<Container>
										<Row>
											<Col md={4}>
												<Form.Control
													type="search"
													className="form-control bg-light border-20 small"
													placeholder="Search for Name,ID,PhoneNo..."
													value={
														Autosearch && Autosearch.text
															? `${Autosearch.text}**${Autosearch.GradeId}**${Autosearch.PhoneNumber}**${Autosearch.studentid}`
															: Autosearch.text=== undefined ?null:Autosearch
													}
													onChange={(e: any) => {
														setAutoSearch(e.target.value.trim());
														setSearchBy(e.target.value.trim());
														 
													}}
												/>

												<Card
													style={{
														cursor: "pointer",
														background: "rgba(0,0,0,0)",
														backdropFilter: "saturate(180%) blur(8px)",
														color: "black",
														fontWeight: 700,
														zIndex: 5,
														position: "absolute",
													}}>
													<ListGroup variant="flush" style={{ marginLeft: "10px" }}>
														{suggest.length > 0 && isComponentVisible && (
															<div>
																{suggest.map((item: any, i: any) => (
																	<>
																		<div
																			key={i}
																			onClick={() => onSuggesthandler(item)}
																			className="mb-1 btn btn-primary pointer"
																			style={{ textAlign: "left" }}>
																			{item.student_name}***
																			{item.grade_master_id}***
																			{item.phone_number}***
																			{item.admission_no}
																		</div>
																	</>
																))}
															</div>
														)}
													</ListGroup>
												</Card>
											</Col>
											{Autosearch && Autosearch.text ? (
												<></>
											) : (
												<>
													<Col md={2}>
														<Form.Select
															aria-label="Default select example"
															onChange={(e) => {
																setAcademicYear(e.target.options[e.target.selectedIndex].text);
																setAcademicYearId(e.target.value);
																handleGradeFilter(gradeSectionList, e.target.value);
															}}>
															{academicYearFinal &&
																academicYearFinal.length &&
																academicYearFinal.map((academic: any) => {
																	return (
																		<option key={academic.year_id} value={academic.year_id}>
																			{academic.academic_year}
																		</option>
																	);
																})}
														</Form.Select>
													</Col>
													<Col md={2}>
														<Form.Select
															aria-label="Default select example"
															onChange={(e: any) => {
																setGradea(e.target[e.target.selectedIndex].text);
																setGradeID(e.target.value);
																handleSectionSearch(e.target.value, duplicateSection);
																//handlesection(filterParticularYear, e.target.value);
															}}>
															{filterGradeByYear &&
																filterGradeByYear.length &&
																filterGradeByYear.map((value: any) => {
																	// console.log(academicYear)
																	return (
																		<option
																			key={value.grade_master_id}
																			value={value.grade_master_id}
																			label={value.grade_master}>
																			{value.grade_master}
																		</option>
																	);
																})}
														</Form.Select>
													</Col>
													<Col md={2}>
														<Form.Select
															aria-label="Default select example"
															onChange={(e: any) => {
																setsection(e.target.value);
																setSecionId(e.target[e.target.selectedIndex].text);
																//handlesection(filterParticularYear, e.target.value);
															}}>
															{filterSectionByYear &&
																filterSectionByYear.length &&
																filterSectionByYear.map((value: any, i: any) => {
																	return (
																		<option value={value.grade_section_id} label={value.section}>
																			{value.section}
																		</option>
																	);
																})}
														</Form.Select>
													</Col>
													<Col md={1}>
														<div className="input-group-append">
															<Button
																className="btn btn-danger"
																type="button"
																onClick={() => {
																	callStudentData();
																}}>
																<i className="fas fa-search fa-sm"></i>
															</Button>
															{""}{" "}
														</div>
													</Col>{" "}
												</>
											)}
										</Row>{" "}
									</Container>
								</div>
								<div className="d-sm-flex align-items-center justify-content-between">
									<Container>
										<Row>
											<Col md={4}>
												<Form.Select
													aria-label="Default select example"
													value={optionaldrop}
													onChange={(e) => setOptionaldrop(Number(e.target.value))}>
													<option value="none">Select Optional Fees</option>
													{optionalFees &&
														optionalFees.length &&
														optionalFees.map((value: any, i: any) => {
															return <option value={value.fee_master_id}>{value.fee_type_name}</option>;
														})}
												</Form.Select>{" "}
											</Col>
											<Col md={2}>
												<Button
													type="button"
													onClick={(e: any) => {
														submitOptional();
													}}>
													Submit
												</Button>
											</Col>
											<Col>
												{gotStudentDetails &&
												gotStudentDetailsChecked &&
												gotStudentDetailsChecked.length &&
												gotStudentDetails.length > 1 ? (
													<Form.Check 
														type="switch"
														id="custom-switch"
														label="Select All Students"
														onChange={(e: any) => {
															setAllCheck(e.target.checked);
															const allStudentDetails: any = sessionStorage.getItem("studentDetails");
															setGetAllCheckedValues(JSON.parse(allStudentDetails));
															selectAllStudent(e)
														}}
													/>
												) : (
													<></>
												)}
											</Col>
										</Row>
									</Container>
                                    </div>
                                    <div>
									{optionalFees.length > 0 ? (
										<div>
											<div className="col-xl-12 text-center" style={{ margin: "10px"}}>
												{statusStudentSearch ? (
													<div>
														<Table bordered hover>
															<thead>
																<tr>
																	<th>Admission No</th>
																	<th>Name</th>
																	<th>Select Students</th>
																</tr>
															</thead>
															<tbody>
																{gotStudentDetails &&
																gotStudentDetailsChecked &&
																gotStudentDetailsChecked.length &&
																!allCheck &&
																gotStudentDetails.length > 0 ? (
																	gotStudentDetails.map((values: any, index: any) => {
																		return (
																			<>
																				<tr key={index}>
																					<td>{values.student_admissions_id}</td>
																					<td>{values.student_name}</td>
																					<td>
																						{" "}
																						{values.status === 0 ? (
																							<Form.Check 
																								onChange={(e: any) => {
																									console.log(
																										e,
																										values,
																										"selected check box value"
																									);
																									OptionalValuesData(e, values);
																									console.log(values, "checked");
																								}}
																								type="switch"
																								id="custom-switch"
																								label="switch to add fee"
																							/>
																						) : (
																							<Form.Check
																								type="switch"
																								defaultChecked={true}
																								id="custom-switch"
																								label="switch to add fee"
																								disabled={
																									gotStudentDetailsChecked[index]
																										.status === 0
																										? false
																										: true
																								}
																							/>
																						)}
																						{/* <Form.Check
                                            onChange={(e: any) => {
                                              // console.log(values);
                                              values.status = e.target.checked === true ? 1 : 0
                                              values.checked =
                                                OptionalValuesData(values)
                                              console.log(values, "checked");

                                            }}
                                            type="switch" defaultChecked={values.status === 1 && true} checked={values.status === 0 ? false : true} id="custom-switch" label="switch to add fee" />
                                        */}
																					</td>
																				</tr>
																			</>
																		);
																	})
																) : (
																	<>
																		{gotStudentDetails &&
																		gotStudentDetailsChecked &&
																		gotStudentDetailsChecked.length &&
																		!allCheck &&
																		gotStudentDetails.length <= 0 ? (
																			<tr>
																				<td colSpan={6} className="text-center">
																					No Data Found
																				</td>
																			</tr>
																		) : (
																			getAllCheckedValues &&
																			getAllCheckedValues.length &&
																			allCheck &&
																			getAllCheckedValues.map((values: any, index: any) => {
																				return (
																					<>
																						<tr key={index}>
																							<td>{values.student_admissions_id}</td>
																							<td>{values.student_name}</td>
																							<td>
																								{" "}
																								{values.status === 0 ? (
																									<Form.Check
																										defaultChecked={true}
																										disabled
																										type="switch"
																										id="custom-switch"
																										label="switch to add fee"
																									/>
																								) : (
																									<Form.Check
																										type="switch"
																										defaultChecked={true}
																										id="custom-switch"
																										label="switch to add fee"
																										disabled
																									/>
																								)}
																								{/* <Form.Check
                                                    onChange={(e: any) => {
                                                      // console.log(values);
                                                      values.status = e.target.checked === true ? 1 : 0
                                                      values.checked =
                                                        OptionalValuesData(values)
                                                      console.log(values, "checked");
        
                                                    }}
                                                    type="switch" defaultChecked={values.status === 1 && true} checked={values.status === 0 ? false : true} id="custom-switch" label="switch to add fee" />
                                                */}
																							</td>
																						</tr>
																					</>
																				);
																			})
																		)}
																	</>
																)}
															</tbody>
														</Table>
													</div>
												) : null}
											</div>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Optional;
