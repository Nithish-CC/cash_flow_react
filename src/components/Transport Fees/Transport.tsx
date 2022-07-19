import { useEffect, useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Col, Row, Spinner, Modal, Tab } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";
const Transport = () => {
    const [statusFeeDetailsAdd, setStatusFeeDetailsAdd] = useState(false);
    const [feeMaster, setAllFeeMaster] = useState<any[]>([]);
    const [spinnerLoad, setSpinnerLoad] = useState<any>(true);
    const [feeTypeName, setFeeTypeName] = useState("");
    const [amount, setFinalAmount] = useState("");
    const [clickedGrade, setClickedGrade] = useState<any[]>([]);
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
    const [allGrade, setAllGrade] = useState<any[]>([]);
    const [gradeSectionListAdd, setGradeSectionListAdd] = useState<any>([]);
    const [filterGradeByYear, setFilterGradeByYear] = useState<any>([]);
    const [filterSectionByYear, setFilterSectionByYear] = useState<any>([]);
    const [filterSectionByYearAdd, setFilterSectionByYearAdd] = useState<any>([]);
    const [gradeMaster, setGradeMaster] = useState<any>([]);
    const [gradeMasterParticular, setGradeMasterParticular] = useState<any>([]);
    const [termsmasterValue, setTermsmasterValue] = useState<any>([]);
    const [termFeesAdd, setTermFeesAdd] = useState(true);
    const [termFeessaveList, setTermFeesSaveList] = useState<any>([]);
    const school: any = sessionStorage.getItem("School");
    const [total, setTotal] = useState<any>(0);
    const [termFeessaveAdd, setTermFeesSaveAdd] = useState<any>([
        {
            fee_amount: null,
            fee_master_id: null,
            grade_id: [0],
            optional_fee: false,
            optional_fees: false,
            year_id: 0,
            term_count: JSON.parse(school)?.term_count,
            term_fees: [
                {
                    term_name: "Term1",
                    term_amount: "",
                },
            ],
        },
    ]);
    const [finalTerms, setFinalterms] = useState<any>([]);
    let removeFormFields = (i: any) => {
        let newFormValues = [...termFeessaveAdd];
        newFormValues.splice(i, 1);
        setTermFeesSaveAdd(newFormValues);
    };

    useEffect(() => {
        ShowingTextBox(JSON.parse(school).term_count, termFeessaveAdd.length - 1);
    }, [termFeessaveAdd.length]);

    const [allGradeMaster, setAllGradeMaster] = useState<any[]>([]);
    const [frontSearchGrade, setFrontSearchGrade] = useState<any>("");
    const [frontSearchYear, setFrontSearchYear] = useState<any>("");
    //Modal Popup
    const [show, setShow] = useState(false);
    const SuddenhandleClose = () => {
        setShow(false);
        setdatatoDelete({});
    };

    const callTheAddGrade = (value: any) => {
        let newArr = clickedGrade;
        if (clickedGrade.includes(value)) {
            const index = newArr.indexOf(value);
            if (index > -1) {
                newArr.splice(index, 1);
            }
            setClickedGrade(newArr);
        } else {
            newArr.push(value);
        }
        setClickedGrade(newArr);
    };

    const getAllGradeSectionData = () => {
        getAccessToken();
        axios.get(`${baseUrl}feeMaster/transport`).then((res: any) => {
            setFeeDetailsFinal(res.data.data);
        });
    };
    const getAllGradeMaster = () => {
        axios.get(`${baseUrl}grademaster`).then((res: AxiosResponse) => {
            setAllGradeMaster(res.data.data);
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
        if (gradeSectionList && gradeSectionList.length > 0 && feeMaster && feeMaster.length > 0 && gradeMaster && gradeMaster.length > 0) {
            setAcademicYear(feeMaster[0].academic_year);
            handleGradeFilter(gradeSectionList, feeMaster[0].year_id);
            handleGradeFilterAdd(gradeSectionListAdd, feeMaster[0].year_id);
        }
    }, [gradeSectionList, feeMaster, allGrade]);

    const handleGradeFilter = (gradeSectionList: any, searchInput: any) => {
        let resultData: any = [];
        gradeSectionList.forEach((element: any) => {
            if (searchInput == element.academic_year_id) {
                resultData.push(element);
            }
        });

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

        getAllGradeMaster();
        setFilterGradeByYear(filtered);
        setFilterSectionByYear(filteredForSection);
        setDisplayFinalData(filteredForSection);
    };

    useEffect(() => {
        if (gradeSectionList && gradeSectionList.length > 0 && feeMaster && feeMaster.length > 0 && gradeMaster && gradeMaster.length > 0) {
            setAcademicYear(feeMaster[0].academic_year);
            handleGradeFilter(gradeSectionList, feeMaster[0].year_id);
        }
    }, [gradeSectionList, feeMaster, allGrade]);
    const handleGradeFilterAdd = (gradeSectionListAdd: any, searchInput: any) => {
        let resultData: any = [];
        gradeSectionListAdd.forEach((element: any) => {
            if (searchInput == element.academic_year_id) {
                resultData.push(element);
            }
        });

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

    useEffect(() => {
        if (frontSearchGrade && frontSearchGrade != null && frontSearchYear && frontSearchYear != null) {
            list_fee_details(frontSearchYear, frontSearchGrade);
        }
    }, [frontSearchGrade, frontSearchYear]);
    const list_fee_details = (year_id: any, grade_id: any) => {
        setSpinnerLoad(true);
        getAccessToken();
        axios
            .post(`${baseUrl}transportval`, {
                grade_id: grade_id,
                year_id: year_id,
            })
            .then((res: any) => {
                res.data.data.map((map: any) => {
                    map.optional_fee = map?.optional_fee === 1 ? true : false;
                });
                setTermFeesSaveList(res.data.data);

                setSpinnerLoad(false);
            });
    };
    const ShowingTextBox = (terms: any, index: any) => {
        let term: any = [];
        let termTitle: any = "";
        if (terms > 0) {
            for (var i = 0; i < terms; i++) {
                termTitle = "term" + (i + 1);
                term.push({ term_name: termTitle, term_amount: 0 });
            }
        }

        let newFormValues = [...termFeessaveAdd];
        newFormValues[index]["term_count"] = terms;
        newFormValues[index]["term_fees"] = term;
        setTermFeesSaveAdd(newFormValues);
    };

    useEffect(() => {
        ShowingTermsValue(JSON.parse(school)?.optional_term_count);
    }, []);
    const ShowingTermsValue = (termsss: any) => {
        let termscount = [];
        for (var i = 1; i <= Number(termsss); i++) {
            termscount.push(String(i));
        }
        setFinalterms(termscount);
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

        deleteParticularDiscount(datatoDelete.year_of_fee_id);
    };

    const handleTermAmount = (data: any) => {
        let newFormValues = [...termFeessaveAdd];
        termFeessaveAdd[data.rowindex].term_fees[data.termindex].term_amount = data.amount;
        setTermFeesSaveAdd(newFormValues);
    };

    const handleTerm = (rowindex: any, editORShow: any) => {
        let im: any = [];
        const terms = termFeessaveAdd[rowindex]?.optional_fees ? termFeessaveAdd[rowindex]?.term_count : JSON.parse(school).term_count;
        let term: any = terms === "12" ? 2 : 12 / Number(terms);
        for (let i: any = 0; i < 12; i++) {
            if (editORShow === "show") {
                im.push(
                    termFeessaveList[rowindex]?.terms && termFeessaveList[rowindex]?.terms.length > 0 ? (
                        i <= termFeessaveList[rowindex]?.terms.length - 1 ? (
                            <td className="text-center">
                                {"Term" + (i + 1)}
                                <br />
                                {termFeessaveList[rowindex]?.terms[i]?.term_amount}
                            </td>
                        ) : (
                            <></>
                        )
                    ) : (
                        <></>
                    )
                );
            } else {
                im.push(
                    termFeessaveAdd[rowindex].term_fees && termFeessaveAdd[rowindex].term_fees.length > 0 ? (
                        <>
                            {i < Number(terms) && (
                                <Col md={term}>
                                    <Form.Control
                                        type="number"
                                        key={i}
                                        value={
                                            termFeessaveAdd[rowindex].term_fees[i] ? termFeessaveAdd[rowindex].term_fees[i].term_amount : ""
                                        }
                                        onChange={(e) => {
                                            handleTermAmount({
                                                rowindex: rowindex,
                                                termindex: i,
                                                amount: Number(e.target.value),
                                            });
                                        }}
                                    />
                                </Col>
                            )}
                        </>
                    ) : (
                        <></>
                    )
                );
            }
        }
        return im;
    };

    const paginate = [
        {
            text: "5",
            value: 5,
        },
        {
            text: "10",
            value: 10,
        },
        {
            text: "15",
            value: 15,
        },
        {
            text: "20",
            value: 20,
        },
        {
            text: "25",
            value: 25,
        },
    ];

    const col: any = [
        {
            dataField: "fee_master_name",
            text: "Fee Type Name",
            sort: true,
        },

        { dataField: "terms[0].fee_amount", text: "Actual Fee amount", sort: true },
        { dataField: "terms.length", text: "Term", sort: true },
        {
            dataField: "terms[0].fee_amount",
            text: "Pay By Terms",
            formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
                return <>{handleTerm(rowIndex, "show")}</>;
            },
            sort: true,
        },
        {
            dataField: "Actions",
            text: "Actions",
            formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
                return (
                    <i
                        className="fas fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                            setShow(true);
                            setdatatoDelete(row.terms[0]);
                        }}
                    ></i>
                );
            },
            sort: true,
        },
    ];

    const handleSave = (values: any) => {
        let sumoftermFees = 0;
        values.year_id = frontSearchYear;
        values.grade_id = frontSearchGrade;
        FeeDetailsFinal?.map((value: any) => {
            if (values.fee_master_id === value.fee_master_id) {
                values.optional_fee = value.optional_fee === "true" ? true : false;
            }
        });
        values.term_fees.map((value: any, index: any) => {
            sumoftermFees = sumoftermFees + Number(value.term_amount);
        });
        _.remove(values.term_fees, function (n: any) {
            return n.term_amount === 0 || n.term_amount === "";
        });
        values.term_count = values.optional_fees ? values.term_count : values.term_fees.length;
        if (sumoftermFees === values.fee_amount) {
            delete values.optional_fees;
            axios
                .post(`${baseUrl}transportval/create_transport`, values)
                .then((res: any) => {
                    if (res.data.message.includes("Year of Fee already present")) {
                        toast.warning(res.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else if (res.data.message.includes("Year of Fee inserted")) {
                        toast.success("Saved successfully", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                .catch((res: any) => {
                    toast.warning("Enter Correct data", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        } else if (sumoftermFees < values.fee_amount) {
            toast.warning("Fee amount is Greater than sum of term amount", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (sumoftermFees > values.fee_amount) {
            toast.warning("Fee amount is less than sum of term amount", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

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
                                                            <i className="far fa-clone pr-1"></i> Transport Fee Details
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

                                                                                setTermsmasterValue("");
                                                                                getAllFeeMasterData();
                                                                                FeeDetailsFinal &&
                                                                                    FeeDetailsFinal.length &&
                                                                                    setFeeTypeName(FeeDetailsFinal[0].fee_master_id);
                                                                                filterSectionByYearAdd &&
                                                                                    filterSectionByYearAdd.length &&
                                                                                    setSearchGradeId(
                                                                                        filterSectionByYearAdd[0].grade_master_id
                                                                                    );
                                                                            }}
                                                                        >
                                                                            Add
                                                                        </Button>
                                                                    ) : (
                                                                        <Button
                                                                            onClick={() => {
                                                                                window.location.reload();
                                                                            }}
                                                                        >
                                                                            Back
                                                                        </Button>
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
                                                                }}
                                                            >
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
                                                                                        value={frontSearchYear}
                                                                                        onChange={(e: any) => {
                                                                                            setFrontSearchYear(Number(e.target.value));
                                                                                            handleGradeFilter(
                                                                                                gradeSectionList,
                                                                                                e.target.value
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        {feeMaster &&
                                                                                            feeMaster.length &&
                                                                                            feeMaster.map((values: any, index: any) => {
                                                                                                return (
                                                                                                    <option value={values.year_id}>
                                                                                                        {values.academic_year}
                                                                                                    </option>
                                                                                                );
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
                                                                                        }}
                                                                                    >
                                                                                        {filterGradeByYear &&
                                                                                            filterGradeByYear.length &&
                                                                                            filterGradeByYear.map(
                                                                                                (values: any, index: any) => {
                                                                                                    return (
                                                                                                        <option
                                                                                                            value={values.grade_master_id}
                                                                                                        >
                                                                                                            {values.grade_master}
                                                                                                        </option>
                                                                                                    );
                                                                                                }
                                                                                            )}
                                                                                    </Form.Select>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <BootstrapTable
                                                                keyField="academic_year"
                                                                data={termFeessaveList}
                                                                columns={col}
                                                                hover
                                                                pagination={paginationFactory({
                                                                    sizePerPageList: paginate,
                                                                })}
                                                            />
                                                            <div style={{ marginLeft: "20%" }}>
                                                                <Modal show={show} onHide={SuddenhandleClose}>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>
                                                                            Delete {datatoDelete.feeTypeName} - {datatoDelete.amt}
                                                                        </Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        Are You Sure You What To Delete <b>{datatoDelete.fee_type_name}</b>{" "}
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
                                                            <Form.Group as={Row} className="mb-12 pb-4" controlId="formPlaintextPassword">
                                                                <Form.Label
                                                                    column
                                                                    sm="4"
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                    }}
                                                                >
                                                                    Academic Year
                                                                </Form.Label>
                                                                <Col sm="6">
                                                                    <Form.Select
                                                                        value={frontSearchYear}
                                                                        onChange={(e: any) => {
                                                                            setFrontSearchYear(Number(e.target.value));
                                                                            handleGradeFilter(gradeSectionList, e.target.value);
                                                                        }}
                                                                    >
                                                                        <option>Select Year</option>
                                                                        {feeMaster &&
                                                                            feeMaster.length &&
                                                                            feeMaster.map((values: any, index: any) => {
                                                                                return (
                                                                                    <option value={values.year_id}>
                                                                                        {values.academic_year}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                    </Form.Select>
                                                                </Col>
                                                            </Form.Group>
                                                            <Col sm="4" className="mb-4">
                                                                <Form.Label
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                    }}
                                                                >
                                                                    Grade
                                                                </Form.Label>
                                                            </Col>
                                                            <Col sm="6">
                                                                {allGradeMaster &&
                                                                    allGradeMaster.length &&
                                                                    allGradeMaster.map((romanvalues: any, index: any) => {
                                                                        return (
                                                                            <Form.Check
                                                                                inline
                                                                                label={`${romanvalues.grade_master}`}
                                                                                name="group1"
                                                                                type="checkbox"
                                                                                key={index}
                                                                                value={romanvalues.grade_master_id}
                                                                                onChange={(e: any) => {
                                                                                    callTheAddGrade(Number(e.target.value));
                                                                                }}
                                                                                id={`inline-checkbox-${index}`}
                                                                                style={{
                                                                                    marginTop: "unset !important",
                                                                                }}
                                                                            />
                                                                        );
                                                                    })}
                                                            </Col>
                                                        </Row>
                                                        <Table bordered responsive>
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="sorting_asc">Fee Type Name</th>
                                                                    <th className="sorting_asc">Split Term Fees</th>
                                                                    <th className="sorting">Actual Fee amount</th>
                                                                    <th className="sorting">No of Terms</th>
                                                                    <th className="text-center">Pay By Terms</th>
                                                                    <th className="sorting">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <>
                                                                    {termFeessaveAdd?.map((elemant: any, rowindex: any) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>
                                                                                    <Form.Select
                                                                                        value={termFeessaveAdd[rowindex].fee_master_id}
                                                                                        onChange={(e: any) => {
                                                                                            let newFormValues = [...termFeessaveAdd];
                                                                                            newFormValues[rowindex]["fee_master_id"] =
                                                                                                Number(e.target.value);
                                                                                            setTermFeesSaveAdd(newFormValues);
                                                                                        }}
                                                                                    >
                                                                                        <option>Select Optional fee</option>
                                                                                        {FeeDetailsFinal &&
                                                                                            FeeDetailsFinal.length &&
                                                                                            FeeDetailsFinal.map(
                                                                                                (values: any, index: any) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <option
                                                                                                                value={values.fee_master_id}
                                                                                                                label={values.fee_type_name}
                                                                                                            >
                                                                                                                {values.fee_type_name}
                                                                                                            </option>
                                                                                                        </>
                                                                                                    );
                                                                                                }
                                                                                            )}
                                                                                    </Form.Select>
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Check
                                                                                        type="switch"
                                                                                        value={termFeessaveAdd[rowindex].optional_fees}
                                                                                        onChange={(e: any) => {
                                                                                            let newFormValues = [...termFeessaveAdd];
                                                                                            newFormValues[rowindex]["optional_fees"] =
                                                                                                e.target.checked;
                                                                                            setTermFeesSaveAdd(newFormValues);
                                                                                            ShowingTextBox(
                                                                                                termFeessaveAdd[rowindex]?.optional_fees
                                                                                                    ? "1"
                                                                                                    : JSON.parse(school).term_count,
                                                                                                rowindex
                                                                                            );
                                                                                        }}
                                                                                        id="custom-switch"
                                                                                        style={{ position: "relative" }}
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={termFeessaveAdd[rowindex].fee_amount}
                                                                                        onChange={(e: any) => {
                                                                                            let newFormValues = [...termFeessaveAdd];
                                                                                            newFormValues[rowindex]["fee_amount"] = Number(
                                                                                                e.target.value
                                                                                            );
                                                                                            setTermFeesSaveAdd(newFormValues);
                                                                                        }}
                                                                                    />
                                                                                </td>
                                                                                {
                                                                                    <td className="form-group">
                                                                                        {termFeessaveAdd[rowindex].optional_fees ? (
                                                                                            <Form.Select
                                                                                                name="term_count"
                                                                                                value={
                                                                                                    termFeessaveAdd[rowindex]?.term_fees
                                                                                                        ?.length
                                                                                                }
                                                                                                onChange={(e: any) => {
                                                                                                    ShowingTextBox(
                                                                                                        e.target.value,
                                                                                                        rowindex
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                {finalTerms?.map((option: any) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <option value={option}>
                                                                                                                Term {option}
                                                                                                            </option>
                                                                                                        </>
                                                                                                    );
                                                                                                })}
                                                                                            </Form.Select>
                                                                                        ) : (
                                                                                            <Form.Control
                                                                                                value={JSON.parse(school).term_count}
                                                                                                disabled
                                                                                            ></Form.Control>
                                                                                        )}
                                                                                    </td>
                                                                                }
                                                                                <td style={{ minWidth: "400px", maxWidth: "500px" }}>
                                                                                    <Row>{handleTerm(rowindex, "edit")}</Row>
                                                                                </td>
                                                                                <td>
                                                                                    <div>
                                                                                        <i
                                                                                            className="fas fa-save fa-1x"
                                                                                            style={{ color: "blue", cursor: "pointer" }}
                                                                                            onClick={(e: any) => {
                                                                                                handleSave(termFeessaveAdd[rowindex]);
                                                                                            }}
                                                                                        ></i>{" "}
                                                                                        {rowindex !== 0 ? (
                                                                                            <i
                                                                                                className="fa fa-minus fa-1x"
                                                                                                style={{ color: "red", cursor: "pointer" }}
                                                                                                onClick={() => removeFormFields(rowindex)}
                                                                                            ></i>
                                                                                        ) : (
                                                                                            <i
                                                                                                className="fa fa-plus fa-1x"
                                                                                                style={{
                                                                                                    color: "green",
                                                                                                    cursor: "pointer",
                                                                                                }}
                                                                                                onClick={(e: any) => {
                                                                                                    setTermFeesSaveAdd([
                                                                                                        ...termFeessaveAdd,
                                                                                                        {
                                                                                                            fee_amount: "",
                                                                                                            term_count: 1,
                                                                                                            optional_fee: false,
                                                                                                            term_fees: [
                                                                                                                {
                                                                                                                    term_name: "Term1",
                                                                                                                    term_amount: "",
                                                                                                                },
                                                                                                            ],
                                                                                                        },
                                                                                                    ]);
                                                                                                }}
                                                                                            ></i>
                                                                                        )}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </>
                                                            </tbody>
                                                        </Table>
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
export default Transport;
