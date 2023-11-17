import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogin() {
        setIsLoggedIn(true);
    }

    return (
        <Router>
            {isLoggedIn ? (
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route index element={<Home />} />
                </Routes>
            ) : (
                <Login handleLogin={handleLogin} />
            )}
        </Router>
    );
};

export default App;
