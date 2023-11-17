import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <NavLink>Home</NavLink>
                <NavLink>Document Request</NavLink>
                <NavLink>Report Filling</NavLink>
                <NavLink>Community Bulletin</NavLink>
                <NavLink>Appointments</NavLink>
                <NavLink>Resource Directory</NavLink>
            </nav>
            <Outlet />
        </>
    );
};

export default Layout;
