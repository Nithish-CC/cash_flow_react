import React from 'react'
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Col, Row, Spinner, Modal } from "react-bootstrap";
const Profile = () => {
    return (
        <>
            <div id="wrapper">
                <Sidebar data={"Stu_fees"}></Sidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Navbar></Navbar>
                        <div className="container-fluid">
                            <Form>
                                <Row className='m-2'>
                                    <Col md={6}>
                                        School Name:
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control type="text" onChange={(e) => console.log(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row className='m-2'>
                                    <Col md={6}>
                                        Address:
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control type="text" onChange={(e) => console.log(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row className='m-2'>
                                    <Col md={6} >
                                        Branch:
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control type="text" onChange={(e) => console.log(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row className='m-2'>
                                    <Col md={6}>
                                        Month Starts for Academic Year :
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control type="text" onChange={(e) => console.log(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} />
                                    <Col md={4} >
                                        <Button className='text-center'>
                                            Submit
                                        </Button>
                                    </Col>
                                    <Col md={4} />
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile