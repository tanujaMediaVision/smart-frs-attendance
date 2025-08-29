import { useState, useEffect } from 'react';
import './App.css'
import Header from '../src/pages/Header'
import Sidebar from '../src/pages/Sidebar'
import Login from './pages/Login'
import Otp from "./pages/Otp";
// import RoleSelect from './pages/RoleSelect '
import Visitors from './components/Visitors'
import Dashboard from './components/Dashboard'
import AddVisitors from './components/AddVisitors';
import Vahicles from './components/Vahicles';


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")
  const [step, setStep] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  // const [role, setRole] = useState("");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  // ✅ If token exists, directly go to dashboard
  useEffect(() => {
    if (token) {
      setStep("dashboard");
    }
  }, [token]);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "visitors": return <Visitors />;
      case "employees": return <AddVisitors />;
      case "vehicles": return <Vahicles />;
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
        onVerify={(userToken) => {
          localStorage.setItem("authToken", userToken); // ✅ save token
          setToken(userToken);
          setStep("dashboard");
        }}
      />
    );
  }
  // Step 3: Role selection
  // if (step === "role") {
  //   return (
  //     <RoleSelect
  //       onSelectRole={(selectedRole) => {
  //         // console.log("OTP entered:", selectedRole);
  //         setRole(selectedRole);
  //         setStep("dashboard");
  //       }}
  //     />
  //   );
  // }
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