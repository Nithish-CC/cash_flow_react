import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/sb-admin-2.css"
import { Row, Col, Form, Button, NavDropdown } from "react-bootstrap";

const Sidebar = (props: any) => {
    let activeValue = props.data;
    return (
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <div className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon">
                        <i className="fas fa-rupee-sign"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">CASHFLOW</div>
                </div>
                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <a className="nav-link" href="/Dashboard" rel="dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <div> </div>
                <li>
                    <div> </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link collapsed" style={{ cursor: "pointer" }} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-chalkboard-teacher"></i>
                        <span>Student</span>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom</h6>
 
                            <Link to="/studentrecord" className={activeValue === "studentrecord" ? "active collapse-item" : "collapse-item"}>
                                Student
                            </Link>
                            <Link to="/Stu_add" className={activeValue === "Stu_add" ? "active collapse-item" : "collapse-item"}>
                                New Admission
                            </Link>
                            <Link to="/Stupro" className={activeValue === "Stupro" ? "active collapse-item" : "collapse-item"}>
                                Promotion
                            </Link>
                            <Link to="/Stu_fees" className={activeValue === "Stu_fees" ? "active collapse-item" : "collapse-item"}>
                                Year of Fee
                            </Link>
                            <Link to="/Fee_master" className={activeValue === "Fee_master" ? "active collapse-item" : "collapse-item"}>
                                Fee Master
                            </Link>
                            <Link to="/Discounttype" className={activeValue === "Discounttype" ? "active collapse-item" : "collapse-item"}>
                                Discount Fee Type Master
                            </Link>
                            <Link to="/Academicyear" className={activeValue === "Academicyear" ? "active collapse-item" : "collapse-item"}>
                                Year
                            </Link>
                            <Link to="/Grade_section" className={activeValue === "Grade_section" ? "active collapse-item" : "collapse-item"}>
 
                                Grade & section
                            </Link>
                        </div>
                    </div>
                </li>
                
                <li className="nav-item">
                    <div className="nav-link collapsed" style={{ cursor: "pointer" }} data-toggle="collapse" data-target="#collapseTransport" aria-expanded="true" aria-controls="collapseTransport">
                        <i className="fa fa-bus"></i>
                        <span>Transport</span>
                    </div>
                    <div id="collapseTransport" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            {/* <h6 className="collapse-header"></h6> */}
 
                            <Link to="/placesprice" className={activeValue === "Placesprice" ? "active collapse-item" : "collapse-item"}>
                                Places
                            </Link>
                            <Link to="/placesstoppings" className={activeValue === "placesstoppings" ? "active collapse-item" : "collapse-item"}>
                                Places & Stoppings
                            </Link>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <div className="nav-link collapsed" style={{ cursor: "pointer" }} data-toggle="collapse" data-target="#collapseUni" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-chalkboard-teacher"></i>
                        <span>Uniform</span>
                    </div>
                    <div id="collapseUni" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">UnifForm</h6>
                            <Link to="/Uniform_size" className="collapse-item">
                                Uniform-Size
                            </Link>
                            <Link to="/Uniform_things" className="collapse-item">
                                Uniform-Things
                            </Link>
                            <Link to="/Uniform" className="collapse-item">
                                Uniform
 
                            </Link>
                        </div>
                    </div>
                </li>

 
                <li className="nav-item">
                    <div className="nav-link collapsed" style={{ cursor: "pointer" }} data-toggle="collapse" data-target="#collapseHostal" aria-expanded="true" aria-controls="collapseHostal">
                        <i className="fa fa-hotel"></i>
                        <span>Hostal</span>
                    </div>
                    <div id="collapseHostal" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            {/* <h6 className="collapse-header"></h6> */}
                            <Link to="/hostal_fees" className={activeValue === "hostal_fees" ? "active collapse-item" : "collapse-item"}>
                                Hostal Fees
                            </Link>
                            <Link to="/room_no" className={activeValue === "room_no" ? "active collapse-item" : "collapse-item"}>
                                Room No & Capacity
                            </Link>
                            <Link to="/hostal_name" className={activeValue === "hostal_name" ? "active collapse-item" : "collapse-item"}>
                                Hostal Name
                            </Link>
                        </div>
                    </div>
                </li>

                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-chalkboard-teacher"></i>
                        <span>Options</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-chalkboard-teacher"></i>
                        <span>Pages</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-chalkboard-teacher"></i>
                        <span>Admission</span>
                    </a>
                </li> */}

                {/* <hr className="sidebar-divider d-none d-md-block" /> */}
                <hr />

                {/* <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle"></button>
                    </div> */}
            </ul>
        </div>
    );
};
export default Sidebar;
