import { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import { baseUrl } from "../../index";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Spinner, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

const Discountfee = () => {
  const [statusDiscountfeeAdd, setStatusDiscountfeeAdd] = useState(false);

  const [discountFeeTypeName, setDiscountFeeTypeName] = useState("");
  const [getDiscountFeeTypeName, setGetDiscountFeeTypeName] = useState<any[]>(
    []
  );
  const [editingDiscountFeeYear, setEditingDiscountFeeYear] = useState<any>({
    name: "",
    id: "",
    dis_id: "",
  });
  const [updateDiscountFeeYear, setUpdateDiscountFeeYear] = useState<any>({});
  const [updateDiscountData, setUpdateDiscountData] = useState("");
  const [datatoDelete, setdatatoDelete] = useState<any>({});
  const [duplication, setDuplication] = useState(false);
  const [filter, setfilter] = useState<any>([]);
  const [spinnerLoad, setSpinnerLoad] = useState<any>(true);

  // console.log(editingDiscountFeeYear);

  //Modal Popup
  const [show, setShow] = useState(false);
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
      dataField: "dis_feetype_name",
      text: "Discount Fee Type Name",
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
                name: row.dis_feetype_name,
                index: row.index - 1,
                id: row.dis_feetype_id,
              });
              handleShow();
              setEditingDiscountFeeYear({});
              setUpdateDiscountData("");
            }}
          >
            Delete
          </Button>
        );
      },
      sort: true,
    },
  ];

  useEffect(() => {
    // console.log(updateDiscountData);

    setUpdateDiscountFeeYear({
      name: updateDiscountData.trim(),
      id: editingDiscountFeeYear.id,
      dis_id: editingDiscountFeeYear.dis_id,
    });
  }, [updateDiscountData]);

  const deleteParticularDiscount = (id: any, index: any) => {
    setSpinnerLoad(true);
    let newArrVal = getDiscountFeeTypeName;
    newArrVal.splice(index, 1);
    getAccessToken();
    axios
      .delete(`${baseUrl}discountfee?`, { data: { dis_feetype_id: id } })
      .then((res: any) => {
        if (res.data.data.isDeletable == true) {
          toast.success("Deleted Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          getgetDiscountFeeTypeName();
        } else if (res.data.data.isDeletable === false) {
          toast.warning("Fee Discount Type already Existing", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setSpinnerLoad(false);
          setdatatoDelete({});
        }

        DiscountFeeTypeName(newArrVal);
        setdatatoDelete({});
      })

      .catch((e: any) => {
        console.log(e);
      });
  };

  const updateDiscountFeeTypeName = () => {
    getAccessToken();
    if (updateDiscountFeeYear.name.length <= 0) {
      toast.warning("Please Enter A Value", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUpdateDiscountData("");
    } else {
      delete editingDiscountFeeYear.id;
      axios
        .put(`${baseUrl}discount_type_masters/update`, {
          dis_feetype_id: updateDiscountFeeYear.dis_id,
          dis_feetype_name: updateDiscountFeeYear.name,
        })
        .then((res: any) => {
          console.log(res.data);
          toast.success("Discount Fee Type Master Updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setGetDiscountFeeTypeName([]);
          getgetDiscountFeeTypeName();
          setEditingDiscountFeeYear({});
          setUpdateDiscountData("");
        })
        .catch((e: any) => {
          console.log(e);
          toast.error("Updation Failed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setEditingDiscountFeeYear({});
          setUpdateDiscountData("");
        });
    }
  };

  useEffect(() => {
    if (editingDiscountFeeYear && editingDiscountFeeYear.name) {
      setUpdateDiscountData(editingDiscountFeeYear.name);
    } else {
      setUpdateDiscountData("");
    }
  }, [editingDiscountFeeYear]);

  const getgetDiscountFeeTypeName = () => {
    getAccessToken();
    axios
      .get(`${baseUrl}discountfee`)
      .then((res: any) => {
        console.log(res.data.data.dis_feetype_name);
        res.data.data.map((data: any, index: any) => {
          data.index = index;
        });
        res.data.data = res.data.data.splice(1);
        setGetDiscountFeeTypeName(res.data.data);
        setSpinnerLoad(false);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const DiscountFeeTypeName = (newArrVal: any) => {
    setGetDiscountFeeTypeName([...newArrVal]);
    setSpinnerLoad(false);
  };

  useEffect(() => {
    getgetDiscountFeeTypeName();
  }, []);

  const datatoFilterNull: any =
    getDiscountFeeTypeName &&
    getDiscountFeeTypeName.length &&
    getDiscountFeeTypeName.sort().map((data: any) => {
      let keys = Object.keys(data);
      keys.map((key: any) => {
        data[key] = data[key] == null ? "" : data[key];
      });
      return data;
    });

  const dataSearch: any =
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

  const handleSubmit = async (e: any) => {
    setDuplication(true);
    e.preventDefault();
    if (discountFeeTypeName.length <= 0) {
      toast.warning("Please Enter A Value", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDuplication(false);
    } else {
      try {
        getAccessToken();
        await axios
          .post(`${baseUrl}discountfee`, {
            dis_feetype_name: discountFeeTypeName,
          })
          .then((res: any) => {
            console.log(res.data);
            if (res.data.data.IsExsist === false) {
              toast.success("Discount Fee Type Master Added", {
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

            getgetDiscountFeeTypeName();
            setStatusDiscountfeeAdd(false);
            setDuplication(false);
            setDiscountFeeTypeName("");
          });
      } catch (err) {
        setDuplication(false);
        setDiscountFeeTypeName("");
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
          <Sidebar data={"Discounttype"}></Sidebar>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar></Navbar>
              <div className="container-fluid">
                <div className="col-xl-11 m-auto">
                  <div
                    className="col-lg-10"
                    style={{ marginLeft: "10%", width: "90%" }}
                  >
                    <div className="card mb-3">
                      <div style={{ color: "rgb(230, 39, 39)" }}>
                        <div className="card-header mb-4 bg-transparent border-1 text-center">
                          <h4 className="mb-0 ">
                            <i className="far fa-clone pr-1"></i> Discount Fee
                            Type Master
                          </h4>
                          <div style={{ textAlign: "right" }}>
                            {!statusDiscountfeeAdd ? (
                              <Button
                                type="submit"
                                className="btn btn-primary btn-sm btn-save"
                                onClick={() => {
                                  setStatusDiscountfeeAdd(true);
                                  setEditingDiscountFeeYear({});
                                  setUpdateDiscountData("");
                                }}
                              >
                                Add
                              </Button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                      {!statusDiscountfeeAdd ? (
                        <div className="card-body">
                          <div>
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
                                    onChange={(e) => setfilter(e.target.value)}
                                  />
                                </Form.Label>
                              </div>

                              <div className="row">
                                <div className="col-sm-12">
                                  <BootstrapTable
                                    keyField="academic_year"
                                    data={dataSearch}
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
                                  <Button
                                    variant="danger"
                                    onClick={handleClose}
                                  >
                                    Delete
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Form.Label style={{ textAlign: "center" }}>
                              Discount Fee Type Name
                              <Form.Control
                                type="text"
                                onChange={(e: any) => {
                                  setDiscountFeeTypeName(e.target.value);
                                }}
                              />
                            </Form.Label>
                          </div>
                          <div className="card-footer py3">
                            <Row>
                              <Col>
                                &nbsp;
                                <Button
                                  type="submit"
                                  onClick={(e: any) => {
                                    handleSubmit(e);
                                  }}
                                  style={{
                                    display: "flex",
                                    float: "right",
                                    marginLeft: "2%",
                                  }}
                                  className={
                                    duplication
                                      ? "disabled btn btn-danger btn-save"
                                      : "btn btn-danger btn-save"
                                  }
                                >
                                  Save
                                </Button>{" "}
                                &nbsp;{" "}
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setEditingDiscountFeeYear({});
                                    setStatusDiscountfeeAdd(false);
                                  }}
                                  style={{ display: "flex", float: "right" }}
                                >
                                  Cancel
                                </Button>{" "}
                                &nbsp;
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
  );
};
export default Discountfee;
