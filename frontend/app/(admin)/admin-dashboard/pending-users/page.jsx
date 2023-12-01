"use client";

import useFetch from "@/app/api/FetchData";
import PopUp from "@/app/components/PopUp";
import SkeletonTable from "@/app/components/SkeletonTable";
import TableForUsers from "@/app/components/admin/TableForUsers";
import { useState } from "react";

export default function PendingUsers() {
    const { data, isLoading, error } = useFetch(
        "http://localhost:8080/resident/getAllResident",
        2000
    );

    // GET THE ISVERIFIED FALSE
    const verifiedData = data?.filter((user) => user.isVerified === false);

    // Define state to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    // Define state to store approved data
    const [approvedData, setApprovedData] = useState(null);

    function handleApprove(firstName, userId) {
        // Pass the data to the PopUp component
        setApprovedData({ firstName, userId });
        // Show the modal
        setShowModal(true);
    }

    function handleDeny() {
        alert("Are you sure to deny?");
    }

    async function handleYes() {
        const userId = approvedData.userId;
        await fetch(`http://localhost:8080/resident/verify/${userId}`, {
            method: "POST", // Assuming you use a PUT request to update the verification status
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isVerified: true,
            }),
        });
        console.log("user has been approved");
        // Hide the modal
        setShowModal(false);
        // Reset the approvedData state
        setApprovedData(null);
    }

    function handleNo() {
        // Hide the modal
        setShowModal(false);
        // Reset the approvedData state
        setApprovedData(null);
    }

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
                <>
                    <TableForUsers
                        title="Verified Users"
                        firstName="First Name"
                        lastName="Last Name"
                        middleInitial="Middle Initial"
                        email="Email Address"
                        address="Address"
                        contactNumber="Contact Number"
                        isVerified="Approve/Deny"
                        showSvg={false}
                        showCheckButton={true}
                        handleApprove={handleApprove}
                        showXButton={true}
                        handleDeny={handleDeny}
                        idFieldName="residentId"
                        data={verifiedData}
                    />
                    {approvedData && (
                        <PopUp
                            approvedData={approvedData}
                            handleYes={handleYes}
                            handleNo={handleNo}
                            showModal={showModal}
                        />
                    )}
                </>
            )}
        </>
    );
}
