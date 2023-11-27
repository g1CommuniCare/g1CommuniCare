"use client";

import { useAuth } from "@/useContext/UseContext";
import Link from "next/link";
import Account from "../assets/Account";
import Appointments from "../assets/Appointments";
import Bulletin from "../assets/Bulletin";
import Documents from "../assets/Documents";
import Home from "../assets/Home";
import Notification from "../assets/Notification";
import Report from "../assets/Report";
import Resource from "../assets/Resource";
import Settings from "../assets/Settings";

export default function Navbar() {
    const { user } = useAuth();
    function NavbarLinkFirstRow({ href, icon }) {
        return (
            <Link href={href} className="flex items-center justify-center">
                {icon}
            </Link>
        );
    }

    function NavbarLinkSecondRow({ href, icon, label }) {
        return (
            <Link href={href}>
                <p className="flex gap-2 items-center">
                    {icon}
                    {label}
                </p>
            </Link>
        );
    }

    return (
        <nav className="flex flex-row items-start justify-start w-[310px]">
            <div className="fixed w-[256px] h-screen justify-start overflow-auto top-[0] bg-white shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.30)]">
                <Link
                    href={user.role === "admin" ? "/admin-dashboard" : "/dashboard"}
                    className="flex justify-center mt-6 mx-auto w-[167px] h-[58px]"
                >
                    <img src="images/navbarLogo.png" alt="" />
                </Link>

                <div className="flex items-center justify-center gap-4 px-10 my-8">
                    <NavbarLinkFirstRow
                        href={user.role === "admin" ? "/admin-account" : "account"}
                        icon={<Account />}
                    />
                    <NavbarLinkFirstRow
                        href={user.role === "admin" ? "/admin-settings" : "settings"}
                        icon={<Settings />}
                    />
                    <NavbarLinkFirstRow
                        href={user.role === "admin" ? "/admin-notification" : "notification"}
                        icon={<Notification />}
                    />
                </div>

                <div className="m-5">
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        <NavbarLinkSecondRow href={user.role === "admin" ? "/admin-dashboard" : "/dashboard"} icon={<Home />} label="Home" />
                    </div>
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        <NavbarLinkSecondRow
                            href={
                                user.role === "admin"
                                    ? "/admin-community-bulletin"
                                    : "/community-bulletin"
                            }
                            icon={<Bulletin />}
                            label="Community Bulletin"
                        />
                    </div>
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        <NavbarLinkSecondRow
                            href={
                                user.role === "admin"
                                    ? "/admin-document-request"
                                    : "/document-request"
                            }
                            icon={<Documents />}
                            label="Document Request"
                        />
                    </div>
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        <NavbarLinkSecondRow
                            href={user.role === "admin" ? "/admin-appointments" : "/appointments"}
                            icon={<Appointments />}
                            label="Appointments"
                        />
                    </div>
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        <NavbarLinkSecondRow
                            href={
                                user.role === "admin"
                                    ? "/admin-resource-directory"
                                    : "/resource-directory"
                            }
                            icon={<Resource />}
                            label="Resource Directory"
                        />
                    </div>
                    <div className="font-medium border-2 p-3 hover:bg-[#f3f3f3]">
                        <NavbarLinkSecondRow
                            href={
                                user.role === "admin" ? "/admin-report-filing" : "/report-filing"
                            }
                            icon={<Report />}
                            label="Report Filing"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
