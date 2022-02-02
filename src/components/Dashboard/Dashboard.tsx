import React from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";

const Dashboard = () => {
    return (
        <div>
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Navbar></Navbar>
                            <div className="container-fluid">
                                <h4>Dashboard</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
