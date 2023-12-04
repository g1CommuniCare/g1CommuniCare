"use client";
import Search from "@/app/assets/Search";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import PDFGeneratorDoc from '@/app/components/PDFGeneratorDoc';

// Helper function to format the date
const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
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

export default function DocumentRequest() {
    const [documentRequests, setDocumentRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    async function fetchDocumentRequests() {
        setLoading(true);
        try {
            const res = await axios("http://localhost:8080/document-requests/non-deleted");
            const data = res.data;
            setDocumentRequests(data);
        } catch (error) {
            console.log("Error Fetching Document Requests", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDocumentRequests();
    }, []);

    // Calculate the starting and ending index for the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Get the rows to display for the current page
    const currentPageRows = documentRequests.slice(startIndex, endIndex);

    if (error) return <div>Error: {error}</div>;

    function handleStatus() {
        const sortedArray = [...documentRequests].sort((a, b) => {
            if (a.documentStatus === "Pending" && b.documentStatus !== "Pending") {
                return -1;
            } else if (a.documentStatus !== "Pending" && b.documentStatus === "Pending") {
                return 1;
            } else {
                return 0;
            }
        });

        setDocumentRequests(sortedArray);
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
                        className="ml-2 h-[58px] inline-flex items-center py-1 mt-2 justify-center h-12 px-8 text-sm font-medium tracking-wide text-white transition duration-300 rounded-xl whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
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
                                    requestId="Requested ID"
                                    documentType="Document Type"
                                    dateRequested="Date Requested"
                                    status="Status"
                                    handleStatus={handleStatus}
                                />
                            </tr>
                            {loading && <TableDocumentRequestsSkeleton />}
                            {currentPageRows.map(
                                ({
                                    docreqId,
                                    resident: { ...resident },
                                    documentType,
                                    requestDate,
                                    documentStatus,
                                }) => (
                                    <TableDocumentRequests
                                        key={docreqId}
                                        docreqId={docreqId}
                                        imageFormat={resident.imageFormat}
                                        profileImage={resident.profileImage}
                                        residentId={resident.residentId}
                                        firstName={resident.firstName}
                                        lastName={resident.lastName}
                                        documentType={documentType}
                                        requestDate={formatDate(requestDate)}
                                        documentStatus={documentStatus}
                                    />
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <Pagination
                    total={documentRequests.length}
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
                <PDFGeneratorDoc data={documentRequests} />
            </Modal>
        </>
    );
}

function TableDocumentRequests({
    docreqId,
    residentId,
    imageFormat,
    profileImage,
    firstName,
    lastName,
    documentType,
    requestDate,
    documentStatus,
}) {
    const router = useRouter();

    function handleClick() {
        router.push(`/admin-document-request/${docreqId}`);
        console.log(docreqId);
    }

    const fullName = firstName + " " + lastName;
    const residentProfile = `data:image/${imageFormat};base64,${profileImage}`;

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
                    <span className="ml-2">RES-{residentId}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span className="ml-2">DOC-{docreqId}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span className="ml-2">{documentType}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span className="ml-2">{requestDate}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-r-2 text-slate-700 border-slate-200">
                    <span className="ml-2">{documentStatus}</span>
                </td>
            </tr>
        </>
    );
}

function TableDocumentRequestsSkeleton() {
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
    requestId,
    documentType,
    dateRequested,
    status,
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
                {requestId}
            </th>
            <th scope="col" className="h-10 px-4 font-semibold border-t-2 border-b-2">
                {documentType}
            </th>
            <th scope="col" className="h-10 px-4 font-semibold border-t-2 border-b-2">
                {dateRequested}
            </th>
            <th
                scope="col"
                onClick={handleStatus}
                className="h-10 px-4 font-semibold border-t-2 border-b-2 border-r-2 cursor-pointer hover:bg-gray-200"
            >
                {status}
            </th>
        </>
    );
}
