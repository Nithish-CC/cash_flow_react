import { useEffect, useState } from "react";
import { baseUrl } from "../../index";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Container, Row, Col, Modal, Spinner } from "react-bootstrap";
import { getAccessToken } from "../../config/getAccessToken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Placesprice = () => {
    //Academic Year
    const [statusAcademicYearAdd, setStatusAcademicYearAdd] = useState(false);
    const [FromAcdYear, setFromAcdYear] = useState<any[]>([]);
    const [acdYear, setAcdYear] = useState<any>({ fromYear: "", toYear: 0 });
    const [allAcademicYear, setAllAcademicYear] = useState<any[]>([]);
    const [datatoDelete, setdatatoDelete] = useState<any>({});    
    // Transport places
    const placesList = [{year:'2021-2022',place:'namakkal',price:'4500'}, {year:'2021-2022',place:'paramathi-velur',price:'2500'}, {year:'2021-2022',place:'velur',price:'3500'}];

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
    // const handleShow = () => {
    //     setShow(true);
    // };

    const callTheYearUpdater = () => {
        console.log(new Date().getFullYear());
        let newDateArr: any[] = [];
        for (let i = 0; i < 3; i++) {
            newDateArr.push(new Date().getFullYear() + i);
        }
        setFromAcdYear(newDateArr);
        setAcdYear({ fromYear: new Date().getFullYear(), toYear: new Date().getFullYear() + 1 });
    };

    const getAllAcademicYear = () => {
        getAccessToken();
        axios
            .get(`${baseUrl}academic_year/show`)
            .then((res: any) => {
                console.log(res.data.academic_years);
                setAllAcademicYear(res.data.academic_years);
            })
            .catch((e: any) => {
                console.log(e);
            });
    };

    const setNewAcademicYear = (newArrVal: any) => {
        setAllAcademicYear([...newArrVal]);
    };

    const deleteAnAcademicYear = (year: any, index: any) => {
        let newArrVal = allAcademicYear;
        newArrVal.splice(index, 1);
        getAccessToken();
        axios
            .delete(`${baseUrl}academic_year/delete?`, { data: { year_id: year } })
            .then((res: any) => {
                toast.success("Year Deleted Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setNewAcademicYear(newArrVal);
                setdatatoDelete({});
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
        e.preventDefault();
        try {
            getAccessToken();
            await axios.post(`${baseUrl}academic_year/new_academic_year`, { academic_year: `${acdYear.fromYear}-${acdYear.toYear}` }).then((res: any) => {
                console.log(res.data);
                if (res.data.year_id) {
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
            });
        } catch (err) {
            alert("Incorrect Username and Password");
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar data={"Placesprice"}></Sidebar>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Navbar></Navbar>
                            <div className="container-fluid">
                                <div className="col-xl-11 m-auto">
                                    <div className="col-lg-10" style={{ marginLeft: "10%", width: "90%" }}>
                                        <div className="card mb-3">
                                            <div style={{ color: "rgb(230, 39, 39)" }}>
                                                <div className="card-header mb-4 bg-transparent border-1 text-center">
                                                    <h4 className="mb-0 ">
                                                        <i className="far fa-clone pr-1"></i> Transport places
                                                    </h4>
                                                    <div style={{ textAlign: "right" }}>
                                                        {!statusAcademicYearAdd ? (
                                                            <Button type="submit" className="btn btn-primary btn-sm btn-save" onClick={() => setStatusAcademicYearAdd(true)}>
                                                                Add
                                                            </Button>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {!statusAcademicYearAdd ? (
                                                <div className="card-body">
                                                    <div className="table-responsive">
                                                        <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                                                            <div id="dataTable_filter" className="dataTables_filter">
                                                                <Form.Label htmlFor="inputPassword5" style={{ marginLeft: "75%" }}>
                                                                    Search:
                                                                    <Form.Control type="search" className="form-control form-control-sm" />
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
                                                                            S.No.
                                                                        </th>
                                                                        <th className="sorting" style={{ width: "114px" }}>
                                                                            Academic Year
                                                                        </th>
                                                                        <th className="sorting" style={{ width: "114px" }}>
                                                                            Places
                                                                        </th>
                                                                        <th className="sorting" style={{ width: "114px" }}>
                                                                            Term Fees
                                                                        </th>
                                                                        <th className="sorting" style={{ width: "63px" }}>
                                                                            Actions
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {placesList && placesList.length ? (
                                                                        placesList.map((values: any, index: any) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{values.year}</td>
                                                                                    <td>{values.place}</td>
                                                                                    <td>{values.price}</td>
                                                                                    <td>
                                                                                        <Button
                                                                                            variant="danger"
                                                                                            onClick={() => {
                                                                                                // deleteAnAcademicYear(
                                                                                                //     values.year_id,
                                                                                                //     index
                                                                                                // );
                                                                                                // setdatatoDelete({
                                                                                                //     index: index,
                                                                                                //     year: values.placeholder,
                                                                                                //     id: values.price,
                                                                                                // });
                                                                                                // handleShow();
                                                                                            }}
                                                                                        >
                                                                                            Delete
                                                                                        </Button>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })
                                                                    ) : (
                                                                        <>
                                                                            <tr style={{ textAlign: "center" }}>
                                                                                <td
                                                                                    colSpan={3}
                                                                                    style={{
                                                                                        textAlign: "center",
                                                                                    }}
                                                                                >
                                                                                    <Spinner animation="border" variant="danger" />
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                    )}
                                                                </tbody>
                                                            </Table>
                                                        </div>
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
                                                    <Modal show={show} onHide={SuddenhandleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Delete {datatoDelete.year}</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Are You Sure You What To Delete {datatoDelete.year} ?</Modal.Body>
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
                                                    <Container>
                                                        <Row className="justify-content-md-center">
                                                            <Col md="4">
                                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                    <Form.Label>Place</Form.Label>
                                                                    <Form.Control type="text" placeholder="" value="" />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md="4">
                                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                    <Form.Label>Academic year</Form.Label>
                                                                    <Form.Select>
                                                                        <option value="25">2021-2022</option>
                                                                        <option value="30">2022-2023</option>
                                                                        <option value="35">2023-2024</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md="4">
                                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                    <Form.Label>Term Fees</Form.Label>
                                                                    <Form.Control type="number" placeholder="" value="" />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                    <br></br>
                                                    <div className="card-footer">
                                                        <div style={{ display: "flex", justifyContent: "right" }}>
                                                            <Button className="btn btn btn-secondary" onClick={() => setStatusAcademicYearAdd(false)}>
                                                                Cancel
                                                            </Button>
                                                            &nbsp;
                                                            <Button
                                                                type="submit"
                                                                className="btn btn-danger btn-save"
                                                                onClick={(e: any) => {
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
export default Placesprice;
