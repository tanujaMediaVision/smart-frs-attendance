import React from 'react'
import { BsFillArchiveFill, BsFillBellFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs'
import { Container, Row, Col, Card, Button, CardHeader } from "react-bootstrap";
import {
  FaUsers,
  FaUserTie,
  FaCar,
  FaBell,
  FaArrowRight,
  FaArrowLeft,
  FaCalendarPlus,
  FaDownload,
} from "react-icons/fa";
const Dashboard = () => {
  return (
    <>
      <main className='main-container'>
        <div className='main-title'>
          <h3>Admin Dashboard<br /><small className='fs-6'>Moniter all security operations in real-time</small></h3>
        </div>
        {/* <div className='main-cards'>
          <div className='card-dash'>
            <div className='card-dash-inner'>
              <h5>Active Visitor</h5>
              <BsFillArchiveFill className='card_icon' />
            </div>
            <h3>24</h3>
          </div>
          <div className='card-dash'>
            <div className='card-dash-inner'>
              <h5>Present Employees</h5>
              <BsFillGrid3X3GapFill className='card_icon' />
            </div>
            <h3>156</h3>
          </div>
          <div className='card-dash'>
            <div className='card-dash-inner'>
              <h5>Vehicles Inside</h5>
              <BsPeopleFill className='card_icon' />
            </div>
            <h3>42</h3>
          </div>
          <div className='card-dash'>
            <div className='card-dash-inner'>
              <h5>Gate Alerts</h5>
              <BsFillBellFill className='card_icon' />
            </div>
            <h3>3</h3>
          </div>
        </div> */}
        <Container fluid className="p-3">
          {/* Top Stats */}
          <Row className="mb-3">
            <Col sm={6} md={6} lg={3} className="mb-3">
              <Card className="shadow-sm text-start p-3">
                <div className='card-dash-inner'>
                  <h6>Active Visitors</h6>
                  <FaUsers size={24} className="mb-2" />
                </div>
                <h4>24</h4>
              </Card>
            </Col>
            <Col sm={6} md={6} lg={3} className="mb-3">
              <Card className="shadow-sm text-start p-3">
                <div className='card-dash-inner'>
                  <h6>Present Employees</h6>
                  <FaUserTie size={24} className="mb-2" />
                </div>
                <h4>156</h4>
              </Card>
            </Col>
            <Col sm={6} md={6} lg={3} className="mb-3">
              <Card className="shadow-sm text-start p-3">
                <div className='card-dash-inner'>
                  <h6>Vehicles Inside</h6>
                  <FaCar size={24} className="mb-2" />
                </div>
                <h4>42</h4>
              </Card>
            </Col>
            <Col sm={6} md={6} lg={3} className="mb-3">
              <Card className="shadow-sm text-start p-3">
                <div className='card-dash-inner'>
                  <h6>Gate Alerts</h6>
                  <FaBell size={24} className="mb-2" />
                </div>
                <h4>3</h4>
              </Card>
            </Col>
          </Row>
          {/* Live Gate & Recent Activity */}
          <Row className="mb-3">
            <Col md={8} className="mb-3">
              <Card className="shadow-sm p-3">
                <CardHeader>
                  <h6>Live Gate Status</h6>
                </CardHeader>
                <Row>
                  <Col md={6} className="mb-3">
                    <Card className="p-3">
                      <h6>Main Gate <span className="text-success">(Active)</span></h6>
                      <div className="border rounded bg-light d-flex align-items-center justify-content-center" style={{ height: "100px" }}>
                        Live Camera Feed
                      </div>
                      <small className="text-muted">
                        Last Entry: 2 mins ago <br />
                        Queue: 3 vehicles
                      </small>
                    </Card>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Card className="p-3">
                      <h6>Employee Gate <span className="text-success">(Active)</span></h6>
                      <div className="border rounded bg-light d-flex align-items-center justify-content-center" style={{ height: "100px" }}>
                        Live Camera Feed
                      </div>
                      <small className="text-muted">
                        Last Entry: 1 min ago <br />
                        Queue: 0 people
                      </small>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3">
                <h6>Recent Activity</h6>
                <ul className="list-unstyled mb-2">
                  <li><FaArrowRight className="text-success" /> John Doe entered <small className="text-muted">2 mins ago</small></li>
                  <li><FaCar /> Vehicle KA01AB1234 <small className="text-muted">5 mins ago</small></li>
                  <li><FaArrowLeft className="text-danger" /> Sarah Wilson exited <small className="text-muted">8 mins ago</small></li>
                  <li><FaCalendarPlus /> New appointment <small className="text-muted">12 mins ago</small></li>
                </ul>
                <Button variant="link" size="sm">View all activity</Button>
              </Card>
            </Col>
          </Row>

          {/* Reports */}
          <Row>
            <Col md={6} className="mb-3">
              <Card className="shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6>Visitor Report</h6>
                  <Button variant="light" size="sm"><FaDownload /> Export</Button>
                </div>
                <div className="border rounded bg-light my-3 d-flex align-items-center justify-content-center" style={{ height: "150px" }}>
                  Visitor Analytics Chart
                </div>
                <Row className="text-center">
                  <Col><h5>127</h5><small>Today</small></Col>
                  <Col><h5>834</h5><small>This Week</small></Col>
                  <Col><h5>3,421</h5><small>This Month</small></Col>
                </Row>
              </Card>
            </Col>
            <Col md={6} className="mb-3">
              <Card className="shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6>Attendance Report</h6>
                  <Button variant="light" size="sm"><FaDownload /> Export</Button>
                </div>
                <div className="border rounded bg-light my-3 d-flex align-items-center justify-content-center" style={{ height: "150px" }}>
                  Attendance Analytics Chart
                </div>
                <Row className="text-center">
                  <Col><h5>156</h5><small>Present</small></Col>
                  <Col><h5>12</h5><small>Absent</small></Col>
                  <Col><h5>92.8%</h5><small>Attendance</small></Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}
export default Dashboard