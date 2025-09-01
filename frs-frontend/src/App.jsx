import { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from '../src/pages/Header'
import Sidebar from '../src/pages/Sidebar'
import Login from './pages/Login'
import Otp from "./pages/Otp";
import Visitors from './components/Visitors'
import Dashboard from './components/Dashboard'
import Vahicles from './components/Vahicles';
import Employees from './components/Employees';
import AddVisitors from './components/AddVisitors';
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")
  const [step, setStep] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType")); // ✅ "client" or "visitor"

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  // ✅ If token exists, directly go to dashboard
  useEffect(() => {
    if (token && userType === "super admin") {
      setStep("dashboard");
    } else if (token && userType === "visitor") {
      setStep("visitor-form");
    }
  }, [token, userType]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // remove token
    localStorage.removeItem("userType");
    setToken(null);
    setUserType(null);
    setStep("login"); // go back to login without reload
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "visitors": return <Visitors />;
      case "employees": return <Employees />;
      case "vehicles": return <Vahicles />;
      case "liveGates": return <Employees />;
      case "attendance": return <Vahicles />;
      case "analytics": return <Employees />;
      case "export": return <Vahicles />;
      case "settings": return <Employees />;
      default: return <h2>Page Not Found</h2>;
    }
  }
  // ✅ Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };
  // Step 1: Login
  if (step === "login") {
    return (
      <Login
        onGetOtp={(phone, type) => {
          // 🔹 Pass user type from API: "client" or "visitor"
          setPhoneNumber(phone);
          setUserType(type);
          localStorage.setItem("userType", type);
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
        onVerify={(userToken, userTypeFromApi) => {
          localStorage.setItem("authToken", userToken); // ✅ save token
          localStorage.setItem("userType", userTypeFromApi);
          setToken(userToken);
          setUserType(userTypeFromApi);
          // ✅ Redirect based on type
          if (userTypeFromApi  === "super admin") {
            setStep("dashboard");
          } else if (userTypeFromApi  === "visitor") {
            setStep("visitor-form");
          }
        }}
      />
    );
  }
  // Step 3: Visitor form (direct flow after OTP)
  if (step === "visitor-form") {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/visitor-form/:id"
            element={
              <ProtectedRoute>
                <AddVisitors />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/visitor-form/:id" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Step 4: Dashboard flow (client side)
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} onLogout={handleLogout} />
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