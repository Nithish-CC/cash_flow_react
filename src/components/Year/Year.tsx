import { useEffect, useState } from "react";
import { baseUrl } from "../../index";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import {
  Button,
  Table,
  Form,
  Container,
  Row,
  Col,
  Modal,
  Spinner,
} from "react-bootstrap";
import { getAccessToken } from "../../config/getAccessToken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

const Year = () => {
  //Academic Year
  const [statusAcademicYearEdit, setStatusAcademicYearEdit] = useState(false);
  const [statusAcademicYearAdd, setStatusAcademicYearAdd] = useState(false);
  const [FromAcdYear, setFromAcdYear] = useState<any[]>([]);
  const [acdYear, setAcdYear] = useState<any>({ fromYear: "", toYear: 0 });
  const [allAcademicYear, setAllAcademicYear] = useState<any[]>([]);
  const [datatoDelete, setdatatoDelete] = useState<any>({});
  const [filter, setfilter] = useState<any>([]);
  const [spinnerLoad, setSpinnerLoad] = useState<any>(true);
  const [duplication, setDuplication] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      console.log(location.pathname);
      history.push(location.pathname);
    }, 100);
  }, []);

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
    { dataField: "academic_year", text: "Academic Year", sort: true },
    {
      dataField: "Actions",
      text: "Actions",
      formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
          <Button
            variant="danger"
            onClick={() => {
              setdatatoDelete({
                index: row.index - 1,
                year: row.academic_year,
                id: row.year_id,
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

  const getAllAcademicYear = () => {
    getAccessToken();
    axios
      .get(`${baseUrl}year`)
      .then((res: any) => {
        res.data.data.map((data: any, index: any) => {
          data.index = index + 1;
        });
        setAllAcademicYear(res.data.data);
        setSpinnerLoad(false);
      })
      .catch((e: any) => {
        console.log(e);
        setSpinnerLoad(false);
      });
  };

  //Modal Popup
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    deleteAnAcademicYear(datatoDelete.id, datatoDelete.index);
  };
  const SuddenhandleClose = () => {
    setShow(false);
    setdatatoDelete({});
  };
  const handleShow = () => {
    setShow(true);
  };
  const datatoFilterNull: any =
    allAcademicYear &&
    allAcademicYear.length &&
    allAcademicYear.sort().map((data: any) => {
      let keys = Object.keys(data);
      keys.map((key: any) => {
        data[key] = data[key] == null ? "" : data[key];
      });
      return data;
    });
  const dataSearch: any =
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

  const callTheYearUpdater = () => {
    console.log(new Date().getFullYear());
    let newDateArr: any[] = [];
    for (let i = 0; i < 3; i++) {
      newDateArr.push(new Date().getFullYear() + i);
    }
    setFromAcdYear(newDateArr);
    setAcdYear({
      fromYear: new Date().getFullYear(),
      toYear: new Date().getFullYear() + 1,
    });
  };

  const deleteAnAcademicYear = (year: any, index: any) => {
    setSpinnerLoad(true);

    getAccessToken();
    axios
      .delete(`${baseUrl}year`, { data: { year_id: year } })
      .then((res: any) => {
        if (res.data.data.isDeletable) {
          toast.success("Year Deleted Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setdatatoDelete({});
          getAllAcademicYear();
        } else if (res.data.data.isDeletable === false) {
          toast.warning("Year Existing in Grade&Section", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setSpinnerLoad(false);
          setdatatoDelete({});
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  useEffect(() => {
    callTheYearUpdater();
    getAllAcademicYear();
  }, []);

  useEffect(() => {
    callTheYearUpdater();
  }, [statusAcademicYearAdd]);

  const handleSubmit = async (e: any) => {
    if (acdYear.fromYear && acdYear.fromYear.toString().length > 3) {
      try {
        getAccessToken();
        const res: any = await axios
          .post(`${baseUrl}year`, {
            academic_year: `${acdYear.fromYear}-${acdYear.toYear}`,
          })
          .then((res: any) => {
            console.log(res.data);
            if (res.data.data.insertId) {
              toast.success("Year Added Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              toast.warning("Year Already Added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
            getAllAcademicYear();
            setStatusAcademicYearAdd(false);
            setDuplication(false);
          });
      } catch (err) {
        setDuplication(false);
        alert("Error");
      }
    } else {
      toast.warning("From Year Not Found", {
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
          <Sidebar data={"Academicyear"}></Sidebar>
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
                      <a style={{ color: "rgb(230, 39, 39)" }}>
                        <div className="card-header mb-4 bg-transparent border-1 text-center">
                          <h4 className="mb-0 ">
                            <i className="far fa-clone pr-1"></i> Academic Year
                          </h4>
                          <div style={{ textAlign: "right" }}>
                            {!statusAcademicYearAdd ? (
                              <Button
                                type="submit"
                                className="btn btn-primary btn-sm btn-save"
                                onClick={() => setStatusAcademicYearAdd(true)}
                              >
                                Add
                              </Button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </a>
                      {!statusAcademicYearAdd ? (
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
                                keyField="academic_year"
                                data={dataSearch}
                                columns={col}
                                hover
                                striped
                                pagination={paginationFactory({
                                  sizePerPageList: paginate,
                                })}
                              />
                            </div>

                            <div style={{ marginLeft: "20%" }}>
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
                          </div>
                          <Modal show={show} onHide={SuddenhandleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Delete {datatoDelete.year}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are You Sure You What To Delete{" "}
                              {datatoDelete.year} ?
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
                        </div>
                      ) : (
                        <div>
                          <Container>
                            <Row className="justify-content-md-center">
                              <Col md="6">
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Academic Year</Form.Label>
                                  <Form.Control
                                    onChange={(e: any) => {
                                      console.log(e.target.value);
                                      setAcdYear({
                                        fromYear: e.target.value,
                                        toYear: Number(e.target.value) + 1,
                                      });
                                    }}
                                    value={acdYear.fromYear}
                                    type="number"
                                    placeholder="Academic_Year"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>To Academic Year</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Disabled input"
                                    value={acdYear.toYear}
                                    disabled
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </Container>
                          <br></br>
                          <div className="card-footer">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <Button
                                className="btn btn btn-secondary"
                                onClick={() => setStatusAcademicYearAdd(false)}
                              >
                                Cancel
                              </Button>
                              &nbsp;
                              <Button
                                type="submit"
                                className={
                                  duplication
                                    ? "disabled btn btn-danger btn-save"
                                    : "btn btn-danger btn-save"
                                }
                                onClick={(e: any) => {
                                  setDuplication(true);
                                  handleSubmit(e);
                                }}
                              >
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
  );
};
export default Year;
