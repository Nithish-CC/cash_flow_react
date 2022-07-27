import _ from "lodash";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import { fecthYears } from "../../redux/actions/yearsActions";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button, Table, Form, Col, Row, Modal } from "react-bootstrap";
import { gettinggradesection } from "../../redux/actions/Gradeactions";
import { feemasteractions } from "../../redux/actions/Feemasteractions";
import { settinggradesection } from "../../redux/actions/Setgrademasteractions";
import { addYearOfFee, deleteyearoffee, yearoffeeactions } from "../../redux/actions/Yearoffeeactions";

const Yearoffee = () => {
  const school: any = sessionStorage.getItem("School");
  const [frontSearchGrade, setFrontSearchGrade] = useState<any>("");
  const [frontSearchYear, setFrontSearchYear] = useState<any>();
  const [show, setShow] = useState(false);
  const [statusFeeDetailsAdd, setStatusFeeDetailsAdd] = useState(false);
  const [datatoDelete, setdatatoDelete] = useState<any>({});
  const [filterGradeByYear, setFilterGradeByYear] = useState<any>([]);
  const feemaster = useSelector((state: any) => state.feemaster.feemaster);
  const year = useSelector((state: any) => state.allYears.years.data);
  const [finalTerms, setFinalterms] = useState<any>([]);
  const yearoffee = useSelector((state: any) => state.yearoffee.yearoffees);
  const grade = useSelector((state: any) => state.allgradesections.grades);
  const master = useSelector((state: any) => state.setgrademastersections.gradetypes);
  const [termFeessaveAdd, setTermFeesSaveAdd] = useState<any>([
    {
      fee_amount: null,
      fee_master_id: null,
      grade_id: 0,
      optional_fee: false,
      optional_fees: false,
      term_count: JSON.parse(school)?.term_count,
      term_fees: [
        {
          term_name: "Term1",
          term_amount: "",
        },
      ],
      year_id: 0,
    },
  ]);
  const dispatch = useDispatch<any>();
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

  useEffect(() => {
    if (year && year.length) {
      setFrontSearchYear(year[0].year_id);
    }
  }, [year]);

  useEffect(() => {
    ShowingTextBox(JSON.parse(school).term_count, termFeessaveAdd.length - 1);
  }, [termFeessaveAdd.length]);

  useEffect(() => {
    if (frontSearchGrade && frontSearchGrade != null && frontSearchYear && frontSearchYear != null) {
      dispatch(yearoffeeactions(frontSearchYear, frontSearchGrade));
    }
  }, [frontSearchGrade, frontSearchYear]);

  useEffect(() => {
    dispatch(fecthYears());
    dispatch(gettinggradesection());
    dispatch(settinggradesection());
    ShowingTermsValue(JSON.parse(school)?.optional_term_count);
  }, []);

  useEffect(() => {
    if (grade && grade.length > 0 && year && year.length > 0 && master && master.length > 0) {
      handleGradeFilter(grade, year[0].year_id);
    }
  }, [grade, year]);

  useEffect(() => {
    if (grade && grade.length) {
      setFrontSearchGrade(grade[0].grade_id);
    }
  }, [grade]);

  useEffect(() => {
    if (grade && grade.length > 0 && year && year.length > 0 && master && master.length > 0) {
      handleGradeFilter(grade, year[0].year_id);
    }
  }, [grade, year, master]);

  let removeFormFields = (i: any) => {
    let newFormValues = [...termFeessaveAdd];
    newFormValues.splice(i, 1);
    setTermFeesSaveAdd(newFormValues);
  };
  const SuddenhandleClose = () => {
    setShow(false);
    setdatatoDelete({});
  };

  const handleGradeFilter = (grade: any, searchInput: any) => {
    let resultData: any = [];
    grade.forEach((element: any) => {
      if (searchInput == element.academic_year_id) {
        resultData.push(element);
      }
    });

    const res = master.filter((x: any) => resultData.some((y: any) => x.grade_master_id === y.grade_id));
    setFilterGradeByYear(res);
  };

  const ShowingTextBox = (terms: any, index: any) => {
    let term: any = [];
    let termTitle: any = "";
    if (terms > 0) {
      for (var i = 0; i < terms; i++) {
        termTitle = "term" + (i + 1);
        term.push({ term_name: termTitle, term_amount: "" });
      }
    }

    let newFormValues = [...termFeessaveAdd];
    newFormValues[index]["term_count"] = terms;
    newFormValues[index]["term_fees"] = term;
    setTermFeesSaveAdd(newFormValues);
  };

  const ShowingTermsValue = (termsss: any) => {
    let termscount = [];
    for (var i = 1; i <= Number(termsss); i++) {
      termscount.push(String(i));
    }
    setFinalterms(termscount);
  };

  const handleClose = () => {
    setShow(false);
    dispatch(deleteyearoffee(datatoDelete, frontSearchYear, frontSearchGrade));
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
          yearoffee[rowindex]?.terms && yearoffee[rowindex]?.terms.length > 0 ? (
            i <= yearoffee[rowindex]?.terms.length - 1 ? (
              <td className="text-center">
                {"Term" + (i + 1)}
                <br />
                {yearoffee[rowindex]?.terms[i]?.term_amount}
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
                    value={termFeessaveAdd[rowindex].term_fees[i] ? termFeessaveAdd[rowindex].term_fees[i].term_amount : ""}
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
      formatter: (cell: any, row: any, rowIndex: any) => {
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
    values.grade_id = frontSearchGrade;
    feemaster?.map((value: any) => {
      if (values.fee_master_id === value.fee_master_id) {
        values.optional_fee = value.optional_fee === "true" ? true : false;
      }
    });
    values.term_fees.map((value: any) => {
      sumoftermFees = sumoftermFees + Number(value.term_amount);
    });
    _.remove(values.term_fees, function (n: any) {
      return n.term_amount === 0 || n.term_amount === "";
    });
    values.term_count = values.optional_fees ? values.term_count : values.term_fees.length;
    if (sumoftermFees === values.fee_amount) {
      delete values.optional_fees;

      dispatch(addYearOfFee(values));
      //dispatch(yearoffeeactions(frontSearchYear, frontSearchGrade));
    } else if (sumoftermFees < values.fee_amount) {
      toast.warning("Fee amount is Greater than sum of term amount");
    } else if (sumoftermFees > values.fee_amount) {
      toast.warning("Fee amount is less than sum of term amount");
    }
  };

  return (
    <div>
      <ToastContainer />
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

                            <div style={{ textAlign: "right" }}>
                              {!statusFeeDetailsAdd ? (
                                <Button
                                  type="submit"
                                  className="btn btn-primary btn-sm btn-save"
                                  onClick={() => {
                                    setStatusFeeDetailsAdd(true);
                                    dispatch(feemasteractions());
                                  }}
                                >
                                  Add
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    setStatusFeeDetailsAdd(false);
                                    dispatch(yearoffeeactions(frontSearchYear, frontSearchGrade));
                                  }}
                                >
                                  Back
                                </Button>
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
                                              handleGradeFilter(grade, e.target.value);
                                            }}
                                          >
                                            {year &&
                                              year.length &&
                                              year.map((values: any) => {
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
                                            }}
                                          >
                                            {filterGradeByYear &&
                                              filterGradeByYear.length &&
                                              filterGradeByYear.map((values: any) => {
                                                return <option value={values.grade_master_id}>{values.grade_master}</option>;
                                              })}
                                          </Form.Select>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <BootstrapTable
                                keyField="academic_year"
                                data={yearoffee}
                                columns={col}
                                hover
                                noDataIndication={emptyDataMessage}
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
                                    Are You Sure You What To Delete <b>{datatoDelete.fee_type_name}</b> ?
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
                              <Col md={3} />
                              <Col md={3} className="form-group" style={{ width: "28%" }}>
                                <Form.Select
                                  value={frontSearchYear}
                                  onChange={(e: any) => {
                                    setFrontSearchYear(Number(e.target.value));
                                    handleGradeFilter(grade, e.target.value);
                                  }}
                                >
                                  <option>Select Year</option>
                                  {year &&
                                    year.length &&
                                    year.map((values: any) => {
                                      return <option value={values.year_id}>{values.academic_year}</option>;
                                    })}
                                </Form.Select>
                              </Col>
                              <Col md={3} className="form-group" style={{ width: "28%" }}>
                                <Form.Select
                                  value={frontSearchGrade}
                                  onChange={(e: any) => {
                                    setFrontSearchGrade(Number(e.target.value));
                                  }}
                                >
                                  <option>Select Grade</option>
                                  {filterGradeByYear &&
                                    filterGradeByYear.length &&
                                    filterGradeByYear.map((values: any) => {
                                      return (
                                        <>
                                          <option value={values.grade_master_id}>{values.grade_master}</option>
                                        </>
                                      );
                                    })}
                                </Form.Select>
                              </Col>
                              <Col md={3} />
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
                                              newFormValues[rowindex]["fee_master_id"] = Number(e.target.value);
                                              setTermFeesSaveAdd(newFormValues);
                                            }}
                                          >
                                            <option>Select Optional fee</option>
                                            {feemaster &&
                                              feemaster.length &&
                                              feemaster.map((values: any) => {
                                                return (
                                                  <>
                                                    <option value={values.fee_master_id} label={values.fee_type_name}>
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
                                              newFormValues[rowindex]["optional_fees"] = e.target.checked;
                                              setTermFeesSaveAdd(newFormValues);
                                              ShowingTextBox(
                                                termFeessaveAdd[rowindex]?.optional_fees ? "1" : JSON.parse(school).term_count,
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
                                              newFormValues[rowindex]["fee_amount"] = Number(e.target.value);
                                              setTermFeesSaveAdd(newFormValues);
                                            }}
                                          />
                                        </td>
                                        {
                                          <td className="form-group">
                                            {termFeessaveAdd[rowindex].optional_fees ? (
                                              <Form.Select
                                                name="term_count"
                                                value={termFeessaveAdd[rowindex]?.term_fees?.length}
                                                onChange={(e: any) => {
                                                  ShowingTextBox(e.target.value, rowindex);
                                                }}
                                              >
                                                {finalTerms?.map((option: any) => {
                                                  return (
                                                    <>
                                                      <option value={option}>Term {option}</option>
                                                    </>
                                                  );
                                                })}
                                              </Form.Select>
                                            ) : (
                                              <Form.Control value={JSON.parse(school).term_count} disabled></Form.Control>
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
                                              onClick={() => {
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
                                                style={{ color: "green", cursor: "pointer" }}
                                                onClick={() => {
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
export default Yearoffee;
