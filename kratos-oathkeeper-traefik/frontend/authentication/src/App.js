import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RecoveryPage from "./pages/RecoveryPage";
import MFAPage from "./pages/MFAPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProfilePage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/resetPassword" element={<ResetPasswordPage/>} />
          <Route path="/recovery" element={<RecoveryPage/>} />
          <Route path="/mfa" element={<MFAPage/>} />
          <Route path="/error" element={<ErrorPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
