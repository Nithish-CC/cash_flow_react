import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/sb-admin-2.css";
//import react pro sidebar components
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SubMenu } from "react-pro-sidebar";
//import icons from react icons
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { BiBus,BiHotel,BiTachometer } from "react-icons/bi";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./header.css";
const Sidebar = (props: any, { toggled, handleToggleSidebar }: any) => {
    let activeValue = props.data;
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false);
    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    return (
        <>
            <div className="navbar-nav bg-gradient-primary header sidebar-dark accordion" id="accordionSidebar">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
                    <SidebarHeader>
                        <div className="logotext">
                            {/* small and big change using menucollapse state */}
                            <div>
                                {menuCollapse ? (
                                    <>
                                        <div className="sidebar-brand d-flex align-items-center justify-content-center pt-2">
                                            <div className="sidebar-brand-icon">
                                                <h2>₹</h2>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="sidebar-brand d-flex align-items-center justify-content-center pt-2">
                                            <div className="sidebar-brand-icon">
                                                <h2>₹</h2>
                                            </div>
                                            <div className="sidebar-brand-text mx-3" style={{ fontWeight: "900" }}>
                                                CASHFLOW
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                    
                        <Menu iconShape="square">
                            {console.log(window.location.pathname)}
                            <MenuItem icon={<BiTachometer />}>
                            <Link to="/Dashboard" rel="dashboard">
                                Dashboard
                                </Link>
                            </MenuItem>                                                        
                        </Menu>
                    
                        <Menu iconShape="circle">
                            <SubMenu  title="Student" icon={<FaChalkboardTeacher />}>
                              <MenuItem active={window.location.pathname === "/studentrecord"}><Link to="/studentrecord" style={{color:"#3a3b45"}}>Student</Link></MenuItem>
                              <MenuItem active={window.location.pathname === "/Stu_add"}><Link to="/Stu_add" style={{color:"#3a3b45"}}>New Admission</Link></MenuItem>
                              <MenuItem active={window.location.pathname === "/Stupro"}><Link to="/Stupro" style={{color:"#3a3b45"}}> Promotion</Link></MenuItem>
                              <MenuItem active={window.location.pathname === "/Stu_fees"}><Link to="/Stu_fees" style={{color:"#3a3b45"}}>  Year of Fee</Link></MenuItem>
                              <MenuItem active={window.location.pathname === "/Fee_master"}><Link to="/Fee_master" style={{color:"#3a3b45"}}> Fee Master</Link></MenuItem>
                              <MenuItem active={window.location.pathname === "/Discounttype"}><Link to="/Discounttype" style={{color:"#3a3b45"}}> Discount Fee Type Master</Link></MenuItem>
                              <MenuItem active={window.location.pathname === "/Academicyear"}><Link to="/Academicyear" style={{color:"#3a3b45"}}>Year</Link></MenuItem>
                              <MenuItem active={window.location.pathname === "/Grade_section"}><Link to="/Grade_section" style={{color:"#3a3b45"}}> Grade and Section</Link></MenuItem>
                            </SubMenu>
                            <SubMenu title="TransPort" icon={<BiBus />}>
                                <MenuItem active={window.location.pathname === "/placesprice"}><Link to="/placesprice"  style={{color:"#3a3b45"}}>Transport</Link></MenuItem>
                                <MenuItem active={window.location.pathname === "/placesstoppings"}><Link to="/placesstoppings" style={{color:"#3a3b45"}}>Transport Stoppings</Link></MenuItem>                                
                                <MenuItem active={window.location.pathname === "/transportFees"}><Link to="/transportFees" style={{color:"#3a3b45"}}>Transport Fees</Link></MenuItem>                                
                            </SubMenu>                            

                            <SubMenu title="Uniform" icon={<FaChalkboardTeacher />}>
                                <MenuItem active={window.location.pathname === "/Uniform_size"}><Link to="/Uniform_size" style={{color:"#3a3b45"}}>Uniform-Size</Link></MenuItem>
                                <MenuItem active={window.location.pathname === "/Uniform_things"}><Link to="/Uniform_things" style={{color:"#3a3b45"}}>Uniform-Things</Link></MenuItem>
                                <MenuItem active={window.location.pathname === "/Uniform"}><Link to="/Uniform" style={{color:"#3a3b45"}}> Uniform</Link></MenuItem>
                            </SubMenu>
                            <SubMenu title="Hostal" icon={<BiHotel />}>
                                <MenuItem active={window.location.pathname === "/hostal_fees"}><Link to="/hostal_fees" style={{color:"#3a3b45"}}> Hostal Fees </Link></MenuItem>
                                <MenuItem active={window.location.pathname === "/room_no"}><Link to="/room_no" style={{color:"#3a3b45"}}>Room No & Capacity </Link></MenuItem>
                                <MenuItem active={window.location.pathname === "/hostal_name"}><Link to="/hostal_name" style={{color:"#3a3b45"}}>Hostal Name</Link></MenuItem>
                                {/* <SubMenu title={`'submenu' 3`}>
                                    <MenuItem style={{color:"#3a3b45"}}>'submenu' 3.1 </MenuItem>
                                    <MenuItem style={{color:"#3a3b45"}}>'submenu' 3.2 </MenuItem>
                                    <SubMenu title={`'submenu' 3.3`}>
                                        <MenuItem style={{color:"#3a3b45"}}>'submenu' 3.3.1 </MenuItem>
                                        <MenuItem style={{color:"#3a3b45"}}>'submenu' 3.3.2 </MenuItem>
                                        <MenuItem style={{color:"#3a3b45"}}>'submenu' 3.3.3 </MenuItem>
                                    </SubMenu>
                                </SubMenu> */}
                            </SubMenu>
                        </Menu>
                    </SidebarContent>                   
                </ProSidebar>
            </div>
        </>
    );
};
export default Sidebar;