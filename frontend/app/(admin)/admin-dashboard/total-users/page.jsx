"use client";

import SkeletonTable from "@/app/components/SkeletonTable";
import TableForUsers from "@/app/components/admin/TableForUsers";
import useFetch from "@/app/utils/FetchData";

export default function TotatUsers() {
    const { data, isLoading, error } = useFetch("http://localhost:8080/resident/getAllResident", 2000);

    return (
        <>
            {isLoading && (
                <SkeletonTable
                    title="Verified Users"
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
                    title="Verified Users"
                    firstName="First Name"
                    lastName="Last Name"
                    middleInitial="Middle Initial"
                    email="Email Address"
                    address="Address"
                    contactNumber="Contact Number"
                    showIsVerified={false}
                    idFieldName="residentId"
                    data={data}
                />
            )}
        </>
    );
}
