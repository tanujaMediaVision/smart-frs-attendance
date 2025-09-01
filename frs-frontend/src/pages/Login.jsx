import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { MdSecurity } from "react-icons/md";
import axios from "axios";

function Login({ onGetOtp }) {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit mobile number starting with 6-9");
            return;
        }
        if (phone.length === 10) {
            // 🔹 Call API to send OTP
            // console.log("API URL:", import.meta.env.VITE_API_URL);
            axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { mobile_number: phone })
                .then((res) => {
                    if (res.data) {
                        setLoading(true);
                        const type = res.data.userType;
                        onGetOtp(phone, type); // move to OTP page
                    } else {
                        setLoading(false);
                        alert(res.data.message || "Failed to send OTP");
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.error(err.response?.data || err.message);
                    alert(err.response?.data?.message || "Something went wrong");
                });
        } else {
            alert("Enter a valid 10-digit phone number");
        }
    };
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <span className="logo-icon"><MdSecurity /></span>
                    <h2>SecureApp</h2>
                </div>
                <p className="subtitle">Quick and secure login</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <img src="https://flagcdn.com/w20/in.png" alt="India" className="flag-icon" />+91
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                maxLength={10}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button variant="dark" type="submit" className="w-100 mt-3" disabled={loading}>{loading ? "Sending OTP..." : "Get OTP"}</Button>
                </Form>
            </div>
        </div>
    );
}
export default Login;