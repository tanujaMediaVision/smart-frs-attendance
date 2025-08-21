import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FiClock } from "react-icons/fi";

function Otp({ phoneNumber, onVerify }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);

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
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      onVerify(enteredOtp);
    } else {
      alert("Enter 6-digit OTP");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h3>Enter OTP</h3>
        <p>
          We've sent a 6-digit code to <strong>+91 {phoneNumber}</strong>
        </p>

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
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
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
              <Button
                variant="link"
                className="p-0 text-decoration-none text-secondary"
                onClick={() => setTimer(30)}
              >
                Resend OTP
              </Button>
            )}
          </div>

          <Button type="submit" className="w-100 mt-3" variant="dark">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Otp;
