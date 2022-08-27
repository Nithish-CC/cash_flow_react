import { useEffect, useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Col, Row, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
    addTransportFees,
    deleteTransportFees,
    fecthTransportFees,
    listTransportFees,
    setactiontransportfees,
} from "../../redux/actions/transportActions";
import { settinggradesection } from "../../redux/actions/Setgrademasteractions";
import { fecthYears } from "../../redux/actions/yearsActions";
import { gettinggradesection, settinggradeaction } from "../../redux/actions/Gradeactions";
const Transport = () => {
    const [statusFeeDetailsAdd, setStatusFeeDetailsAdd] = useState(false);
    const [feeTypeName, setFeeTypeName] = useState("");
    const [clickedGrade, setClickedGrade] = useState<any[]>([]);
    const [searchAcademicYear, setSearchAcademicYear] = useState("");
    const [datatoDelete, setdatatoDelete] = useState<any>({});
    const [searchGradeId, setSearchGradeId] = useState("");
    const [displayFinalData, setDisplayFinalData] = useState<any[]>([]);
    const [gradeSectionList, setGradeSectionList] = useState<any>([]);
    const [academicYear, setAcademicYear] = useState<any>("");
    const [allGrade, setAllGrade] = useState<any[]>([]);
    const [gradeSectionListAdd, setGradeSectionListAdd] = useState<any>([]);
    const [filterGradeByYear, setFilterGradeByYear] = useState<any>([]);
    const [filterSectionByYear, setFilterSectionByYear] = useState<any>([]);
    const [filterSectionByYearAdd, setFilterSectionByYearAdd] = useState<any>([]);
    const [gradeMasterParticular, setGradeMasterParticular] = useState<any>([]);
    const [termsmasterValue, setTermsmasterValue] = useState<any>([]);
    const [termFeesAdd, setTermFeesAdd] = useState(true);
    const school: any = sessionStorage.getItem("School");
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

    const dispatch = useDispatch<any>();
    const transportfee = useSelector((state: any) => state.allTransportfees.transportfees);
    const master = useSelector((state: any) => state.setgrademastersections.gradetypes);
    const year = useSelector((state: any) => state.allYears.years.data);
    const grade = useSelector((state: any) => state.allgradesections.grades);
    const transportfeeval = useSelector((state: any) => state.allTransportfees.transportfeeval);
    const year_grade_section = useSelector((state: any) => state.allTransportfees.year_grade_section);
    const [finalTerms, setFinalterms] = useState<any>([]);
    let removeFormFields = (i: any) => {
        let newFormValues = [...termFeessaveAdd];
        newFormValues.splice(i, 1);
        setTermFeesSaveAdd(newFormValues);
    };

    useEffect(() => {
        ShowingTextBox(JSON.parse(school).term_count, termFeessaveAdd.length - 1);
    }, [termFeessaveAdd.length]);

    const [frontSearchGrade, setFrontSearchGrade] = useState<any>("");
    const [frontSearchYear, setFrontSearchYear] = useState<any>("");
    //Modal Popup
    const [show, setShow] = useState(false);
    const SuddenhandleClose = () => {
        setShow(false);
        setdatatoDelete({});
    };

    const callGrade = (e: any) => {
        let checked: any[] = [];

        if (e.target.checked) {
            setClickedGrade([...clickedGrade, e.target.value]);
        } else {
            setClickedGrade(checked);
        }
    };

    useEffect(() => {
        dispatch(fecthYears());
        dispatch(settinggradesection());
        dispatch(gettinggradesection());
    }, []);
    useEffect(() => {
        if (year && year?.length) {
            setSearchAcademicYear(year[0]?.year_id);
            setFrontSearchYear(year[0]?.year_id);
        }
    }, [year]);
    useEffect(() => {
        if (grade && grade?.length) {
            setAllGrade(grade);
            setGradeSectionList(grade);
            setGradeSectionListAdd(grade);
            setFrontSearchGrade(grade[0].grade_id);
            setSearchGradeId(grade[0].grade_id);
        }
    }, [grade]);

    useEffect(() => {
        if (master && master?.length) {
            setGradeMasterParticular(master[0]?.grade_master);
        }
    }, [master]);
    useEffect(() => {
        if (gradeSectionList && gradeSectionList.length > 0 && year && year.length > 0 && master && master.length > 0) {
            setAcademicYear(year[0].academic_year);
            handleGradeFilter(gradeSectionList, year[0].year_id);
            handleGradeFilterAdd(gradeSectionListAdd, year[0].year_id);
        }
    }, [gradeSectionList, year, allGrade]);

    const handleGradeFilter = (gradeSectionList: any, searchInput: any) => {
        let resultData: any = [];
        gradeSectionList.forEach((element: any) => {
            if (searchInput == element.academic_year_id) {
                resultData.push(element);
            }
        });

        let grade_id_bind: any[] = [];
        resultData.forEach((element: any) => {
            master.forEach((grade: any) => {
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
        dispatch(setactiontransportfees());
        setFilterGradeByYear(filtered);
        setFilterSectionByYear(filteredForSection);
        setDisplayFinalData(filteredForSection);
    };

    useEffect(() => {
        if (gradeSectionList && gradeSectionList.length > 0 && year && year.length > 0 && master && master.length > 0) {
            setAcademicYear(year[0].academic_year);
            handleGradeFilter(gradeSectionList, year[0].year_id);
        }
    }, [gradeSectionList, year, allGrade]);
    const handleGradeFilterAdd = (gradeSectionListAdd: any, searchInput: any) => {
        let resultData: any = [];
        gradeSectionListAdd.forEach((element: any) => {
            if (searchInput == element.academic_year_id) {
                resultData.push(element);
            }
        });

        let grade_id_bind: any[] = [];
        resultData.forEach((element: any) => {
            master.forEach((grade: any) => {
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
        if (frontSearchGrade && frontSearchGrade != null && frontSearchYear && frontSearchYear != null) {
            dispatch(listTransportFees(frontSearchYear, frontSearchGrade));
        }
    }, [frontSearchGrade, frontSearchYear]);

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
    const handleClose = () => {
        setShow(false);
        dispatch(deleteTransportFees(datatoDelete, frontSearchYear, frontSearchGrade));
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
                    transportfeeval[rowindex]?.terms && transportfeeval[rowindex]?.terms.length > 0 ? (
                        i <= transportfeeval[rowindex]?.terms.length - 1 ? (
                            <td className="text-center">
                                {"Term" + (i + 1)}
                                <br />
                                {transportfeeval[rowindex]?.terms[i]?.term_amount}
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

    const emptyDataMessage = () => {
        return <p className="text-center">No Data Found</p>;
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
            formatter: (cell: any, row: any, rowIndex: any) => {
                return (
                    <i
                        className="fas fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                            setShow(true);
                            setdatatoDelete({ term: row.terms[0], index: rowIndex });
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
        values.grade_id = filterGradeByYear.length ? clickedGrade : null;
        transportfee?.map((value: any) => {
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
            dispatch(addTransportFees(values));
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

                                                                                dispatch(fecthTransportFees());
                                                                                transportfee &&
                                                                                    transportfee.length &&
                                                                                    setFeeTypeName(transportfee[0].fee_master_id);
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
                                                                                setStatusFeeDetailsAdd(false);
                                                                                dispatch(
                                                                                    listTransportFees(frontSearchYear, frontSearchGrade)
                                                                                );
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
                                                                    marginLeft: "80px",
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
                                                                                            dispatch(
                                                                                                settinggradeaction(
                                                                                                    year_grade_section,
                                                                                                    year,
                                                                                                    grade
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        {year &&
                                                                                            year.length &&
                                                                                            year.map((values: any, index: any) => {
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
                                                                                <div
                                                                                    className="form-group"
                                                                                    style={{ width: "28%", marginRight: "20" }}
                                                                                >
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
                                                            <Table bordered responsive>
                                                                <BootstrapTable
                                                                    keyField="academic_year"
                                                                    data={transportfeeval}
                                                                    columns={col}
                                                                    hover
                                                                    noDataIndication={emptyDataMessage}
                                                                    pagination={paginationFactory({
                                                                        sizePerPageList: paginate,
                                                                    })}
                                                                />
                                                            </Table>
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
                                                                        {year &&
                                                                            year.length &&
                                                                            year.map((values: any, index: any) => {
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
                                                                {master &&
                                                                    master.length &&
                                                                    master.map((romanvalues: any, index: any) => {
                                                                        return (
                                                                            <Form.Check
                                                                                inline
                                                                                label={`${romanvalues.grade_master}`}
                                                                                name="group1"
                                                                                type="checkbox"
                                                                                key={index}
                                                                                value={romanvalues.grade_master_id}
                                                                                onChange={callGrade}
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
                                                                                        {transportfee &&
                                                                                            transportfee.length &&
                                                                                            transportfee.map((values: any, index: any) => {
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
                                                                                            })}
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