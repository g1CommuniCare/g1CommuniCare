import React from "react";
import { Link, NavLink } from "react-router-dom";
import Account from "../assets/Account";
import Appointments from "../assets/Appointments";
import Bulletin from "../assets/Bulletin";
import Documents from "../assets/Documents";
import Home from "../assets/Home";
import Resource from "../assets/Resource";
import Settings from "../assets/Settings";
import FirstRowLinks from "./FirstRowLinks";
import NavigationPage from "./NavigationPage";
import Report from "../assets/Report";
import Notification from "../assets/Notification";

const AdminNavbar = () => {
    return (
        <nav className="flex flex-row items-start justify-start w-[258px]">
            <div className="!sticky w-[256px] h-screen justify-start overflow-auto top-[0]">
                <Link
                    to="/admin-dashboard"
                    className="flex justify-center mt-6 mx-auto w-[167px] h-[58px]"
                >
                    <img src="images/navbarLogo.png" alt="" />
                </Link>

                <div className="flex items-center justify-center gap-4 px-10 my-8">
                    <FirstRowLinks to="/admin-account">
                        <Account />
                    </FirstRowLinks>
                    <FirstRowLinks to="/admin-settings">
                        <Settings />
                    </FirstRowLinks>
                    <FirstRowLinks to="/admin-notifications">
                        <Notification />
                    </FirstRowLinks>
                </div>

                <div className="m-5">
                    <NavigationPage to="/admin-dashboard" icon={<Home />} label="Home" />
                    <NavigationPage
                        to="/admin-community-bulletin"
                        icon={<Bulletin />}
                        label="Community Bulletin"
                    />
                    <NavigationPage
                        to="/admin-document-request"
                        icon={<Documents />}
                        label="Document Request"
                    />
                    <NavigationPage
                        to="/admin-appointments"
                        icon={<Appointments />}
                        label="Appointments"
                    />
                    <NavigationPage
                        to="/admin-resource-directory"
                        icon={<Resource />}
                        label="Resource Directory"
                    />
                    <div className="font-medium border-2 p-3 hover:bg-[#f3f3f3]">
                        <NavLink to="/admin-report-filling">
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

export default AdminNavbar;
