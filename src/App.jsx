import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserLogin from './components/Userlogin';
import VendorLogin from './components/Vendorlogin';
import UserHome from './components/home';
import VendorHome from './components/vendordashboard';
import UserProfile from './components/UserProfile';
import VendorProfile from './components/VendorProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/vendor-home" element={<VendorHome />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/vendor-profile" element={<VendorProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;