"use client";

import useFetch from "@/app/api/UseData";
import PopUp from "@/app/components/PopUp";
import SkeletonTable from "@/app/components/SkeletonTable";
import TableForUsers from "@/app/components/admin/TableForUsers";
import axios from "axios";
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
        const verified = approvedData.isVerified;
        console.log(userId);
        await axios.post(`http://localhost:8080/resident/verify/${userId}`, {
            isVerified: true,
        });

        // GET THE VERIFIEDDATA === TRUE
        const verifiedData = data?.filter((user) => user.isVerified === true);
        console.log(verifiedData);

        if (verifiedData) {
            await axios.post(`http://localhost:8080/notifications/${userId}`);
        }

        console.log("user has been approved");
        // Hide the modal
        setShowModal(false);
        // Reset the approvedData state
        setApprovedData(null);
    }

    // const verified = data?.map(user => user.isVerified)
    // console.log(verified);

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
                    title="Pending Users"
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
                        title="Pending Users"
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
