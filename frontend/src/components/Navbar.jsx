import React from "react";
import { Link, NavLink } from "react-router-dom";
import Account from "../assets/Account";
import Appointments from "../assets/Appointments";
import Bulletin from "../assets/Bulletin";
import Documents from "../assets/Documents";
import Home from "../assets/Home";
import Notification from "../assets/Notification";
import Report from "../assets/Report";
import Resource from "../assets/Resource";
import Settings from "../assets/Settings";

const Navbar = () => {
  return (
    <nav className="flex flex-row items-start justify-start w-[258px]">
      <div className="!sticky w-[256px] h-screen justify-start overflow-auto top-[0]">
        <Link
          to="/dashboard"
          className="flex justify-center mt-6 mx-auto w-[167px] h-[58px]"
        >
          <img src="images/navbarLogo.png" alt="" />
        </Link>

        <div className="flex items-center justify-center gap-4 px-10 my-8">
          <Link to="/account" className="flex items-center justify-center">
            <Account />
          </Link>
          <Link to="/settings" className="flex items-center justify-center">
            <Settings />
          </Link>
          <Link
            to="/notifications"
            className="flex items-center justify-center"
          >
            <Notification />
          </Link>
        </div>

        <div className="m-5">
          <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
            <NavLink to="/dashboard">
              <p className="flex gap-2 items-center">
                <Home />
                Home
              </p>
            </NavLink>
          </div>
          <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
            <NavLink to="/community-bulletin">
              <p className="flex gap-2 items-center">
                <Bulletin />
                Community Bulletin
              </p>
            </NavLink>
          </div>
          <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
            <NavLink to="/document-request">
              <p className="flex gap-2 items-center">
                <Documents />
                Document Request
              </p>
            </NavLink>
          </div>
          <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
            <NavLink to="/appointments">
              <p className="flex gap-2 items-center">
                <Appointments />
                Appointments
              </p>
            </NavLink>
          </div>
          <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
            <NavLink to="/resource-directory">
              <p className="flex gap-2 items-center">
                <Resource />
                Resource Directory
              </p>
            </NavLink>
          </div>
          <div className="font-medium border-2 p-3 hover:bg-[#f3f3f3]">
            <NavLink to="/report-filling">
              <p className="flex gap-2 items-center">
                <Report />
                Report Filling
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
