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
            <div className="fixed w-[256px] h-screen justify-start overflow-auto top-[0] left-0 bg-white shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.30)]">
                {user.role === "admin" && (
                    <Link
                        key="admin-dashboard"
                        href="/admin-dashboard"
                        className="flex justify-center mt-6 mx-auto w-[167px] h-[58px]"
                    >
                        <img src="/images/navbarLogo.png" alt="" />
                    </Link>
                )}
                {user.role === "resident" && (
                    <Link
                        key="resident-dashboard"
                        href="/dashboard"
                        className="flex justify-center mt-6 mx-auto w-[167px] h-[58px]"
                    >
                        <img src="/images/navbarLogo.png" alt="" />
                    </Link>
                )}

                <div className="flex items-center justify-center gap-4 px-10 my-8">
                    {user.role === "admin" && (
                        <NavbarLinkFirstRow
                            key="admin-account"
                            href="/admin-account"
                            icon={<Account />}
                        />
                    )}
                    {user.role === "resident" && (
                        <NavbarLinkFirstRow
                            key="resident-account"
                            href="/account"
                            icon={<Account />}
                        />
                    )}
                    {user.role === "admin" && (
                        <NavbarLinkFirstRow
                            key="admin-settings"
                            href="/admin-settings"
                            icon={<Settings />}
                        />
                    )}
                    {user.role === "resident" && (
                        <NavbarLinkFirstRow
                            key="resident-settings"
                            href="/settings"
                            icon={<Settings />}
                        />
                    )}
                    {user.role === "admin" && (
                        <NavbarLinkFirstRow
                            key="admin-notification"
                            href="/admin-notification"
                            icon={<Notification />}
                        />
                    )}
                    {user.role === "resident" && (
                        <NavbarLinkFirstRow
                            key="resident-notification"
                            href="/notification"
                            icon={<Notification />}
                        />
                    )}
                </div>

                <div className="m-5">
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        {user.role === "admin" && (
                            <NavbarLinkSecondRow
                                key="admin-dashboard"
                                href="/admin-dashboard"
                                icon={<Home />}
                                label="Home"
                            />
                        )}
                        {user.role === "resident" && (
                            <NavbarLinkSecondRow
                                key="resident-dashboard"
                                href="/dashboard"
                                icon={<Home />}
                                label="Home"
                            />
                        )}
                    </div>
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        {user.role === "admin" && (
                            <NavbarLinkSecondRow
                                key="admin-community-bulletin"
                                href="/admin-community-bulletin"
                                icon={<Bulletin />}
                                label="Community Bulletin"
                            />
                        )}
                        {user.role === "resident" && (
                            <NavbarLinkSecondRow
                                key="resident-community-bulletin"
                                href="/community-bulletin"
                                icon={<Bulletin />}
                                label="Community Bulletin"
                            />
                        )}
                    </div>
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        {user.role === "admin" && (
                            <NavbarLinkSecondRow
                                key="admin-document-request"
                                href="/admin-document-request"
                                icon={<Documents />}
                                label="Document Request"
                            />
                        )}
                        {user.role === "resident" && (
                            <NavbarLinkSecondRow
                                key="resident-document-request"
                                href="/document-request"
                                icon={<Documents />}
                                label="Document Request"
                            />
                        )}
                    </div>
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        {user.role === "admin" && (
                            <NavbarLinkSecondRow
                                key="admin-appointments"
                                href="/admin-appointments"
                                icon={<Appointments />}
                                label="Appointments"
                            />
                        )}
                        {user.role === "resident" && (
                            <NavbarLinkSecondRow
                                key="resident-appointments"
                                href="/appointments"
                                icon={<Appointments />}
                                label="Appointments"
                            />
                        )}
                    </div>
                    <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                        {user.role === "admin" && (
                            <NavbarLinkSecondRow
                                key="admin-resource-directory"
                                href="/admin-resource-directory"
                                icon={<Resource />}
                                label="Resource Directory"
                            />
                        )}
                        {user.role === "resident" && (
                            <NavbarLinkSecondRow
                                key="resident-resource-directory"
                                href="/resource-directory"
                                icon={<Resource />}
                                label="Resource Directory"
                            />
                        )}
                    </div>
                    <div className="font-medium border-2 p-3 hover:bg-[#f3f3f3]">
                        {user.role === "admin" && (
                            <NavbarLinkSecondRow
                                key="admin-report-filing"
                                href="/admin-report-filing"
                                icon={<Report />}
                                label="Report Filing"
                            />
                        )}
                        {user.role === "resident" && (
                            <NavbarLinkSecondRow
                                key="resident-report-filing"
                                href="/report-filing"
                                icon={<Resource />}
                                label="Report Filing"
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
