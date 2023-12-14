"use client";

import useFetch from "@/app/api/UseData";
import SkeletonTable from "@/app/components/SkeletonTable";
import TableForUsers from "@/app/components/admin/TableForUsers";

export default function VerifiedUsers() {
    const { data, isLoading, error } = useFetch(
        "http://localhost:8080/resident/getAllResident",
        1000
    );

    // GET THE ISVERIFIED TRUE
    const verifiedData = data?.filter((user) => user.isVerified === true);
    // console.log(verifiedData);

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
                    isVerified="Verified"
                    showSvg={true}
                    showCheckButton={false}
                    showXButton={false}
                    idFieldName="residentId"
                    data={verifiedData}
                />
            )}
        </>
    );
}
