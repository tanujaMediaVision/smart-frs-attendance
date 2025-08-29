import { useEffect, useState } from "react";
import { Button, Modal, Table, Col, Form, Row, FloatingLabel, Dropdown, Card, Pagination, InputGroup } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaThList, FaThLarge, } from "react-icons/fa";
import axios from "axios";
import AddVisitors from "./AddVisitors";

const Vahicles = () => {
    const [show, setShow] = useState(false);
    const [view, setView] = useState("table"); // "table" | "card"
    const [enquiryOlist, setEnquiryOlist] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAllenquiry = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/visitors/list`)
            .then((res) => {
                setEnquiryOlist(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllenquiry();
    }, []);

    const filteredVisitors = enquiryOlist.filter((item) => {
        const matchesSearch =
            item.visitor_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.phone_number?.includes(search);
        const matchesStatus = statusFilter
            ? item.status === statusFilter
            : true;
        return matchesSearch && matchesStatus;
    });
    return (
        <main className="main-container">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Visitor’s Management</h3>
                <Button variant="dark" onClick={handleShow}>+ Create Visitor Pass</Button>
            </div>
            {/* Filters */}
            <Row className="mb-3">
                <Col md={4}>
                    <InputGroup>
                        <Form.Control
                            placeholder="Search by name or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={2}>
                    <Form.Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Control type="date" />
                </Col>
                <Col md={2}>
                    <Form.Control type="date" />
                </Col>
                <Col md={2}>
                    <Button variant="light" className="w-100">
                        Filter
                    </Button>
                </Col>
            </Row>
            {/* View Toggle */}
            <div className="mb-2">
                <Button
                    size="sm"
                    variant={view === "table" ? "dark" : "light"}
                    className="me-2"
                    onClick={() => setView("table")}
                >
                    <FaThList className="me-1" /> Table View
                </Button>
                <Button
                    size="sm"
                    variant={view === "card" ? "dark" : "light"}
                    onClick={() => setView("card")}
                >
                    <FaThLarge className="me-1" /> Card View
                </Button>
            </div>
            {/* Table View */}
            {view === "table" && (
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Visitor Name</th>
                            <th>Purpose of Visit</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVisitors.length > 0 ? (
                            filteredVisitors.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.visitor_name}`}
                                                alt="avatar"
                                                width="40"
                                                height="40"
                                                className="me-2 rounded-circle"
                                            />
                                            <div>
                                                <div>
                                                    {item.visitor_name}
                                                </div>
                                                <small className="text-muted">
                                                    {item.phone_no}
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.purpose_of_visit || "—"}</td>
                                    <td>{new Date().toLocaleString()}</td>
                                    <td>
                                        <span
                                            className={`badge ${item.visitor_status === "approved"
                                                ? "bg-success"
                                                : item.visitor_status === "rejected"
                                                    ? "bg-danger"
                                                    : item.visitor_status === "pending"
                                                        ? "bg-warning text-dark"
                                                        : "bg-secondary"
                                                }`}
                                        >
                                            {item.visitor_status}
                                        </span>
                                    </td>
                                    <td>
                                        <FaEye className="me-2 text-primary" role="button" />
                                        <FaEdit className="me-2 text-warning" role="button" />
                                        <FaTrash className="text-danger" role="button" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
            {/* Card View */}
            {view === "card" && (
                <Row>
                    {filteredVisitors.length > 0 ? (
                        filteredVisitors.map((item, index) => (
                            <Col md={4} key={index} className="mb-3">
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <div className="d-flex align-items-center mb-2">
                                            <img
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.visitor_name}`}
                                                alt="avatar"
                                                width="50"
                                                height="50"
                                                className="me-2 rounded-circle"
                                            />
                                            <div>
                                                <h6>
                                                    {item.visitor_name}
                                                </h6>
                                                <small className="text-muted">
                                                    {item.phone_no}
                                                </small>
                                            </div>
                                        </div>
                                        <p className="mb-1">
                                            <strong>Purpose:</strong> {item.purpose_of_visit || "—"}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Date:</strong> {new Date().toLocaleDateString()}
                                        </p>
                                        <p>
                                            <span
                                                className={`badge ${item.visitor_status === "approved"
                                                    ? "bg-success"
                                                    : item.visitor_status === "rejected"
                                                        ? "bg-danger"
                                                        : item.visitor_status === "pending"
                                                            ? "bg-warning text-dark"
                                                            : "bg-secondary"
                                                    }`}
                                            >
                                                {item.visitor_status}
                                            </span>
                                        </p>
                                        <div>
                                            <FaEye className="me-2 text-primary" role="button" />
                                            <FaEdit className="me-2 text-warning" role="button" />
                                            <FaTrash className="text-danger" role="button" />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="text-center">No Data Found</p>
                    )}
                </Row>
            )}
            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <small>
                    Showing 1 to {filteredVisitors.length} of {enquiryOlist.length} results
                </small>
                <Pagination>
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Next />
                </Pagination>
            </div>
            {/* Add Visitor Modal */}
            <Modal show={show} onHide={handleClose} animation={false} size={"lg"}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Visitor Registration</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <AddVisitors onSuccess={getAllenquiry} />
                </Modal.Body>
            </Modal>
        </main>
    )
}
export default Vahicles