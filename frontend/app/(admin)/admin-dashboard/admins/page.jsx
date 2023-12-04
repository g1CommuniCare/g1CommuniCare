"use client";

import useFetch from "@/app/api/UseData";
import SkeletonTable from "@/app/components/SkeletonTable";
import TableForUsers from "@/app/components/admin/TableForUsers";

export default function Admins() {
    const { data, isLoading, error } = useFetch("http://localhost:8080/admin/getAllAdmins", 2000);

    return (
        <>
            {isLoading && (
                <SkeletonTable
                    title="Admins"
                    firstName="First Name"
                    lastName="Last Name"
                    middleInitial="Middle Initial"
                    email="Email Address"
                    address="Address"
                    contactNumber="Contact Number"
                />
            )}
            {data && (
                <TableForUsers
                    title="Admins"
                    firstName="First Name"
                    lastName="Last Name"
                    middleInitial="Middle Initial"
                    email="Email Address"
                    contactNumber="Contact Number"
                    showIsVerified={false}
                    idFieldName="adminId"
                    data={data}
                />
            )}
        </>
    );
}
