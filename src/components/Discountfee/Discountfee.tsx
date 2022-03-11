import { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import { baseUrl } from "../../index";
import Navbar from "../Layouts/Navbar";
import { Button, Table, Form, Spinner, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import { getAccessToken } from "../../config/getAccessToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Discountfee = () => {
    const [statusDiscountfeeAdd, setStatusDiscountfeeAdd] = useState(false);

    const [discountFeeTypeName, setDiscountFeeTypeName] = useState("");
    const [getDiscountFeeTypeName, setGetDiscountFeeTypeName] = useState<any[]>([]);
    const [editingDiscountFeeYear, setEditingDiscountFeeYear] = useState<any>({ name: "", id: "", dis_id: "" });
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
                if(res.data.data.isDeletable == true){
                    toast.success("Deleted Successfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else if(res.data.data.isDeletable === false){
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
                .put(`${baseUrl}discount_type_masters/update`, {dis_feetype_id: updateDiscountFeeYear.dis_id, dis_feetype_name: updateDiscountFeeYear.name})
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
                console.log(res.data);
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

    const dataSearch: any =
    getDiscountFeeTypeName && getDiscountFeeTypeName.length &&
        getDiscountFeeTypeName.sort().filter((data: any) => {
            return Object.keys(data).some((key) => data[key].toString().toLowerCase().includes(filter.toString().toLowerCase()));
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
                await axios.post(`${baseUrl}discountfee`, { dis_feetype_name: discountFeeTypeName }).then((res: any) => {
                    console.log(res.data);
                    if(res.data.data.IsExsist === false){
                        toast.success("Discount Fee Type Master Added", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else if (res.data.data.IsExsist === true){
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
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar data={"Discounttype"}></Sidebar>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Navbar></Navbar>
                            <div className="container-fluid">
                                <div className="col-xl-11 m-auto">
                                    <div className="col-lg-10" style={{ marginLeft: "10%", width: "90%" }}>
                                        <div className="card mb-3">
                                            <div style={{ color: "rgb(230, 39, 39)" }}>
                                                <div className="card-header mb-4 bg-transparent border-1 text-center">
                                                    <h4 className="mb-0 ">
                                                        <i className="far fa-clone pr-1"></i> Discount Fee Type Master
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
                                                            <div id="dataTable_filter" className="dataTables_filter">
                                                                <Form.Label htmlFor="inputPassword5" style={{ marginLeft: "75%" }}>
                                                                    Search:
                                                                    <Form.Control type="search" className="form-control form-control-sm" onChange={(e) => setfilter(e.target.value)} />
                                                                </Form.Label>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <Table className="table dataTable no-footer" width="100%" style={{ width: "100%" }}>
                                                                        <thead>
                                                                            <tr role="row">
                                                                                <th className="sorting_asc">No.</th>
                                                                                <th className="sorting">Discount Fee Type Name</th>
                                                                                <th className="sorting">Actions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {spinnerLoad ? (
                                                                                <td
                                                                                    colSpan={4}
                                                                                    style={{
                                                                                        textAlign: "center",
                                                                                    }}
                                                                                >
                                                                                    <Spinner animation="border" variant="danger" />
                                                                                </td>
                                                                            ) : dataSearch && dataSearch.length ? (
                                                                                dataSearch.map((values: any, index: any) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td>{index + 1}</td>
                                                                                            {index === editingDiscountFeeYear.id ? (
                                                                                                <>
                                                                                                    <td>
                                                                                                        {""}
                                                                                                        <Form.Control
                                                                                                            type="text"
                                                                                                            value={updateDiscountData}
                                                                                                            onChange={(e: any) => {
                                                                                                                setUpdateDiscountData(e.target.value);
                                                                                                            }}
                                                                                                        />
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <Button
                                                                                                            variant="warning"
                                                                                                            onClick={() => {
                                                                                                                updateDiscountFeeTypeName();
                                                                                                            }}
                                                                                                        >
                                                                                                            Update
                                                                                                        </Button>
                                                                                                        {"  "}
                                                                                                        <Button
                                                                                                            variant="secondary"
                                                                                                            onClick={() => {
                                                                                                                setEditingDiscountFeeYear({});
                                                                                                                setUpdateDiscountData("");
                                                                                                            }}
                                                                                                        >
                                                                                                            Cancel
                                                                                                        </Button>
                                                                                                    </td>
                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    <td>{values.dis_feetype_name}</td>
                                                                                                    <td>
                                                                                                        {/* <Button
                                                                                                            variant="primary"
                                                                                                            onClick={() => {
                                                                                                                setEditingDiscountFeeYear({
                                                                                                                    name: values.dis_feetype_name,
                                                                                                                    id: index,
                                                                                                                    dis_id: values.dis_feetype_id,
                                                                                                                });
                                                                                                            }}
                                                                                                        >
                                                                                                            Edit
                                                                                                        </Button> */}
                                                                                                        {"  "}
                                                                                                        <Button
                                                                                                            variant="danger"
                                                                                                            onClick={() => {
                                                                                                                setdatatoDelete({
                                                                                                                    name: values.dis_feetype_name,
                                                                                                                    index: index,
                                                                                                                    id: values.dis_feetype_id,
                                                                                                                });
                                                                                                                handleShow();
                                                                                                                setEditingDiscountFeeYear({});
                                                                                                                setUpdateDiscountData("");
                                                                                                            }}
                                                                                                        >
                                                                                                            Delete
                                                                                                        </Button>
                                                                                                    </td>
                                                                                                </>
                                                                                            )}
                                                                                        </tr>
                                                                                    );
                                                                                })
                                                                            ) : (
                                                                                <>
                                                                                    <tr style={{ textAlign: "center" }}>
                                                                                        <td
                                                                                            colSpan={3}
                                                                                            style={{
                                                                                                textAlign: "center",
                                                                                            }}
                                                                                        >
                                                                                            No Data Found
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                            )}
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                            <div style={{ marginLeft: "20%" }}>
                                                                {/* <Pagination>
                                                                    <Pagination.First />
                                                                    <Pagination.Prev />
                                                                    <Pagination.Item>{1}</Pagination.Item>
                                                                    <Pagination.Ellipsis />

                                                                    <Pagination.Item>{10}</Pagination.Item>
                                                                    <Pagination.Item>{11}</Pagination.Item>
                                                                    <Pagination.Item active>{12}</Pagination.Item>
                                                                    <Pagination.Item>{13}</Pagination.Item>
                                                                    <Pagination.Item disabled>{14}</Pagination.Item>

                                                                    <Pagination.Ellipsis />
                                                                    <Pagination.Item>{20}</Pagination.Item>
                                                                    <Pagination.Next />
                                                                    <Pagination.Last />
                                                                </Pagination> */}
                                                            </div>
                                                            <Modal show={show} onHide={SuddenhandleClose}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Delete {datatoDelete.name}</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>Are You Sure You What To Delete {datatoDelete.name} ?</Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" onClick={SuddenhandleClose}>
                                                                        Close
                                                                    </Button>
                                                                    <Button variant="danger" onClick={handleClose}>
                                                                        Delete
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div style={{ display: "flex", justifyContent: "center" }}>
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
                                                                    style={{ display: "flex", float: "right", marginLeft: "2%" }}
                                                                    className={duplication ? "disabled btn btn-danger btn-save" : "btn btn-danger btn-save"}
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
