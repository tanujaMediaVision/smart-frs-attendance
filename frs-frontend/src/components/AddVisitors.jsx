import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaUser, FaIdCard, FaCar, FaShieldAlt, FaClipboardCheck, FaSignature, FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
const AddVisitors = ({ onSuccess }) => {
    const [isEmployee, setIsEmployee] = useState("No");
    const [vehicleUsage, setVehicleUsage] = useState("No");
    const [driverAccompanying, setDriverAccompanying] = useState("No");
    const [carryingItems, setCarryingItems] = useState("No");
    const [applianceFields, setApplianceFields] = useState([{ name: "", sr_no: "" }]);
    const [formData, setFormData] = useState({
        visitor_name: "",
        phone_no: "",
        aadhaar_phone_no: "",
        email: "",
        purpose_of_visit: "",
        start_time: "",
        expiry_date: "",
        aadhar_Photo_ID: "12",
        entry_time: new Date(),
        exit_time: new Date(),
        visitor_status: "pending",
        CPF_GPF_No_master: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // Update field values
    const handleItemChange = (index, field, value) => {
        const updatedFields = [...applianceFields];
        updatedFields[index][field] = value;
        setApplianceFields(updatedFields);
    };
    // Add new field (max 10)
    const handleAddField = () => {
        if (applianceFields.length < 10) {
            setApplianceFields([...applianceFields, { name: "", sr_no: "" }]);
        }
    };
    // Remove field
    const handleRemoveField = (index) => {
        const updatedFields = [...applianceFields];
        updatedFields.splice(index, 1);
        setApplianceFields(updatedFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            is_Emp: isEmployee,
            vehicleUsage,
            driverAccompanying,
            carryingItems,
            items:applianceFields,
        };
        axios.post(`${import.meta.env.VITE_API_URL}/visitors/create`, payload)
            .then((res) => {
                console.error(res);
                alert("Visitor added successfully!");
                if (onSuccess) onSuccess(); // refresh table after add
            })
            .catch((err) => {
                console.error(err);
                alert(err.response?.data?.message || "Failed to add visitor");
            });
    };
    return (
        <>
            <Container className="py-4">
                <Form onSubmit={handleSubmit}>
                    <h3>Visitor Registration</h3>
                    <p className="text-muted">Please complete all required fields</p>
                    {/* <small className="d-block text-end">
                        <strong>Registration ID:</strong> VR-2025-001 <br />
                        <strong>Date:</strong> January 20, 2025
                    </small> */}
                    {/* Basic Information */}
                    <Card className="my-3 p-3 shadow-sm">
                        <h5><FaUser /> Basic Information</h5>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Full Name *</Form.Label>
                                    <Form.Control name="visitor_name" value={formData.visitor_name} onChange={handleChange} type="text" placeholder="Enter full name" required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Phone Number *</Form.Label>
                                    <Form.Control name="phone_no" maxLength={10} value={formData.phone_no} onChange={handleChange} type="text" placeholder="Enter phone number" required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Aadhar Phone Number *</Form.Label>
                                    <Form.Control name="aadhaar_phone_no" maxLength={10} value={formData.aadhaar_phone_no} onChange={handleChange} type="text" placeholder="Enter phone number" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email (Optional)</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Purpose of Visit *</Form.Label>
                                    <Form.Select name="purpose_of_visit" value={formData.purpose_of_visit} onChange={handleChange} required>
                                        <option disabled>Select Purpose</option>
                                        <option value="meeting">Meeting</option>
                                        <option value="delivery">Delivery</option>
                                        <option value="interview">Interview</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Visit Start Time *</Form.Label>
                                    <Form.Control type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Visit End Time *</Form.Label>
                                    <Form.Control type="datetime-local" name="expiry_date" value={formData.expiry_date} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={8}>
                                <Form.Group>
                                    <Form.Label>Host Name / Department *</Form.Label>
                                    <Form.Control name="CPF_GPF_No_master" value={formData.CPF_GPF_No_master} onChange={handleChange} type="text" placeholder="Enter Host / Department" required />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Is Visitor an Employee?</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="employee"
                                            type="radio"
                                            checked={isEmployee === "Yes"}
                                            onChange={() => setIsEmployee("Yes")}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="employee"
                                            type="radio"
                                            checked={isEmployee === "No"}
                                            onChange={() => setIsEmployee("No")}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card>
                    {/* Identification Details */}
                    <Card className="my-3 p-3 shadow-sm">
                        <h5><FaIdCard /> Identification Details</h5>
                        {isEmployee === "Yes" ? (
                            <>
                                <h6>Internal Visitor Information</h6>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Employee ID *</Form.Label>
                                            <Form.Control placeholder="Enter Emp ID" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Employee Name *</Form.Label>
                                            <Form.Control placeholder="Enter Emp Name" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Upload ID Proof *</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Upload Live Selfie *</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <>
                                <h6>External Visitor Information</h6>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>ID Type *</Form.Label>
                                            <Form.Select >
                                                <option>Select ID Type</option>
                                                <option>Aadhar</option>
                                                <option>Passport</option>
                                                <option>Driving License</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Upload ID Proof *</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <Form.Label>Upload Live Selfie *</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
                            </>
                        )}
                    </Card>
                    {/* Declaration Section */}
                    <Card className="my-3 p-3 shadow-sm">
                        <h5><FaClipboardCheck /> Declaration Section</h5>
                        {/* Vehicle */}
                        <Form.Group className="mb-3">
                            <Form.Label>A. Vehicle Usage</Form.Label><br />
                            <Form.Check inline label="Yes" type="radio" checked={vehicleUsage === "Yes"} onChange={() => setVehicleUsage("Yes")} />
                            <Form.Check inline label="No" type="radio" checked={vehicleUsage === "No"} onChange={() => setVehicleUsage("No")} />
                        </Form.Group>
                        {vehicleUsage === "Yes" && (
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Control placeholder="Enter registration number of vehicle" />
                                </Col>
                                <Col md={6}>
                                    <Form.Control type="file" />
                                </Col>
                            </Row>
                        )}
                        {/* Driver */}
                        <Form.Group className="mb-3">
                            <Form.Label>B. Driver Accompanying?</Form.Label><br />
                            <Form.Check inline label="Yes" type="radio" checked={driverAccompanying === "Yes"} onChange={() => setDriverAccompanying("Yes")} />
                            <Form.Check inline label="No" type="radio" checked={driverAccompanying === "No"} onChange={() => setDriverAccompanying("No")} />
                        </Form.Group>
                        {driverAccompanying === "Yes" && (
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Control placeholder="Enter name of the driver" />
                                </Col>
                                <Col md={6}>
                                    <Form.Control type="file" />
                                </Col>
                            </Row>
                        )}
                        {/* Carrying Items */}
                        <Form.Group className="mb-3">
                            <Form.Label>C. Carrying Valuables / Appliances</Form.Label><br />
                            <Form.Check inline label="Yes" type="radio" checked={carryingItems === "Yes"} onChange={() => setCarryingItems("Yes")} />
                            <Form.Check inline label="No" type="radio" checked={carryingItems === "No"} onChange={() => setCarryingItems("No")} />
                        </Form.Group>
                        {carryingItems === "Yes" && (
                            <>
                                {applianceFields.map((field, index) => (
                                    <Row key={index} className="mb-2 align-items-center">
                                        <Col md={5}>
                                            <Form.Control placeholder="Enter appliance type" value={field.name} onChange={(e) => handleItemChange(index, "name", e.target.value)} />
                                        </Col>
                                        <Col md={5}>
                                            <Form.Control type="file" onChange={(e) => handleItemChange(index, "file", e.target.files?.[0] || null)} />
                                        </Col>
                                        <Col md={2}>
                                            {applianceFields.length > 1 && (
                                                <Button variant="danger" size="sm" onClick={() => handleRemoveField(index)} ><FaTrash /></Button>
                                            )}
                                        </Col>
                                    </Row>
                                ))}
                                {applianceFields.length < 10 && (
                                    <Row>
                                        <Col className="text-end">
                                            <Button variant="success" size="sm" onClick={handleAddField}><FaPlus /> Add</Button>
                                        </Col>
                                    </Row>
                                )}
                            </>
                        )}
                    </Card>
                    <Form.Check type="checkbox" label={<span className="fs-6">I acknowledge that I have read and agree to the Terms & Conditions and all information provided is accurate</span>} />
                    {/* Submit */}
                    <div className="text-center">
                        <Button type="submit" variant="dark" >
                            Submit Registration
                        </Button>
                        <p className="text-muted mt-2">Please review all information before submitting</p>
                    </div>
                </Form>
            </Container>
        </ >
    )
}

export default AddVisitors