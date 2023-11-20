import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="flex h-full">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
