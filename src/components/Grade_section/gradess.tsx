import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { gettinggradesection } from "../../redux/actions/Gradeactions";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap/lib/InputGroup";
import { getAllAcademicYear } from "../../Api/year_api";



const Gradess = () => {
    const dispatch=useDispatch<any>()
    const [allAcademicYear, setAllAcademicYear] = useState<any[]>([]);
    const [academic_year_data, setAcademic_year_data] = useState("");
    const grade=useSelector((state: any)=>state.allgradesections.grades)

    console.log(grade)
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

    ]
    useEffect(()=>{
        dispatch(gettinggradesection())
        getAllAcademicYear()
        .then((res: any) => {
          setAllAcademicYear(res.data.data);
          setAcademic_year_data(res.data.data[0].year_id);
        })
        .catch((e: any) => {
          console.log(e);
        });
    },[])
    console.log(allAcademicYear,"getAllAcademicYear")
    console.log(academic_year_data,"getAll")
 
  return (
    <div id="page-top">
    <div id="wrapper">
      <Sidebar data={"Grade_section"}></Sidebar>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar></Navbar>
          <div className="container-fluid m-auto" >
           
           
          <BootstrapTable
                                keyField="index"
                                data={grade }
                                
                                columns={col}
                                hover
                                striped
                                pagination={paginationFactory({
                                  sizePerPageList: paginate,
                                })}
                              />
                              </div>
          </div>
          </div>
          </div>
          </div>

            )
}

export default Gradess