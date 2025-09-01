import { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FiClock } from "react-icons/fi";
import axios from "axios";

function Otp({ phoneNumber, onVerify }) {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]); // store refs for all inputs
  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle OTP input
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // keep only last digit
    setOtp(newOtp);

    // Focus next field automatically
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  // Handle paste full OTP
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      // 🔹 Verify OTP API call
      setLoading(true);
      axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-otp `, { mobile_number: phoneNumber, otp: enteredOtp })
        .then((res) => {
          if (res.data && res.data.token && res.data.userType) {
            setLoading(false);
            onVerify(res.data.token, res.data.userType);  // 👇 Send both token & userType to App.js
          } else {
            alert(res.data.message || "Invalid OTP");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          alert("Something went wrong");
        });
    } else {
      alert("Enter 6-digit OTP");
    }
  };
  const handleResendOtp = () => {
    setTimer(30);
    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { mobile_number: phoneNumber })
      .then((res) => {
        if (!res.data.success) {
          alert(res.data.message || "Failed to resend OTP");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to resend OTP");
      });
  };
  return (
    <div className="otp-container">
      <div className="otp-box">
        <h3>Enter OTP</h3>
        <p>We've sent a 6-digit code to <strong>+91 {phoneNumber}</strong></p>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>6-Digit OTP</Form.Label>
            <Row className="g-2 justify-content-center">
              {otp.map((data, index) => (
                <Col xs={2} key={index}>
                  <Form.Control
                    type="text"
                    maxLength="1"
                    value={data}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="otp-input"
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
          <div className="resend-section">
            <p>Didn't receive the code?</p>
            {timer > 0 ? (
              <span className="resend-disabled">
                <FiClock /> Resend OTP in {timer}s
              </span>
            ) : (
              <Button variant="link" className="p-0 text-decoration-none text-secondary" onClick={handleResendOtp} >Resend OTP</Button>
            )}
          </div>
          <Button type="submit" className="w-100 mt-3" variant="dark" disabled={loading}>{loading ? "Verifying..." : "Login"}</Button>
        </Form>
      </div>
    </div>
  );
}
export default Otp;