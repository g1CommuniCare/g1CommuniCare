"use client";

import { useAuth } from "@/useContext/UseContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Account() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [myReport, setMyReport] = useState([]);
    const [myRequest, setMyRequest] = useState([]);
    const [currentMyReportPage, setCurrentMyReportPage] = useState(1);
    const [currentMyRequestPage, setCurrentMyRequestPage] = useState(1);
    const { user, logout } = useAuth();

    const residentId = user.residentId;
    const firstName = user.firstName;
    const fullname = firstName + " " + user.middleInitial + " " + user.lastName;
    const email = user.email;
    const birthDate = user.date.join(" / ");
    const address = user.address;
    // // DISPLAYS THE DEFAULT IMAGE
    // // User's fullname: Don Massimo -> DM(defualt profile image)
    const defaultProfileImage = (firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();

    function handleFileSelect(event) {
        const file = event.target.files[0];
        setSelectedFile(file);

        const previewURL = URL.createObjectURL(file);
        setPreviewImage(previewURL);
    }
    async function handleFileUpload() {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);

            try {
                const uploadResponse = await fetch(
                    `http://localhost:8080/resident/${user.residentId}/uploadImage`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!uploadResponse.ok) {
                    throw new Error(`HTTP error! status: ${uploadResponse.status}`);
                }

                const result = await uploadResponse.text();
                console.log("Image upload successful", result);

                // Fetch the image after successful upload
                fetchUpdatedImage();
            } catch (error) {
                console.error("Error uploading image", error);
            }
        }
    }

    const [updatedImage, setUpdatedImage] = useState("");
    async function fetchUpdatedImage() {
        const res = await axios(`http://localhost:8080/resident/getResidentById/${residentId}`);
        const data = res.data;
        setUpdatedImage(data);
    }
    // console.log("THE NEW IMAGE", updatedImage);
    // console.log("THE OLD IMAGE", user.profileImage);

    useEffect(() => {
        fetchUpdatedImage();
    }, []);

    function handleLogout() {
        logout();
    }

    async function fetchReport() {
        setIsLoading(true);
        try {
            const res = await axios(
                `http://localhost:8080/reports-filing/getAllReportsFilingByResidentId/${user.residentId}`
            );
            const data = res.data;
            setMyReport(data);
        } catch (error) {
            console.log("Error Fetching My Report");
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchRequest() {
        setIsLoading(true);
        try {
            const res = await axios(
                `http://localhost:8080/document-requests/document-requests-per-resident/${user.residentId}`
            );
            const data = res.data;
            setMyRequest(data);
        } catch (error) {
            console.log("Error Fetching My Report");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchReport();
        fetchRequest();
    }, []);

    // Calculate the starting and ending index for the current page
    const startIndexMyReports = (currentMyReportPage - 1) * rowsPerPage;
    const endIndexMyReports = startIndexMyReports + rowsPerPage;

    // Calculate the starting and ending index for the current page
    const startIndexMyRequests = (currentMyRequestPage - 1) * rowsPerPage;
    const endIndexMyRequests = startIndexMyRequests + rowsPerPage;

    // Get the rows to display for the current page
    const currentPageRowsMyReports = myReport.slice(startIndexMyReports, endIndexMyReports);
    const currentPageRowsMyRequests = myRequest.slice(startIndexMyRequests, endIndexMyRequests);

    return (
        <div
            className="w-screen bg-cover"
            style={{ backgroundImage: 'url("images/profileBackgroundImage.png")' }}
        >
            <>
                <div className="p-5 ml-8">
                    <h1 className="text-4xl font-bold">
                        Good day, <i>{firstName}!</i>
                    </h1>
                    <div className="flex justify-between mr-auto">
                        <p>Welcome to your profile.</p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-800 p-2 text-xs rounded-full w-[113px] text-white font-bold"
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>

                <div className="flex justify-between gap-8 rounded-[22px] w-11/12 p-7 bg-slate-100/70 ml-16 mt-8 mb-10">
                    <div className="relative">
                        <div className="mt-24 py-24 px-10 bg-white w-[511px] rounded-[22px]">
                            <div className="flex flex-col">
                                <ChangeProfile
                                    user={user}
                                    previewImage={previewImage}
                                    updatedImage={updatedImage}
                                    defaultProfileImage={defaultProfileImage}
                                    handleFileSelect={handleFileSelect}
                                    handleFileUpload={handleFileUpload}
                                />
                            </div>
                            <div className="text-center">
                                <h2 className="font-semibold text-xl">{fullname}</h2>
                                <span className="text-slate-600">RES-{residentId}</span>
                            </div>
                            <div className="mt-8">
                                <span className="text-xs text-slate-600">Email</span>
                                <p className="mb-1">{email}</p>
                                <div className="w-full h-[1.8px] bg-slate-300/80 sm:mt-0" />
                            </div>
                            <div className="mt-4">
                                <span className="text-xs text-slate-600">Birthday</span>
                                <p className="mb-1">{birthDate}</p>
                                <div className="w-full h-[1.8px] bg-slate-300/80 sm:mt-0" />
                            </div>
                            <div className="mt-4">
                                <span className="text-xs text-slate-600">Address</span>
                                <p className="mb-1">{address}</p>
                                <div className="w-full h-[1.8px] bg-slate-300/80 sm:mt-0" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-7 w-full">
                        <div className="bg-white rounded-[22px] py-6 px-8">
                            <h3 className="text-lg mb-3 font-bold">My Reports</h3>
                            <div className="w-full overflow-x-auto">
                                <table
                                    className="w-full text-left table-fixed border border-separate rounded border-slate-200"
                                    cellSpacing="0"
                                    cellPadding={10}
                                >
                                    <tbody>
                                        {isLoading && <LoadingTable />}
                                        {currentPageRowsMyReports?.map(
                                            ({ repfilId, reportType, reportStatus }) => (
                                                <MyReportTable
                                                    key={repfilId}
                                                    repfilId={repfilId}
                                                    reportType={reportType}
                                                    reportStatus={reportStatus}
                                                />
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <Pagination
                                    total={myReport.length}
                                    current={currentMyReportPage}
                                    onPageChange={setCurrentMyReportPage}
                                />
                            </div>
                        </div>
                        <div className="bg-white rounded-[22px] py-6 px-8">
                            <h3 className="text-lg mb-3 font-bold">My Requests</h3>
                            <div className="w-full overflow-x-auto">
                                <table
                                    className="w-full text-left table-fixed border border-separate rounded border-slate-200"
                                    cellSpacing="0"
                                    cellPadding={10}
                                >
                                    <tbody>
                                        {isLoading && <LoadingTable />}
                                        {currentPageRowsMyRequests?.map(
                                            ({ docreqId, documentType, documentStatus }) => (
                                                <MyRequestTable
                                                    key={docreqId}
                                                    docreqId={docreqId}
                                                    documentType={documentType}
                                                    documentStatus={documentStatus}
                                                />
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <Pagination
                                    total={myReport.length}
                                    current={currentMyRequestPage}
                                    onPageChange={setCurrentMyRequestPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

function ChangeProfile({
    previewImage,
    updatedImage,
    defaultProfileImage,
    handleFileSelect,
    handleFileUpload,
}) {
    return (
        <>
            <label className="block">
                {previewImage ? (
                    <p className="absolute inset-0 mx-auto inline-flex h-48 w-48 items-center justify-center border border-emerald-500">
                        <img
                            src={previewImage}
                            alt="Selected Image"
                            className="h-48 w-48 rounded-full border border-emerald-500"
                        />
                    </p>
                ) : (
                    // user.profileImage === null ? (
                    //     <p className="absolute inset-0 mx-auto inline-flex h-48 w-48 font-bold text-7xl rounded-full items-center justify-center bg-gray-300">
                    //         {defaultProfileImage}
                    //     </p>
                    updatedImage &&
                    updatedImage.map(({ residentId, imageFormat, profileImage }) => (
                        <p
                            key={residentId}
                            className="absolute inset-0 mx-auto inline-flex h-48 w-48 items-center justify-center "
                        >
                            <img
                                src={`data:image/${imageFormat};base64,${profileImage}`}
                                alt={defaultProfileImage}
                                className="h-48 w-48 rounded-full border-emerald-500 border-4"
                            />
                        </p>
                    ))
                )}

                <span className="sr-only">Choose profile photo</span>
                <input
                    type="file"
                    onChange={handleFileSelect}
                    className="block w-full ml-28 mb-2 mt-6 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-500"
                />
            </label>
            <button onClick={handleFileUpload} className="mb-6">
                Upload Image
            </button>
        </>
    );
}

function LoadingTable() {
    return (
        <>
            <tr className="odd:bg-gray-200 animate-pulse">
                <td className="h-12 pl-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-right pr-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
            </tr>
            <tr className="odd:bg-gray-200 animate-pulse">
                <td className="h-12 pl-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-right pr-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
            </tr>
            <tr className="odd:bg-gray-200 animate-pulse">
                <td className="h-12 pl-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-right pr-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
            </tr>
            <tr className="odd:bg-gray-200 animate-pulse">
                <td className="h-12 pl-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-right pr-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
            </tr>
            <tr className="odd:bg-gray-200 animate-pulse">
                <td className="h-12 pl-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
                <td className="h-12 text-right pr-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black"></td>
            </tr>
        </>
    );
}

function MyReportTable({ repfilId, reportType, reportStatus }) {
    return (
        <>
            <tr key={repfilId} className="odd:bg-gray-200">
                <td className="h-12 pl-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                    REP-{repfilId}
                </td>
                <td className="h-12 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                    {reportType}
                </td>
                <td className="h-12 text-right pr-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                    {reportStatus}
                </td>
            </tr>
        </>
    );
}

function MyRequestTable({ docreqId, documentType, documentStatus }) {
    return (
        <>
            <tr key={docreqId} className="odd:bg-gray-200">
                <td className="h-12 pl-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                    REP-{docreqId}
                </td>
                <td className="h-12 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                    {documentType}
                </td>
                <td className="h-12 text-right pr-5 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                    {documentStatus}
                </td>
            </tr>
        </>
    );
}

const rowsPerPage = 5; // Number of rows to display per page

// Pagination component
const Pagination = ({ total, current, onPageChange }) => {
    const numPages = Math.ceil(total / rowsPerPage);
    const pageNumbers = Array.from({ length: numPages }, (_, i) => i + 1);

    return (
        <div className="mt-4 flex justify-center space-x-2">
            <button
                onClick={() => onPageChange(current - 1)}
                disabled={current === 1}
                className={
                    "flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-emerald-300 active:bg-emerald-300/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    ></path>
                </svg>
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-emerald-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  ${
                        current === number ? "bg-emerald-700 text-white" : "bg-white-200"
                    }`}
                >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        {number}
                    </span>
                </button>
            ))}
            <button
                onClick={() => onPageChange(current + 1)}
                disabled={current === numPages}
                className={
                    "flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-emerald-300 active:bg-emerald-300/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    ></path>
                </svg>
            </button>
        </div>
    );
};
