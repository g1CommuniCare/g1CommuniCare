"use client";

import useFetch from "@/app/api/FetchData";
import AdminFirstRow from "@/app/utils/admin/AdminFirstRow";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SubNavbar() {
    const {
        data: residentData,
        isLoading: residentIsLoading,
        error: residentIsError,
    } = useFetch("http://localhost:8080/resident/getAllResident");

    const [totalUsers, setTotalUsers] = useState("");
    const [verifiedUsers, setVerifiedUsers] = useState("");
    const [pendingUsers, setPendingUsers] = useState("");

    useEffect(() => {
        if (residentData) {
            setTotalUsers(residentData?.length);
            setVerifiedUsers(residentData?.filter((users) => users.isVerified).length);
            setPendingUsers(residentData?.filter((users) => !users.isVerified).length);
        }
    }, [residentData]);

    const {
        data: adminData,
        isLoading: adminIsLoading,
        error: adminIsError,
    } = useFetch("http://localhost:8080/admin/getAllAdmins");

    const totalAdmins = adminData?.length;

    // useEffect(() => {
    //     console.log(adminData);
    // }, [adminData]);

    return (
        <>
            <div className="text-5xl pb-10 font-bold">Dashboard</div>
            <div className="flex space-x-5 h-[90px]">
                <Link
                    href="/admin-dashboard/total-users"
                    className="flex gap-6 items-center justify-left bg-white h-full w-1/4 pl-5 border border-DDE1E6"
                >
                    <AdminFirstRow
                        img={"/admin/people-people.png"}
                        title="Total Users"
                        numbers={totalUsers}
                    />
                </Link>

                <Link
                    href="/admin-dashboard/verified-users"
                    className="flex gap-6 items-center justify-left bg-white h-full w-1/4 pl-5 border border-DDE1E6"
                >
                    <AdminFirstRow
                        img={"/admin/checked-user-male.png"}
                        title="Verified Users"
                        numbers={verifiedUsers}
                    />
                </Link>

                <Link
                    href="/admin-dashboard/pending-users"
                    className="flex gap-6 items-center justify-left bg-white h-full w-1/4 pl-5 border border-DDE1E6"
                >
                    <AdminFirstRow
                        img={"/admin/delete-user.png"}
                        title="Pending Users"
                        numbers={pendingUsers}
                    />
                </Link>

                <Link
                    href="/admin-dashboard/admins"
                    className="flex gap-6 items-center justify-left bg-white h-full w-1/4 pl-5 border border-DDE1E6"
                >
                    <AdminFirstRow img={"/admin/admin.png"} title="Admins" numbers={totalAdmins} />
                </Link>
            </div>
        </>
    );
}
