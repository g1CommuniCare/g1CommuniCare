"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Helper function to format the date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const rowsPerPage = 10; // Number of rows to display per page

// Pagination component
const Pagination = ({ total, current, onPageChange }) => {
  const numPages = Math.ceil(total / rowsPerPage);
  const pageNumbers = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className={`px-3 py-1 rounded cursor-pointer ${current === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Prev
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded cursor-pointer ${current === number ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === numPages}
        className={`px-3 py-1 rounded cursor-pointer ${current === numPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
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

  useEffect(() => {
    axios
      .get('http://localhost:8080/document-requests/all-document-requests')
      .then((response) => {
        setDocumentRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Get the rows to display for the current page
  const currentPageRows = documentRequests.slice(startIndex, endIndex);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-full">
      <header
        className="h-72 w-full bg-cover text-black"
        style={{ backgroundImage: 'url("/images/document-request-header.png")' }}
      >
        <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
          <h1 className="font-bold text-6xl">Document Request</h1>
          <span className="flex justify-center font-small text-lg mt-2 mr-96">
            Effortlessly request essential barangay documents here. Choose your
            document type, provide necessary details, and enjoy a streamlined,
            secure process. Opt for document printing and make hassle-free
            payments. Your essential paperwork, simplified.
          </span>
        </div>
      </header>
      <div className="w-80% p-4">
        <div className="m-4 overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
          <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
            <thead>
              <tr className="text-left">
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 pl-10 pr-3 py-4 text-gray-600 font-bold tracking-wider uppercase text-xs">Resident Name</th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-3 py-4 text-gray-600 font-bold tracking-wider uppercase text-xs">Resident ID</th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-3 py-4 text-gray-600 font-bold tracking-wider uppercase text-xs">Request ID</th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-3 py-4 text-gray-600 font-bold tracking-wider uppercase text-xs">Document Type</th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-3 py-4 text-gray-600 font-bold tracking-wider uppercase text-xs">Date Requested</th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-3 py-4 text-gray-600 font-bold tracking-wider uppercase text-xs">Status</th>
              </tr>                   
            </thead>
            <tbody>
            {currentPageRows.map((request) => (
              <Link
                key={request.docreqId}
                href={`/admin-document-request/${request.docreqId}`}
              >
                <tr className="cursor-pointer hover:bg-gray-100">
                  <td className="py-3 pl-10 pr-3">
                    <div className="flex items-center">
                      <img
                        src={`data:image/${request.resident.imageFormat};base64,${request.resident.profileImage}`}
                        alt={`${request.resident.firstName}'s profile`}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/default-avatar.png';
                        }}
                      />
                      <span className="ml-2">
                        {`${request.resident.firstName} ${request.resident.middleInitial} ${request.resident.lastName}`}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">{`RES-${request.resident.residentId}`}</td>
                  <td className="p-3">{`DOC-${request.docreqId}`}</td>
                  <td className="p-3">{request.documentType}</td>
                  <td className="p-3">{formatDate(request.requestDate)}</td>
                  <td className="md:table-cell block py-3 text-sm text-left">
                    <span
                      className={`inline-block px-1 py-1 rounded-full text-white text-center
                        ${
                          request.documentStatus === 'Pending'
                            ? 'bg-yellow-500'
                            : request.documentStatus === 'Approved'
                            ? 'bg-green-500'
                            : request.documentStatus === 'Denied'
                            ? 'bg-red-500'
                            : 'bg-gray-500'
                        }`}
                      style={{ width: '80px' }}
                    >
                      {request.documentStatus}
                    </span>
                  </td>
                </tr>
              </Link>
            ))}
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
    </div>
  );
}
