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
        1000
    );

    console.log(data)

    // GET THE ISVERIFIED FALSE
    const verifiedData = data?.filter((user) => user.isVerified === false && user.deleted === false);

    // Define state to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    // Define state to store approved data
    const [approvedData, setApprovedData] = useState(null);

    const [denyData, setDenyData] = useState(null);

    function handleApprove(firstName, userId) {
        // Pass the data to the PopUp component
        setApprovedData({ firstName, userId });
        console.log(userId);
        // Show the modal
        setShowModal(true);
    }

    function handleDeny(firstName, userId) {
        // Pass the data to the PopUp component
        setDenyData({ firstName, userId });
        console.log(userId);
        // Show the modal
        setShowModal(true);
    }

    async function handleYes(action) {
        if (action === "approve") {
            const userId = approvedData.userId;
            console.log(userId);
            await axios.post(`http://localhost:8080/resident/verify/${userId}`, {
                isVerified: true,
            });

            // AFTER GETTING THE VERIFIED DATA FROM THE FILTER ABOVE THAT I HAVE STORED IN THE VERIFIEDDATA
            // IT WILL POST THE NOTIFICATION TO THE USER
            if (verifiedData) {
                await axios.post(`http://localhost:8080/notifications/${userId}`);
            }

            // Reset the approvedData state
            setApprovedData(null);
        } else if (action === "deny") {
            const userId = denyData.userId;
            console.log(userId);
            await axios.put(`http://localhost:8080/resident/${userId}/delete`, {
                deleted: true,
            });
            setDenyData(null);
        }

        // Hide the modal
        setShowModal(false);
    }

    function handleNo() {
        // Hide the modal
        setShowModal(false);
        // Reset the approvedData state
        setApprovedData(null);
        // Reset the denyData state
        setDenyData(null);
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
                            title="Are you sure you want to Approve"
                            handleYes={() => handleYes("approve")}
                            handleNo={handleNo}
                            showModal={showModal}
                        />
                    )}
                    {denyData && (
                        <PopUp
                            denyData={denyData}
                            title="Are you sure you want to Delete"
                            handleYes={() => handleYes("deny")}
                            handleNo={handleNo}
                            showModal={showModal}
                        />
                    )}
                </>
            )}
        </>
    );
}
