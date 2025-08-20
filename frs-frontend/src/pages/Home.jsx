import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FloatingLabel } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
function Home() {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    let [enquiryOlist, setEnquiryOlist] = useState([])
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        gender: "",
        status: "",
        notes: ""
    });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStatusSelect = (status) => {
        setFormData({ ...formData, status });
    };

    const getAllenquiry = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/visitors/list`)
            .then((res) => {
                // console.log(res.data);
                setEnquiryOlist(res.data)
            })
            .catch((err) => { console.log(err); })
    }
    useEffect(() => {
        getAllenquiry()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        axios.post(`${import.meta.env.VITE_API_URL}/visitors/create`, formData)
            .then((res) => {
                console.log("Form submitted:", res.data);
                getAllenquiry(); // refresh table
                handleClose(); // close modal
                setFormData({ first_name: "", last_name: "", phone_number: "", gender: "", status: "", notes: "" }); // reset form
                setValidated(false);
            })
            .catch((err) => { console.log(err); });
    };
    return (
        <main className='main-container'>
            <div className='main-title mb-5'>
                <h3>Visitor</h3>
                <Button variant="primary" onClick={handleShow}>Add +</Button>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Visitor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" >
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Phone No.</Form.Label>
                                <Form.Control type="text" placeholder="Number" required name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Status</Form.Label>
                                <Dropdown onSelect={handleStatusSelect}>
                                    <Dropdown.Toggle variant="light" style={{ width: "100%", textAlign: 'start' }}>
                                        {formData.status || "Select Status"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Approved">Approved</Dropdown.Item>
                                        <Dropdown.Item eventKey="Rejected">Rejected</Dropdown.Item>
                                        <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                                        <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group className="mb-3" as={Col} md="3">
                                <Form.Check
                                    required
                                    label="Male"
                                    type='radio'
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" as={Col} md="3">
                                <Form.Check
                                    required
                                    label="Female"
                                    type='radio'
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Note"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone no</th>
                            <th>gender</th>
                            <th>Status</th>
                            <th>Message</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(enquiryOlist) && enquiryOlist.length > 0 ? (
                            enquiryOlist.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.phone_number}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.status}</td>
                                    <td>{item.notes}</td>
                                    {/* <td>
                                            <button className="btn btn-danger btn-sm">Delete</button>
                                            <button className="btn btn-warning btn-sm ms-2">Edit</button>
                                        </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center">No Data Found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </main>
    )
}

export default Home