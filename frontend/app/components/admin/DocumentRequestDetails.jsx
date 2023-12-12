"use client";
import CopySvg from "@/app/utils/CopySvg";
import SuccessPopup from "@/app/utils/SuccessPopUp";
import { useState } from "react";

export default function DocumentRequestDetails({ data, fullName }) {
    const [isShowing, setIsShowing] = useState(false);
    const [isSuccessPopupShowing, setIsSuccessPopupShowing] = useState(false);

    function handleSuccessPopupConfirm() {
        setIsSuccessPopupShowing(false);
        setIsShowing(false); // Optionally close the registration modal as well
    }

    function handleCopy() {
        alert("Copied!");
    }

    function handleDeny() {
        setShowDenyPopup(true); // Show the Deny popup
    }
    const [showApprovalPopup, setShowApprovalPopup] = useState(false);
    const [claimDate, setClaimDate] = useState("");
    const [claimTime, setClaimTime] = useState("");

    const handleApproveClick = () => {
        setShowApprovalPopup(true); // Show the approval popup
    };

    const handleApprovalSubmit = async () => {
        // Construct the full date-time string in ISO format
        const dateTime = `${claimDate}T${claimTime}`;
        // Call your API to set the claim date
        // Here, you would use fetch or axios to PUT the data to your API
        const response = await fetch(
            `http://localhost:8080/document-requests/${data.docreqId}/set-claim-date?newClaimDate=${dateTime}`,
            {
                method: "PUT",
            }
        );

        const result = await response.text();
        setShowApprovalPopup(false); // Close the popup after submission
        setIsSuccessPopupShowing(true);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [showDenyPopup, setShowDenyPopup] = useState(false); // State for Deny popup
    const [denyReason, setDenyReason] = useState(""); // State for Deny reason

    const handlePopupOpen = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const validIdImageSrc = `data:image/${data.imageFormat};base64,${data.validId}`;

    function formatDate(dateString) {
        // Ensure dateString is a string
        const dateStr = String(dateString);

        // Replace commas with hyphens to get the format "YYYY - MM - DD"
        return dateStr.replace(/,/g, "-");
    }

    const handleDenySubmit = async () => {
        // Call your API to set the denial reason
        const response = await fetch(
            `http://localhost:8080/document-requests/${data.docreqId}/set-denial-reason?newDenialReason=${denyReason}`,
            {
                method: "PUT",
            }
        );
        const result = await response.text();
        setShowDenyPopup(false); // Close the Deny popup after submission
        setIsSuccessPopupShowing(true);
    };

    return (
        <div className="flex flex-col w-full p-5">
            <div className="w-[1094px] bg-gray-200/80 rounded-2xl mx-auto p-5">
                <div className="flex justify-between">
                    <div className="w-[515px] bg-white rounded-2xl">
                        <h1 className="text-xs text-gray-400 p-3">Resident Information</h1>
                        <div className="px-8 pt-1 pb-8">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 leading-3">Resident ID:</p>
                                    <p className="pb-2 font-medium">
                                        RES-{data.resident.residentId}
                                    </p>
                                </div>
                                <CopySvg handleCopy={handleCopy} />
                            </div>
                            <>
                                <p className="text-xs text-gray-500 leading-3">Name:</p>
                                <p className="pb-2 font-medium">{fullName}</p>
                            </>
                            <>
                                <p className="text-xs text-gray-500 leading-3">Email:</p>
                                <p className="pb-2 font-medium">{data.email}</p>
                            </>
                            <>
                                <p className="text-xs text-gray-500 leading-3">
                                    Contact Information:
                                </p>
                                <p className="pb-2 font-medium">{data.contactNumber}</p>
                            </>
                            <>
                                <p className="text-xs text-gray-500 leading-3">Address Line</p>
                                <p className="font-medium">{data.address}</p>
                            </>
                        </div>
                    </div>
                    <div className="w-[515px] bg-white rounded-2xl">
                        <h1 className="text-xs text-gray-400 p-3">Request Information</h1>
                        <div className="px-8 pt-1 pb-8">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 leading-3">Request ID:</p>
                                    <p className="pb-2 font-medium">RES-{data.docreqId}</p>
                                </div>
                                <CopySvg handleCopy={handleCopy} />
                            </div>
                            <>
                                <p className="text-xs text-gray-500 leading-3">Day of Request:</p>
                                <p className="pb-2 font-medium">{formatDate(data.requestDate)}</p>
                            </>
                            <>
                                <p className="text-xs text-gray-500 leading-3">Document Type:</p>
                                <p className="pb-2 font-medium">{data.documentType}</p>
                            </>
                            <>
                                <p className="text-xs text-gray-500 leading-3">Purpose:</p>
                                <p className="pb-2 font-medium">{data.purpose}</p>
                            </>
                            <>
                                <p className="text-xs text-gray-500 leading-3">Valid ID:</p>
                                <p className="font-medium">
                                    {data.validIdType}
                                    <button
                                        onClick={handlePopupOpen}
                                        className="bg-[#3F948B] hover:bg-[#337770] w-[148px] text-sm text-white p-2 rounded-lg ml-6 mr-6"
                                    >
                                        Show Valid ID
                                    </button>
                                </p>
                            </>

                            {showPopup && (
                                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-xl z-50">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={handlePopupClose}
                                                className="text-lg font-semibold"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-6 h-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="mt-4">
                                            <img
                                                src={validIdImageSrc}
                                                alt="Valid ID"
                                                className="max-w-xs mx-auto"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showApprovalPopup && (
                                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
                                    <div className="fixed inset-0 transition-opacity backdrop-filter backdrop-blur-sm">
                                        <div className="absolute inset-0 bg-gray-500 opacity-70"></div>
                                    </div>

                                    <div className="max-w-xl rounded-3xl border border-emerald-100 bg-white p-2 shadow-lg sm:p-4 lg:p-8 transform scale-100 transition-transform ease-in-out duration-300">
                                        <div className="bg-white p-4 w-full max-w-xl">
                                            <div className="sm:flex sm:justify-center items-center">
                                                <div className="mt-4 text-center sm:mt-0 sm:text-left w-9/12">
                                                    <h3 className="text-3xl leading-6 font-bold text-gray-900 mb-8 text-center">
                                                        Set Pickup Date
                                                    </h3>
                                                    <div className="mt-2 text-center">
                                                        <div className="mt-2 w-full flex flex-row justify-between gap-6">
                                                            <input
                                                                type="date"
                                                                value={claimDate}
                                                                onChange={(e) =>
                                                                    setClaimDate(e.target.value)
                                                                }
                                                                className="peer relative w-96 h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                                            />
                                                            <input
                                                                type="time"
                                                                value={claimTime}
                                                                onChange={(e) =>
                                                                    setClaimTime(e.target.value)
                                                                }
                                                                className="peer relative w-96 h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                                            />
                                                        </div>
                                                        <div className="flex justify-center mt-8">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setShowApprovalPopup(false)
                                                                }
                                                                className="mr-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={handleApprovalSubmit}
                                                                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                                                            >
                                                                Approve
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showDenyPopup && (
                                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-xl z-50">
                                        <div className="mt-4 text-center sm:mt-0 sm:text-left w-10/12">
                                            <h3 className="text-3xl leading-6 font-bold text-gray-900 mb-8 text-center">
                                                Indicate Denial Reasons
                                            </h3>
                                            <div className="mt-2 text-center">
                                                <textarea
                                                    value={denyReason}
                                                    onChange={(e) => setDenyReason(e.target.value)}
                                                    className="w-full h-24 border border-gray-300 rounded-md p-2"
                                                    placeholder="Enter Denial Reasons"
                                                ></textarea>
                                                <div className="flex justify-center mt-8">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowDenyPopup(false)}
                                                        className="mr-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleDenySubmit}
                                                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#F57E77] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {isSuccessPopupShowing && (
                                <SuccessPopup
                                    title="Request Updated!"
                                    message="Document request status has been updated successfully!"
                                    onConfirm={handleSuccessPopupConfirm}
                                    onCancel={() => setIsSuccessPopupShowing(false)}
                                    btnMessage="Close"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleApproveClick}
                    className="bg-[#3F948B] hover:bg-[#337770] w-[148px] text-sm text-white p-2 rounded-lg mt-8 mr-6"
                >
                    Approve
                </button>
                <button
                    onClick={handleDeny}
                    className="bg-[#F57E77] hover:bg-[#ac5853] w-[148px] text-sm text-white p-2 rounded-lg"
                >
                    Deny
                </button>
            </div>
        </div>
    );
}
