import { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import {
  Button,
  Table,
  Pagination,
  Form,
  Col,
  Row,
  Container,
  Modal,
  Spinner,
} from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { baseUrl } from "../../index";
import { romanLetters } from "../../utils/romanLetters";
import { getAllAcademicYear } from "../../Api/year_api";
// import { getAllGradeSectionAdd } from "../../Api/grade_section";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

const Grade = () => {
  const [statusGradeAdd, setStatusGradeAdd] = useState(false);
  const [statusList, setStatusList] = useState<any>([]);
  const [allAcademicYear, setAllAcademicYear] = useState<any[]>([]);
  const [clickedGrade, setClickedGrade] = useState<any[]>([]);
  const [academic_year_data, setAcademic_year_data] = useState("");
  const [academic_section, setAcademic_section] = useState("");
  const [datatoDelete, setdatatoDelete] = useState<any>({});
  const [spinnerLoad, setSpinnerLoad] = useState<any>(true);
  const [duplication, setDuplication] = useState(false);
  let [finalAcademicYr, setFinalAcademicYr] = useState<any[]>([]);
  const [allGrade, setAllGrade] = useState<any[]>([]);
  const [filter, setfilter] = useState<any>([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [totalButtons, setTotalButtons] = useState(0);
  const [createButtons, setCreateButtons] = useState<any[]>([]);
  const [pageToMove, setPageToMove] = useState(currentPage);

  //Modal Popup
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    deleteSection(datatoDelete.id, datatoDelete.index);
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
      dataField: "index",
      text: "No.",
      sort: true,
    },
    {
      dataField: "academic_year",
      text: "Discount Fee Type Name",
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
      formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
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
  const getAllGradeSectionData = () => {
    axios
      .get(`${baseUrl}gradeSection?page=${currentPage}&per_page=${perPage}`)
      .then((response: AxiosResponse) => {
        response.data.data.map((data: any, index: any) => {
          data.index = index + 1;
        });
        setStatusList(response.data.data);
        setCurrentPage(response.data.page);
        setTotalButtons(response.data.total_page);
      });
  };

  const getAllGrade = () => {
    axios.get(`${baseUrl}grademaster`).then((res: AxiosResponse) => {
      setAllGrade(res.data.data);
    });
  };

  useEffect(() => {
    getAccessToken();
    getAllGrade();
    getAllGradeSectionData();
    getAllAcademicYear()
      .then((res: any) => {
        setAllAcademicYear(res.data.data);
        setAcademic_year_data(res.data.data[0].year_id);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, []);

  const handleSubmit = () => {
    if (
      academic_year_data.length <= 0 ||
      clickedGrade.length <= 0 ||
      academic_section.length <= 0
    ) {
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
        getAccessToken();
        axios
          .post(`${baseUrl}gradeSection`, sendData)
          .then((res: any) => {
            console.log(res.data.data);
            if (res.data.data.IsExsist === false) {
              finalAcademicYr.forEach((element: any) => {
                if (
                  element.academic_year_id ==
                    res.data.data.data.academic_year_id &&
                  element.section == res.data.data.data.section &&
                  element.year_id == res.data.data.data.academic_year_id
                ) {
                  console.log(element);
                  toast.success(
                    `${element.academic_year},${element.grade_master},${element.section} Added`,
                    {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                }
              });
            } else if (res.data.data.IsExsist === true) {
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
            setStatusList([]);
            getAllGradeSectionData();
            setDuplication(false);
          })
          .catch((err: any) => {
            setDuplication(false);
          });
      });
      setStatusGradeAdd(false);
      setClickedGrade([]);
      setAcademic_year_data(allAcademicYear[0].year_id);
      setAcademic_section("");
    }
  };
  const deleteSection = (gradeid: any, index: any) => {
    setSpinnerLoad(true);
    getAccessToken();
    axios
      .delete(`${baseUrl}gradeSection?`, {
        data: { grade_section_id: gradeid },
      })
      .then((res: any) => {
        if (res.data.data.isDeletable === true) {
          toast.success("Grade & Section Deleted Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          getAllGradeSectionData();
        } else if (res.data.data.isDeletable === false) {
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
        setStatusList([]);
        getAllGradeSectionData();
      })
      .catch((e) => {
        toast.error("Grade & Section Deletion Error", {
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

  const timeToCreateButtons = () => {
    let items: any[] = [];
    for (let number = 1; number <= totalButtons; number++) {
      items.push(
        <Pagination.Item
          onClick={(e: any) => {
            setPageToMove(e.target.value);
          }}
          value={number}
          key={number}
          active={number === currentPage}
        >
          {number}
        </Pagination.Item>
      );
    }
    setCreateButtons(items);
  };

  useEffect(() => {
    timeToCreateButtons();
  }, [totalButtons]);

  useEffect(() => {
    getAllGradeSectionData();
  }, [perPage, pageToMove]);

  function YearId(gradedata: any) {
    var matchedyearid: any =
      allAcademicYear &&
      allAcademicYear.length &&
      allAcademicYear.filter(
        (data) => data.year_id === gradedata.academic_year_id
      );
    var matchedgradeid: any =
      allGrade &&
      allGrade.length &&
      allGrade.filter((data) => data.grade_master_id === gradedata.grade_id);
    let combindobject = {
      ...gradedata,
      ...matchedyearid[0],
      ...matchedgradeid[0],
    };
    console.log(combindobject);
    finalAcademicYr.push(combindobject);
    console.log(finalAcademicYr);
    setFinalAcademicYr(finalAcademicYr);
  }

  useEffect(() => {
    finalAcademicYr = [];
    statusList &&
      statusList.length &&
      statusList.map((data: any) => {
        YearId(data);
      });
  }, [statusList]);

  const datatoFilterNull: any =
    finalAcademicYr &&
    finalAcademicYr.length &&
    finalAcademicYr.sort().map((data: any) => {
      let keys = Object.keys(data);
      keys.map((key: any) => {
        data[key] = data[key] == null ? "" : data[key];
      });
      return data;
    });

  const dataSearchBar: any =
    datatoFilterNull &&
    datatoFilterNull.length &&
    datatoFilterNull.sort().filter((data: any) => {
      return Object.keys(data).some((key) =>
        data[key]
          .toString()
          .toLowerCase()
          .includes(filter.toString().toLowerCase())
      );
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
                <div className="col-xl-11 m-auto">
                  <div
                    className="col-lg-10"
                    style={{ marginLeft: "10%", width: "90%" }}
                  >
                    <div className="card mb-3">
                      <div style={{ color: "rgb(230, 39, 39)" }}>
                        <div className="card-header mb-4 bg-transparent border-1 text-center">
                          <h4 className="mb-0 ">
                            <i className="far fa-clone pr-1"></i>Grade & Section
                          </h4>
                          <div style={{ textAlign: "right" }}>
                            {!statusGradeAdd ? (
                              <Button
                                type="submit"
                                className="btn btn-primary btn-sm btn-save"
                                onClick={() => setStatusGradeAdd(true)}
                              >
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
                              <div
                                id="dataTable_filter"
                                className="dataTables_filter"
                              >
                                <Form.Label
                                  htmlFor="inputPassword5"
                                  style={{ marginLeft: "75%" }}
                                >
                                  Search:
                                  <Form.Control
                                    type="search"
                                    className="form-control form-control-sm"
                                    onChange={(e) => setfilter(e.target.value)}
                                  />                                  
                                </Form.Label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
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
                          </div>
                          <div>
                            <Row>
                              <Col sm={4}>
                                <div>
                                  {/* <Form.Select onChange={(e: any) => setPerPage(e.target.value)} style={{ width: "30%", marginLeft: "20%" }}>
                                                                        <option value="25">25</option>
                                                                        <option value="30">30</option>
                                                                        <option value="35">35</option>
                                                                        <option value="40">40</option>
                                                                    </Form.Select> */}
                                </div>
                              </Col>
                              {/* <Col sm={4}>
                                                                <div>
                                                                    <Form.Select onChange={(e: any) => setPerPage(e.target.value)} style={{ width: "30%", marginLeft: "20%" }}>
                                                                        <option value="2">2</option>
                                                                        <option value="5">5</option>
                                                                        <option value="10">10</option>
                                                                        <option value="15">15</option>
                                                                        <option value="20">20</option>
                                                                        <option value="25">25</option>
                                                                    </Form.Select>
                                                                </div>
                                                            </Col>
                                                            <Col sm={8}>
                                                                <div style={{ display: "flex", marginLeft: "40%", width: "200%" }}>
                                                                    <Pagination>{createButtons}</Pagination>
                                                                </div>
                                                            </Col> */}
                            </Row>
                          </div>
                          <Modal show={show} onHide={SuddenhandleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Delete {datatoDelete.year}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are You Sure You What To Delete{" "}
                              <b>{datatoDelete.year}</b> ?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={SuddenhandleClose}
                              >
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
                              <Form.Group
                                as={Row}
                                className="mb-12 pb-4"
                                controlId="formPlaintextPassword"
                              >
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
                                    {allAcademicYear &&
                                      allAcademicYear.length &&
                                      allAcademicYear.map(
                                        (values: any, index: any) => {
                                          return (
                                            <option value={values.year_id}>
                                              {values.academic_year}
                                            </option>
                                          );
                                        }
                                      )}
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
                                {allGrade &&
                                  allGrade.length &&
                                  allGrade.map(
                                    (romanvalues: any, index: any) => {
                                      return (
                                        <Form.Check
                                          inline
                                          label={`${romanvalues.grade_master}`}
                                          name="group1"
                                          type="checkbox"
                                          key={index}
                                          value={romanvalues.grade_master_id}
                                          onChange={(e: any) => {
                                            console.log(e.target.value);
                                            callTheAddGrade(e.target.value);
                                          }}
                                          id={`inline-checkbox-${index}`}
                                          style={{
                                            marginTop: "unset !important",
                                          }}
                                        />
                                      );
                                    }
                                  )}
                              </Col>
                              <Form.Group
                                as={Row}
                                className="mb-12 pt-4 pb-2"
                                controlId="formPlaintextPassword"
                              >
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
                                  setAcademic_year_data(
                                    allAcademicYear[0].year_id
                                  );
                                }}
                              >
                                Cancel
                              </Button>{" "}
                              &nbsp;
                              <Button
                                type="submit"
                                className={
                                  duplication
                                    ? "disabled btn btn-danger btn-save"
                                    : "btn btn-danger btn-save"
                                }
                                onClick={() => {
                                  setDuplication(true);
                                  handleSubmit();
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