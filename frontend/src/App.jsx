import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Home";
import Account from "./pages/resident/Account";
import Appointments from "./pages/resident/Appointments";
import CommunityBulletin from "./pages/resident/CommunityBulletin";
import DocumentRequest from "./pages/resident/DocumentRequest";
import Home from "./pages/resident/Home";
import Notifications from "./pages/resident/Notifications";
import ReportFilling from "./pages/resident/ReportFilling";
import ResourceDirectory from "./pages/resident/ResourceDirectory";
import Settings from "./pages/resident/Settings";
import UserNavbar from "./components/UserNavbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function handleLogin(loggedIn, adminStatus = false) {
    setIsLoggedIn(loggedIn);
    setIsAdmin(adminStatus);
  }

  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          <Route element={<Layout isAdmin={isAdmin} />}>
            <Route path="/account" element={<Account />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/community-bulletin" element={<CommunityBulletin />} />
            <Route path="/document-request" element={<DocumentRequest />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/resource-directory" element={<ResourceDirectory />} />
            <Route path="/report-filling" element={<ReportFilling />} />

            {/* ADMIN ROUTE */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </Router>
  );
};

export default App;
