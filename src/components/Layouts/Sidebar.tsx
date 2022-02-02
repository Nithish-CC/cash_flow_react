import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon">
            <i className="fas fa-rupee-sign"></i>
          </div>
          <div className="sidebar-brand-text mx-3">CASHFLOW</div>
        </a>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <a className="nav-link" href="/Dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

       <div>
         {' '}
       </div>
          <li>
            <div>
              {' '}
            </div>
            
            </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-chalkboard-teacher"></i>
            <span>Student</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom</h6>
           <Link to="/Student" className="collapse-item">
                Student
              </Link>   
              <Link to="/Stu_add" className="collapse-item">
                New Admission 
              </Link>
              <Link to="/Stupro" className="collapse-item">
                Promotion
              </Link>
              <Link to="/Stu_fees" className="collapse-item"> 
                Year of Fee
              </Link>
              <Link to="/Fee_master" className="collapse-item">
                Fee Master
              </Link>
              <Link to="/Discounttype" className="collapse-item"> 
                Discount Fee Type Master
              </Link>
              <Link to="/Academicyear" className="collapse-item">
                Year
              </Link>
              <Link to="/Grade_section" className="collapse-item">  
               Grade&section
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a  className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo">
              <i className="fas fa-chalkboard-teacher"></i>
            <span>Setting</span>
          </a>
          </li>
          <li className="nav-item">
          <a  className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo">
              <i className="fas fa-chalkboard-teacher"></i>
            <span>Options</span>
          </a>
          </li>
          

          <li className="nav-item">
          <a  className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo">
              <i className="fas fa-chalkboard-teacher"></i>
            <span>Pages</span>
          </a>
          </li>
          <li className="nav-item">
          <a  className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo">
              <i className="fas fa-chalkboard-teacher"></i>
            <span>Admission</span>
          </a>
          </li>
       
        <hr className="sidebar-divider d-none d-md-block" />
        <hr/>

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
      
    </div>
  );
};
export default Sidebar;
