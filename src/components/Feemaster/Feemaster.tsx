import { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Spinner, Modal, Col, Row } from "react-bootstrap";
import { getAccessToken } from "../../config/getAccessToken";
import axios from "axios";
import { baseUrl } from "../../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

const Feemaster = () => {
  const [statusFeeMasterAdd, setStatusFeeMasterAdd] = useState<any>(false);

  const [feeTypeName, setFeeTypeName] = useState<any>("");
  const [orderId, setOrderId] = useState<any>("");
  const [duplication, setDuplication] = useState(false);
  const [getFeeMaster, setGetFeeMaster] = useState<any>([]);

  const [loading, setloading] = useState<any>(true);
  const [filter, setfilter] = useState<any>([]);
  const [datatoDelete, setdatatoDelete] = useState<any>({});
  const [show, setShow] = useState(false);

  const [checkboxOptional, setCheckboxOptional] = useState(false);
  const [checkboxTrans, setCheckboxTrans] = useState(false);
  const [checkboxHostel, setCheckboxHostel] = useState(false);

const handlecheckbox = () =>{
  setCheckboxHostel(false);
  setCheckboxOptional(false);
  setCheckboxTrans(false);
}

  const handleClose = () => {
    setShow(false);
    deleteParticularDiscount(datatoDelete.id, datatoDelete.index);
  };
  const SuddenhandleClose = () => {
    setShow(false);
    setdatatoDelete({});
  };
    const handleShow = () => {
      setShow(true);
    };
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
      dataField: "fee_type_name",
      text: "Fee Type",
      sort: true,
    },
    { dataField: "order_id", text: "Order", sort: true },
    {
      dataField: "optional_fee",
      text: "Make fees as Optional",
      sort: true,
    },
    {
      dataField: "hostal_fee",
      text: "Hostel",
      sort: true,
    },
    {
      dataField: "transport_fee",
      text: "Transportation",
      sort: true,
    },
    
    {
      dataField: "Actions",
      text: "Actions",
      formatter: (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
          <Button
            variant="danger"
            onClick={() => {
              setdatatoDelete({
                name: row.fee_type_name,
                index: row.index,
                id: row.fee_master_id,
              });
              handleShow();
            }}
          >
            Delete
          </Button>
        );
      },
      sort: true,
    },
  ];

  const deleteParticularDiscount = (id: any, index: any) => {
    getAccessToken();
    axios
      .delete(`${baseUrl}feeMaster?`, { data: { fee_master_id: id } })
      .then((res: any) => {
        console.log(res);
        if (res.data.data.isDeletable === true) {
          let newArrVal = getFeeMaster;
          newArrVal.splice(index, 1);
          toast.success("Fee Type Name Deleted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          feemastertype(newArrVal);
          getfee();
        } else if (res.data.data.isDeletable === false) {
          toast.warning(`Data Exist in Year of Fee Master`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setdatatoDelete({});
      })
      .catch((e: any) => {
        console.log(e);
        toast.error("Error Fee Type Name Deletion", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const datatoFilterNull: any =
    getFeeMaster &&
    getFeeMaster.length &&
    getFeeMaster.sort().map((data: any) => {
      let keys = Object.keys(data);
      keys.map((key: any) => {
        data[key] = data[key] == null ? "" : data[key];
      });
      return data;
    });

  const dataSearchBar: any =
    datatoFilterNull &&
    datatoFilterNull.length &&
    datatoFilterNull.sort().filter((data: any) => {
      return Object.keys(data).some((key) =>
        data[key]
          .toString()
          .toLowerCase()
          .includes(filter.toString().toLowerCase())
      );
    });

  const getfee = () => {
    getAccessToken();
    axios
      .get(`${baseUrl}feeMaster`)
      .then((res: any) => {
        var sortedObjs = _.sortBy(res.data.data, "order_id");
        sortedObjs.map((data: any, index: any) => {
          data.index = index + 1;
        });

        setGetFeeMaster(sortedObjs);
        setloading(false);
        console.log(sortedObjs);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getfee();
  }, []);

  const feemastertype = (newArrVal: any) => {
    setGetFeeMaster([...newArrVal]);
  };

  // console.log(getFeeMaster);

  const handleSubmit = async (e: any) => {
    setDuplication(true);
    e.preventDefault();
    if (feeTypeName.length <= 0 || orderId.length <= 0) {
      if (feeTypeName.length <= 0) {
        toast.warning("Please Enter Fee Type Name", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       
      } else if (orderId.length <= 0) {
        toast.warning("Please Enter Order", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setDuplication(false);
    } else {
      try {
        getAccessToken();
        await axios
          .post(`${baseUrl}feeMaster`, {
            fee_type_name: feeTypeName,
            order_id: orderId,
            optional_fee:checkboxOptional.toString(),
            hostal_fee:checkboxHostel.toString(),
            transport_fee:checkboxTrans.toString()
          })
          .then((res: any) => {
            console.log(res.data);
            if (res.data.data.IsExsist === false) {
              toast.success("Fee Type Name Added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

            } else if (res.data.data.IsExsist === true) {
              toast.warning(`Data Already Added`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }

            getfee();
            setStatusFeeMasterAdd(false);
            setDuplication(false);
            setFeeTypeName("");
            setOrderId("");
          });
      } catch (err) {
        setDuplication(false);
        setFeeTypeName("");
        alert("try again");
      }
    }
  };

  return (
    <div>
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
      <div id="page-top">
        <div id="wrapper">
          <Sidebar data={"Fee_master"}></Sidebar>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar></Navbar>
              <div className="container-fluid">
                <div className="col-xl-11 m-auto">
                  <div>
                    <div
                      className="col-lg-10"
                      style={{ marginLeft: "10%", width: "90%" }}
                    >
                      <div className="card mb-3">
                        <div style={{ color: "rgb(230, 39, 39)" }}>
                          <div className="card-header mb-4 bg-transparent border-1 text-center">
                            <h4 className="mb-0 ">
                              <i className="far fa-clone pr-1"></i> Fee Master
                            </h4>
                            <div style={{ textAlign: "right" }}>
                              {!statusFeeMasterAdd ? (
                                <Button
                                  type="submit"
                                  className="btn btn-primary btn-sm btn-save"
                                  onClick={() => setStatusFeeMasterAdd(true)}
                                >
                                  Add
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {!statusFeeMasterAdd ? (
                          <div className="card-body">
                            <div className="table-responsive">
                              <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                                <div
                                  id="dataTable_filter"
                                  className="dataTables_filter"
                                >
                                  <Form.Label
                                    htmlFor="inputPassword5"
                                    style={{ marginLeft: "75%" }}
                                  >
                                    Search:
                                    <Form.Control
                                      type="search"
                                      className="form-control form-control-sm"
                                      onChange={(e) =>
                                        setfilter(e.target.value)
                                      }
                                    />
                                  </Form.Label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12">
                                <BootstrapTable
                                  keyField="academic_year"
                                  data={dataSearchBar}
                                  columns={col}
                                  hover
                                  striped
                                  pagination={paginationFactory({
                                    sizePerPageList: paginate,
                                  })}
                                />
                              </div>
                            </div>

                            <Modal show={show} onHide={SuddenhandleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  Delete {datatoDelete.name}
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                Are You Sure You What To Delete{" "}
                                {datatoDelete.name} ?
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={SuddenhandleClose}
                                >
                                  Close
                                </Button>
                                <Button variant="danger" onClick={handleClose}>
                                  Delete
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                        ) : (
                          <div>
                            <div style={{ marginBottom: "20px" }}>
                              <Row>
                                <Col sm="4" className="mb-4">
                                  <Form.Label style={{ marginLeft: "40px" }}>
                                    Fee Type Name{" "}
                                  </Form.Label>
                                </Col>
                                <Col sm="6">
                                  <Form.Control
                                    type="text"
                                    onChange={(e: any) => {
                                      setFeeTypeName(e.target.value);
                                    }}
                                  />
                                </Col>{" "}
                                <Col sm="4">
                                  <Form.Label style={{ marginLeft: "40px" }}>
                                    Order
                                  </Form.Label>
                                </Col>
                                <Col sm="6">
                                  <Form.Control
                                    type="number"
                                    onChange={(e: any) => {
                                      setOrderId(e.target.value);
                                    }}
                                  />
                                </Col>{" "}
                                <Col sm="4" style={{ marginTop: "20px" }}>
                                  <Form.Label style={{ marginLeft: "40px" }}>
                                    Make fees as Optional
                                  </Form.Label>
                                </Col> 
                                <Col sm="6" style={{ marginLeft: "20px",marginTop: "20px" }}>
                                <Form.Check
                                        onChange={(e:any) => {
                                          console.log(e.target.checked);                                          // values.checked=e.target.checked
                                       
                                          setCheckboxOptional(e.target.checked)
                                        }}
                                      type="switch" id="custom-switch" label="Optional"/> 
                                               
                                                      
                                </Col>
                                <Col sm="4" className="mb-4" style={{ marginTop: "20px" }}>
                                  <Form.Label style={{ marginLeft: "40px" }}>
                                    Hostel{" "}
                                  </Form.Label>
                                </Col>
                                <Col sm="6" style={{ marginLeft: "20px",marginTop: "20px" }}>
                                <Form.Check  
                                        onChange={(e:any) => {
                                          console.log(e.target.checked);
                                          // values.checked=e.target.checked
                                       
                                          setCheckboxHostel(e.target.checked)
                                        }}
                                      type="switch" id="custom-switch" label="Hostel"/> 
                                </Col>{" "}
                                <Col sm="4" className="mb-4" >
                                  <Form.Label style={{ marginLeft: "40px" }}>
                                  Transportation{" "}
                                  </Form.Label>
                                </Col>
                                <Col sm="6" style={{ marginLeft: "20px" }}>
                                <Form.Check  
                                        onChange={(e:any) => {
                                          console.log(e.target.checked);                                          // values.checked=e.target.checked
                                       
                                          setCheckboxTrans(e.target.checked)
                                        }}
                                      type="switch" id="custom-switch" label="Transportation"/> 
                                </Col>{" "}
                              
                              </Row>
                            </div>

                            <div className="card-footer py3">
                              <Row>
                                <Col>
                                  <Button
                                    style={{ marginLeft: "75%" }}
                                    className="btn btn-secondary"
                                    onClick={() => 
                                     { setStatusFeeMasterAdd(false);
                                      handlecheckbox();
                                    }
                                    }
                                  >
                                    Cancel
                                  </Button>{" "}
                                  <Button
                                    type="submit"
                                    onClick={(e: any) => {
                                      handleSubmit(e);
                                      handlecheckbox();
                                    }}
                                    className={
                                      duplication
                                        ? "disabled btn btn-danger btn-save"
                                        : "btn btn-danger btn-save"
                                    }
                                  >
                                    Save
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
export default Feemaster;
