import React, { useState, useEffect } from "react";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import "../../App.css";
import { Form, Button, InputGroup } from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";
import Axios from "axios";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
const Studentadd = () => {
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const [year, setYear] = useState<any>("");
    const [getYear, setacedamic] = useState<any>("");
    const [admissionNo, setAdmissionno] = useState<any>("");
    const [studentName, setStudentname] = useState<any>("");
    const [fromGrade, setFromgrade] = useState<any>("");
    const [dateofBirth, setDateofbirth] = useState<any>("");
    const [gender, setGender] = useState<any>("");
    const [email, setEmail] = useState<any>("");
    const [academicYear, setAcademicYear] = useState<any>("");
    const [toGrade, setToGrade] = useState<any>("");
    const [admissionDate, setAdmissiondate] = useState<any>(new Date());
    const [toSection, setToSection] = useState<any>({});
    const [previousSchoolInfo, setPreviousSchoolInfo] = useState<any>("");
    const [fatherName, setFatherName] = useState<any>("");
    const [fatherOccupation, setFatherOccupation] = useState<any>("");
    const [address, setAddress] = useState<any>("");
    const [phoneNo, setPhoneno] = useState<any>("");
    const [alterPhoneno, setAlterPhoneno] = useState<any>("");
    const [addGrade, setAddGrade] = useState<any>("");
    const [gradeBasedOnYearFinal, setGradeBasedOnYearFinal] = useState<any>([]);
    const [gradeSectionList, setGradeSectionList] = useState<any>([]);
    const [academicYearFinal, setAcademicYearFinal] = useState<any>([]);
    const [sectionList, setSectionList] = useState<any>([]);
    const [sectionBasedOnGrade, SetsectionBasedOnGrade] = useState<any>([]);
    const [addSection, setAddSection] = useState<any>("");
    const [filterParticularYear, setFilterParticularYear] = useState<any>([]);
    const [filterGradeSectionList, setFilterGradeSectionList] = useState<any>([]);
    const [searchGradeId, setSearchGradeId] = useState<any>("");
    const [actualGrade, setActualGrade] = useState<any>([]);
    const [gradeMaster, setGradeMaster] = useState<any>([]);
    const [gradeMasterParticular, setGradeMasterParticular] = useState<any>([]);
    const [filterGradeByYear, setFilterGradeByYear] = useState<any>([]);
    const [withDuplicatesGrade, setWithDuplicatesGrade] = useState<any>([]);
    const [duplication, setDuplication] = useState(false);
	console.log(dateofBirth);
	const windowReload = () => {
        let interval = setInterval(() => {
            window.location.reload();
        }, 3000);
        return() => clearInterval(interval);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (
            studentName.length <= 0 ||
            dateofBirth.length <= 0 ||
            gender.length <= 0 ||
            email.length <= 0 ||
            addSection.length <= 0 ||
            previousSchoolInfo.length <= 0 ||
            fatherName.length <= 0 ||
            fatherOccupation.length <= 0 ||
            address.length <= 0 ||
            phoneNo.length < 10 ||
            alterPhoneno.length < 10 ||
            admissionNo.length <= 0 ||
            fromGrade.length <= 0 ||
            academicYear.length <= 0 ||
            gradeMasterParticular.length <= 0
			) {
				if (phoneNo.length < 10) {
					toast.warning("please Check Phone Number", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				} else if (alterPhoneno.length < 10) {
					toast.warning("please Check Phone Number", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				} else {
					toast.warning("please Fill All Details", {
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
            getAccessToken();
            Axios.post(`${baseUrl}newAdmission`, {
                student_name: studentName,
                DOB: dateofBirth,
                gender: gender,
                email: email,
                admission_date: moment(new Date()).format("L"),
                grade_id: addSection,
                previous_school_info: previousSchoolInfo,
                father_name: fatherName,
                father_occupation: fatherOccupation,
                address: address,
                phone_number: phoneNo,
                alt_phone_number: alterPhoneno,
                admission_no: admissionNo,
                from_grade: fromGrade,
                student_type: "Days Scholar",
                year_id: academicYear,
                grade_section_id: gradeMasterParticular,
            })
                .then((response: any) => {
                    console.log(response);
                    if (response.data.data.IsExsist == true) {
                        toast.warning("Admission No Already Present Try Again", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                     //  history.push(`StudentprofileSearch/${}`)
                    } else if (response.data.data.IsExsist == false) {
                        toast.success("Student Admission Success", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
						});
						windowReload();

                    }
					setDuplication(false);

                })
                .catch((error) => {
                    toast.warning("Admission Failed Try Again", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setDuplication(false);
                });
        }
    };
    // const handleChangeMobile = (e: any) => {
    //     const re = /^[0-9\b]+$/; //rules
    //     if (e.target.value === "" || re.test(e.target.value)) {
    //         setPhoneno(e.target.value);
    //     }
    // };
    // const handleChangeMobileAlter = (e: any) => {
    //     const re = /^[0-9\b]+$/; //rules
    //     if (e.target.value === "" || re.test(e.target.value)) {
    //         setAlterPhoneno(e.target.value);
    //     }
    // };
    useEffect(() => {
        getAccessToken();
        Axios.get(`${baseUrl}gradeSection`)
            .then((res: any) => {
                console.log(res.data.data);
                setGradeSectionList(res.data.data);
                setFilterGradeSectionList(res.data.data[0]);
            })
            .catch((error) => console.log(error));
        getAccessToken();
        Axios.get(`${baseUrl}year`)
            .then((res: any) => {
                setAcademicYearFinal(res.data.data);
                setFilterParticularYear([res.data.data[0]]);
            })
            .catch((error) => console.log(error));
        getAccessToken();
        Axios.get(`${baseUrl}grademaster`)
            .then((res: any) => {
                setGradeMaster(res.data.data);
                setGradeMasterParticular(res.data.data[0]);
            })
            .catch((error) => console.log(error));
        setFromgrade("I");
    }, []);
    useEffect(() => {
        if (gradeSectionList && gradeSectionList.length > 0 && filterParticularYear && filterParticularYear.length > 0 && gradeMaster && gradeMaster.length > 0) {
            handleGradeFilter(gradeSectionList, filterParticularYear[0].year_id);
        }
    }, [gradeSectionList, filterParticularYear, gradeMaster]);
    const handleGradeFilter = (gradeSectionList: any, searchInput: any) => {
        console.log(gradeSectionList, searchInput);
        setSearchGradeId("");
        setAcademicYear(searchInput);
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
        //Removing Duplicates ex:I-a,I-b
        const ids = grade_id_bind.map((o) => o.grade_master_id);
        const filtered = grade_id_bind.filter(({ grade_master_id }, index) => !ids.includes(grade_master_id, index + 1));
        console.log(grade_id_bind, "grademaster and section");
        setFilterGradeByYear(filtered);
        setWithDuplicatesGrade(grade_id_bind);
        handleSectionSearch(grade_id_bind, filtered[0].grade_master_id);
    };
    console.log(gradeSectionList);
    const handleSectionSearch = (gradeSectionList: any, searchInput: any) => {
        console.log(gradeSectionList, "++", searchInput);
        setAddSection(Number(searchInput));
        let tempArr: any[] = [];
        gradeSectionList.forEach((element: any) => {
            if (searchInput === element.grade_master_id) {
                tempArr.push(element);
            }
        });
        console.log(tempArr);
        SetsectionBasedOnGrade(tempArr);
        setGradeMasterParticular(tempArr[0].grade_section_id);
    };
    console.log(addGrade);
    var date = new Date();
    var formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    // console.log(academicYear);
    console.log(academicYearFinal);
    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Navbar></Navbar>
                            <div className="container-fluid">
                                <div className="col-xl-11 m-auto">
                                    <div className="card-header">
                                        <h4 className="card-title font-weight text-center" style={{ color: "red" }}>
                                            New Admission
                                        </h4>
                                    </div>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <Form.Group className="form-group row" controlId="validationCustom01">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Admission No
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Control required type="text" placeholder="Admission No" onChange={(e) => setAdmissionno(String(e.target.value))} />
                                                                <Form.Control.Feedback type="invalid">Please Enter Admission No</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="validationCustom01">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Student Name
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Control required type="name" placeholder="Student Name" onChange={(e) => setStudentname(e.target.value)} />
                                                                <Form.Control.Feedback type="invalid">Please Enter Student Name</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="validationgrade">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            From Grade<span className="text-danger"> </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Select onChange={(e) => setFromgrade(e.target.value)} required>
																<option value="No Grade">--Select FromGrade--</option>
                                                                    <option value="I">I</option>
                                                                    <option value="II">II</option>
                                                                    <option value="III">III</option>
                                                                    <option value="IV">IV</option>
                                                                    <option value="V">V</option>
                                                                    <option value="VI">VI</option>
                                                                    <option value="VII">VII</option>
                                                                    <option value="VII">VIII</option>
                                                                    <option value="IX">IX</option>
                                                                    <option value="X">X</option>
                                                                    <option value="XI">XI</option>
                                                                    <option value="XII">XII</option>
                                                                </Form.Select>
                                                                <Form.Control.Feedback type="invalid">Please Enter Grede</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="validationDate">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            DOB
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Control type="date" onChange={(e) => setDateofbirth(e.target.value)} required />
                                                                <Form.Control.Feedback type="invalid">Please Enter DateofBirth</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Gender
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <div key={`inline-radio`} className="mb-3">
                                                                <Form.Check
                                                                    inline
                                                                    required
                                                                    label="Male"
                                                                    name="group1"
                                                                    value="Male"
                                                                    onChange={(e) => setGender(e.target.value)}
                                                                    type="radio"
                                                                    id={`inline-radio-1`}
                                                                />
                                                                <Form.Check
                                                                    inline
                                                                    label="Female"
                                                                    name="group1"
                                                                    type="radio"
                                                                    value="Female"
                                                                    onChange={(e) => setGender(e.target.value)}
                                                                    id={`inline-radio-2`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="formBasicEmail">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Email
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                                                <Form.Control.Feedback type="invalid">Please Enter Email</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="Admission Date">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Admission Date
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Control type="date" value={moment(admissionDate).format("YYYY-MM-DD")} onChange={(e) => setAdmissiondate(e.target.value)} />
                                                                {/* <Form.Control type="date" value="{formatedDate}"onChange={(e) => setAdmissiondate(e.target.value)} required/> */}
                                                                <Form.Control.Feedback type="invalid">Please Enter Admission Date</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="formBasicEmail">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Academic Year
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Select
                                                                    onChange={(e: any) => {
                                                                        handleGradeFilter(gradeSectionList, Number(e.target.value));
                                                                        setAcademicYear(Number(e.target.value));
                                                                    }}
                                                                    required
                                                                >
                                                                    {academicYearFinal &&
                                                                        academicYearFinal.length &&
                                                                        academicYearFinal.map((values: any) => {
                                                                            return <option value={values.year_id}>{values.academic_year}</option>;
                                                                        })}
                                                                </Form.Select>
                                                                <Form.Control.Feedback type="invalid">Please Enter Academic Year</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <Form.Group className="form-group row" controlId="formBasicEmail">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            To Grade
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Select
                                                                    value={addSection}
                                                                    onChange={(e: any) => {
                                                                        handleSectionSearch(withDuplicatesGrade, Number(e.target.value));
                                                                        setAddSection(Number(e.target.value));
                                                                    }}
                                                                >
                                                                    {filterGradeByYear &&
                                                                        filterGradeByYear.length &&
                                                                        filterGradeByYear.map((values: any, index: any) => {
                                                                            return <option value={values.grade_master_id}>{values.grade_master}</option>;
                                                                        })}
                                                                </Form.Select>
                                                                <Form.Control.Feedback type="invalid">Please Enter Grade</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="formBasicEmail">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            To Section
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Select
                                                                    value={gradeMasterParticular}
                                                                    onChange={(e) => {
                                                                        setGradeMasterParticular(e.target.value);
                                                                    }}
                                                                    required
                                                                >
                                                                    {sectionBasedOnGrade &&
                                                                        sectionBasedOnGrade.length &&
                                                                        sectionBasedOnGrade.map((values: any) => {
                                                                            return <option value={values.grade_section_id}> {values.section}</option>;
                                                                        })}
                                                                </Form.Select>
                                                                <Form.Control.Feedback type="invalid">Please Enter Section</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="floatingTextarea">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Previous School Info
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Control as="textarea" rows={2} onChange={(e) => setPreviousSchoolInfo(e.target.value)} required />
                                                                <Form.Control.Feedback type="invalid">Please Enter Previous School Info</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="formBasicEmail">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Father Name
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Control type="text" placeholder="Father Name" onChange={(e) => setFatherName(e.target.value)} required />
                                                                <Form.Control.Feedback type="invalid">Please Enter Fathername</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="formBasicEmail">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Father Occupation
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Control type="text" placeholder="Father Occupation" onChange={(e) => setFatherOccupation(e.target.value)} required />
                                                                <Form.Control.Feedback type="invalid">Please Enter FatherOccupation</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="floatingTextarea">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Address
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <InputGroup hasValidation>
                                                                <Form.Control as="textarea" onChange={(e) => setAddress(e.target.value)} required />
                                                                <Form.Control.Feedback type="invalid">Please Enter Address</Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="formBasicEmail">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Phone No
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <Form.Control
                                                                value={phoneNo}
                                                                onChange={(e) => {
                                                                    e.target.value.length > 10 ? setPhoneno(phoneNo) : setPhoneno(e.target.value);
                                                                }}
                                                                required
                                                                type="number"
                                                                pattern="[0-9]*"
                                                                placeholder="Phone No"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row" controlId="formBasicEmail">
                                                        <Form.Label className="col-md-5 col-form-label text-md-right">
                                                            Alt. Phone No
                                                            <span className="text-danger"> * </span>
                                                        </Form.Label>
                                                        <div className="col-md-6">
                                                            <Form.Control
                                                                value={alterPhoneno}
                                                                onChange={(e) => {
                                                                    e.target.value.length > 10 ? setAlterPhoneno(alterPhoneno) : setAlterPhoneno(e.target.value);
                                                                }}
                                                                type="number"
                                                                pattern="[0-9]*"
                                                                placeholder="Alt. Phone No"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="card-footerss">
                                                {duplication ? (
                                                    <></>
                                                ) : (
                                                    <Button
                                                        className="btn btn-danger float-right"
                                                        type="submit"
                                                        onClick={(e) => {
                                                            setDuplication(true);
                                                            handleSubmit(e);
                                                        }}
                                                    >
                                                        Submit
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Studentadd;