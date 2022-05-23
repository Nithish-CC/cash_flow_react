import { useEffect, useState } from "react";
import { baseUrl } from "../../index";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Container, Row, Col, Modal, Spinner } from "react-bootstrap";
import { getAccessToken } from "../../config/getAccessToken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transportfees = () => {

    const initialValues = [{
        academicYear: "2020-2021",
        places: "namakkal",
        termDetails: [
            {
                term: "Term 1",
                termFees: 5000,
            }, {
                term: "Term 2",
                termFees: 5000,
            },
            {
                term: "Term 3",
                termFees: 5000,
            }
        ],
    }, {
        academicYear: "2020-2021",
        places: "Erode",
        termDetails: [
            {
                term: "Term 1",
                termFees: 1000,
            }, {
                term: "Term 2",
                termFees: 1000,
            },
        ],
    }]

    const [stoppings, setStoppings] = useState<any>(initialValues)
    const [stoppingsAdd, setStoppingsAdd] = useState(false)

    const termChange = (e: any) => {
        let i: any;
        let newFormValues: any = [...stoppings];
        for (i = 0; i < e.target.value; i++) {
            newFormValues[i][e.target.name] = e.target.value;
            setStoppings(newFormValues);
        }
        console.log(stoppings);
    }
    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar data={"placesstoppings"}></Sidebar>
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
                                                        <i className="far fa-clone pr-1"></i>Transport Fees
                                                    </h4>
                                                    <div style={{ textAlign: "right" }}>
                                                        {!stoppingsAdd ? (
                                                            <Button type="submit" className="btn btn-primary btn-sm btn-save" onClick={() => setStoppingsAdd(true)}>
                                                                Add
                                                            </Button>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                                {!stoppingsAdd && <div id="dataTable_filter" className="dataTables_filter">
                                                    <Form.Label style={{ marginLeft: "75%" }}>
                                                        Search:
                                                        <Form.Control type="search" className="form-control form-control-sm" />
                                                    </Form.Label>
                                                </div>}
                                                {!stoppingsAdd ?
                                                    <Container>
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
                                                                                Term
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
                                                                        {stoppings && stoppings.length ? (stoppings.map((values: any, index: any) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{values.academicYear}</td>
                                                                                    <td>{values.places}</td>
                                                                                    <td>
                                                                                        {values.termDetails.map((term: any) => {
                                                                                            return (
                                                                                                <>{term.term}<br /></>
                                                                                            )
                                                                                        })}
                                                                                    </td>
                                                                                    <td>
                                                                                        {values.termDetails.map((term: any) => {
                                                                                            return (
                                                                                                <>{term.termFees}<br /></>
                                                                                            )
                                                                                        })}
                                                                                    </td>
                                                                                    <td>
                                                                                        <Button
                                                                                            variant="danger"
                                                                                            onClick={() => {
                                                                                                console.log("Delete");
                                                                                            }}
                                                                                        >
                                                                                            Delete
                                                                                        </Button>
                                                                                    </td>
                                                                                </tr>)
                                                                        })) : <></>}
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </Container>
                                                    : <div>
                                                        <Container>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Academic Year</Form.Label>
                                                                <Form.Select>
                                                                    <option value="2020-2021">2020-2021</option>
                                                                    <option value="2021-2022">2021-2022</option>
                                                                    <option value="2022-2023">2022-2023</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Places</Form.Label>
                                                                <Form.Select>
                                                                    <option value="namakkal">Namakkal</option>
                                                                    <option value="erode">Erode</option>
                                                                    <option value="karur">Karur</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Term</Form.Label>
                                                                <Form.Select name="term" onChange={termChange}>
                                                                    <option value={1}>Term 1</option>
                                                                    <option value={2}>Term 2</option>
                                                                    <option value={3}>Term 3</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                            <Row className="justify-content-md-center">

                                                            </Row>
                                                        </Container>
                                                        <br></br>
                                                        <div className="card-footer">
                                                            <div style={{ display: "flex", justifyContent: "right" }}>
                                                                <Button className="btn btn btn-secondary" onClick={() => setStoppingsAdd(false)}>
                                                                    Cancel
                                                                </Button>
                                                                &nbsp;
                                                                <Button
                                                                    type="submit"
                                                                    className="btn btn-danger btn-save"
                                                                    onClick={(e: any) => {
                                                                        console.log("Add");

                                                                    }}
                                                                >
                                                                    Save
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>}
                                            </div>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Transportfees;
