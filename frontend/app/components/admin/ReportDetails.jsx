"use client";

import { useState } from "react";
import CopySvg from "@/app/utils/CopySvg";
import SuccessPopup from "@/app/utils/SuccessPopUp";

export default function ReportDetails({ data, fullName }) {
  const [showUpdateStatusPopup, setShowUpdateStatusPopup] = useState(false);
  const [updateText, setUpdateText] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const [isSuccessPopupShowing, setIsSuccessPopupShowing] = useState(false);

  const [showResolvePopup, setShowResolvePopup] = useState(false);

  const handleCopy = () => {
    alert("COPIIIIIIIIIIIIIIIIIIIIIIIIIED");
  }

  const handleUpdateStatus = () => {
    setShowUpdateStatusPopup(true);
  }

  const handleResolve = () => {
    setShowResolvePopup(true);
  }

  function handleSuccessPopupConfirm() {
    setIsSuccessPopupShowing(false);
    setIsShowing(false); // Optionally close the registration modal as well
}

  const handleUpdateStatusSubmit = async () => {
    // Send an API fetch request to update report update
    const response = await fetch(`http://localhost:8080/reports-filing/updateReportUpdate/${data.repfilId}`, {
      method: 'PUT',
      body: JSON.stringify(updateText),
    });
    const result = await response.text();
    setShowUpdateStatusPopup(false); // Close the Update Status popup after submission
    setIsSuccessPopupShowing(true);    
  };

  const handleResolveSubmit = async () => {
    // Send an API fetch request to update report status
    const response = await fetch(`http://localhost:8080/reports-filing/updateReportStatus/${data.repfilId}`, {
      method: 'PUT',
      body: JSON.stringify("Resolved"),
    });
    const result = await response.text();
    setShowResolvePopup(false); // Close the Resolve popup after submission
    setIsSuccessPopupShowing(true);
  };
  return (
    <div className="flex flex-col w-full p-5">
      <div className="w-[950px] bg-gray-200/80 rounded-2xl mx-auto p-5">
        <div className="flex justify-between gap-8">
          <div className="w-[515px] bg-white rounded-2xl">
            <h1 className="text-xs text-gray-400 p-3">Resident Information</h1>
            <div className="px-8 pt-1 pb-8">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500 leading-3">
                    Resident ID:
                  </p>
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
            <h1 className="text-xs text-gray-400 p-3">Resident Information</h1>
            <div className="px-8 pt-1 pb-8">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500 leading-3">Request ID:</p>
                  <p className="pb-2 font-medium">REP-{data.repfilId}</p>
                </div>
                <CopySvg handleCopy={handleCopy} />
              </div>
              <>
                <p className="text-xs text-gray-500 leading-3">
                  Date Reported:
                </p>
                <p className="pb-2 font-medium">{data.dateReported}</p>
              </>
              <>
                <p className="text-xs text-gray-500 leading-3">Report Type:</p>
                <p className="pb-2 font-medium">{data.reportType}</p>
              </>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="w-full bg-white rounded-2xl">
            <h1 className="text-xl font-bold text-center p-5">
              REPORT DETAILS
            </h1>
            <div className="w-11/12 bg-gray-200/80 rounded-2xl mx-auto p-5 mb-6">
              <div className="flex flex-row mb-4 mx-16">
                <div className="flex flex-col items-start">
                  <div>
                    <p className="text-xs text-gray-500">Date and Time:</p>
                    <p className="pb-2 font-medium">{data.reportDate}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-9/12 mx-16">
                <p className="text-xs text-gray-500 w-6/12">Details:</p>
                <p className="pb-2 font-medium">{data.reportDetails}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleUpdateStatus}
          className="bg-[#ff8838] hover:bg-[#337770] w-[148px] text-sm text-white p-2 rounded-lg mt-8 mr-6"
        >
          Update Status
        </button>
        <button
          onClick={handleResolve}
          className="bg-[#3F948B] hover:bg-[#ac5853] w-[148px] text-sm text-white p-2 rounded-lg"
        >
          Resolve
        </button>
        {showUpdateStatusPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl z-50">
            <h3 className="text-3xl leading-6 font-bold text-gray-900 mb-8 text-center">
              Provide an Update on the Report
            </h3>
            <div className="mt-2 text-center">
              <textarea
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                className="w-full h-24 border border-gray-300 rounded-md p-2"
                placeholder="Enter Report Update"
              ></textarea>
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setShowUpdateStatusPopup(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleUpdateStatusSubmit}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff8838] hover:bg-[#337770] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff8838]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showResolvePopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl z-50">
            <h3 className="text-3xl leading-6 font-bold text-gray-900 mb-8 text-center">
              Mark this problem as Resolved?
            </h3>
            <div className="mt-2 text-center">
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setShowResolvePopup(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleResolveSubmit}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#3F948B] hover:bg-[#ac5853] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3F948B]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSuccessPopupShowing && (
                <SuccessPopup
                    title="Report Updated!"
                    message="Report status has been updated successfully!"
                    onConfirm={handleSuccessPopupConfirm}
                    onCancel={() => setIsSuccessPopupShowing(false)}
                    btnMessage="Close"
                />
            )}
      </div>
    </div>
  );
}
