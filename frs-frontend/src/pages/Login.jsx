import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

function Login({ onGetOtp }) {
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (phone.length === 10) {
            onGetOtp(phone); // pass phone to App.jsx
        } else {
            alert("Enter a valid 10-digit phone number");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <span className="logo-icon">🛡️</span>
                    <h2>SecureApp</h2>
                </div>
                <p className="subtitle">Quick and secure login</p>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <img
                                    src="https://flagcdn.com/w20/in.png"
                                    alt="India"
                                    className="flag-icon"
                                />
                                +91
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                maxLength={10}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100 mt-3">
                        Get OTP
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
