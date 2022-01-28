import React,{useState} from "react";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import "../../App.css";
import { Form, Button,InputGroup } from "react-bootstrap";
import Feedback from 'react-bootstrap/Feedback';

const Studentadd = () => {
   const [validated, setValidated] = useState(false);

    const [admissionNo, setAdmissionno] = useState<any>('');
    const [studentName,setStudentname] = useState<any>('');
    const [fromGrade,setFromgrade] = useState<any>('');
    const [dateofBirth,setDateofbirth] = useState<any>('');
    const [gender,setGender] = useState<any>('');
    const [email,setEmail] = useState<any>('');
    const [academicYear,setAcademicyear]=useState<any>('');
    const [toGrade,setToGrade]=useState<any>('');
    const [admissionDate,setAdmissiondate]=useState<any>('');
    const [toSection,setToSection]=useState<any>('');
    const [previousSchoolInfo,setPreviousSchoolInfo]=useState<any>('');
    const [fatherName,setFatherName]=useState<any>('');
    const [fatherOccupation,setFatherOccupation] = useState<any>('');
    const [address,setAddress] = useState<any>('');
    const [phoneNo,setPhoneno] = useState<any>('');

    const handleSubmit = (e:any) => {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      const register = {AdmissionNo:admissionNo,StudentName:studentName,FromGrade:fromGrade,DateofBirth:dateofBirth,Gender:gender,Email:email
        ,AcademicYear:academicYear,ToGrade:toGrade,AdmissionDate:admissionDate,ToSection:toSection,PreviousSchoolInfo:previousSchoolInfo,
        FatherName:fatherName,FatherOccupation:fatherOccupation,Address:address,PhoneNo:phoneNo}
    
        console.log(register)
    };
  

    
// const Register = ()=>{
    
// }
   


  return (
    <div>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar></Sidebar>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar></Navbar>
              <div className="container-fluid">
                <div className="col-xl-11 m-auto">
                  <div className="card-header">
                    <h4
                      className="card-title font-weight text-center"
                      style={{ color: "red" }}
                    >
                      New Admission
                    </h4>
                  </div>

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card-body">
                          <Form.Group
                            className="form-group row" controlId="validationCustom01"
                            
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Admission No
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Control 
                              required
                                type="text"
                                placeholder="Admission No"
                                onChange={(e) => setAdmissionno(e.target.value)}
                                 />
                                 <Form.Control.Feedback type="invalid">Please Enter Admission No</Form.Control.Feedback>
                            </InputGroup>
                            </div>
                            
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="validationCustom01"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Student Name
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Control
                                required
                                type="name"
                                placeholder="Student Name"
                                onChange={(e) => setStudentname(e.target.value)}
                              />
                              <Form.Control.Feedback type="invalid">Please Enter Student Name</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="validationgrade"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right"> 
                              From Grade<span className="text-danger"> </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Select onChange={(e) => setFromgrade(e.target.value)} required>
                                <option selected disabled value="">--Select Grade--</option>
                                <option>I</option>
                                <option>II</option>
                                <option>III</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">Please Enter Grede</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="validationDate"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              DOB
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Control type="date" onChange={(e) => setDateofbirth(e.target.value)} required/>
                              <Form.Control.Feedback type="invalid">Please Enter DateofBirth</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Gender
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <div key={`inline-radio`}  className="mb-3">
                                  <Form.Check
                                    inline
                                    required
                                    label="Male"
                                    name="group1"
                                    value="Male"
                                    onChange={(e) => setGender(e.target.value)}
                                    type="radio"
                                    id={`inline-radio-1`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Female"
                                    name="group1"
                                    type="radio"
                                    value="Female"
                                    onChange={(e) => setGender(e.target.value)}
                                    id={`inline-radio-2`}
                                  />
                                </div>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Email
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                              <Form.Control.Feedback type="invalid">Please Enter Email</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="Admission Date"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Admission Date
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Control type="date" onChange={(e) => setAdmissiondate(e.target.value)} required/>
                              <Form.Control.Feedback type="invalid">Please Enter Admission Date</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Academic Year
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Select onChange={(e) => setAcademicyear(e.target.value)} required>
                                <option selected disabled value="">--Select Year--</option>
                                <option>2021-2022</option>
                                <option>2023-2024</option>
                                <option>2025-2026</option>
                                <option>2027-2028</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">Please Enter Academic Year</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card-body">
                          <Form.Group
                            className="form-group row"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              To Grade
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Select onChange={(e) => setToGrade(e.target.value)} required>
                                <option selected disabled value="">--Select Year--</option>
                                <option>I</option>
                                <option>II</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">Please Enter Grade</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              To Section
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Select onChange={(e) => setToSection(e.target.value)} required>
                                <option selected disabled value="">--Select Year--</option>
                                <option>A</option>
                                <option>B</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">Please Enter Section</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="floatingTextarea"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Previous School Info
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Control as="textarea" onChange={(e) => setPreviousSchoolInfo(e.target.value)} required/>
                              <Form.Control.Feedback type="invalid">Please Enter Previous School Info</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Father Name
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Control
                                type="text"
                                placeholder="Father Name"
                                onChange={(e) => setFatherName(e.target.value)}
                                required
                              />
                              <Form.Control.Feedback type="invalid">Please Enter Fathername</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Father Occupation
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Control
                                type="text"
                                placeholder="Father Occupation"
                                onChange={(e) => setFatherOccupation(e.target.value)}
                                required
                              />
                              <Form.Control.Feedback type="invalid">Please Enter FatherOccupation</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="floatingTextarea"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Address
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                            <InputGroup hasValidation>
                              <Form.Control as="textarea"  onChange={(e) => setAddress(e.target.value)} required/>
                              <Form.Control.Feedback type="invalid">Please Enter Address</Form.Control.Feedback>
                              </InputGroup>
                            </div>
                          </Form.Group>

                          <Form.Group
                            className="form-group row"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="col-md-5 col-form-label text-md-right">
                              Phone No
                              <span className="text-danger"> * </span>
                            </Form.Label>
                            <div className="col-md-6">
                              <Form.Control
                              required
                                type="text"
                                placeholder="Phone No"
                                onChange={(e) => setPhoneno(e.target.value)}
                              />
                              <span style={{ color: "red" }}>
                                Note:Phone No should be 10 digit.
                              </span>
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="card-footerss">
                        <Button
                          className="btn btn-danger float-right"
                          type="submit">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Studentadd;
