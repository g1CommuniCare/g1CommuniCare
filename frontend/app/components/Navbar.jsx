"use client";

import { useAuth } from "@/useContext/UseContext";
import Link from "next/link";
import Account from "../assets/Account";
import Alert from "../assets/Alert";
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

    // THE USESTATE BELOW IS FOR THE RESPONSIVE
    // const [isToggleOpen, setIsToggleOpen] = useState(false);

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
                <p
                    // THE CLASSNAME BELOW IS FOR THE RESPONSIVE
                    // className={`flex gap-2 ${
                    //     isToggleOpen ? "items-center" : "max-lg:justify-center"
                    // }`}
                    className="flex gap-2"
                >
                    {icon}
                    {/* THE SPAN TAG BELOW IS FOR THE RESPONSIVE */}
                    {/* <span className={`${isToggleOpen ? "" : "max-lg:hidden"}`}>{label}</span> */}
                    {label}
                </p>
            </Link>
        );
    }

    return (
        <nav
            // THE CLASSNAME BELOW IS FOR THE RESPONSIVE
            // className={`flex flex-row items-start justify-start flex-none lg:w-[256px] ${
            //     isToggleOpen ? "w-[256px]" : "w-24"
            // }`}
            className="flex flex-row items-start justify-start flex-none w-[256px]"
        >
            <div
                // THE CLASSNAME BELOW IS FOR THE RESPONSIVE
                // className={`fixed h-screen justify-start lg:w-[256px] overflow-auto top-[0] left-0 bg-white shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.30)] transition-all ease-out duration-500 ${
                //     isToggleOpen ? "w-[256px]" : "w-24"
                // }`}
                className="fixed h-screen justify-start w-[256px] overflow-auto top-[0] left-0 bg-white shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.30)]"
            >
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
                        // THE CLASSNAME BELOW IS FOR THE RESPONSIVE
                        // className={`flex justify-center mt-6 mx-auto h-[58px] ${
                        //     isToggleOpen ? "w-[167px]" : "w-full"
                        // }`}
                        className="flex justify-center h-[58px] mt-6 mx-auto"
                    >
                        {/* THE IMG TAG BELOW IS FOR THE RESPONSIVE */}
                        {/* <img
                            src={`${isToggleOpen ? "/images/navbarLogo.png" : "/images/logo.png"}`}
                            alt=""
                        /> */}
                        <img src="/images/navbarLogo.png" alt="" />
                    </Link>
                )}

                <div
                    // THE CLASSNAME BELOW IS FOR THE RESPONSIVE
                    // className={`flex lg:flex-row justify-center items-center gap-4  my-8 ${
                    //     isToggleOpen ? "px-10" : "px-5 flex-col"
                    // }`}
                    className="flex lg:flex-row justify-center items-center gap-4  my-8"
                >
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
                    {/* THE BUTTON BELOW IS FOR THE RESPONSIVE */}
                    {/* <button
                        className={`relative order-10 block h-10 w-10 self-center mx-auto lg:hidden ${
                            isToggleOpen
                                ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                                : ""
                        } `}
                        onClick={() => setIsToggleOpen(!isToggleOpen)}
                        aria-expanded={isToggleOpen ? "true" : "false"}
                        aria-label="Toggle navigation"
                    >
                        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                            <span
                                aria-hidden="true"
                                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-blue-900 transition-all duration-300"
                            ></span>
                            <span
                                aria-hidden="true"
                                className="absolute block h-0.5 w-6 transform rounded-full bg-blue-900 transition duration-300"
                            ></span>
                            <span
                                aria-hidden="true"
                                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-blue-900 transition-all duration-300"
                            ></span>
                        </div>
                    </button> */}
                </div>

                <div className="mx-5 mb-6">
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
                    <div className={`font-medium border-x-2 p-3 hover:bg-[#f3f3f3] ${user.role === "admin" ? "border-t-2" : "border-2"}`}>
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
                                icon={<Report />}
                                label="Report Filing"
                            />
                        )}
                    </div>
                    {user.role === "admin" && (
                        <div className="font-medium border-2 p-3 hover:bg-[#f3f3f3]">
                            {user.role === "admin" && (
                                <NavbarLinkSecondRow
                                    key="admin-alert"
                                    href="/admin-alert"
                                    icon={<Alert />}
                                    label="Alert"
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
