"use client";
import Search from "@/app/assets/Search";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function AppointmentRequest() {
    const [appointmentRequests, setAppointmentRequest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    async function fetchAppointmentRequests() {
        setLoading(true);
        try {
            const res = await axios("http://localhost:8080/appointment-requests/non-deleted");
            const data = res.data;
            setAppointmentRequest(data);
        } catch (error) {
            console.log("Error Fetching Appointment Requests", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointmentRequests();
    }, []);

    // Calculate the starting and ending index for the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Get the rows to display for the current page
    const currentPageRows = appointmentRequests.slice(startIndex, endIndex);

    if (error) return <div>Error: {error}</div>;

    function handleStatus() {
        const sortedArray = [...appointmentRequests].sort((a, b) => {
            if (a.appointmentStatus === "Pending" && b.appointmentStatus !== "Pending") {
                return -1;
            } else if (a.appointmentStatus !== "Pending" && b.appointmentStatus === "Pending") {
                return 1;
            } else {
                return 0;
            }
        });

        setAppointmentRequest(sortedArray);
    }

    return (
        <>
            <form className="px-5 pt-5">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Search />
                    </div>
                    <input
                        type="text"
                        id="default-search"
                        placeholder="Search"
                        className="w-full p-4 ps-12 border-gray-300 border-b-[2px] outline-none"
                    />
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
                                    appreqId="Requested ID"
                                    department="Department"
                                    dateRequested="Date Requested"
                                    appointmentStatus="Status"
                                    handleStatus={handleStatus}
                                />
                            </tr>
                            {loading && <TableAppointmentRequestsSkeleton />}
                            {currentPageRows.map(
                                ({
                                    appreqId,
                                    resident: { ...resident },
                                    department,
                                    dateRequested,
                                    appointmentStatus,
                                }) => (
                                    <TableAppointmentRequests
                                        key={appreqId}
                                        appreqId={appreqId}
                                        imageFormat={resident.imageFormat}
                                        profileImage={resident.profileImage}
                                        residentId={resident.residentId}
                                        firstName={resident.firstName}
                                        lastName={resident.lastName}
                                        department={department}
                                        dateRequested={dateRequested}
                                        appointmentStatus={appointmentStatus}
                                    />
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <Pagination
                    total={appointmentRequests.length}
                    current={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
}

function TableAppointmentRequests({
    appreqId,
    residentId,
    imageFormat,
    profileImage,
    firstName,
    lastName,
    department,
    dateRequested,
    appointmentStatus,
}) {
    const router = useRouter();

    function handleClick() {
        router.push(`/admin-appointments/${appreqId}`);
        console.log(appreqId);
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
                    <span className="ml-2">APP-{appreqId}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span className="ml-2">{department}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 text-slate-700 border-slate-200">
                    <span className="ml-2">{dateRequested}</span>
                </td>
                <td className="h-10 px-4 text-sm font-semibold transition duration-300 border-b-2 border-r-2 text-slate-700 border-slate-200">
                    <span className="ml-2">{appointmentStatus}</span>
                </td>
            </tr>
        </>
    );
}

function TableAppointmentRequestsSkeleton() {
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
    appreqId,
    department,
    dateRequested,
    appointmentStatus,
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
                {appreqId}
            </th>
            <th scope="col" className="h-10 px-4 font-semibold border-t-2 border-b-2">
                {department}
            </th>
            <th scope="col" className="h-10 px-4 font-semibold border-t-2 border-b-2">
                {dateRequested}
            </th>
            <th
                scope="col"
                onClick={handleStatus}
                className="h-10 px-4 font-semibold border-t-2 border-b-2 border-r-2 cursor-pointer hover:bg-gray-200"
            >
                {appointmentStatus}
            </th>
        </>
    );
}
