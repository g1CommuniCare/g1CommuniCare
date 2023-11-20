import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/resident/Home";
import Login from "./pages/Login";
import Notifications from "./pages/resident/Notifications";
import Account from "./pages/resident/Account";
import Settings from "./pages/resident/Settings";
import CommunityBulletin from "./pages/resident/CommunityBulletin";
import DocumentRequest from "./pages/resident/DocumentRequest";
import Appointments from "./pages/resident/Appointments";
import ResourceDirectory from "./pages/resident/ResourceDirectory";
import ReportFilling from "./pages/resident/ReportFilling";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/account" element={<Account />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/community-bulletin" element={<CommunityBulletin />} />
            <Route path="/document-request" element={<DocumentRequest />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/resource-directory" element={<ResourceDirectory />} />
            <Route path="/report-filling" element={<ReportFilling />} />
          </Route>
        </Routes>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </Router>
  );
};

export default App;
