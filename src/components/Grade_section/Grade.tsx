import { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Form, Col, Row, Container, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import { deletinggradesection, postinggradeactions, setfiltergradesection } from "../../redux/actions/Gradeactions";
import { fecthYears } from "../../redux/actions/yearsActions";
import { settinggradesection } from "../../redux/actions/Setgrademasteractions";

const Grade = () => {
  const [statusGradeAdd, setStatusGradeAdd] = useState(false);
  const [clickedGrade, setClickedGrade] = useState<any[]>([]);
  const [academic_section, setAcademic_section] = useState("");
  const [datatoDelete, setdatatoDelete] = useState<any>({});
  const [duplication, setDuplication] = useState(false);
  const [filter, setfilter] = useState<any>([]);
  const dispatch = useDispatch<any>();
  const grade = useSelector((state: any) => state.allgradesections.grades);
  const master = useSelector((state: any) => state.setgrademastersections.gradetypes);
  const year = useSelector((state: any) => state.allYears.years.data);
  const finalvalues = useSelector((state: any) => state.allgradesections.all_data_section);

  const [academic_year_data, setAcademic_year_data] = useState("");
  useEffect(() => {
    if (year && year.length) setAcademic_year_data(year[0].year_id);
  }, [year]);

  //Modal Popup
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);

    dispatch(deletinggradesection(datatoDelete.id));
  };

  const SuddenhandleClose = () => {
    setShow(false);
    setdatatoDelete({});
  };
  const handleShow = () => {
    setShow(true);
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
      dataField: "Index",
      text: "S.No.",
      formatter: (cell: any, row: any, Index: any, formatExtraData: any) => {
        return <>{Index + 1}</>;
      },
      sort: true,
    },
    {
      dataField: "academic_year",
      text: "Academic Year",
      sort: true,
    },
    {
      dataField: "grade_master",
      text: "Grade",
      sort: true,
    },
    {
      dataField: "section",
      text: "Section",
      sort: true,
    },
    {
      dataField: "Action",
      text: "Action",
      formatter: (cell: any, row: any, Index: any, formatExtraData: any) => {
        return (
          <Button
            variant="danger"
            onClick={() => {
              setdatatoDelete({
                index: row.index - 1,
                year: `${row.academic_year} - ${row.grade_master} - ${row.section}`,
                id: row.grade_section_id,
              });
              handleShow();
            }}
          >
            Delete
          </Button>
        );
      },
      sort: true,
    },
  ];
  useEffect(() => {
    dispatch(setfiltergradesection());
  }, [year, master]);
  useEffect(() => {
    dispatch(settinggradesection());
    dispatch(fecthYears());
  }, []);

  const handleSubmit = async (e: any) => {
    if (academic_year_data.length <= 0 || clickedGrade.length <= 0 || academic_section.length <= 0) {
      if (academic_year_data.length <= 0) {
        alert("a");
        toast.error("Please Select Academic Year", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDuplication(false);
      } else if (clickedGrade.length <= 0) {
        toast.error("Please Select Academic Grade", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDuplication(false);
      } else {
        toast.error("Please Enter Section", {
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
      clickedGrade.forEach((element: any) => {
        let sendData = {
          academic_year_id: academic_year_data,
          grade_id: Number(element),
          section: academic_section.toUpperCase(),
        };
        setTimeout(() => {
          dispatch(postinggradeactions(sendData, setDuplication));
        }, 700);
      });
      setStatusGradeAdd(false);
      setClickedGrade([]);
      setAcademic_year_data(year[0].year_id);
      setAcademic_section("");
    }
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

  const dataSearchBar: any =
    finalvalues &&
    finalvalues?.length &&
    finalvalues.sort().filter((data: any) => {
      return Object.keys(data).some((key) => data[key].toString().toLowerCase().includes(filter.toString().toLowerCase()));
    });
  return (
    <div>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar data={"Grade_section"}></Sidebar>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar></Navbar>
              <div className="container-fluid">
                <div className="col-xl-12 m-auto">
                  <div className="col-lg-10" style={{ marginLeft: "10%", width: "90%" }}>
                    <div className="card mb-3">
                      <div style={{ color: "rgb(230, 39, 39)" }}>
                        <div className="card-header mb-4 bg-transparent border-1 text-center">
                          <h4 className="mb-0 ">
                            <i className="far fa-clone pr-1"></i>Grade & Section
                          </h4>
                          <div style={{ textAlign: "right" }}>
                            {!statusGradeAdd ? (
                              <Button type="submit" className="btn btn-primary btn-sm btn-save" onClick={() => setStatusGradeAdd(true)}>
                                Add
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      {!statusGradeAdd ? (
                        <div className="card-body">
                          <div className="table-responsive">
                            <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                              <div id="dataTable_filter" className="dataTables_filter">
                                <Form.Label htmlFor="inputPassword5" style={{ marginLeft: "75%" }}>
                                  Search:
                                  <Form.Control
                                    type="search"
                                    className="form-control form-control-sm"
                                    onChange={(e) => setfilter(e.target.value)}
                                  />
                                </Form.Label>
                              </div>
                            </div>

                            <BootstrapTable
                              keyField="index"
                              data={dataSearchBar}
                              columns={col}
                              hover
                              striped
                              pagination={paginationFactory({
                                sizePerPageList: paginate,
                              })}
                            />
                          </div>

                          <Modal show={show} onHide={SuddenhandleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Delete {datatoDelete.year}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are You Sure You What To Delete <b>{datatoDelete.year}</b> ?
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
                        </div>
                      ) : (
                        <>
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
                          <Container>
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
                                    onChange={(e: any) => {
                                      setAcademic_year_data(e.target.value);
                                    }}
                                  >
                                    {year &&
                                      year.length &&
                                      year.map((values: any, index: any) => {
                                        return <option value={values.year_id}>{values.academic_year}</option>;
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
                                        onChange={(e: any) => {
                                          callTheAddGrade(e.target.value);
                                        }}
                                        id={`inline-checkbox-${index}`}
                                        style={{
                                          marginTop: "unset !important",
                                        }}
                                      />
                                    );
                                  })}
                              </Col>
                              <Form.Group as={Row} className="mb-12 pt-4 pb-2" controlId="formPlaintextPassword">
                                <Form.Label
                                  column
                                  sm="4"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  Section
                                </Form.Label>
                                <Col sm="6">
                                  <Form.Control
                                    type="text"
                                    onChange={(e: any) => {
                                      setAcademic_section(e.target.value);
                                    }}
                                  />
                                </Col>
                              </Form.Group>
                            </Row>
                          </Container>
                          <div className="card-footer">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <Button
                                className="btn  btn-secondary"
                                onClick={() => {
                                  setStatusGradeAdd(false);
                                  setClickedGrade([]);
                                  setAcademic_section("");
                                  setAcademic_year_data(year[0].year_id);
                                }}
                              >
                                Cancel
                              </Button>{" "}
                              &nbsp;
                              <Button
                                type="submit"
                                className={duplication ? "disabled btn btn-danger btn-save" : "btn btn-danger btn-save"}
                                onClick={(e: any) => {
                                  setDuplication(false);
                                  setClickedGrade([]);
                                  handleSubmit(e);
                                }}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </>
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
  );
};
export default Grade;
