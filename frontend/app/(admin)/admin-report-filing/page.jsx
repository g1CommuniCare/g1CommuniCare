"use client";
import Search from "@/app/assets/Search";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import PDFGeneratorRep from '@/app/components/PDFGeneratorRep';
import ConfirmationPopup from "@/app/utils/ConfirmationPupUp";

// Helper function to format the date as "01/01/2023"
const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 3) {
        return ""; // Return an empty string for invalid date arrays
      }// Return an empty string for invalid date arrays
    

    const [year, month, day] = dateArray.slice(0, 3);

    // Use String.padStart to add leading zeros where needed
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');

    return `${formattedMonth}/${formattedDay}/${year}`;
};

const rowsPerPage = 10; // Number of rows to display per page

// Pagination component
const Pagination = ({ total, current, onPageChange }) => {
    const numPages = Math.ceil(total / rowsPerPage);
    const pageNumbers = Array.from({ length: numPages }, (_, i) => i + 1);

    return (
        <div className="pt-8 flex justify-center space-x-2">
            <button
                onClick={() => onPageChange(current - 1)}
                disabled={current === 1}
                className={`px-3 py-1 rounded cursor-pointer ${
                    current === 1
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                }`}
            >
                Previous
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-3 py-1 rounded cursor-pointer ${
                        current === number ? "bg-blue-700 text-white" : "bg-gray-200"
                    }`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => onPageChange(current + 1)}
                disabled={current === numPages}
                className={`px-3 py-1 rounded cursor-pointer ${
                    current === numPages
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default function ReportFiling() {
    const [reportFiled, setReportFiled] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    async function fetchReportsFiled() {
        setLoading(true);
        try {
            const res = await axios("http://localhost:8080/reports-filing/getAllNonDeletedReports");
            const data = res.data;
            setReportFiled(data);
        } catch (error) {
            console.log("Error Fetching Document Requests", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReportsFiled();
    }, []);

    // Calculate the starting and ending index for the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Get the rows to display for the current page
    const currentPageRows = reportFiled.slice(startIndex, endIndex);

    if (error) return <div>Error: {error}</div>;

    function handleStatus() {
        const sortedArray = [...reportFiled].sort((a, b) => {
            if (a.reportStatus === "Pending" && b.reportStatus !== "Pending") {
                return -1;
            } else if (a.reportStatus !== "Pending" && b.reportStatus === "Pending") {
                return 1;
            } else {
                return 0;
            }
        });

        setReportFiled(sortedArray);
    }

    const [showPDFModal, setShowPDFModal] = useState(false);

    function handleGeneratePDF() {
        event.preventDefault();
        setShowPDFModal(true);
    }

    function handleClosePDFModal() {
        setShowPDFModal(false);
    }

    return (
        <>
           <form className="px-5 pt-5">
                <div className="flex justify-center items-center px-5 pt-5">
                    <div className="relative w-full flex justify-start">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search />
                        </div>
                        <input
                            type="text"
                            id="default-search"
                            placeholder="Search"
                            className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        />
                    </div>
                    <button
                        onClick={handleGeneratePDF}
                        className="ml-2 inline-flex items-center py-1 mt-2 justify-center h-12 px-8 text-sm font-medium tracking-wide text-white transition duration-300 rounded-xl whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                    >
                        Export to PDF
                    </button>
                </div>
            </form>
            <div className="w-80% p-5">
                <div className="w-full overflow-x-auto">
                    <table
                        className="w-full text-left border border-separate rounded border-slate-200"
                        cellSpacing="0"
                        cellPadding={15}
                    >
                        <tbody>
                            <tr>
                                <TableHead
                                    fullName="Name"
                                    residentId="Resident ID"
                                    repfilId="Report ID"
                                    reportType="Report Type "
                                    dateReported="Date Reported"
                                    reportStatus="Status"
                                    handleStatus={handleStatus}
                                />
                            </tr>
                            {loading && <TableReportsFiledSkeleton />}
                            {currentPageRows.map(
                                ({
                                    repfilId,
                                    resident: { ...resident },
                                    reportType,
                                    dateReported,
                                    reportStatus,
                                }) => (
                                    <TableReportsFiled
                                        key={repfilId}
                                        repfilId={repfilId}
                                        imageFormat={resident.imageFormat}
                                        profileImage={resident.profileImage}
                                        residentId={resident.residentId}
                                        firstName={resident.firstName}
                                        lastName={resident.lastName}
                                        reportType={reportType}
                                        dateReported={dateReported}
                                        reportStatus={reportStatus}
                                        setReportFiled={setReportFiled}
                                    />
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <Pagination
                    total={reportFiled.length}
                    current={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
            {/* Conditionally render the PDF modal */}
            <Modal
                isOpen={showPDFModal}
                onRequestClose={handleClosePDFModal} // Close modal when requested
                contentLabel="PDF Modal"
            >
                <button onClick={handleClosePDFModal} className="absolute top-4 right-2 p-2 bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
                <PDFGeneratorRep data={reportFiled} />
            </Modal>
        </>
    );
}

function TableReportsFiled({
    repfilId,
    residentId,
    imageFormat,
    profileImage,
    firstName,
    lastName,
    reportType,
    dateReported,
    reportStatus,
    setReportFiled
}) {
    const router = useRouter();

    // State for confirmation popup
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [selectedRepfilId, setSelectedRepfilId] = useState(null);
    

    function handleClick() {
        router.push(`/admin-report-filing/${repfilId}`);
        console.log(repfilId);
    }

    const fullName = firstName + " " + lastName;
    const residentProfile = `data:image/${imageFormat};base64,${profileImage}`;
    const formattedDateReported = formatDate(dateReported);
    const formattedReportStatus = reportStatus ? reportStatus.replace(/"/g, '') : '';

    function handleDelete(event, repfilId) {
        event.stopPropagation();
        setSelectedRepfilId(repfilId);
        setShowConfirmationPopup(true);
    }

    const confirmDelete = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/reports-filing/soft-delete/${selectedRepfilId}`);

            if (response.status === 200) {
                console.log('Report soft-deleted successfully.');
                setReportFiled(currentReportsFiled => 
                    currentReportsFiled.filter(request => request.repfilId !== selectedRepfilId)
                );
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error soft-deleting Report', error);
        }
        setSelectedRepfilId(null);
        setShowConfirmationPopup(false);
    };

    const cancelDelete = () => {
        setSelectedRepfilId(null);
        setShowConfirmationPopup(false);
    };

    return (
        <>
            <tr onClick={handleClick} className="hover:bg-gray-200 bg-white cursor-pointer">
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-l-2 text-slate-700 border-slate-200">
                    <img
                        src={residentProfile}
                        alt={`${fullName}'s profile`}
                        className="relative inline-flex items-center justify-center w-10 h-10 text-lg text-white rounded-full bg-emerald-500"
                    />
                    <span className="ml-3">{fullName}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span>RES-{residentId}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span>REP-{repfilId}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span>{reportType}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span>{formattedDateReported}</span>
                </td>
                <td className="h-10 px-4 text-center text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span 
                        style={{
                        display: 'inline-block', // Needed to apply width to a span
                        width: '100px', // Set the desired width here
                        padding: '0.25rem 1rem',
                        borderRadius: '9999px',
                        backgroundColor: formattedReportStatus === 'Resolved' ? '#22f200' : // Green shade
                                        formattedReportStatus === 'Pending' ? '#ff9f2e' : // Yellow shade
                                        '#e5e7eb', // Default case, grey shade
                        color: 'black',
                        textAlign: 'center', // Centers the text within the fixed width
                        }}
                    >
                        {formattedReportStatus}
                    </span>
                </td>
                <td className="h-10 px-2 text-sm font-semibold transition duration-300 border-b-2 border-r-2 text-slate-700 border-slate-200">
                    <button onClick={(event) => handleDelete(event, repfilId)} className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    </button>
                </td>
            </tr>
                {/* existing table row code */}
    
                {showConfirmationPopup && (
                <ConfirmationPopup
                    message="Are you sure you want to delete this report?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </>
    );
}

function TableReportsFiledSkeleton() {
    return (
        <>
            <tr className="hover:bg-gray-200 bg-white animate-pulse cursor-pointer">
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-l-2 bg-gray-50 border-slate-200">
                    <span className="ml-3"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-r-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
            </tr>
            <tr className="hover:bg-gray-200 bg-white animate-pulse cursor-pointer">
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-l-2 bg-gray-50 border-slate-200">
                    <span className="ml-3"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-r-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
            </tr>
            <tr className="hover:bg-gray-200 bg-white animate-pulse cursor-pointer">
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-l-2 bg-gray-50 border-slate-200">
                    <span className="ml-3"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-r-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
            </tr>
            <tr className="hover:bg-gray-200 bg-white animate-pulse cursor-pointer">
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-l-2 bg-gray-50 border-slate-200">
                    <span className="ml-3"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-r-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
            </tr>
            <tr className="hover:bg-gray-200 bg-white animate-pulse cursor-pointer">
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-l-2 bg-gray-50 border-slate-200">
                    <span className="ml-3"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-r-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
            </tr>
            <tr className="hover:bg-gray-200 bg-white animate-pulse cursor-pointer">
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-l-2 bg-gray-50 border-slate-200">
                    <span className="ml-3"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-r-2 bg-gray-50 border-slate-200">
                    <span className="ml-2"></span>
                </td>
            </tr>
        </>
    );
}

function TableHead({
    fullName,
    residentId,
    repfilId,
    reportType,
    dateReported,
    reportStatus,
    handleStatus,
}) {
    return (
        <>
            <th scope="col" className="h-10 px-4 font-semibold border-t-2 border-b-2 border-l-2">
                {fullName}
            </th>
            <th scope="col" className="h-10 px-4 font-semibold border-t-2 border-b-2">
                {residentId}
            </th>
            <th scope="col" className="h-10 px-4 font-semibold border-t-2 border-b-2">
                {repfilId}
            </th>
            <th scope="col" className="h-10 px-4 font-semibold border-t-2 border-b-2">
                {reportType}
            </th>
            <th scope="col" className="h-10 px-4 font-semibold border-t-2 border-b-2">
                {dateReported}
            </th>
            <th
                scope="col"
                onClick={handleStatus}
                className="h-10 px-4 text-center font-semibold border-t-2 border-b-2 cursor-pointer hover:bg-gray-200"
            >
                {reportStatus}
            </th>
            <th scope="col" className="h-10 px-1 font-semibold border-t-2 border-b-2 border-r-2">
                
                </th>
        </>
    );
}
