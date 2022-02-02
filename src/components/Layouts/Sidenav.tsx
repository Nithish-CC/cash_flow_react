import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Sidenav(){
    
    return(
        <>
       <div id="page-top">
      <div id="wrapper">  
      <Sidebar></Sidebar>
        <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">
                <Navbar></Navbar>
                <div className="container-fluid">
                    </div>
                </div>
                </div>
                </div>
                </div>
        </>
        
      
        
    )
}
export default Sidenav