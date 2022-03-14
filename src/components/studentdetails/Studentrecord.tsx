import { useState, ChangeEvent, useEffect, useRef } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import Feesdetails from "./Feesdetails";
import Academicfees from "./Academicfees";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Table,
  Modal,
  Card,
  ListGroup,
  CloseButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../index";
import { getAccessToken } from "../../config/getAccessToken";
import { useHistory, useParams } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { AnyAaaaRecord } from "dns";
const Studentrecord = () => {
  //To Make Edit
  let history = useHistory();
  const [search, setSearch] = useState<any>({
    text: "",
    studentid: "",
    PhoneNumber: "",
    GradeId: "",
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const [statusStudentDetailsEdit, setStatusStudentDetailsEdit] = useState<any>(
    {}
  );
  const inputFile: any = useRef();
  const formData = new FormData();
  const [FormDatas, setFormData] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [statusStudentSearch, setStatusStudentSearch] = useState<any>({});
  const [statusStudentDetails, setStatusStudentDetails] = useState<any>({});
  const [Autosearch, setAutoSearch] = useState<any>([]);
  const [suggest, setSuggest] = useState<any>([]);
  const [acdyear, setAcdYear] = useState<any>([]);
  const [Grdsec, setGrdsec] = useState<any>([]);
  const [academicYear, setAcademicYear] = useState<any>("");
  const [gradeSectionList, setGradeSectionList] = useState<any>([]);
  const [gradeBasedOnYearFinal, setGradeBasedOnYearFinal] = useState<any>([]);
  const [addGrade, setAddGrade] = useState("");
  const [filterParticularYear, setFilterParticularYear] = useState<any>([]);
  const [academicYearFinal, setAcademicYearFinal] = useState<any>([]);
  const [sectionBasedOnGrade, SetsectionBasedOnGrade] = useState<any>([]);
  const [addSection, setAddSection] = useState<any>("");
  const [section, setsection] = useState<any>("");
  const [acas, setacas] = useState<any>("");
  const [searchResultData, setMainSearch] = useState<any>([]);
  const [gradea, setGradea] = useState<any>("");
  const [GotAutoSearchOut, setGotAutoSearchOut] = useState<any>([]);
  const [allGotFinalData, setAllGotFinalData] = useState<any>([]);
  const [uploadFile, setUploadFile] = useState<any>([]);
  const [gradeMaster, setGradeMaster] = useState<any>([]);
  const [gradeMasterParticular, setGradeMasterParticular] = useState<any>([]);
  const [firstAcadmicYear, setFirstAcademicYear] = useState<any>([]);
  const [filterGradeByYear, setFilterGradeByYear] = useState<any>([]);
  const [filterSectionByYear, setFilterSectionByYear] = useState<any>([]);
  const [searchBy, setSearchBy] = useState("");

  const paginate = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
  ];

  const col: any = [
    {
      dataField: "student_name",
      text: "Name",
      formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
          <>
            <Link to={`/StudentprofileSearch/${row.student_admissions_id}`}>
              {row.student_name}
            </Link>
          </>
        );
      },
      sort: true,
    },
    { dataField: "admission_no", text: "Admission No", sort: true },
    { dataField: "phone_number", text: "PhoneNumber", sort: true },
    { dataField: "grade_master", text: "Grade", sort: true },
    { dataField: "section", text: "Section", sort: true },
    {
      dataField: "discount",
      text: "Status",
      formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
          <>
            {row.balance && row.balance > 0 ? (
              <Button
                onClick={(e) =>
                  history.push(`/stupay/${row.student_id}/${row.academic_year}`)
                }
              >
                {"Unpaid"}
              </Button>
            ) : (
              <Button disabled>{"Paid"}</Button>
            )}
          </>
        );
      },
      sort: true,
    },
  ];

  const onSuggesthandler = (value: any) => {
    setIsComponentVisible(false);
    console.log(value);
    setAutoSearch({
      text: value.student_name,
      studentid: value.admission_no,
      PhoneNumber: value.phone_number,
      GradeId: value.grade_master,
    });
    getAccessToken();
    axios
      .post(`${baseUrl}autoSearch`, {
        searchby: value.student_id,
        academic_year: value.academic_year,
      })
      .then((response: AxiosResponse) => {
        //  console.log(response.data.data);
        setMainSearch(response.data.data);
      });
  };
  // console.log(searchResultData[0][1]);
  useEffect(() => {
    let AllRoundData: any[] = [];
    if (searchResultData && searchResultData.length > 0) {
      //console.log(searchResultData);
      searchResultData.forEach((allData: any) => {
        //  console.log(allData[0]);
        //  console.log(allData[1]);
        let newData = allData[1];
        let ParticularStudentData: any = [];
        let ParticularStudentBalance: any = [];
        newData.forEach((element: any) => {
          //        console.log(element);
          if (element && element.balance) {
            ParticularStudentBalance.push({ Allbalance: element.balance });
          }
          if (
            element &&
            element.studentData &&
            Object.keys(element.studentData).length > 0
          ) {
            //          console.log(element.studentData);
            if (ParticularStudentData && ParticularStudentData.length == 0) {
              ParticularStudentData.push(element.studentData);
            }
          }
        });
        let newFinalArr = [
          { ...ParticularStudentBalance[0], ...ParticularStudentData[0] },
        ];
        AllRoundData.push(newFinalArr[0]);
      });
      //    console.log(AllRoundData);
      setAllGotFinalData(AllRoundData);
      // console.log(searchResultData[0]);
      // console.log(searchResultData[0][0]);
      // console.log(searchResultData[0][1]);
    } else {
      setAllGotFinalData([]);
    }
  }, [searchResultData]);
  const Searchauto = () => {
    if (Autosearch.length > 0) {
      getAccessToken();
      axios
        .post(`${baseUrl}autoSearch`, {
          search: Autosearch,
        })
        .then((response: AxiosResponse) => {
          setSuggest(response.data.data);
          //    console.log(response.data.data);
          setIsComponentVisible(true);
        });
    }
  };
  useEffect(() => {
    if (gradea && gradea === "none") setGradea("");
    if (section && section === "none") setsection("");
  }, [gradea, section]);
  const callStudentData = () => {
    setIsComponentVisible(false);
    if (academicYear && academicYear.length > 0) {
      if (searchBy && searchBy.length > 0) {
        if (
          searchBy &&
          searchBy.length > 0 &&
          academicYear &&
          academicYear.length > 0 &&
          gradea &&
          gradea.length > 0 &&
          section &&
          section.length > 0
        ) {
          getAccessToken();
          axios
            .post(`${baseUrl}autoSearch`, {
              searchby: searchBy,
              academic_year: academicYear,
              grade: gradea,
              section: section,
            })
            .then((response: AxiosResponse) => {
              setMainSearch(response.data.data);
            });
        } else if (
          searchBy &&
          searchBy.length > 0 &&
          academicYear &&
          academicYear.length > 0 &&
          gradea &&
          gradea.length > 0
        ) {
          getAccessToken();
          axios
            .post(`${baseUrl}autoSearch`, {
              searchby: searchBy,
              academic_year: academicYear,
              grade: gradea,
            })
            .then((response: AxiosResponse) => {
              setMainSearch(response.data.data);
            });
        } else if (
          searchBy &&
          searchBy.length > 0 &&
          academicYear &&
          academicYear.length > 0 &&
          section &&
          section.length > 0
        ) {
          getAccessToken();
          axios
            .post(`${baseUrl}autoSearch`, {
              searchby: searchBy,
              academic_year: academicYear,
              section: section,
            })
            .then((response: AxiosResponse) => {
              setMainSearch(response.data.data);
            });
        } else if (
          searchBy &&
          searchBy.length > 0 &&
          academicYear &&
          academicYear.length > 0
        ) {
          getAccessToken();
          axios
            .post(`${baseUrl}autoSearch`, {
              searchby: searchBy,
              academic_year: academicYear,
            })
            .then((response: AxiosResponse) => {
              setMainSearch(response.data.data);
            });
        }
      } else {
        if (
          academicYear &&
          academicYear.length > 0 &&
          gradea &&
          gradea.length > 0 &&
          section &&
          section.length > 0
        ) {
          getAccessToken();
          axios
            .post(`${baseUrl}autoSearch`, {
              academic_year: academicYear,
              grade: gradea,
              section: section,
            })
            .then((response: AxiosResponse) => {
              setMainSearch(response.data.data);
            });
        } else if (
          academicYear &&
          academicYear.length > 0 &&
          gradea &&
          gradea.length > 0
        ) {
          getAccessToken();
          axios
            .post(`${baseUrl}autoSearch`, {
              academic_year: academicYear,
              grade: gradea,
            })
            .then((response: AxiosResponse) => {
              setMainSearch(response.data.data);
            });
        } else if (
          academicYear &&
          academicYear.length > 0 &&
          section &&
          section.length > 0
        ) {
          getAccessToken();
          axios
            .post(`${baseUrl}autoSearch`, {
              academic_year: academicYear,
              section: section,
            })
            .then((response: AxiosResponse) => {
              setMainSearch(response.data.data);
            });
        } else if (academicYear && academicYear.length > 0) {
          getAccessToken();
          axios
            .post(`${baseUrl}autoSearch`, {
              academic_year: academicYear,
            })
            .then((response: AxiosResponse) => {
              setMainSearch(response.data.data);
            });
        }
      }
    }
  };
  const getAllAcademicYears = () => {
    getAccessToken();
    axios
      .get(`${baseUrl}year`)
      .then((res: any) => {
        setAcademicYearFinal(res.data.data);
        setFirstAcademicYear(res.data.data);
        //      console.log(res.data.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getAllAcademicYears();
    getAccessToken();
    axios
      .get(`${baseUrl}grademaster`)
      .then((res: any) => {
        setGradeMaster(res.data.data);
        setGradeMasterParticular(res.data.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    // console.log(gradeSectionList,filterParticularYear,gradeMaster)
    if (
      gradeSectionList &&
      gradeSectionList.length > 0 &&
      firstAcadmicYear &&
      firstAcadmicYear.length > 0 &&
      gradeMaster &&
      gradeMaster.length > 0
    ) {
      //console.log(gradeSectionList,firstAcadmicYear[0])
      setAcademicYear(firstAcadmicYear[0].academic_year);
      handleGradeFilter(gradeSectionList, firstAcadmicYear[0].year_id);
    }
  }, [gradeSectionList, firstAcadmicYear, gradeMaster]);
  console.log(academicYear);
  const handleGradeFilter = (gradeSectionList: any, searchInput: any) => {
    console.log(gradeSectionList, searchInput);
    //Filtering Grade by academic year id
    let resultData: any = [];
    gradeSectionList.forEach((element: any) => {
      if (searchInput == element.academic_year_id) {
        resultData.push(element);
      }
    });
    // console.log(resultData, "grade");
    //Using Filtered Data with grade master api
    let grade_id_bind: any[] = [];
    resultData.forEach((element: any) => {
      gradeMaster.forEach((grade: any) => {
        if (element.grade_id == grade.grade_master_id) {
          let obj: any = { ...element, ...grade };
          grade_id_bind.push(obj);
        }
      });
    });
    //Removing Duplicates ex:I-a,I-b
    const ids = grade_id_bind.map((o) => o.grade_master_id);
    const filtered = grade_id_bind.filter(
      ({ grade_master_id }, index) => !ids.includes(grade_master_id, index + 1)
    );
    const idsofSection = grade_id_bind.map((o) => o.section);
    const filteredForSection = grade_id_bind.filter(
      ({ section }, index) => !idsofSection.includes(section, index + 1)
    );
    console.log(grade_id_bind, "grademaster and section");
    //  console.log(filtered);
    //   console.log(filteredForSection);
    setFilterGradeByYear(filtered);
    setFilterSectionByYear(filteredForSection);
    // setWithDuplicatesGrade(grade_id_bind);
    // handleSectionSearch(grade_id_bind, filtered[0].grade_master_id);
  };
  //    console.log(academicYearFinal);
  //    console.log(gradeSectionList);
  function YearId(yeardata: any) {
    //  console.log(yeardata);
    var matchedyearid: any =
      gradeSectionList &&
      gradeSectionList.length &&
      gradeSectionList.filter(
        (data: any) => data.academic_year_id === yeardata.year_id
      );
    //  console.log(matchedyearid);
    // let combindobject = { ...gradedata, ...matchedyearid[0] };
    // GetFinalYearData.push(combindobject);
    // console.log(GetFinalYearData);
    // setDisplayFinalData(GetFinalYearData);
    //setFinalAcademicYr(GetFinalYearData);
    // console.log(matchedyearid);
  }
  useEffect(() => {
    academicYearFinal &&
      academicYearFinal.length &&
      academicYearFinal.map((data: any) => {
        YearId(data);
      });
  });
  const mainsearch = () => {
    getAccessToken();
    axios
      .get(
        `${baseUrl}student_admissions_search/search_student?academic_year=${acas}&grade_id=${gradea}&section=${section}`
      )
      .then((response: AxiosResponse) => {
        setMainSearch(response.data);
        // console.log(response.data);
      });
  };
  useEffect(() => {
    getAccessToken();
    axios
      .get(`${baseUrl}gradeSection`)
      .then((res: any) => {
        setGradeSectionList(res.data.data);
        //console.log(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    Autosearch && Autosearch.length > 0 ? Searchauto() : setSuggest("");
  }, [Autosearch]);
  const onClear = () => {
    setStatusStudentSearch("");
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStatusStudentDetails({ ...statusStudentDetails, [name]: value });
  };
  const handleSearch = (gradeSectionList: any, searchInput: any) => {
    setAddGrade("");
    setAcademicYear(searchInput);
    let mySet1 = new Set();
    let resultData = gradeSectionList.filter((obj: any) =>
      Object.values(obj)
        .flat()
        .some((v) =>
          `${v}`.toLowerCase().includes(`${searchInput}`.toLowerCase())
        )
    );
    const SuddenhandleClose = () => {
      setShow(false);
      // setdatatoDelete({});
    };
    let selectedYearArr: any = [];
    resultData.forEach((element: any) => {
      selectedYearArr.push(element);
      mySet1.add(element.grade);
    });
    setGradeBasedOnYearFinal([...mySet1]);
    setFilterParticularYear(selectedYearArr);
    //  setAddGrade(resultData[0].grade);
  };
  const onButtonClick = (e: any) => {
    inputFile.current.click();
    console.log(inputFile);
    formData.append("myFile", uploadFile.selectedFile);
    setFormData(formData);
  };
  console.log(FormDatas);

  //    console.log(gradeSectionList);
  const handlesection = (sectionList: any, searchInput: any) => {
    setAddGrade("");
    setAcademicYear(searchInput);
    let mySet1 = new Set();
    let resultData = gradeSectionList.filter((obj: any) =>
      Object.values(obj)
        .flat()
        .some((v) =>
          `${v}`.toLowerCase().includes(`${searchInput}`.toLowerCase())
        )
    );
    let selectedYearArr: any = [];
    resultData.forEach((element: any) => {
      selectedYearArr.push(element);
      mySet1.add(element.section);
    });
    SetsectionBasedOnGrade([...mySet1]);
    //      setAddSection(resultData[0].section);
  };

  console.log(allGotFinalData);

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar data={"studentrecord"}></Sidebar>
        <div id="content-wrapper" className="d-flex flex-column">
          <div className="student-profile py-2">
            <div id="content">
              <Navbar></Navbar>
              <div className="container" style={{ marginLeft: "3%" }}>
                <div className="d-sm-flex align-items-center justify-content-between mb-3">
                  <Container>
                    <Row>
                      <Col md={5}>
                        <Form.Control
                          type="search"
                          className="form-control bg-light border-20 small"
                          placeholder="Search for Name,ID,PhoneNo..."
                          value={
                            Autosearch && Autosearch.text
                              ? `${Autosearch.text}**${Autosearch.GradeId}**${Autosearch.PhoneNumber}**${Autosearch.studentid}`
                              : Autosearch
                          }
                          onChange={(e: any) => {
                            setAutoSearch(e.target.value.trim());
                            setSearchBy(e.target.value.trim());
                          }}
                        />
                        <Card
                          style={{
                            cursor: "pointer",
                            background: "Black",
                            color: "white",
                          }}
                        >
                          <ListGroup
                            variant="flush"
                            style={{ marginLeft: "10px" }}
                          >
                            {suggest.length > 0 && isComponentVisible && (
                              <div>
                                {suggest.map((item: any, i: any) => (
                                  <div
                                    key={i}
                                    onClick={() => onSuggesthandler(item)}
                                  >
                                    {item.student_name}***
                                    {item.grade_id}***
                                    {item.phone_number}***
                                    {item.admission_no}
                                  </div>
                                ))}
                              </div>
                            )}
                          </ListGroup>
                        </Card>
                      </Col>
                      {Autosearch && Autosearch.text ? (
                        <></>
                      ) : (
                        <>
                          <Col md={2}>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => {
                                setAcademicYear(
                                  e.target.options[e.target.selectedIndex].text
                                );
                                console.log(e.target.value);
                                handleGradeFilter(
                                  gradeSectionList,
                                  e.target.value
                                );
                              }}
                            >
                              {academicYearFinal &&
                                academicYearFinal.length &&
                                academicYearFinal.map((academic: any) => {
                                  return (
                                    <option value={academic.year_id}>
                                      {academic.academic_year}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                          </Col>
                          <Col md={2}>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => {
                                setGradea(e.target.value);
                                //handlesection(filterParticularYear, e.target.value);
                              }}
                            >
                              <option value="none">Grade</option>
                              {filterGradeByYear &&
                                filterGradeByYear.length &&
                                filterGradeByYear.map((value: any) => {
                                  // console.log(academicYear)
                                  return (
                                    <option value={value.grade_master}>
                                      {value.grade_master}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                          </Col>
                          <Col md={2}>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => setsection(e.target.value)}
                            >
                              <option value="none">Section</option>
                              {filterSectionByYear &&
                                filterSectionByYear.length &&
                                filterSectionByYear.map(
                                  (value: any, i: any) => {
                                    return (
                                      <option value={value.section}>
                                        {value.section}
                                      </option>
                                    );
                                  }
                                )}
                            </Form.Select>
                          </Col>
                          <Col md={1}>
                            <div className="input-group-append">
                              <Button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => {
                                  setAllGotFinalData([]);
                                  callStudentData();
                                }}
                              >
                                <i className="fas fa-search fa-sm"></i>
                              </Button>
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                    <Row>
                      <Col md={10}></Col>
                      <Col md={2}>
                        <Button
                          className="btn btn-danger mt-3"
                          onClick={() => {
                            setShow(true);
                          }}
                        >
                          Import
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="col-xl-11 text-center">
                  {statusStudentSearch ? (
                    <div>
                      {allGotFinalData && allGotFinalData.length > 0 ? (
                        <BootstrapTable
                          keyField="academic_year"
                          data={allGotFinalData}
                          columns={col}
                          hover
                          pagination={paginationFactory({
                            sizePerPageList: paginate,
                          })}
                        />
                      ) : (
                        <Table bordered hover>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Admission No</th>
                              <th>PhoneNumber</th>
                              <th>Grade</th>
                              <th>Section</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={6} className="text-center">
                                No Data Found
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      )}
                    </div>
                  ) : null}
                  <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header className="text-center" closeButton>
                      <Modal.Title style={{ marginLeft: "25%" }}>
                        <strong>Add Attachment</strong>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                      <Row>
                        <Col md={6}> Sample xlsx{"  "}</Col>
                        <Col md={6}>
                          <a
                            href={require("../../assets/Admission_Download_xlsx.xlsx")}
                            download="Admission_Download_xlsx"
                            className="btn btn-primary"
                            style={{ width: "100px" }}
                          >
                            Download
                          </a>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col md={6}> Upload xlsx{"  "}</Col>
                        <Col md={6}>
                          <input
                            style={{ display: "none" }}
                            onChange={(e: any) => {
                              setUploadFile(e.target.files[0]);
                            }}
                            accept=".xlsx"
                            ref={inputFile}
                            type="file"
                          />
                          <Button
                            style={{ width: "100px" }}
                            className="btn btn-success"
                            onClick={onButtonClick}
                          >
                            Browse
                          </Button>
                        </Col>
                      </Row>
                      {uploadFile && uploadFile.name ? (
                        <Row>
                          <hr className="mt-2" />
                          <Col md={10}>
                            <p style={{ fontSize: "14px" }}>
                              {uploadFile.name}
                            </p>
                          </Col>
                          <Col md={2}>
                            <CloseButton
                              onClick={() => {
                                setUploadFile(false);
                              }}
                            />
                          </Col>
                        </Row>
                      ) : (
                        <></>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        Upload
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Studentrecord;
