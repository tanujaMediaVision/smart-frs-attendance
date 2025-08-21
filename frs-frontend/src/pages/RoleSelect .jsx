import { Card, Button } from "react-bootstrap";
import { FaUserShield, FaUserTie, FaUserFriends } from "react-icons/fa";

function RoleSelect({ onSelectRole }) {
    return (
        <div className="role-container">
            <div className="role-box">
                <div className="sms-detect">
                    <p className="sms-title">📱<br /> Auto-detecting SMS...</p>
                    <p className="sms-sub">
                        Allow SMS access for automatic OTP detection
                    </p>
                    <span className='sms-sub fw-semibold'>Allow SMS Access</span>
                </div>

                <h5 className="mt-4 text-start">Login as</h5>
                <div className="role-options">
                    <Card
                        className="role-card d-flex justify-content-center align-items-center"
                        onClick={() => onSelectRole("security")}
                    >
                        <FaUserShield size={22} />
                        <span>Security</span>
                    </Card>
                    <Card
                        className="role-card  d-flex justify-content-center align-items-center"
                        onClick={() => onSelectRole("employee")}
                    >
                        <FaUserTie size={22} />
                        <span>Employee</span>
                    </Card>
                    <Card
                        className="role-card d-flex justify-content-center align-items-center"
                        onClick={() => onSelectRole("visitor")}
                    >
                        <FaUserFriends size={22} />
                        <span>Visitor</span>
                    </Card>
                </div>

                <p className="terms">
                    By logging in, you agree to our{" "}<br />
                    <a >Terms of Service</a> &nbsp; and &nbsp;
                    <a >Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}

export default RoleSelect;
