import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import AdminNavbar from "./AdminNavbar";

const Layout = ({ isAdmin }) => {
    return (
        <>
            <div className="flex h-full">
                {isAdmin ? <AdminNavbar /> : <UserNavbar />}
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
