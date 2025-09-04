import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'

const CreateVisitors = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [visitors, setVisitors] = useState([]);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        visitor_name: "",
        phone_no: "",
        email: "",
        aadhaar_number: "",
        purpose_of_visit: "",
        start_date: "",
        expiry_date: ""
    });
    const handleVisitorChange = (index, e) => {
        const newVisitors = [...visitors];
        newVisitors[index][e.target.name] = e.target.value;
        setVisitors(newVisitors);
    };
    const addVisitor = () => {
        setVisitors([...visitors, { visitor_name: "", phone_no: "", email: "", aadhaar_number: "" }]);
    };
    const removeVisitor = (index) => {
        const newVisitors = visitors.filter((_, i) => i !== index);
        setVisitors(newVisitors);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validateForm = () => {
        const errs = [];

        if (!formData.visitor_name.trim()) {
            errs.push("Full Name is required");
        } else if (!/^[A-Za-z ]+$/.test(formData.visitor_name)) {
            errs.push("Full Name must contain only letters and spaces (no numbers or special characters)");
        }
        if (!/^[6-9]\d{9}$/.test(formData.phone_no)) {
            errs.push("Please enter a valid 10-digit mobile number starting with 6-9");
        }
        if (!formData.aadhaar_number) {
            errs.push("Aadhar number is required");
        } else if (!/^\d{12}$/.test(formData.aadhaar_number)) {
            errs.push("Aadhar number must be 12 digits");
        }
        // ✅ Email validation (optional)
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errs.push("Please enter a valid email address");
        }
        const now = new Date().toISOString().slice(0, 16); // current datetime-local format
        if (!formData.start_date) {
            errs.push("Start date is required");
        } else if (formData.start_date < now) {
            errs.push("Start date cannot be earlier than current date & time");
        }
        if (!formData.expiry_date) {
            errs.push("End date is required");
        } else if (formData.start_date && formData.expiry_date < formData.start_date) {
            errs.push("End date cannot be earlier than start date");
        }
        if (!formData.purpose_of_visit) {
            errs.push("Purpose of visit is required");
        }
        // 🔹 Extra visitors validation
        visitors.forEach((v, i) => {
            if (!v.visitor_name?.trim()) {
                errs.push(`Visitor ${i + 1}: Full Name is required`);
            } else if (!/^[A-Za-z ]+$/.test(v.visitor_name)) {
                errs.push(`Visitor ${i + 1}: Full Name must contain only letters and spaces`);
            }

            if (!/^[6-9]\d{9}$/.test(v.phone_no || "")) {
                errs.push(`Visitor ${i + 1}: Please enter a valid 10-digit mobile number`);
            }

            if (!v.aadhaar_number) {
                errs.push(`Visitor ${i + 1}: Aadhar number is required`);
            } else if (!/^\d{12}$/.test(v.aadhaar_number)) {
                errs.push(`Visitor ${i + 1}: Aadhar number must be 12 digits`);
            }
            // ✅ Email validation (optional)
            if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
                errs.push(`Visitor ${i + 1}: Please enter a valid email address`);
            }
        });
        return errs;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Custom validations
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors([]);
        setLoading(true);
        const mainVisitor = {
            visitor_name: formData.visitor_name,
            phone_no: formData.phone_no,
            aadhaar_number: formData.aadhaar_number,
            email: formData.email,
        };
        // Build visitors payload
        let visitorsPayload;
        if (visitors.length === 0) {
            // single visitor (formData only)
            visitorsPayload = mainVisitor;
        } else {
            // multiple visitors (map array)
            visitorsPayload = [
                mainVisitor,
                ...visitors.map((v) => ({
                    visitor_name: v.visitor_name,
                    phone_no: v.phone_no,
                    aadhaar_number: v.aadhaar_number,
                    email: v.email,
                })),
            ];
        }
        // Final payload
        const payload = {
            visitors: visitorsPayload,
            start_date: formData.start_date,
            expiry_date: formData.expiry_date,
            purpose_of_visit: formData.purpose_of_visit,
            host_Emp_id: "EMP001", // you can make this dynamic if needed
        };
        axios.post(`${import.meta.env.VITE_API_URL}/visitors/create`, payload)
            .then((res) => {
                setLoading(false);
                console.error(res);
                alert("Visitor added successfully!");
                if (onSuccess) onSuccess(); // refresh table after add
            })
            .catch((err) => {
                setLoading(false);
                // console.error(err);
                alert(err.response?.data?.message || "Failed to add visitor");
            });
    };
    return (
        <>
            <Container className="py-4">
                <Form onSubmit={handleSubmit}>
                    <h3>Visitor Registration</h3>
                    <p className="text-muted">Please complete all required fields</p>
                    {/* Show errors */}
                    {errors.length > 0 && (
                        <div className="alert alert-danger">
                            <ul>
                                {errors.map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                                    <Form.Label>Aadhar No. *</Form.Label>
                                    <Form.Control type="text" name="aadhaar_number" maxLength={12} value={formData.aadhaar_number} onChange={handleChange} placeholder="Enter Aadhar number" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Visit Start Time *</Form.Label>
                                    <Form.Control type="datetime-local" name="start_date" value={formData.start_date} onChange={handleChange} min={new Date().toISOString().slice(0, 16)} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Visit End Time *</Form.Label>
                                    <Form.Control type="datetime-local" name="expiry_date" min={formData.start_date || undefined} value={formData.expiry_date} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mb-3 align-items-end'>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Purpose of Visit *</Form.Label>
                                    <Form.Select name="purpose_of_visit" value={formData.purpose_of_visit} onChange={handleChange} required>
                                        <option value="" disabled>Select Purpose</option>
                                        <option value="Meeting with Employee">Meeting with Employee</option>
                                        <option value="Interview/Recruitment">Interview/Recruitment</option>
                                        <option value="Client Meeting">Client Meeting</option>
                                        <option value="Business Discussion">Business Discussion</option>
                                        <option value="Service Work">Service Work</option>
                                        <option value="Official Inspection">Official Inspection</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className='text-end'>
                                <Button variant="secondary" onClick={addVisitor}>+ Add More Visitor</Button>
                            </Col>
                        </Row>
                    </Card>
                    {visitors.map((visitor, index) => (
                        <Card className="my-3 p-3 shadow-sm">
                            <Row key={index} className="mb-3 align-items-end">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Full Name *</Form.Label>
                                        <Form.Control
                                            name="visitor_name"
                                            value={visitor.visitor_name}
                                            onChange={(e) => handleVisitorChange(index, e)}
                                            type="text"
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Phone Number *</Form.Label>
                                        <Form.Control
                                            name="phone_no"
                                            maxLength={10}
                                            value={visitor.phone_no}
                                            onChange={(e) => handleVisitorChange(index, e)}
                                            type="text"
                                            placeholder="Enter phone number"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3 align-items-end">
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Email (Optional)</Form.Label>
                                        <Form.Control type="email" name="email" value={visitor.email} onChange={(e) => handleVisitorChange(index, e)} placeholder="Enter email" required />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Aadhar No. *</Form.Label>
                                        <Form.Control type="text" name="aadhaar_number" maxLength={12} value={visitor.aadhaar_number} onChange={(e) => handleVisitorChange(index, e)} placeholder="Enter Aadhar number" required />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Button variant="danger" onClick={() => removeVisitor(index)} >Remove</Button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    {/* Submit */}
                    <div className="text-center">
                        <Button type="submit" variant="dark" disabled={loading}>{loading ? (
                            "Submitting..."
                        ) : (
                            "Submit Registration"
                        )}</Button>
                        <p className="text-muted mt-2">Please review all information before submitting</p>
                    </div>
                </Form>
            </Container>
        </>
    )
}
export default CreateVisitors