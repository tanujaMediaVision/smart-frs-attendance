import { useState } from 'react'
import './App.css'
import Header from '../src/pages/Header'
import Sidebar from '../src/pages/Sidebar'
import Login from './pages/Login'
import Otp from "./pages/Otp";
import RoleSelect from './pages/RoleSelect '
import Visitors from './components/Visitors'
import Dashboard from './components/Dashboard'


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")
  const [step, setStep] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "visitors": return <Visitors />;
      case "employees": return <Dashboard />;
      case "vehicles": return <Visitors />;
      case "liveGates": return <Dashboard />;
      case "attendance": return <Visitors />;
      case "analytics": return <Dashboard />;
      case "export": return <Visitors />;
      case "settings": return <Dashboard />;
      default: return <h2>Page Not Found</h2>;
    }
  }
  // Step 1: Login
  if (step === "login") {
    return (
      <Login
        onGetOtp={(phone) => {
          setPhoneNumber(phone);
          setStep("otp");
        }}
      />
    );
  }
  // Step 2: OTP
  if (step === "otp") {
    return (
      <Otp
        phoneNumber={phoneNumber}
        onVerify={(otp) => {
          // console.log("OTP entered:", otp);
          setStep("role");
        }}
      />
    );
  }
  // Step 3: Role selection
  if (step === "role") {
    return (
      <RoleSelect
        onSelectRole={(selectedRole) => {
          // console.log("OTP entered:", selectedRole);
          setRole(selectedRole);
          setStep("dashboard");
        }}
      />
    );
  }
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        setActivePage={setActivePage}
        activePage={activePage}
      />
      {renderPage()}
    </div>
  )
}
export default App