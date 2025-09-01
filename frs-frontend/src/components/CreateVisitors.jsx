import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'

const CreateVisitors = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        visitor_name: "",
        phone_no: "",
        start_time: "",
        expiry_date: ""
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
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
                    <h3>Visitor Create</h3>
                    <p className="text-muted">Please complete all required fields</p>
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
                    </Card>
                    {/* Submit */}
                    <div className="text-center">
                        <Button type="submit" variant="dark" >Submit Registration</Button>
                        <p className="text-muted mt-2">Please review all information before submitting</p>
                    </div>
                </Form>
            </Container>
        </>
    )
}

export default CreateVisitors
